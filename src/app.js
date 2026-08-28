import { aesthetics as allAesthetics, publicAesthetics as aesthetics, categories, journal, sources, eraPresets, activeInYear, overlapsEra } from './aesthetic-data.js';
import { musicCategories, musicStyles, musicCategoryById, musicStyleById, musicActiveInYear } from './music-data.js';
import { galleryData } from './gallery-data.js';
import { curatedGalleryData } from './gallery-curated.js';
import { galleryCovers } from './gallery-covers.js';
import { expandedGalleryCovers } from './expanded-gallery-covers.js';
import { curateGallery, imageIdentity } from './image-curation.js';
import { culturalReferences, referenceTypeLabels } from './culture-data.js';
import { musicMedia } from './music-media.js?v=20260824-2';
import { mirroredMediaPath } from './media-path.js';

const app = document.querySelector('#app');
const header = document.querySelector('#siteHeader');
const searchPanel = document.querySelector('#searchPanel');
const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');
const suggestions = document.querySelector('#searchSuggestions');
const toast = document.querySelector('#toast');
const savedCount = document.querySelector('#savedCount');
document.querySelector('#footerAestheticCount').textContent = `${aesthetics.length} 个视觉美学条目`;
document.querySelector('#footerMusicCount').textContent = `${musicStyles.length} 个听觉美学条目`;
let saved = new Set(JSON.parse(localStorage.getItem('aestheticism:saved') || '[]'));
const HOME_FOCUS_CATEGORIES = ['psyche', 'digital', 'future'];
let activeFilter = HOME_FOCUS_CATEGORIES[0];
let heroTimer;
let completeGalleryData = {};
let completeGalleryPromise;
let completeMusicTrackData = {};
let completeMusicTrackPromise;
let renderVersion = 0;
let lazyBackgroundScrollHandler;
let toneTransitionScrollHandler;
let toneTransitionFrame;

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const aestheticById = (id) => allAesthetics.find((item) => item.id === id);
const categoryById = (id) => categories.find((item) => item.id === id);
const inCategory = (item, categoryId) => item.categories.includes(categoryId);
const escapeHtml = (value = '') => String(value).replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
const isLocalPreview = ['127.0.0.1', 'localhost'].includes(location.hostname);
const mirrorMediaOrigin = 'https://aesthetic-atlas-web.oss-cn-shanghai.aliyuncs.com/';
const mediaUrl = (source = '') => {
  if (!/^https?:\/\//i.test(source)) return source;
  if (isLocalPreview) return `/media?url=${encodeURIComponent(source)}`;
  return new URL(mirroredMediaPath(source).replace(/^\.\//, ''), mirrorMediaOrigin).href;
};
const rgbFromHex = (hex) => {
  const value = String(hex).replace('#', '');
  const normalized = value.length === 3 ? value.split('').map(character => character + character).join('') : value;
  return [0, 2, 4].map(offset => Number.parseInt(normalized.slice(offset, offset + 2), 16));
};
const relativeLuminance = (hex) => rgbFromHex(hex)
  .map(channel => channel / 255)
  .map(channel => channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4)
  .reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
const contrastRatio = (foreground, background) => {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (lighter + .05) / (darker + .05);
};
const contrastText = (background) => contrastRatio('#000000', background) >= contrastRatio('#ffffff', background) ? '#000000' : '#ffffff';
const visibleAccent = (accent, background) => contrastRatio(accent, background) >= 4.5 ? accent : contrastText(background);
const themeVars = (item) => {
  const [c1, c2, c3] = item.colors;
  return `--c1:${c1};--c2:${c2};--c3:${c3};--on-c1:${contrastText(c1)};--on-c2:${contrastText(c2)};--on-c3:${contrastText(c3)};--hero-accent:${visibleAccent(c1, c2)};--gallery-accent:${visibleAccent(c1, '#0c0d0f')}`;
};
const coverPicks = { 'acid-design': 0, vectordelia: 5, webcore: 8, atompunk: 1 };
const HOME_INDEX_PRIORITY = [
  'weirdcore', 'dreamcore', 'liminal-space', 'poolcore', 'vaporwave', 'acid-design',
  'frutiger-aero', 'nostalgiacore', 'traumacore', 'angelcore', 'cloudcore', 'voidcore',
  'cyberdelic', 'old-web', 'skeuomorphism', 'kidcore', 'clowncore', 'goblincore',
  'witchcore', 'fairycore', 'retrofuturism', 'atompunk', 'synthwave', 'cyberpunk'
];
const HOME_INDEX_RANK = new Map(HOME_INDEX_PRIORITY.map((id, index) => [id, index]));
const DAY_MS = 86400000;
const DAILY_OFFSET = 6;
let dailyTimer;

function localDayNumber(date = new Date()) {
  return Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / DAY_MS);
}

function dailyFocusItems(date = new Date()) {
  const dayNumber = localDayNumber(date) + DAILY_OFFSET;
  const categoryOffset = ((dayNumber % HOME_FOCUS_CATEGORIES.length) + HOME_FOCUS_CATEGORIES.length) % HOME_FOCUS_CATEGORIES.length;
  const orderedCategories = [
    ...HOME_FOCUS_CATEGORIES.slice(categoryOffset),
    ...HOME_FOCUS_CATEGORIES.slice(0, categoryOffset)
  ];
  const selected = [];
  orderedCategories.forEach((categoryId, position) => {
    const pool = aesthetics.filter(item => item.category === categoryId && galleryFor(item).length > 0);
    if (!pool.length) return;
    const start = (dayNumber + position * 7) % pool.length;
    for (let step = 0; step < pool.length; step += 1) {
      const candidate = pool[(start + step) % pool.length];
      if (selected.every(item => item.id !== candidate.id)) {
        selected.push(candidate);
        break;
      }
    }
  });
  return selected;
}

function dailyState(date = new Date()) {
  const dayNumber = localDayNumber(date) + DAILY_OFFSET;
  const dailyFocus = dailyFocusItems(date);
  const featuredAesthetics = aesthetics.filter(item => HOME_FOCUS_CATEGORIES.some(categoryId => inCategory(item, categoryId)) && galleryFor(item).length > 0);
  const remaining = featuredAesthetics.filter(item => dailyFocus.every(selected => selected.id !== item.id));
  const remainingOffset = remaining.length ? ((dayNumber % remaining.length) + remaining.length) % remaining.length : 0;
  const featured = [...dailyFocus, ...remaining.slice(remainingOffset), ...remaining.slice(0, remainingOffset)];
  const catalogIndex = aesthetics.indexOf(featured[0]);
  const catalogOnly = aesthetics.filter(item => HOME_FOCUS_CATEGORIES.some(categoryId => inCategory(item, categoryId)) && galleryFor(item).length === 0);
  const ordered = [...featured, ...catalogOnly];
  const tomorrowDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  return {
    dateKey: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    dateLabel: new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(date),
    item: featured[0],
    tomorrow: dailyFocusItems(tomorrowDate)[0],
    featured,
    ordered,
    index: catalogIndex,
    mode: ['immersive', 'editorial', 'clean', 'cinematic'][catalogIndex % 4]
  };
}

function curatedHomeIndex(items) {
  return items
    .map((item, sourceIndex) => ({ item, sourceIndex, rank: HOME_INDEX_RANK.get(item.id) ?? Number.MAX_SAFE_INTEGER }))
    .sort((left, right) => left.rank - right.rank || left.sourceIndex - right.sourceIndex)
    .map(entry => entry.item);
}

function explicitCoverFor(item) {
  const curated = curatedGalleryData[item.id];
  if (curated?.length) return curated[coverPicks[item.id] ?? 0] || curated[0];
  if (expandedGalleryCovers[item.id]?.length) return expandedGalleryCovers[item.id][0];
  if (galleryCovers[item.id]?.length) return galleryCovers[item.id][0];
  return null;
}

function galleryFor(item) {
  let raw = [];
  if (curatedGalleryData[item.id]?.length) raw = curatedGalleryData[item.id];
  else if (completeGalleryData[item.id]?.length) raw = completeGalleryData[item.id];
  else if (galleryData[item.id]?.length) raw = galleryData[item.id];
  else if (expandedGalleryCovers[item.id]?.length) raw = expandedGalleryCovers[item.id];
  else raw = galleryCovers[item.id] || [];
  const gallery = curateGallery(item.id, raw);
  const cover = explicitCoverFor(item);
  if (!cover) return gallery;
  const coverKey = imageIdentity(cover);
  const cataloguedCover = gallery.find(image => imageIdentity(image) === coverKey) || cover;
  return [cataloguedCover, ...gallery.filter(image => imageIdentity(image) !== coverKey)].slice(0, Math.max(1, raw.length));
}

function coverFor(item) {
  return explicitCoverFor(item) || galleryFor(item)[0];
}

function loadCompleteGallery() {
  if (!completeGalleryPromise) completeGalleryPromise = Promise.all([
    import('./gallery-index.js'),
    import('./expanded-gallery-index.js')
  ]).then(([base, expanded]) => { completeGalleryData = { ...base.completeGalleryData, ...expanded.expandedGalleryData }; });
  return completeGalleryPromise;
}

function loadCompleteMusicTracks() {
  if (!completeMusicTrackPromise) completeMusicTrackPromise = import('./music-track-index.js')
    .then(module => { completeMusicTrackData = module.musicTrackData; });
  return completeMusicTrackPromise;
}

function referencesFor(item) {
  return (culturalReferences[item.id] || []).map(reference => {
    if (reference.galleryIndex === undefined) return reference;
    const image = galleryFor(item)[reference.galleryIndex];
    return {
      ...reference,
      image: image?.src,
      url: image?.sourceUrl,
      creator: image?.creator || reference.creator,
      year: image?.date || reference.year,
      rights: [image?.provider, image?.license].filter(Boolean).join(' · ')
    };
  });
}

function cultureSection(item) {
  const references = referencesFor(item);
  if (!references.length) return '';
  const availableTypes = [...new Set(references.map(reference => reference.type))];
  const tabs = ['all', ...availableTypes].map(type => `<button class="${type === 'all' ? 'is-active' : ''}" data-reference-filter="${type}">${referenceTypeLabels[type]}</button>`).join('');
  return `
    <section class="culture-index page-section">
      <div class="culture-index__head">
        <div class="detail-story__label"><span>03</span><p>CULTURAL<br />REFERENCES</p></div>
        <div><h2>相关作品展览</h2><p>只在存在明确文化作品时出现，记录这种美学在电影、游戏、音乐、出版与艺术中的具体落点。</p></div>
      </div>
      <div class="culture-index__filters" aria-label="文化坐标分类">${tabs}</div>
      <div class="culture-index__grid">
        ${references.map(reference => {
          const image = reference.image ? `<span class="reference-card__image" style="background-image:linear-gradient(180deg,transparent 42%,rgba(5,6,7,.86)),url('${escapeHtml(mediaUrl(reference.image))}')"></span>` : '';
          const body = `${image}<span class="reference-card__copy"><small>${referenceTypeLabels[reference.type]}</small><strong>${escapeHtml(reference.title)}</strong><em>${escapeHtml([reference.creator, reference.year].filter(Boolean).join(' · '))}</em><p>${escapeHtml(reference.note)}</p><i>${escapeHtml(reference.rights || '研究索引')}</i></span>`;
          if (reference.type === 'art' && reference.galleryIndex !== undefined) return `<button class="reference-card" data-reference-type="${reference.type}" data-gallery-open="${item.id}" data-gallery-index="${reference.galleryIndex}" aria-label="查看${escapeHtml(reference.title)}">${body}</button>`;
          if (reference.url) return `<a class="reference-card ${reference.image ? '' : 'reference-card--text'}" data-reference-type="${reference.type}" href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer" aria-label="打开${escapeHtml(reference.title)}来源">${body}<b>↗</b></a>`;
          return `<article class="reference-card reference-card--text" data-reference-type="${reference.type}">${body}</article>`;
        }).join('')}
      </div>
    </section>`;
}

function selectedImage(item, image = null) {
  return image || coverFor(item);
}

function imageStyle(item, image = null) {
  const selected = selectedImage(item, image);
  if (selected?.src) {
    return `background-image:linear-gradient(rgba(8,10,10,.06),rgba(8,10,10,.14)),url('${mediaUrl(selected.src)}');background-size:cover;background-position:center;`;
  }
  return `background:linear-gradient(135deg,${item.colors[2]},${item.colors[0]} 55%,${item.colors[1]});`;
}

function lazyImageAttributes(item, image = null) {
  const selected = selectedImage(item, image);
  const placeholder = `background-color:${item.colors[0]};background-image:linear-gradient(135deg,${item.colors[2]},${item.colors[0]} 55%,${item.colors[1]});`;
  return selected?.src
    ? `style="${placeholder}" data-lazy-background="${escapeHtml(mediaUrl(selected.src))}"`
    : `style="${placeholder}"`;
}

function arrow() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`;
}

function card(item, index = 0, compact = false) {
  const category = categoryById(item.category);
  return `
    <article class="aesthetic-card ${compact ? 'aesthetic-card--compact' : ''} reveal" data-id="${item.id}" style="--delay:${Math.min(index * 0.045, .45)}s">
      <button class="card-hit" data-open="${item.id}" aria-label="打开${item.name}详情"></button>
      <div class="card-image atlas-tile" ${lazyImageAttributes(item)}>
        <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
        <button class="save-button ${saved.has(item.id) ? 'is-saved' : ''}" data-save="${item.id}" aria-label="收藏${item.name}">♡</button>
      </div>
      <div class="card-copy">
        <div><span class="card-category">${category.name}</span><span class="card-era">${item.era}</span></div>
        <h3>${item.name}</h3>
        <p>${item.en}</p>
        <span class="card-arrow">${arrow()}</span>
      </div>
    </article>`;
}

function homeIndexRow(item, index = 0) {
  const category = categoryById(item.category);
  return `
    <article class="collection-index__entry ${index === 0 ? 'is-active' : ''}" data-index-preview="${item.id}" role="listitem" style="--index-accent:${item.colors[0]};--row-order:${index % 7}">
      <button class="collection-index__main" data-open="${item.id}" aria-label="打开${item.name}详情">
        <span class="collection-index__number">${String(index + 1).padStart(3, '0')}</span>
        <span class="collection-index__name"><strong>${item.name}</strong><em>${item.en}</em></span>
        <span class="collection-index__category">${category.name}</span>
        <span class="collection-index__era">${item.era}</span>
        <i class="collection-index__thumb atlas-tile" ${lazyImageAttributes(item)}></i>
        ${arrow()}
      </button>
      <button class="collection-index__save ${saved.has(item.id) ? 'is-saved' : ''}" data-save="${item.id}" aria-label="收藏${item.name}">♡</button>
    </article>`;
}

function homeIndex(items) {
  const lead = items[0];
  if (!lead) return '<div class="collection-atlas collection-atlas--empty" id="aestheticGrid">当前分类还没有公开条目。</div>';
  const category = categoryById(lead.category);
  const image = selectedImage(lead);
  return `
    <div class="collection-atlas" id="aestheticGrid">
      <aside class="collection-atlas__preview" id="collectionPreview" style="--index-accent:${lead.colors[0]};--index-dark:${lead.colors[1]}">
        <button class="collection-preview__media" data-index-preview-open data-open="${lead.id}" aria-label="打开${lead.name}详情">
          ${image?.src ? `<img src="${escapeHtml(mediaUrl(image.src))}" alt="${lead.name}" />` : ''}
        </button>
        <div class="collection-preview__shade"></div>
        <div class="collection-preview__top"><span>VISUAL INDEX</span><b data-index-preview-count>001 / ${String(items.length).padStart(3, '0')}</b></div>
        <div class="collection-preview__copy">
          <span data-index-preview-category>${category.name} · ${lead.era}</span>
          <h3 data-index-preview-name>${lead.name}</h3>
          <p data-index-preview-en>${lead.en}</p>
          <em data-index-preview-desc>${lead.desc}</em>
        </div>
      </aside>
      <div class="collection-index" role="list" tabindex="0" aria-label="美学条目索引，可在此区域内独立滚动">
        <div class="collection-index__legend"><span>编号 / 名称</span><span>视觉来源</span><span>年代</span></div>
        <div class="collection-index__rail" aria-hidden="true"><i></i></div>
        ${items.map(homeIndexRow).join('')}
      </div>
    </div>`;
}

function homeView() {
  const daily = dailyState();
  const lead = daily.item;
  const leadNumber = String(daily.index + 1).padStart(2, '0');
  const slides = daily.featured.slice(0, 3);
  const focusCategories = HOME_FOCUS_CATEGORIES.map(categoryById);
  const focusedIndexItems = curatedHomeIndex(daily.ordered.filter(item => inCategory(item, activeFilter)));
  return `
    <section class="hero" id="home" data-hero style="--daily-c1:${lead.colors[0]};--daily-c2:${lead.colors[1]};--daily-c3:${lead.colors[2]}">
      <div class="hero__slides">
        ${slides.map((item, index) => {
          const category = categoryById(item.category);
          const imageCount = item.galleryCount || galleryFor(item).length;
          return `<article class="hero-slide ${index === 0 ? 'is-active' : ''}" data-hero-slide="${index}" data-c1="${item.colors[0]}" data-c2="${item.colors[1]}" data-c3="${item.colors[2]}" style="background:linear-gradient(135deg,${item.colors[1]},${item.colors[0]} 58%,${item.colors[2]})">
            <button class="hero-slide__media" data-open="${item.id}" style="${imageStyle(item)}" aria-label="打开${item.name}"></button>
            <div class="hero-slide__shade"></div>
            <div class="hero-slide__content page-section">
              <p class="hero-slide__kicker"><i></i>${category.name} · ${item.era}</p>
              <h1>${item.en}</h1>
              <div class="hero-slide__lower">
                <div><h2>${item.name}</h2><p>${item.tagline}</p></div>
                <div class="hero-slide__facts"><span><small>图像</small><strong>${imageCount || '—'}</strong></span><span><small>起源</small><strong>${item.origin}</strong></span></div>
                <button data-open="${item.id}">进入图集 ${arrow()}</button>
              </div>
            </div>
          </article>`;
        }).join('')}
      </div>
      <div class="hero__meta page-section"><span>AESTHETICISM / DAILY ISSUE</span><span>${daily.dateLabel}</span><span>${leadNumber} / ${aesthetics.length}</span></div>
      <div class="hero-dock page-section">
        <div class="hero-dock__clock"><span>下一期</span><strong id="dailyCountdown">00:00:00</strong></div>
        <div class="hero-dock__tabs">${slides.map((item, index) => `<button class="${index === 0 ? 'is-active' : ''}" data-hero-tab="${index}"><i></i><span>0${index + 1}</span><strong>${item.name}</strong></button>`).join('')}</div>
        <button class="hero-dock__tomorrow" data-open="${daily.tomorrow.id}"><span>明日风格</span><strong>${daily.tomorrow.name}</strong>${arrow()}</button>
      </div>
    </section>

    <section class="manifesto page-section reveal tone-transition" data-tone-from="dark" data-tone-to="light">
      <p class="section-number">01 — MANIFESTO</p>
      <div class="manifesto__copy">
        <p>我们不把美学当作短暂的“流行标签”，而是把它视作一种<strong>集体记忆的接口</strong>。</p>
        <span>每一种风格都记录着人们如何想象自然、技术、未来与自我。它们互相借用、跨越地域，也不断被新一代重新命名。</span>
      </div>
      <div class="manifesto__count"><strong>${aesthetics.length}</strong><span>种核心风格<br />首期收录</span></div>
    </section>

    <section class="lineage page-section tone-transition" id="explore" data-tone-from="light" data-tone-to="dark">
      <div class="section-head reveal">
        <div><p class="section-number">02 — THE LINEAGES</p><h2>${categories.length} 种视觉谱系</h2></div>
        <p>按情绪、媒介与历史语境重新组织美学。<br />这不是固定边界，而是一张可穿行的地图。</p>
      </div>
      <div class="lineage-grid">
        ${categories.map((category, index) => `
          <button class="lineage-item reveal" data-category="${category.id}" style="--delay:${index * .06}s">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <div><h3>${category.name}</h3><p>${category.en}</p></div>
            <em>${category.note}</em><b>${category.count}</b>${arrow()}
          </button>`).join('')}
      </div>
    </section>

    <section class="collection collection--home-index page-section tone-transition" data-tone-from="dark" data-tone-to="light">
      <div class="section-head section-head--collection reveal">
        <div><p class="section-number">03 — CURATED INDEX</p><h2>已收录</h2></div>
        <div class="filter-row" role="tablist" aria-label="筛选美学">
          ${focusCategories.map(category => `<button class="${activeFilter === category.id ? 'is-active' : ''}" data-filter="${category.id}">${category.name} <sup>${category.count}</sup></button>`).join('')}
        </div>
      </div>
      ${homeIndex(focusedIndexItems)}
      <div class="collection__end reveal"><span>END OF VOL. 001</span><button data-route-button="atlas">查看全球图谱 ${arrow()}</button></div>
    </section>

    <section class="featured-story page-section reveal tone-transition" id="journal" data-tone-from="light" data-tone-to="story">
      <div class="featured-story__image atlas-tile" ${lazyImageAttributes(aestheticById('frutiger-aero'))}></div>
      <div class="featured-story__copy">
        <p class="section-number">04 — EDITOR'S STORY</p>
        <span class="story-tag">技术乐观主义 · 8 MIN READ</span>
        <h2>我们怀念的，<br />真的是 <em>2007</em> 年吗？</h2>
        <p>蓝天、草地、玻璃气泡和永远晴朗的未来。Frutiger Aero 的回潮，并不只是对旧界面的怀旧。</p>
        <button data-open="frutiger-aero">阅读专题 ${arrow()}</button>
      </div>
    </section>

    <section class="journal-strip page-section tone-transition" data-tone-from="story" data-tone-to="light">
      ${journal.map((entry, index) => `
        <article class="journal-item reveal" style="--delay:${index * .08}s">
          <span>${entry.no}</span><div><h3>${entry.title}</h3><p>${entry.sub}</p></div>
          <div class="journal-thumbs">${entry.ids.map(id => `<i class="atlas-tile" ${lazyImageAttributes(aestheticById(id))}></i>`).join('')}</div>
          <button data-open="${entry.ids[0]}" aria-label="打开专题">${arrow()}</button>
        </article>`).join('')}
    </section>

    <section class="source-section page-section reveal tone-transition" data-tone-from="light" data-tone-to="source">
      <div><p class="section-number">05 — RESEARCH NETWORK</p><h2>开放的研究网络</h2><p>来源与开放许可</p></div>
      <div class="source-list">${sources.map((source, index) => `<a href="${source.url}" target="_blank" rel="noreferrer"><span>0${index + 1}</span><strong>${source.name}</strong><em>${source.label}</em>${arrow()}</a>`).join('')}</div>
    </section>`;
}

function sealedArchiveView() {
  const hiddenAesthetics = allAesthetics.filter(item => item.hidden);
  return `
    <article class="sealed-archive">
      <section class="sealed-hero page-section">
        <div class="sealed-hero__meta"><span>SEALED INDEX</span><b>${String(hiddenAesthetics.length).padStart(2, '0')}</b></div>
        <p class="section-number">NON-PUBLIC / RESEARCH ACCESS</p>
        <h1>封存<br /><em>条目</em></h1>
        <div class="sealed-hero__note">
          <p>收录涉及身体恐怖、怪诞与成人主题的视觉文化，仅用于艺术史与亚文化研究。这些条目不会进入公开分类、首页轮换或普通搜索。</p>
          <button data-route-button="home">返回公开档案 ${arrow()}</button>
        </div>
      </section>
      <section class="sealed-index page-section">
        <div class="sealed-index__head"><span>RESTRICTED ENTRIES</span><p>${hiddenAesthetics.length} 个封存条目</p></div>
        <div class="sealed-grid">${hiddenAesthetics.map((item, index) => card(item, index)).join('')}</div>
      </section>
    </article>`;
}

function exploreView(filter = 'all') {
  const selected = filter === 'all' ? null : categoryById(filter);
  const items = selected ? aesthetics.filter(item => inCategory(item, filter)) : aesthetics;
  return `
    <section class="page-intro page-section">
      <p class="section-number">ARCHIVE / ${selected ? selected.en.toUpperCase() : 'ALL AESTHETICS'}</p>
      <h1>${selected ? selected.name : '探索全部风格'}</h1>
      <div class="page-intro__bottom"><p>${selected ? selected.note : '穿过年代、地域与媒介，寻找视觉风格之间隐秘的连接。'}</p><span>${items.length} ENTRIES · VOL. 001</span></div>
    </section>
    <section class="collection page-section collection--archive">
      <div class="filter-row filter-row--full">
        <button class="${filter === 'all' ? 'is-active' : ''}" data-filter-route="all">全部 <sup>${aesthetics.length}</sup></button>
        ${categories.map(c => `<button class="${filter === c.id ? 'is-active' : ''}" data-filter-route="${c.id}">${c.name} <sup>${c.count}</sup></button>`).join('')}
      </div>
      <div class="aesthetic-grid">${items.map(card).join('')}</div>
    </section>`;
}

function detailGallerySection(item, images) {
  if (!images.length) return '';
  return `
    <section class="museum-gallery page-section">
      <div class="museum-gallery__head">
        <div class="detail-story__label"><span>04</span><p>OPEN-ACCESS<br />IMAGE GALLERY</p></div>
        <div><h2>馆藏图集</h2><p>${images.length} 件开放授权图像 · 当前展示精选内容</p></div>
      </div>
      <div class="museum-gallery__grid">${images.slice(0, 8).map((image, index) => `
        <button class="museum-gallery__item" data-gallery-open="${item.id}" data-gallery-index="${index}" aria-label="查看${escapeHtml(image.title)}">
          <span class="museum-gallery__image" style="${imageStyle(item, image)}"></span>
          <span class="museum-gallery__caption"><strong>${escapeHtml(image.title)}</strong><small>${escapeHtml(image.subject || image.provider)}${image.iiifInfoUrl ? ' · IIIF' : ''}</small></span>
        </button>`).join('')}</div>
      <button class="museum-gallery__all" data-gallery-all="${item.id}"><span>查看全部图像</span><strong>${images.length}</strong>${arrow()}</button>
    </section>`;
}

function detailView(item) {
  const archive = item.hidden ? allAesthetics.filter(aesthetic => aesthetic.hidden) : aesthetics;
  const related = archive.filter(a => inCategory(a, item.category) && a.id !== item.id).slice(0, 3);
  const category = categoryById(item.category);
  const images = galleryFor(item);
  const archiveRoute = item.hidden ? 'sealed' : 'explore';
  const archiveLabel = item.hidden ? 'SEALED INDEX' : 'ARCHIVE';
  return `
    <article class="detail theme-${item.theme}" style="${themeVars(item)}">
      <section class="detail-hero page-section">
        <div class="detail-hero__breadcrumbs"><button data-route-button="${archiveRoute}">${archiveLabel}</button><span>/</span><button data-category="${item.category}">${category.en}</button><span>/</span><b>${item.en}</b></div>
        <div class="detail-hero__title"><span>${item.region}</span><h1>${item.name}</h1><p>${item.en}</p></div>
        <div class="detail-hero__image atlas-tile" style="${imageStyle(item)}">
          <div class="detail-hero__index">A—${String(archive.indexOf(item) + 1).padStart(3, '0')}</div>
          <button class="detail-save ${saved.has(item.id) ? 'is-saved' : ''}" data-save="${item.id}"><span>♡</span>${saved.has(item.id) ? '已收藏' : '收藏风格'}</button>
        </div>
        <p class="detail-hero__tagline">“${item.tagline}”</p>
        <div class="detail-hero__meta"><span>活跃年代<strong>${item.year}</strong></span><span>起源语境<strong>${item.origin}</strong></span><span>视觉谱系<strong>${category.name}</strong></span></div>
      </section>

      <section class="detail-story page-section">
        <div class="detail-story__label"><span>01</span><p>ABOUT<br />THE AESTHETIC</p></div>
        <div class="detail-story__copy"><h2>${item.desc}</h2><p>风格从来不是孤立产生。它是媒介技术、日常生活与集体情绪在某个时间点上的交汇，也会在传播中不断吸收相邻美学的语汇。</p></div>
      </section>

      <section class="visual-language page-section">
        <div class="visual-language__image atlas-tile" style="${imageStyle(item)}"><span>VISUAL<br />LANGUAGE</span></div>
        <div class="visual-language__content">
          <div class="detail-story__label"><span>02</span><p>VISUAL<br />VOCABULARY</p></div>
          <h2>识别这种美学</h2>
          <div class="keyword-list">${item.keywords.map((keyword, index) => `<div><span>0${index + 1}</span><strong>${keyword}</strong></div>`).join('')}</div>
          <div class="palette"><p>核心色谱</p>${item.colors.map(color => `<i style="--swatch:${color}"><b>${color}</b></i>`).join('')}</div>
        </div>
      </section>

      ${cultureSection(item)}

      ${detailGallerySection(item, images)}

      <section class="related page-section">
        <div class="section-head"><div><p class="section-number">05 — NEARBY AESTHETICS</p><h2>继续漫游</h2></div></div>
        <div class="related-grid">${related.map((a, i) => card(a, i, true)).join('')}</div>
      </section>
    </article>`;
}

function galleryView(item) {
  const images = galleryFor(item);
  const category = categoryById(item.category);
  const openCount = images.filter(image => /public domain|cc0/i.test(image.license || '')).length;
  const museumCount = images.filter(image => /IIIF|Museum|Art Institute/i.test(image.provider || '')).length;
  return `
    <article class="gallery-page" data-total="${images.length}" style="${themeVars(item)}">
      <header class="gallery-page__head page-section">
        <button class="gallery-page__back" data-open="${item.id}">← 返回${item.name}</button>
        <p>${category.name} / ${item.era}</p>
        <h1><span>${item.name}</span><em>${item.en}</em></h1>
        <div class="gallery-page__summary"><p>${item.tagline}</p><div><span><strong>${images.length}</strong>全部图像</span><span><strong>${openCount}</strong>公共领域 / CC0</span><span><strong>${museumCount}</strong>博物馆馆藏</span></div></div>
      </header>
      <section class="gallery-browser page-section">
        <div class="gallery-browser__toolbar">
          <label><span>检索档案</span><input id="gallerySearch" type="search" placeholder="标题 / 作者 / 来源" autocomplete="off" /></label>
          <div class="gallery-browser__filters"><button class="is-active" data-gallery-filter="all">01 — 全部</button><button data-gallery-filter="museum">02 — 馆藏</button><button data-gallery-filter="public">03 — 公共领域</button><button data-gallery-filter="licensed">04 — 开放许可</button></div>
          <p><span>当前可见</span><strong id="galleryVisibleCount">${images.length}</strong><small>/ ${images.length}</small></p>
        </div>
        <div class="gallery-all-grid" id="galleryAllGrid">
          ${images.map((image, index) => {
            const licenseClass = /public domain|cc0/i.test(image.license || '') ? 'public' : 'licensed';
            const museum = /IIIF|Museum|Art Institute/i.test(image.provider || '');
            return `<button class="gallery-all-item" data-gallery-open="${item.id}" data-gallery-index="${index}" data-license="${licenseClass}" data-museum="${museum}">
              <span class="gallery-all-item__media"><img src="${escapeHtml(mediaUrl(image.src))}" alt="${escapeHtml(image.title)}" loading="lazy" decoding="async" /><b>${String(index + 1).padStart(3, '0')}</b></span>
              <span class="gallery-all-item__caption"><i>${escapeHtml(image.subject || '图像档案')}</i><strong>${escapeHtml(image.title)}</strong><small>${escapeHtml(image.creator || 'Unknown creator')}</small><em><span>${escapeHtml(image.provider)}</span><span>${escapeHtml(image.license)}</span></em></span>
            </button>`;
          }).join('')}
        </div>
      </section>
    </article>`;
}

function timelineAestheticRow(item) {
  return `<button class="timeline-result" data-open="${item.id}" data-start="${item.startYear}" data-end="${item.endYear}">
    <i class="atlas-tile" ${lazyImageAttributes(item)}></i><span><small>${categoryById(item.category).name}</small><strong>${item.name}</strong><em>${item.en}</em></span><b>${item.era}</b>${arrow()}
  </button>`;
}

function musicCard(style, index = 0) {
  const category = musicCategoryById(style.category);
  const hue = (index * 31 + style.startYear) % 360;
  const cover = musicMedia[style.id]?.albums?.[0];
  const coverStyle = cover ? `background-image:linear-gradient(180deg,transparent 35%,rgba(4,8,14,.78)),url('${escapeHtml(mediaUrl(cover.image))}')` : '';
  return `<article class="music-card reveal" style="--music-hue:${hue};--delay:${Math.min(index * .035, .4)}s" data-start="${style.startYear}" data-end="${style.endYear}">
    <button data-music-open="${style.id}" aria-label="打开${style.name}"></button>
    <div class="music-card__signal ${cover ? 'music-card__signal--cover' : ''}" style="${coverStyle}"><i></i><i></i><i></i><i></i><span>M—${String(index + 1).padStart(3, '0')}</span></div>
    <div class="music-card__copy"><small>${category.name} · ${style.startYear}—</small><h3>${style.name}</h3><p>${style.en}</p><em>${style.origin}</em>${arrow()}</div>
  </article>`;
}

function timelineView() {
  const initialYear = 1980;
  return `<article class="timeline-page">
    <section class="timeline-hero page-section">
      <div><p class="section-number">CHRONOLOGICAL INDEX / ${initialYear}</p><h1>沿年代寻找<br />视觉与声音</h1></div>
      <p>同一条时间坐标，分别检索视觉美学与听觉美学。结果共享年份，不共享分类和详情结构。</p>
    </section>
    <section class="time-console page-section" aria-label="年代检索">
      <div class="time-console__readout"><span>YEAR</span><output id="timelineYear">${initialYear}</output></div>
      <label class="time-console__range"><span>0</span><input id="timelineRange" type="range" min="0" max="2026" value="${initialYear}" step="1" /><span>2026</span></label>
      <label class="time-console__input">精确年份<input id="timelineInput" type="number" min="0" max="2026" value="${initialYear}" inputmode="numeric" /></label>
      <div class="time-console__presets">${eraPresets.map(era => `<button data-era-preset="${era.id}">${era.label}</button>`).join('')}</div>
    </section>
    <section class="timeline-results page-section">
      <div class="timeline-column"><div class="timeline-column__head"><span>AESTHETIC ATLAS</span><h2>视觉美学</h2><b id="timelineAestheticCount">0</b></div><div id="timelineAesthetics">${aesthetics.map(timelineAestheticRow).join('')}</div></div>
      <div class="timeline-column timeline-column--music"><div class="timeline-column__head"><span>AUDITORY AESTHETICS</span><h2>听觉美学</h2><b id="timelineMusicCount">0</b></div><div id="timelineMusic">${musicStyles.map((style, index) => `<button class="timeline-result timeline-result--music" data-music-open="${style.id}" data-start="${style.startYear}" data-end="${style.endYear}"><i style="--music-hue:${(index * 31 + style.startYear) % 360}"></i><span><small>${musicCategoryById(style.category).name}</small><strong>${style.name}</strong><em>${style.en}</em></span><b>${style.startYear}—</b>${arrow()}</button>`).join('')}</div></div>
    </section>
  </article>`;
}

function musicAtlasView(filter = 'all') {
  const selected = filter === 'all' ? null : musicCategoryById(filter);
  const items = selected ? musicStyles.filter(style => style.categories.includes(filter)) : musicStyles;
  return `<article class="music-atlas">
    <section class="music-hero page-section">
      <div class="music-hero__label"><span>AUDITORY AESTHETICS</span><i></i><b>${musicStyles.length} STYLES</b></div>
      <h1>声音也拥有<br /><em>自己的视觉历史</em></h1>
      <div class="music-hero__bottom"><p>音乐类型、子流派、地域、人物、作品、服饰与舞台视觉构成独立数据库。</p><button data-route-button="timeline">按年代交叉检索 ${arrow()}</button></div>
      <div class="music-wave" aria-hidden="true">${Array.from({length:48},(_,index)=>`<i style="--i:${index}"></i>`).join('')}</div>
    </section>
    <section class="music-lineages page-section">
      <div class="music-section-head"><span>GENRE FAMILIES</span><h2>${musicCategories.length} 个音乐大类</h2></div>
      <div class="music-family-grid">${musicCategories.map((category,index)=>`<button class="${filter===category.id?'is-active':''}" data-music-category="${category.id}"><span>${String(index+1).padStart(2,'0')}</span><strong>${category.name}</strong><em>${category.en}</em><p>${category.note}</p><b>${musicStyles.filter(style=>style.categories.includes(category.id)).length}</b></button>`).join('')}</div>
    </section>
    <section class="music-index page-section">
      <div class="music-section-head"><span>${selected ? selected.en.toUpperCase() : 'COMPLETE INDEX'}</span><h2>${selected ? selected.name : '全部音乐风格'}</h2><b>${items.length}</b></div>
      <div class="music-grid">${items.map(musicCard).join('')}</div>
    </section>
  </article>`;
}

function musicDetailView(style) {
  const category = musicCategoryById(style.category);
  const relatedAesthetics = style.relatedAesthetics.map(aestheticById).filter(item => item && !item.hidden);
  const media = musicMedia[style.id] || { artists: [], albums: [] };
  const tracks = completeMusicTrackData[style.id] || [];
  return `<article class="music-detail">
    <section class="music-detail__hero page-section">
      <div class="music-detail__crumbs"><button data-route-button="music">AUDITORY AESTHETICS</button><span>/</span><button data-music-category="${category.id}">${category.en}</button></div>
      <p>${style.region} · ${style.startYear}—</p><h1>${style.name}</h1><em>${style.en}</em>
      <div class="music-detail__pulse" aria-hidden="true">${Array.from({length:64},(_,index)=>`<i style="--i:${index}"></i>`).join('')}</div>
    </section>
    <section class="music-facts page-section">
      <div><span>起源年代</span><strong>${style.startYear}—</strong></div><div><span>起源地区</span><strong>${style.origin}</strong></div><div><span>音乐谱系</span><strong>${style.parent || category.name}</strong></div>
    </section>
    <section class="music-profile page-section">
      <div><span>MUSICAL LANGUAGE</span><h2>音乐特点</h2><p>${style.characteristics}</p></div>
      <div><span>REPRESENTATIVE ARTISTS</span><h2>代表人物</h2><ul>${style.artists.map(artist=>`<li>${escapeHtml(artist)}</li>`).join('')}</ul></div>
      <div><span>KEY WORKS</span><h2>代表作品</h2><ul>${style.works.map(work=>`<li>${escapeHtml(work)}</li>`).join('')}</ul></div>
    </section>
    ${media.artists.length ? `<section class="music-people page-section">
      <div class="music-section-head"><span>REPRESENTATIVE FIGURES</span><h2>人物肖像档案</h2><b>${media.artists.length}</b></div>
      <div class="music-people__grid">${media.artists.map((artist, index) => `<a href="${escapeHtml(artist.sourceUrl)}" target="_blank" rel="noreferrer" class="music-person" style="--person-index:${index}"><span style="background-image:linear-gradient(180deg,transparent 45%,rgba(4,8,14,.88)),url('${escapeHtml(mediaUrl(artist.image))}')"></span><strong>${escapeHtml(artist.name)}</strong><small>${escapeHtml([artist.creator, artist.license].filter(Boolean).join(' · '))}</small></a>`).join('')}</div>
    </section>` : ''}
    ${media.albums.length ? `<section class="music-albums page-section">
      <div class="music-section-head"><span>ESSENTIAL RECORDS</span><h2>代表唱片</h2><b>${media.albums.length}</b></div>
        <div class="music-album-grid">${media.albums.map((album, index) => `<a class="music-album" href="${escapeHtml(album.sourceUrl)}" target="_blank" rel="noreferrer"><span class="music-album__cover"><img src="${escapeHtml(mediaUrl(album.image))}" alt="${escapeHtml(album.title)}唱片封面" loading="lazy" /><i>${String(index + 1).padStart(2, '0')}</i></span><strong>${escapeHtml(album.title)}</strong><small>${escapeHtml(album.artist)}${album.year ? ` · ${escapeHtml(album.year)}` : ''}</small></a>`).join('')}</div>
      <p class="music-media-rights">唱片封面由 Apple Music / iTunes 提供识别信息，版权归原艺术家、厂牌或其他权利人所有；点击封面进入对应音乐页面。</p>
    </section>` : ''}
    ${tracks.length ? `<section class="music-recordings page-section">
      <div class="music-section-head"><span>RECORDING INDEX / MUSICBRAINZ</span><h2>100 首代表曲目</h2><b>${tracks.length}</b></div>
      <div class="music-recordings__toolbar"><label><span>检索曲目或人物</span><input id="musicTrackSearch" type="search" placeholder="输入曲名或音乐人" autocomplete="off" /></label><output id="musicTrackCount">20 / ${tracks.length}</output><button id="musicTrackToggle" type="button">查看全部 ${tracks.length} 首 ${arrow()}</button></div>
      <div class="music-track-list" id="musicTrackList">${tracks.map((track, index) => `<a class="music-track" data-track-index="${index}" href="${escapeHtml(track.sourceUrl)}" target="_blank" rel="noreferrer" ${index >= 20 ? 'hidden' : ''}><span>${String(index + 1).padStart(3, '0')}</span><strong>${escapeHtml(track.title)}</strong><em>${escapeHtml(track.artist)}</em><small>${escapeHtml([track.year, track.duration].filter(Boolean).join(' · '))}</small>${arrow()}</a>`).join('')}</div>
    </section>` : ''}
    <section class="music-visual-system page-section">
      <div class="music-section-head"><span>VISUAL CULTURE</span><h2>音乐如何被看见</h2></div>
      <div class="music-visual-grid"><article><span>01</span><h3>视觉元素</h3><p>${style.visualElements.join(' · ')}</p></article><article><span>02</span><h3>服饰元素</h3><p>${style.fashionElements.join(' · ')}</p></article><article><span>03</span><h3>舞台视觉</h3><p>${style.stageVisuals}</p></article></div>
    </section>
    ${relatedAesthetics.length ? `<section class="music-related page-section"><div class="music-section-head"><span>CONNECTED AESTHETICS</span><h2>关联视觉美学</h2></div><div class="related-grid">${relatedAesthetics.map((item,index)=>card(item,index,true)).join('')}</div></section>` : ''}
  </article>`;
}

function atlasView() {
  const regions = [
    ['GLOBAL', '全球互联网', aesthetics.filter(a => a.region === 'GLOBAL')],
    ['EUROPE', '欧洲', aesthetics.filter(a => /EUROPE|GERMANY|ITALY|FRANCE|SWITZERLAND/.test(a.region))],
    ['EAST ASIA', '东亚', aesthetics.filter(a => /JAPAN|E. ASIA/.test(a.region))],
    ['NORTH AMERICA', '北美', aesthetics.filter(a => /N. AMERICA|US/.test(a.region))]
  ];
  return `
    <section class="atlas-page page-section">
      <div class="page-intro atlas-page__intro"><p class="section-number">WORLD AESTHETIC ATLAS / VOL. 001</p><h1>全球图谱</h1><div class="page-intro__bottom"><p>美学会跨越国境，但不会脱离语境。这里记录它们被命名、传播或重新发现的位置。</p><span>4 REGIONS · ${aesthetics.length} ENTRIES</span></div></div>
      <div class="world-orbit" aria-hidden="true"><div class="orbit orbit--1"></div><div class="orbit orbit--2"></div><div class="orbit orbit--3"></div><span>${aesthetics.length}</span>${aesthetics.slice(0, 12).map((a, i) => `<i style="--i:${i};--color:${a.colors[0]}"></i>`).join('')}</div>
      <div class="region-list">${regions.map((region, index) => `
        <section class="region-block reveal"><div class="region-block__head"><span>0${index + 1}</span><div><h2>${region[1]}</h2><p>${region[0]}</p></div><b>${region[2].length} ENTRIES</b></div>
        <div class="region-block__items">${region[2].map(a => `<button data-open="${a.id}"><i class="atlas-tile" ${lazyImageAttributes(a)}></i><span>${a.name}<small>${a.en}</small></span>${arrow()}</button>`).join('')}</div></section>`).join('')}</div>
    </section>`;
}

function journalView() {
  return `
    <section class="page-intro page-section"><p class="section-number">EDITORIAL / STORIES</p><h1>编辑专题</h1><div class="page-intro__bottom"><p>在标签之外，追踪审美背后的技术、记忆与社会情绪。</p><span>3 STORIES · ISSUE 001</span></div></section>
    <section class="journal-page page-section">${journal.map((entry, index) => { const lead = aestheticById(entry.ids[0]); return `<article class="editorial reveal"><div class="editorial__image atlas-tile" ${lazyImageAttributes(lead)}><span>0${index + 1}</span></div><div class="editorial__copy"><small>${entry.sub}</small><h2>${entry.title}</h2><p>${lead.desc}</p><button data-open="${lead.id}">进入专题 ${arrow()}</button></div></article>`; }).join('')}</section>`;
}

function simpleView(type) {
  const content = {
    about: ['关于档案馆', '美学主义是一座面向全球视觉文化的中文数字档案馆。我们关注网络原生美学、设计史运动、生活方式与界面语言之间的连接。'],
    contribute: ['提交一种风格', '档案馆欢迎新的命名与地方性视觉文化。首期为策展原型，后续将开放来源、时间、图像与关系谱系的结构化提交。'],
    method: ['研究方法', '我们交叉参考研究机构、博物馆资料与社区档案。互联网美学的名称并非永恒，页面会保留来源语境与相邻风格，避免把社区共识伪装成绝对定义。']
  }[type] || ['页面建设中', '新的内容正在进入档案馆。'];
  return `<section class="simple-page page-section"><p class="section-number">AESTHETICISM / ARCHIVE</p><h1>${content[0]}</h1><p>${content[1]}</p><button data-route-button="home">返回首页 ${arrow()}</button></section>`;
}

function bindCommon() {
  bindLazyBackgrounds();
  $$('[data-open]').forEach(el => el.addEventListener('click', (e) => { e.stopPropagation(); location.hash = `style/${el.dataset.open}`; }));
  $$('[data-save]').forEach(el => el.addEventListener('click', (e) => { e.stopPropagation(); toggleSave(el.dataset.save); }));
  $$('[data-category]').forEach(el => el.addEventListener('click', () => { location.hash = `explore/${el.dataset.category}`; }));
  $$('[data-route-button]').forEach(el => el.addEventListener('click', () => { location.hash = el.dataset.routeButton; }));
  $$('[data-filter-route]').forEach(el => el.addEventListener('click', () => { location.hash = `explore/${el.dataset.filterRoute}`; }));
  $$('.filter-row [data-filter]').forEach(el => el.addEventListener('click', () => filterHome(el.dataset.filter, el)));
  bindFilterRows();
  $$('[data-gallery-open]').forEach(el => el.addEventListener('click', () => openGallery(el.dataset.galleryOpen, Number(el.dataset.galleryIndex))));
  $$('[data-gallery-all]').forEach(el => el.addEventListener('click', () => { location.hash = `gallery/${el.dataset.galleryAll}`; }));
  $$('[data-music-open]').forEach(el => el.addEventListener('click', () => { location.hash = `music-style/${el.dataset.musicOpen}`; }));
  $$('[data-music-category]').forEach(el => el.addEventListener('click', () => { location.hash = `music/${el.dataset.musicCategory}`; }));
  bindReferenceFilters();
  bindGalleryBrowser();
  bindMusicTrackBrowser();
  bindTimeline();
  bindHomeIndex();
  observeReveals();
  window.scrollTo({ top: 0, behavior: 'instant' });
  bindToneTransitions();
}

function bindFilterRows() {
  $$('.filter-row').forEach(row => {
    let pointerId = null;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;
    let suppressClick = false;

    const finishDrag = () => {
      if (pointerId === null) return;
      if (row.hasPointerCapture(pointerId)) row.releasePointerCapture(pointerId);
      pointerId = null;
      row.classList.remove('is-dragging');
      if (!moved) return;
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
    };

    row.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScrollLeft = row.scrollLeft;
      moved = false;
      row.setPointerCapture(pointerId);
    });
    row.addEventListener('pointermove', event => {
      if (event.pointerId !== pointerId) return;
      const distance = event.clientX - startX;
      if (!moved && Math.abs(distance) < 5) return;
      moved = true;
      row.classList.add('is-dragging');
      row.scrollLeft = startScrollLeft - distance;
    });
    row.addEventListener('pointerup', finishDrag);
    row.addEventListener('pointercancel', finishDrag);
    row.addEventListener('click', event => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
    }, true);
  });
}

function bindHomeIndex(bindActions = false) {
  const stage = $('#aestheticGrid');
  const preview = $('#collectionPreview');
  if (!stage || !preview) return;
  const index = $('.collection-index', stage);
  const rows = $$('.collection-index__entry', stage);
  const previewMedia = $('[data-index-preview-open]', preview);
  const previewImage = $('img', previewMedia);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let imageRequest = 0;
  let scrollFrame = 0;
  let lastScrollTop = index?.scrollTop || 0;
  let scrollDirection = 1;

  const animatePreviewCopy = () => {
    if (reduceMotion) return;
    $$('.collection-preview__copy > *', preview).forEach((element, position) => {
      element.getAnimations().forEach(animation => animation.cancel());
      element.animate(
        [
          { opacity: 0, transform: `translateY(${scrollDirection > 0 ? 14 : -14}px)` },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 520, delay: 90 + position * 42, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }
      );
    });
  };

  const changePreviewImage = (item, image) => {
    if (!previewImage || !image?.src) return;
    const request = ++imageRequest;
    const loader = new Image();
    let applied = false;
    const applyImage = () => {
      if (applied || request !== imageRequest) return;
      applied = true;
      const previousSource = previewImage.currentSrc || previewImage.src;
      if (previousSource) {
        previewMedia.style.backgroundImage = `url(${JSON.stringify(previousSource)})`;
        previewMedia.style.backgroundPosition = 'center';
        previewMedia.style.backgroundSize = 'cover';
      }
      previewImage.src = mediaUrl(image.src);
      previewImage.alt = item.name;
      if (reduceMotion) {
        previewMedia.style.backgroundImage = '';
        return;
      }
      previewImage.getAnimations().forEach(animation => animation.cancel());
      const fromClip = scrollDirection > 0 ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)';
      const fromY = scrollDirection > 0 ? '22px' : '-22px';
      const transition = previewImage.animate(
        [
          { opacity: .28, transform: `scale(1.065) translateY(${fromY})`, clipPath: fromClip, filter: 'blur(9px) saturate(.58) contrast(.92)' },
          { opacity: 1, transform: 'scale(1) translateY(0)', clipPath: 'inset(0 0 0 0)', filter: 'blur(0) saturate(.86) contrast(1.02)' }
        ],
        { duration: 820, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }
      );
      transition.finished.then(() => {
        if (request === imageRequest) previewMedia.style.backgroundImage = '';
      }).catch(() => {});
    };
    loader.onload = applyImage;
    loader.src = mediaUrl(image.src);
    if (loader.complete) applyImage();
  };

  const select = (row) => {
    if (!row || row.classList.contains('is-active')) return;
    const item = aestheticById(row.dataset.indexPreview);
    if (!item) return;
    const image = selectedImage(item);
    const category = categoryById(item.category);
    rows.forEach(entry => entry.classList.toggle('is-active', entry === row));
    preview.style.setProperty('--index-accent', item.colors[0]);
    preview.style.setProperty('--index-dark', item.colors[1]);
    previewMedia.dataset.open = item.id;
    previewMedia.setAttribute('aria-label', `打开${item.name}详情`);
    $('[data-index-preview-count]', preview).textContent = `${String(rows.indexOf(row) + 1).padStart(3, '0')} / ${String(rows.length).padStart(3, '0')}`;
    $('[data-index-preview-category]', preview).textContent = `${category.name} · ${item.era}`;
    $('[data-index-preview-name]', preview).textContent = item.name;
    $('[data-index-preview-en]', preview).textContent = item.en;
    $('[data-index-preview-desc]', preview).textContent = item.desc;
    changePreviewImage(item, image);
    animatePreviewCopy();
  };

  const updateFromScroll = (selectNearest = true) => {
    scrollFrame = 0;
    if (!index) return;
    const currentScrollTop = index.scrollTop;
    if (Math.abs(currentScrollTop - lastScrollTop) > 1) scrollDirection = currentScrollTop > lastScrollTop ? 1 : -1;
    lastScrollTop = currentScrollTop;
    const scrollRange = index.scrollHeight - index.clientHeight;
    index.style.setProperty('--index-scroll-progress', scrollRange > 0 ? `${currentScrollTop / scrollRange}` : '0');
    const bounds = index.getBoundingClientRect();
    const focusLine = bounds.top + Math.min(bounds.height * .46, 390);
    const nearest = rows.reduce((winner, row) => {
      const rect = row.getBoundingClientRect();
      if (rect.bottom < bounds.top || rect.top > bounds.bottom) return winner;
      const distance = Math.abs(rect.top + rect.height / 2 - focusLine);
      return !winner || distance < winner.distance ? { row, distance } : winner;
    }, null);
    if (selectNearest && nearest) select(nearest.row);
  };

  rows.forEach(row => {
    row.addEventListener('pointerenter', () => select(row));
    row.addEventListener('focusin', () => select(row));
  });
  if (index) {
    if (reduceMotion) {
      rows.forEach(row => row.classList.add('is-scroll-visible'));
    } else {
      const rowObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-scroll-visible');
          rowObserver.unobserve(entry.target);
        });
      }, { root: index, threshold: .12, rootMargin: '0px 0px -4% 0px' });
      rows.forEach(row => rowObserver.observe(row));
    }
    index.addEventListener('scroll', () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateFromScroll);
    }, { passive: true });
    updateFromScroll(false);
  }
  if (bindActions) {
    $$('[data-open]', stage).forEach(element => element.addEventListener('click', event => {
      event.stopPropagation();
      location.hash = `style/${element.dataset.open}`;
    }));
    $$('[data-save]', stage).forEach(element => element.addEventListener('click', event => {
      event.stopPropagation();
      toggleSave(element.dataset.save);
    }));
  }
}

function bindToneTransitions() {
  if (toneTransitionScrollHandler) {
    window.removeEventListener('scroll', toneTransitionScrollHandler);
    window.removeEventListener('resize', toneTransitionScrollHandler);
  }
  if (toneTransitionFrame) cancelAnimationFrame(toneTransitionFrame);

  const sections = $$('.tone-transition');
  if (!sections.length) {
    toneTransitionScrollHandler = null;
    toneTransitionFrame = null;
    return;
  }

  const tones = {
    dark: { background: rgbFromHex('#121210'), foreground: rgbFromHex('#f1f0ea'), muted: rgbFromHex('#aaa9a2'), line: rgbFromHex('#44443f') },
    light: { background: rgbFromHex('#f1f0ea'), foreground: rgbFromHex('#121210'), muted: rgbFromHex('#77766f'), line: rgbFromHex('#c7c6bf') },
    story: { background: rgbFromHex('#071e22'), foreground: rgbFromHex('#f4f5f0'), muted: rgbFromHex('#9bb6b4'), line: rgbFromHex('#365056') },
    source: { background: rgbFromHex('#deddd5'), foreground: rgbFromHex('#121210'), muted: rgbFromHex('#6f6e67'), line: rgbFromHex('#b6b5ad') }
  };
  const clamp = value => Math.max(0, Math.min(1, value));
  const smoothstep = value => value * value * (3 - 2 * value);
  const mixChannels = (from, to, progress) => from.map((channel, index) => Math.round(channel + (to[index] - channel) * progress));
  const rgb = channels => `rgb(${channels.join(' ')})`;
  const luminance = channels => channels
    .map(channel => {
      const normalized = channel / 255;
      return normalized <= .04045 ? normalized / 12.92 : ((normalized + .055) / 1.055) ** 2.4;
    })
    .reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
  const contrast = (left, right) => {
    const leftLuminance = luminance(left);
    const rightLuminance = luminance(right);
    return (Math.max(leftLuminance, rightLuminance) + .05) / (Math.min(leftLuminance, rightLuminance) + .05);
  };

  const update = () => {
    toneTransitionFrame = null;
    const viewportHeight = window.innerHeight || 1;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const rawProgress = clamp((viewportHeight * .94 - rect.top) / (viewportHeight * .7));
      const progress = smoothstep(rawProgress);
      const from = tones[section.dataset.toneFrom] || tones.light;
      const to = tones[section.dataset.toneTo] || tones.dark;
      const background = mixChannels(from.background, to.background, progress);
      const readableTone = progress < .5 ? from : to;
      const readableForeground = contrast(background, from.foreground) >= contrast(background, to.foreground) ? from.foreground : to.foreground;
      const foreground = progress > .02 && progress < .98 ? readableForeground : readableTone.foreground;
      const muted = progress > .02 && progress < .98 ? readableForeground : readableTone.muted;
      section.style.backgroundColor = rgb(background);
      section.style.color = rgb(foreground);
      section.style.setProperty('--tone-muted-current', rgb(muted));
      section.style.setProperty('--tone-line-current', rgb(mixChannels(from.line, to.line, progress)));
      section.style.setProperty('--tone-progress', progress.toFixed(4));
    });
  };
  toneTransitionScrollHandler = () => {
    if (!toneTransitionFrame) toneTransitionFrame = requestAnimationFrame(update);
  };
  window.addEventListener('scroll', toneTransitionScrollHandler, { passive: true });
  window.addEventListener('resize', toneTransitionScrollHandler, { passive: true });
  update();
}

function bindMusicTrackBrowser() {
  const input = $('#musicTrackSearch');
  const toggle = $('#musicTrackToggle');
  const count = $('#musicTrackCount');
  const rows = $$('.music-track');
  if (!input || !toggle || !count || !rows.length) return;
  let expanded = false;
  const apply = () => {
    const query = input.value.trim().toLowerCase();
    let matches = 0;
    let visible = 0;
    rows.forEach((row, index) => {
      const match = !query || row.textContent.toLowerCase().includes(query);
      if (match) matches += 1;
      const show = match && (query || expanded || index < 20);
      row.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = query ? `${matches} 条结果` : `${visible} / ${rows.length}`;
    toggle.hidden = Boolean(query);
    toggle.innerHTML = `${expanded ? '收起曲目' : `查看全部 ${rows.length} 首`} ${arrow()}`;
  };
  input.addEventListener('input', apply);
  toggle.addEventListener('click', () => { expanded = !expanded; apply(); });
  apply();
}

function bindLazyBackgrounds() {
  const tiles = $$('[data-lazy-background]');
  const load = tile => {
    const source = tile.dataset.lazyBackground;
    if (!source) return;
    tile.style.backgroundImage = `linear-gradient(rgba(8,10,10,.06),rgba(8,10,10,.14)),url("${source.replaceAll('"', '%22')}")`;
    tile.style.backgroundSize = 'cover';
    tile.style.backgroundPosition = 'center';
    delete tile.dataset.lazyBackground;
  };
  if (lazyBackgroundScrollHandler) {
    window.removeEventListener('scroll', lazyBackgroundScrollHandler);
    window.removeEventListener('resize', lazyBackgroundScrollHandler);
  }
  lazyBackgroundScrollHandler = () => {
    tiles.forEach(tile => {
      if (!tile.hasAttribute('data-lazy-background')) return;
      const rect = tile.getBoundingClientRect();
      if (rect.bottom >= -700 && rect.top <= window.innerHeight + 700) load(tile);
    });
  };
  window.addEventListener('scroll', lazyBackgroundScrollHandler, { passive: true });
  window.addEventListener('resize', lazyBackgroundScrollHandler, { passive: true });
  lazyBackgroundScrollHandler();
}

function bindTimeline() {
  const range = $('#timelineRange');
  const input = $('#timelineInput');
  if (!range || !input) return;
  const output = $('#timelineYear');
  const aestheticRows = $$('#timelineAesthetics .timeline-result');
  const musicRows = $$('#timelineMusic .timeline-result');
  const showExactYear = value => {
    const year = Math.max(0, Math.min(2026, Number(value) || new Date().getFullYear()));
    input.value = year;
    range.value = Math.max(Number(range.min), year);
    output.textContent = year;
    $$('[data-era-preset]').forEach(button => button.classList.remove('is-active'));
    updateTimelineRows(aestheticRows, row => Number(row.dataset.start) <= year && Number(row.dataset.end) >= year, '#timelineAestheticCount');
    updateTimelineRows(musicRows, row => Number(row.dataset.start) <= year && Number(row.dataset.end) >= year, '#timelineMusicCount');
  };
  range.addEventListener('input', () => showExactYear(range.value));
  input.addEventListener('input', () => showExactYear(input.value));
  $$('[data-era-preset]').forEach(button => button.addEventListener('click', () => {
    const era = eraPresets.find(item => item.id === button.dataset.eraPreset);
    if (!era) return;
    $$('[data-era-preset]').forEach(item => item.classList.toggle('is-active', item === button));
    output.textContent = era.label;
    updateTimelineRows(aestheticRows, row => Number(row.dataset.start) <= era.end && Number(row.dataset.end) >= era.start, '#timelineAestheticCount');
    updateTimelineRows(musicRows, row => Number(row.dataset.start) <= era.end && Number(row.dataset.end) >= era.start, '#timelineMusicCount');
  }));
  showExactYear(range.value);
}

function updateTimelineRows(rows, predicate, countSelector) {
  const parent = rows[0]?.parentElement;
  const visibleRows = rows
    .filter(predicate)
    .sort((left, right) => Number(right.dataset.start) - Number(left.dataset.start));
  rows.forEach(row => { row.hidden = true; });
  visibleRows.forEach(row => {
    row.hidden = false;
    parent?.append(row);
  });
  $(countSelector).textContent = visibleRows.length;
}

function bindReferenceFilters() {
  const cards = $$('.reference-card');
  if (!cards.length) return;
  $$('[data-reference-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.referenceFilter;
    $$('[data-reference-filter]').forEach(item => item.classList.toggle('is-active', item === button));
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.referenceType !== filter; });
  }));
}

async function render() {
  const version = ++renderVersion;
  clearInterval(dailyTimer);
  clearInterval(heroTimer);
  const route = location.hash.replace(/^#/, '') || 'home';
  const [page, param] = route.split('/');
  if (page === 'style' || page === 'gallery') await loadCompleteGallery();
  if (page === 'music-style') await loadCompleteMusicTracks();
  if (version !== renderVersion) return;
  document.body.classList.toggle('has-light-header', ['explore', 'timeline', 'atlas', 'journal', 'about', 'contribute', 'method'].includes(page));
  document.body.classList.remove('is-detail');
  document.body.classList.toggle('is-aesthetic-detail', page === 'style' || page === 'gallery');
  document.body.classList.toggle('is-music-detail', page === 'music-style');
  document.body.classList.toggle('is-music', page === 'music' || page === 'music-style');
  document.body.classList.toggle('is-sealed', page === 'sealed');
  if (page === 'style' && aestheticById(param)) app.innerHTML = detailView(aestheticById(param));
  else if (page === 'gallery' && aestheticById(param)) app.innerHTML = galleryView(aestheticById(param));
  else if (page === 'explore') app.innerHTML = exploreView(param || 'all');
  else if (page === 'timeline') app.innerHTML = timelineView();
  else if (page === 'music-style' && musicStyleById(param)) app.innerHTML = musicDetailView(musicStyleById(param));
  else if (page === 'music') app.innerHTML = musicAtlasView(param || 'all');
  else if (page === 'sealed') app.innerHTML = sealedArchiveView();
  else if (page === 'atlas') app.innerHTML = atlasView();
  else if (page === 'journal') app.innerHTML = journalView();
  else if (['about', 'contribute', 'method'].includes(page)) app.innerHTML = simpleView(page);
  else app.innerHTML = homeView();
  const footer = $('.site-footer');
  const isHomePage = Boolean($('[data-hero]'));
  footer.classList.toggle('tone-transition', isHomePage);
  if (isHomePage) {
    footer.dataset.toneFrom = 'source';
    footer.dataset.toneTo = 'dark';
  } else {
    delete footer.dataset.toneFrom;
    delete footer.dataset.toneTo;
    footer.style.removeProperty('background-color');
    footer.style.removeProperty('color');
    footer.style.removeProperty('--tone-muted-current');
    footer.style.removeProperty('--tone-line-current');
    footer.style.removeProperty('--tone-progress');
  }
  $$('.main-nav a').forEach(a => a.classList.toggle('is-active', a.dataset.route === page));
  bindCommon();
  if (page === 'home' || !['style', 'gallery', 'explore', 'timeline', 'music', 'music-style', 'sealed', 'atlas', 'journal', 'about', 'contribute', 'method'].includes(page)) {
    startDailyClock();
    bindHeroReel();
  }
}

function bindHeroReel() {
  const hero = $('[data-hero]');
  if (!hero) return;
  const slides = $$('[data-hero-slide]', hero);
  const tabs = $$('[data-hero-tab]', hero);
  let active = 0;
  const show = index => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === active));
    tabs.forEach((tab, tabIndex) => tab.classList.toggle('is-active', tabIndex === active));
    const slide = slides[active];
    hero.style.setProperty('--daily-c1', slide.dataset.c1);
    hero.style.setProperty('--daily-c2', slide.dataset.c2);
    hero.style.setProperty('--daily-c3', slide.dataset.c3);
  };
  const restart = () => { clearInterval(heroTimer); heroTimer = setInterval(() => show(active + 1), 6500); };
  tabs.forEach((tab, index) => tab.addEventListener('click', () => { show(index); restart(); }));
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - .5) * 10}px`);
    hero.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
  });
  hero.addEventListener('pointerleave', () => { hero.style.setProperty('--mx', '0px'); hero.style.setProperty('--my', '0px'); });
  restart();
}

function bindGalleryBrowser() {
  const input = $('#gallerySearch');
  const grid = $('#galleryAllGrid');
  if (!input || !grid) return;
  let filter = 'all';
  const apply = () => {
    const query = input.value.trim().toLowerCase();
    let visible = 0;
    $$('.gallery-all-item', grid).forEach(item => {
      const filterMatch = filter === 'all' || (filter === 'museum' ? item.dataset.museum === 'true' : item.dataset.license === filter);
      const textMatch = !query || item.textContent.toLowerCase().includes(query);
      item.hidden = !(filterMatch && textMatch);
      if (!item.hidden) visible++;
    });
    $('#galleryVisibleCount').textContent = visible;
  };
  input.addEventListener('input', apply);
  $$('[data-gallery-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.galleryFilter;
    $$('[data-gallery-filter]').forEach(item => item.classList.toggle('is-active', item === button));
    apply();
  }));
}

function filterHome(filter, button) {
  activeFilter = filter;
  $$('.filter-row [data-filter]').forEach(el => el.classList.toggle('is-active', el === button));
  const ordered = dailyState().ordered;
  const items = curatedHomeIndex(filter === 'all' ? ordered : ordered.filter(item => inCategory(item, filter)));
  $('#aestheticGrid').outerHTML = homeIndex(items);
  bindLazyBackgrounds();
  bindHomeIndex(true);
}

function startDailyClock() {
  const initialDay = dailyState().dateKey;
  const update = () => {
    const clock = $('#dailyCountdown');
    if (!clock) return;
    const now = new Date();
    if (dailyState(now).dateKey !== initialDay) return render();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const remaining = Math.max(0, next - now);
    const hours = String(Math.floor(remaining / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
  };
  update();
  dailyTimer = setInterval(update, 1000);
}

function openGallery(styleId, index) {
  const item = aestheticById(styleId);
  const images = galleryFor(item);
  const image = images[index];
  if (!image) return;
  const dialog = $('#galleryLightbox');
  dialog.dataset.styleId = styleId;
  dialog.dataset.index = index;
  $('#galleryLightboxImage').src = mediaUrl(image.src);
  $('#galleryLightboxImage').alt = image.title;
  $('#galleryLightboxTitle').textContent = image.title;
  $('#galleryLightboxMeta').textContent = [image.subject, image.creator, image.date, image.provider].filter(Boolean).join(' · ');
  $('#galleryLightboxLicense').textContent = image.license;
  $('#galleryLightboxSource').href = image.sourceUrl;
  const iiif = $('#galleryLightboxIiif');
  iiif.hidden = !image.iiifInfoUrl;
  iiif.href = image.manifestUrl || image.iiifInfoUrl || '#';
  iiif.textContent = image.manifestUrl ? 'IIIF MANIFEST' : 'IIIF INFO.JSON';
  $('#galleryLightboxCounter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;
  if (!dialog.open) dialog.showModal();
}

function moveGallery(direction) {
  const dialog = $('#galleryLightbox');
  const styleId = dialog.dataset.styleId;
  const images = galleryFor(aestheticById(styleId));
  const next = (Number(dialog.dataset.index) + direction + images.length) % images.length;
  openGallery(styleId, next);
}

function toggleSave(id) {
  const item = aestheticById(id);
  if (saved.has(id)) { saved.delete(id); showToast(`已从收藏移除 · ${item.name}`); }
  else { saved.add(id); showToast(`已收藏 · ${item.name}`); }
  localStorage.setItem('aestheticism:saved', JSON.stringify([...saved]));
  updateSavedCount();
  render();
}

function updateSavedCount() { savedCount.textContent = saved.size; }

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function openSearch() {
  searchPanel.showModal();
  document.body.classList.add('search-open');
  suggestions.innerHTML = ['酸性设计', '蒸汽波', '苏联构成主义', '古典油画', '池核'].map(term => `<button data-suggest="${term}">${term}</button>`).join('');
  suggestions.querySelectorAll('button').forEach(el => el.addEventListener('click', () => { searchInput.value = el.dataset.suggest; doSearch(); }));
  searchResults.innerHTML = `${aesthetics.slice(0, 4).map((a, i) => searchRow(a, i)).join('')}${musicStyles.slice(0, 2).map((style, index) => musicSearchRow(style, index + 4)).join('')}`;
  bindLazyBackgrounds();
  bindSearchResults();
  setTimeout(() => searchInput.focus(), 80);
}

function closeSearch() { searchPanel.close(); document.body.classList.remove('search-open'); }

function searchRow(item, index) {
  return `<button class="search-result" data-search-open="${item.id}"><span>${String(index + 1).padStart(2, '0')}</span><i class="atlas-tile" ${lazyImageAttributes(item)}></i><div><b>AESTHETIC ATLAS</b><strong>${item.name}</strong><small>${item.en} · ${item.era}</small></div>${arrow()}</button>`;
}

function musicSearchRow(style, index) {
  return `<button class="search-result search-result--music" data-search-music="${style.id}"><span>${String(index + 1).padStart(2, '0')}</span><i style="--music-hue:${(index * 31 + style.startYear) % 360}"></i><div><b>AUDITORY AESTHETICS</b><strong>${style.name}</strong><small>${style.en} · ${style.startYear}—</small></div>${arrow()}</button>`;
}

function bindSearchResults() {
  $$('[data-search-open]', searchResults).forEach(el => el.addEventListener('click', () => { closeSearch(); location.hash = `style/${el.dataset.searchOpen}`; }));
  $$('[data-search-music]', searchResults).forEach(el => el.addEventListener('click', () => { closeSearch(); location.hash = `music-style/${el.dataset.searchMusic}`; }));
}

function doSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const yearMatch = query.match(/(?:18|19|20)\d{2}/);
  const year = yearMatch ? Number(yearMatch[0]) : null;
  const textQuery = query.replace(/(?:18|19|20)\d{2}(?:年代|s|年)?/g, '').trim();
  const aestheticResult = aesthetics.filter(item => {
    const categoryTerms = item.categories.flatMap(categoryId => {
      const category = categoryById(categoryId);
      return [category?.name, category?.en, category?.note];
    });
    const text = [item.name, item.en, item.era, item.origin, ...categoryTerms, ...item.keywords].filter(Boolean).join(' ').toLowerCase();
    return (!year || activeInYear(item, year)) && (!textQuery || text.includes(textQuery));
  });
  const musicResult = musicStyles.filter(style => {
    const category = musicCategoryById(style.category);
    const text = [style.name, style.en, style.origin, category?.name, category?.en, ...style.artists, ...style.works, ...style.visualElements].join(' ').toLowerCase();
    return (!year || musicActiveInYear(style, year)) && (!textQuery || text.includes(textQuery));
  });
  const rows = [...aestheticResult.map(item => ({ domain: 'aesthetic', item })), ...musicResult.map(item => ({ domain: 'music', item }))];
  searchResults.innerHTML = rows.length ? rows.slice(0, 60).map((row, index) => row.domain === 'aesthetic' ? searchRow(row.item, index) : musicSearchRow(row.item, index)).join('') : `<p class="empty-result">没有找到“${searchInput.value}”<br /><span>试试“1980年代未来主义”“底特律”或“梦境”</span></p>`;
  bindLazyBackgrounds();
  bindSearchResults();
}

function observeReveals() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  $$('.reveal').forEach(el => observer.observe(el));
}

function startSiteEntrance() {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('is-ready')));
    setTimeout(() => document.body.classList.remove('site-entering'), 1200);
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return finish();
  const media = document.querySelector('.hero-slide.is-active .hero-slide__media');
  const match = media && getComputedStyle(media).backgroundImage.match(/url\(["']?(.+?)["']?\)/);
  if (!match) return finish();
  const image = new Image();
  image.onload = finish;
  image.onerror = finish;
  image.src = match[1];
  setTimeout(finish, 240);
}

document.querySelector('#searchButton').addEventListener('click', openSearch);
document.querySelector('#closeSearch').addEventListener('click', closeSearch);
searchInput.addEventListener('input', doSearch);
searchPanel.addEventListener('click', (e) => { if (e.target === searchPanel) closeSearch(); });
document.querySelector('#savedButton').addEventListener('click', () => {
  if (!saved.size) return showToast('还没有收藏，去遇见一种喜欢的风格吧');
  openSearch(); searchInput.value = ''; searchResults.innerHTML = aesthetics.filter(a => saved.has(a.id)).map(searchRow).join(''); doSearch.bind(null);
  bindLazyBackgrounds();
  $$('[data-search-open]', searchResults).forEach(el => el.addEventListener('click', () => { closeSearch(); location.hash = `style/${el.dataset.searchOpen}`; }));
});
document.querySelector('#closeGalleryLightbox').addEventListener('click', () => $('#galleryLightbox').close());
document.querySelector('#galleryPrevious').addEventListener('click', () => moveGallery(-1));
document.querySelector('#galleryNext').addEventListener('click', () => moveGallery(1));
document.querySelector('#galleryLightbox').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
document.querySelector('#menuButton').addEventListener('click', () => document.body.classList.toggle('menu-open'));
$$('.main-nav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape' && searchPanel.open) closeSearch();
  if ($('#galleryLightbox').open && e.key === 'ArrowLeft') moveGallery(-1);
  if ($('#galleryLightbox').open && e.key === 'ArrowRight') moveGallery(1);
});
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 28), { passive: true });
window.addEventListener('hashchange', render);
updateSavedCount();
render().then(startSiteEntrance);
