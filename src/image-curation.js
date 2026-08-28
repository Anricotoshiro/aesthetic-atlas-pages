const profiles = {
  'techwear': {
    include: /techwear|technical clothing|modular|utility vest|chest rig|cargo pant|tactical fashion|urban ninja/i,
    exclude: /fursuit|fursona|furry|mascot|street art|steampunk|pig|menstruation|caricature|graffiti/i
  },
  'tactical': {
    include: /naval special warfare|special operations|special forces|green beret|cqc|breacher|night-vision/i,
    exclude: /knife|camera|dakota|air show|military symbol|pikeman|watch|vehicle|aircraft alone/i
  },
  'control-room': {
    include: /control room|mission control|operations room|command cent(?:er|re)|control panel|console|cockpit|instrument panel|switchboard/i,
    exclude: /speaker|tracking room|recording studio|magazine|workshop|gun position|scale model|model cockpit|painting in progress/i
  },
  'old-money': {
    include: /estate|manor|country club|equestrian|tailor|heritage|villa|yacht|classic car|tennis club|polo|ivy league/i,
    exclude: /coin|currency|banknote|money box|money changer|automat|cash register/i
  },
  'yami-kawaii': {
    include: /yami kawaii|menhera|medical kawaii|pill|capsule|bandage|syringe|first aid|hospital motif|pink brain/i,
    exclude: /fursuit|fursona|embolization|degenerative|pathology|colon|mummy|horse|bee|daisy|flower study|book of the dead/i
  },
  'jirai-kei': {
    include: /jirai|black and pink|pink and black|lace dress|platform shoe|platform boot|ribbon fashion|japanese street fashion/i,
    exclude: /mausoleum|pigeon|river|stamp|diaper cake|orchestra|concert singer/i
  },
  'oceanpunk': {
    include: /underwater|submarine|diving|diver|scuba|shipwreck|coral|reef|deep sea|sea habitat|u-boat|aquatic city|ocean data/i,
    exclude: /yoga|treehouse|kenya[ _-]?live|conference portrait|noaa ship|reserve fleet|surface elevation|group portrait|robotics challenge|u-boat|ocean data/i
  },
  'soviet-aesthetic': {
    include: /soviet|ussr|red army|cosmonaut|yakovlev|trans-siberian|moscow|palace of culture|socialist realism|constructiv/i,
    exclude: /e-prix|formula e|race car|latvia freedom monument/i
  },
  'glassmorphism': {
    include: /glassmorphism|glasskit|frosted glass|translucent ui|backdrop filter|aero ui/i,
    exclude: /nurse|engine setting|glass case|camera case/i
  },
  'old-web': {
    include: /website|home ?page|web ?page|browser|netscape|geocities|html|world wide web|web design/i,
    exclude: /ibm ps\/2|nextstation|computer chassis|keyboard only|hardware only/i
  },
  'de-stijl': {
    include: /de stijl|rietveld|mondrian|van doesburg|schr[oö]der|red and blue chair|neoplastic/i,
    exclude: /formal garden|rembrandt|bellona|baroque/i
  },
  'biopunk': {
    include: /biopunk|bioart|bio art|synthetic biology|genetic|biotechnology|dumitriu|pneumothorax machine|living material/i,
    exclude: /beach|landscape|tsien/i
  },
  'cloudcore': {
    include: /cloud|sky|cumulus|cirrus|stratus|sunset|pastel atmosphere/i,
    exclude: /church|barn|warehouse|portrait|street/i
  },
  'coquette': {
    include: /coquette fashion|pink dress|bow dress|ribbon fashion|lace dress|pearl necklace|ballet flat|mary jane|romantic floral|corset/i,
    exclude: /building|fa[cç]ade|architecture|yacht|rhododendron|lace border|lace design|lace roll|lace vendor|lace-maker|well, egbert|wedding doll/i
  },
  'whimsigoth': {
    include: /whimsigoth|ornate mirror|candle room|velvet interior|occult decor|new age decor|witchy interior|jewel tone interior|planisph[æa]ri/i,
    exclude: /painter studio|royal visit|train station ceiling|star chart|celestial map|celestial quads|nude under moonlight|3d moon|solstice parade/i
  },
  'cubism': {
    include: /cubis|braque|picasso|juan gris|waliszewski|metzinger|gleizes|l[eé]ger/i,
    exclude: /c[eé]zanne|impressionist landscape/i
  },
  'fauvism': {
    include: /fauvis|matisse|derain|vlaminck|marquet|dufy|friesz|van dongen|manguin/i,
    exclude: /evenepoel|academic studio photograph|life-class|assignment/i
  },
  'pop-art': {
    include: /pop art|warhol|lichtenstein|hamilton|oldenburg|wesselmann|rosenquist|comic panel/i,
    exclude: /angelina probst|gallery exterior|unrelated portrait/i
  }
};

function identity(image) {
  const source = image?.src || image?.sourceUrl || '';
  if (!source) return '';
  try {
    const url = new URL(source, 'https://aesthetic-atlas.local/');
    [...url.searchParams.keys()].forEach(key => {
      if (/^utm_/i.test(key)) url.searchParams.delete(key);
    });
    url.hash = '';
    return url.href.toLowerCase().replace(/\/$/, '');
  } catch {
    return source.toLowerCase().replace(/#.*$/, '').replace(/\/+$/, '');
  }
}

function searchable(image) {
  return [image?.title, image?.creator, image?.subject, image?.provider].filter(Boolean).join(' ');
}

export function curateGallery(styleId, images = []) {
  const profile = profiles[styleId];
  const seen = new Set();
  const unique = images.filter(image => {
    const key = identity(image);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (!profile) return unique;
  return unique.filter(image => {
    const text = searchable(image);
    if (profile.exclude?.test(text)) return false;
    return !profile.include || profile.include.test(text);
  });
}

export function imageIdentity(image) {
  return identity(image);
}

export const imageCurationProfiles = profiles;
