export const categories = [
  { id: 'liminal', name: '精神地景', en: 'Liminal Realms', count: 11, note: '熟悉与陌生之间' },
  { id: 'digital', name: '数码文化', en: 'Digital Cultures', count: 10, note: '被屏幕保存的年代' },
  { id: 'future', name: '未来想象', en: 'Futures Imagined', count: 10, note: '过去与未来彼此凝视' },
  { id: 'nature', name: '自然生活', en: 'Natural Worlds', count: 4, note: '土地、手工与神话' },
  { id: 'movement', name: '设计运动', en: 'Design Movements', count: 12, note: '形式如何成为时代' },
  { id: 'fine-art', name: '绘画与艺术史', en: 'Fine Art Histories', count: 15, note: '颜料、画布与观看传统' },
  { id: 'regional', name: '地域视觉', en: 'Regional Visions', count: 2, note: '文明与装饰的独特语法' },
  { id: 'interface', name: '界面语言', en: 'Interface Languages', count: 3, note: '数字表面的触感' },
  { id: 'graphic', name: '实验图形', en: 'Experimental Graphics', count: 3, note: '字体、图像与失序的能量' },
  { id: 'subculture', name: '时尚与亚文化', en: 'Fashion & Subcultures', count: 10, note: '身体如何成为视觉媒介' }
];


export const aesthetics = [
  {
    id: 'poolcore', name: '池核', en: 'Poolcore', category: 'liminal', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '水面之下，时间暂停。', desc: '以空旷泳池、蓝绿瓷砖、潮湿回声和无人空间构成的阈限美学。它在舒缓与不安之间保持微妙张力。',
    keywords: ['泳池', '瓷砖', '回声', '阈限空间'], colors: ['#72d8df', '#0b4e62', '#e6f4ed'], theme: 'pool', year: '约 2010s'
  },
  {
    id: 'weirdcore', name: '怪核', en: 'Weirdcore', category: 'liminal', era: '2010s—', origin: '匿名网络社区', region: 'GLOBAL',
    tagline: '熟悉的世界，出现了一处错误。', desc: '低清图像、早期网页痕迹、突兀物体与不合逻辑的文字共同制造似曾相识却无法解释的不安。',
    keywords: ['低清', '错位', '早期互联网', '超现实'], colors: ['#91a9ff', '#251a57', '#f1e5ff'], theme: 'weird', year: '约 2010s 后期'
  },
  {
    id: 'dreamcore', name: '梦核', en: 'Dreamcore', category: 'liminal', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '像记得，又像从未发生。', desc: '将童年场景、不可能的地形、柔雾与梦境逻辑叠合，指向一种没有具体来源的怀旧。',
    keywords: ['梦境', '童年', '柔雾', '怀旧'], colors: ['#f1b5c9', '#8769a6', '#fff0d9'], theme: 'dream', year: '约 2010s 后期'
  },
  {
    id: 'liminal-space', name: '阈限空间', en: 'Liminal Space', category: 'liminal', era: '2019—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '本应有人，却空无一人。', desc: '聚焦走廊、候车室、商场与学校等过渡场所。当日常空间失去人群，它便暴露出令人不安的结构。',
    keywords: ['空置', '走廊', '荧光灯', '过渡'], colors: ['#cbbb92', '#4b4536', '#f0e8d2'], theme: 'liminal', year: '2019—'
  },
  {
    id: 'vaporwave', name: '蒸汽波', en: 'Vaporwave', category: 'digital', era: '2010s', origin: '北美互联网', region: 'N. AMERICA',
    tagline: '消费时代的粉色幽灵。', desc: '以九十年代网页、古典雕塑、棕榈、网格地平线与日文商业图像重组对消费文化的迷恋和疏离。',
    keywords: ['霓虹', '雕塑', '网格', '故障'], colors: ['#ff4fbe', '#4a35ff', '#5df7ff'], theme: 'vapor', year: '2010s 初期'
  },
  {
    id: 'frutiger-aero', name: '清新科技', en: 'Frutiger Aero', category: 'digital', era: '2005—2013', origin: '全球企业设计', region: 'GLOBAL',
    tagline: '未来曾经如此晴朗。', desc: '蓝天、绿草、水滴、玻璃和高光构成千禧年后的技术乐观主义，是 Web 2.0 时代最鲜明的企业视觉。',
    keywords: ['蓝天', '绿草', '玻璃', '技术乐观'], colors: ['#2db4e8', '#4fc96d', '#effff6'], theme: 'aero', year: '2005—2013'
  },
  {
    id: 'y2k', name: '千禧未来', en: 'Y2K Futurism', category: 'digital', era: '1997—2004', origin: '全球流行文化', region: 'GLOBAL',
    tagline: '新千年，被镀上一层铬。', desc: '透明塑料、银色金属、椭圆轮廓与数码设备共同投射世纪之交对网络化未来的兴奋。',
    keywords: ['铬', '透明塑料', '椭圆', '新千年'], colors: ['#dce6ed', '#91a9b8', '#f6fbff'], theme: 'y2k', year: '1997—2004'
  },
  {
    id: 'analog-horror', name: '模拟恐怖', en: 'Analog Horror', category: 'digital', era: '2010s—', origin: '英语互联网', region: 'GLOBAL',
    tagline: '信号中断前，它看见了你。', desc: '借用公共电视、录像带、紧急广播和失真信号的视觉语法，让过时媒介成为未知威胁的载体。',
    keywords: ['模拟录像', '扫描线', '广播', '噪点'], colors: ['#e44f3d', '#121312', '#7cff65'], theme: 'analog', year: '2010s—'
  },
  {
    id: 'retrofuturism', name: '复古未来主义', en: 'Retrofuturism', category: 'future', era: '1920s—1980s', origin: '欧美现代主义', region: 'EUROPE / US',
    tagline: '昨日所想象的明日。', desc: '回望过去时代对未来的想象：流线飞船、原子时代家具、太空舱与乐观的机械乌托邦。',
    keywords: ['太空时代', '流线型', '原子', '乌托邦'], colors: ['#f1a04f', '#3e5a5d', '#e9e1ca'], theme: 'retro', year: '跨 20 世纪'
  },
  {
    id: 'cyberpunk', name: '赛博朋克', en: 'Cyberpunk', category: 'future', era: '1980s—', origin: '美日科幻文化', region: 'US / JAPAN',
    tagline: '高科技，低生活。', desc: '巨型都市、霓虹广告、义体、监控与阶层裂缝构成的反乌托邦视觉，描绘技术繁荣下的个体困境。',
    keywords: ['霓虹都市', '义体', '雨夜', '反乌托邦'], colors: ['#00d8ff', '#6a19ff', '#f23b78'], theme: 'cyber', year: '1980s—'
  },
  {
    id: 'cottagecore', name: '田园核', en: 'Cottagecore', category: 'nature', era: '2010s—', origin: '欧美互联网', region: 'EUROPE / US',
    tagline: '把日子还给四季。', desc: '理想化乡村生活、手工劳动、烘焙、花园和旧式居所，回应高速城市生活的疲惫。',
    keywords: ['乡村', '花园', '手作', '慢生活'], colors: ['#8ea070', '#6e4f32', '#f2e8d0'], theme: 'cottage', year: '2010s—'
  },
  {
    id: 'dark-academia', name: '暗黑学院', en: 'Dark Academia', category: 'nature', era: '2010s—', origin: '欧美互联网', region: 'EUROPE / US',
    tagline: '知识在烛光里留下阴影。', desc: '古典教育、哥特建筑、旧书、深色制服与秋日阴雨共同构成浪漫而克制的学术想象。',
    keywords: ['古典学院', '旧书', '烛光', '哥特'], colors: ['#b68b52', '#1d1a15', '#d4c3a0'], theme: 'academia', year: '2010s—'
  },
  {
    id: 'fairycore', name: '仙灵核', en: 'Fairycore', category: 'nature', era: '2010s—', origin: '欧美互联网', region: 'EUROPE / US',
    tagline: '森林仍保留着微小的魔法。', desc: '蕨类、蘑菇、微光、翅膀和民间传说组成柔软的自然幻想，把日常尺度缩小到精灵视角。',
    keywords: ['精灵', '蘑菇', '微光', '森林'], colors: ['#af91d7', '#314d3a', '#e5e0bd'], theme: 'fairy', year: '2010s—'
  },
  {
    id: 'goblincore', name: '哥布林核', en: 'Goblincore', category: 'nature', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '泥土、苔藓与不完美之物。', desc: '赞美被主流审美忽略的自然细节：石头、青苔、蜗牛、枯枝和零碎收藏，粗粝而亲近。',
    keywords: ['苔藓', '石头', '收藏', '粗粝'], colors: ['#66744a', '#3a2d1e', '#c4aa72'], theme: 'goblin', year: '2010s—'
  },
  {
    id: 'wabi-sabi', name: '侘寂', en: 'Wabi-sabi', category: 'movement', era: '传统—当代', origin: '日本', region: 'JAPAN',
    tagline: '不完整，因而真实。', desc: '重视无常、不完美与材料的时间痕迹。粗陶、旧木、阴翳和留白让使用与衰变成为美的一部分。',
    keywords: ['无常', '旧木', '粗陶', '留白'], colors: ['#9c8870', '#4a4035', '#e8dfd0'], theme: 'wabi', year: '传统—当代'
  },
  {
    id: 'zen-ink', name: '水墨禅意', en: 'Ink & Zen', category: 'movement', era: '传统—当代', origin: '中国 / 东亚', region: 'E. ASIA',
    tagline: '意在笔先，境在形外。', desc: '以水墨的浓淡、纸张呼吸与大面积留白组织观看，在有限笔触中容纳山水、时间与精神空间。',
    keywords: ['水墨', '山水', '留白', '气韵'], colors: ['#161a18', '#72756f', '#f0eee8'], theme: 'ink', year: '传统—当代'
  },
  {
    id: 'bauhaus', name: '包豪斯', en: 'Bauhaus', category: 'movement', era: '1919—1933', origin: '德国', region: 'GERMANY',
    tagline: '形式服从新的生活。', desc: '将艺术、工艺与工业生产置于同一体系，用几何、基础色和清晰结构寻找现代设计的通用语言。',
    keywords: ['几何', '基础色', '功能', '现代主义'], colors: ['#e03b2f', '#174aa7', '#efc62d'], theme: 'bauhaus', year: '1919—1933'
  },
  {
    id: 'brutalism', name: '粗野主义', en: 'Brutalism', category: 'movement', era: '1950s—1970s', origin: '欧洲', region: 'EUROPE',
    tagline: '材料无需掩饰自己。', desc: '裸露混凝土、巨型体块、重复结构和直接功能构成强硬视觉。数字粗野主义延续了这种拒绝修饰的态度。',
    keywords: ['混凝土', '体块', '裸露结构', '直接'], colors: ['#b6b3aa', '#242424', '#f1eddf'], theme: 'brutal', year: '1950s—1970s'
  },
  {
    id: 'memphis', name: '孟菲斯', en: 'Memphis', category: 'movement', era: '1981—1988', origin: '意大利', region: 'ITALY',
    tagline: '好品味，也可以被挑衅。', desc: '鲜艳色块、廉价层压板、锯齿与不规则几何反抗现代主义的克制，是八十年代后现代设计的高声宣言。',
    keywords: ['几何', '撞色', '波点', '后现代'], colors: ['#f39bae', '#258f91', '#f3cc4c'], theme: 'memphis', year: '1981—1988'
  },
  {
    id: 'art-deco', name: '装饰艺术', en: 'Art Deco', category: 'movement', era: '1920s—1930s', origin: '法国 / 全球', region: 'FRANCE / GLOBAL',
    tagline: '机器时代，也要极尽华美。', desc: '对称几何、扇形纹样、贵重材质与流线机械感融为一体，是最早真正全球传播的现代设计运动之一。',
    keywords: ['对称', '黄铜', '几何', '奢华'], colors: ['#d1aa58', '#171512', '#efe5ce'], theme: 'deco', year: '1920s—1930s'
  },
  {
    id: 'swiss-style', name: '瑞士国际主义', en: 'Swiss Style', category: 'movement', era: '1950s—', origin: '瑞士', region: 'SWITZERLAND',
    tagline: '秩序，让信息开口。', desc: '严格网格、无衬线字体、不对称排版和摄影构成理性的信息系统，持续影响现代平面与界面设计。',
    keywords: ['网格', '无衬线', '秩序', '信息'], colors: ['#e12d27', '#141414', '#f2f0e9'], theme: 'swiss', year: '1950s—'
  },
  {
    id: 'skeuomorphism', name: '拟物主义', en: 'Skeuomorphism', category: 'interface', era: '2000s—2013', origin: '全球数字产品', region: 'GLOBAL',
    tagline: '屏幕曾经努力成为现实。', desc: '木纹、皮革、金属按钮与真实阴影把物理世界的可供性迁移到界面中，降低数字工具的学习门槛。',
    keywords: ['皮革', '木纹', '金属', '真实阴影'], colors: ['#b6844b', '#34271c', '#e8d7b7'], theme: 'skeuo', year: '2000s—2013'
  },
  {
    id: 'glassmorphism', name: '玻璃拟态', en: 'Glassmorphism', category: 'interface', era: '2010s—', origin: '全球数字产品', region: 'GLOBAL',
    tagline: '界面是一层会呼吸的光。', desc: '通过半透明、背景模糊、明亮边缘与层叠关系塑造轻盈深度，是扁平设计之后对空间感的重新引入。',
    keywords: ['半透明', '模糊', '光晕', '层叠'], colors: ['#c7e5ff', '#8d8cf6', '#f7e9ff'], theme: 'glass', year: '2010s—'
  },
  {
    id: 'neumorphism', name: '新拟态', en: 'Neumorphism', category: 'interface', era: '2019—', origin: '全球数字产品', region: 'GLOBAL',
    tagline: '柔软地，从平面浮起。', desc: '以同色背景、柔和外阴影与内阴影让控件像从表面挤压成形，介于扁平与拟物之间。',
    keywords: ['柔和阴影', '单色', '浮雕', '触感'], colors: ['#d8d2dd', '#817888', '#f6f1f7'], theme: 'neu', year: '2019—'
  },
  {
    id: 'mallsoft', name: '商场软音', en: 'Mallsoft', category: 'liminal', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '消费空间在闭店后继续做梦。', desc: '空旷商场、自动扶梯、室内喷泉与远处回响的背景音乐，将商业空间转化为怀旧而疏离的精神地景。',
    keywords: ['空商场', '电梯', '室内喷泉', '回声'], colors: ['#c6b4c8', '#443746', '#e7e0d5'], theme: 'mallsoft', image: null, year: '2010s—'
  },
  {
    id: 'nostalgiacore', name: '怀旧核', en: 'Nostalgiacore', category: 'liminal', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '记忆把普通日子重新上色。', desc: '旧玩具、家庭录像、童年卧室和泛黄日光构成的情绪美学，关注个人记忆而非某个固定历史年代。',
    keywords: ['家庭录像', '童年', '旧玩具', '暖色'], colors: ['#e6b99c', '#6f4d4a', '#f3e3c7'], theme: 'nostalgia', image: null, year: '2010s—'
  },
  {
    id: 'synthwave', name: '合成波', en: 'Synthwave', category: 'digital', era: '2000s—', origin: '欧美音乐文化', region: 'EUROPE / US',
    tagline: '夜路通向一座从未存在的八十年代。', desc: '霓虹公路、落日、跑车轮廓与模拟合成器共同制造对八十年代电影和电子游戏未来感的再想象。',
    keywords: ['霓虹公路', '落日', '合成器', '速度'], colors: ['#ff4c9a', '#30227b', '#29e5ff'], theme: 'synth', image: null, year: '2000s—'
  },
  {
    id: 'glitchcore', name: '故障核', en: 'Glitchcore', category: 'digital', era: '1990s—', origin: '数字艺术', region: 'GLOBAL',
    tagline: '错误不再被修复，而被放大。', desc: '数据损坏、色彩错位、像素撕裂和编码噪点成为主动的视觉语言，暴露数字图像并不稳定的物质性。',
    keywords: ['数据损坏', '错位', '像素', '噪点'], colors: ['#ff335f', '#14121f', '#31f6c5'], theme: 'glitch', image: null, year: '1990s—'
  },
  {
    id: 'old-web', name: '旧网页美学', en: 'Old Web', category: 'digital', era: '1990s—2000s', origin: '早期万维网', region: 'GLOBAL',
    tagline: '网络还没有学会保持安静。', desc: '像素图标、平铺背景、系统字体、访客计数器与个人主页构成早期网络的手工感和去中心化气质。',
    keywords: ['像素图标', '个人主页', '平铺背景', '超链接'], colors: ['#315dff', '#f2f0dc', '#ffea00'], theme: 'oldweb', image: null, year: '1990s—2000s'
  },
  {
    id: 'kidcore', name: '童趣核', en: 'Kidcore', category: 'digital', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '世界重新回到蜡笔能画出的大小。', desc: '基础色、贴纸、塑料玩具和儿童电视图形组合出高饱和、直接而略带混乱的快乐。',
    keywords: ['基础色', '贴纸', '玩具', '蜡笔'], colors: ['#ffdd22', '#ef4b48', '#2f8df4'], theme: 'kidcore', image: null, year: '2010s—'
  },
  {
    id: 'solarpunk', name: '太阳朋克', en: 'Solarpunk', category: 'future', era: '2000s—', origin: '全球科幻文化', region: 'GLOBAL',
    tagline: '未来与自然不必互为代价。', desc: '可再生能源、生态建筑、公共花园与社区技术构成积极的未来想象，强调修复、合作与地方适应。',
    keywords: ['生态建筑', '太阳能', '花园城市', '共生'], colors: ['#9bcf63', '#29695c', '#f3df8c'], theme: 'solar', image: null, year: '2000s—'
  },
  {
    id: 'steampunk', name: '蒸汽朋克', en: 'Steampunk', category: 'future', era: '1980s—', origin: '英语科幻文化', region: 'EUROPE / US',
    tagline: '未来由黄铜、齿轮和蒸汽驱动。', desc: '维多利亚时代工艺与幻想科技结合，以锅炉、飞艇、机械义肢和精密仪表重构另一条工业历史。',
    keywords: ['黄铜', '齿轮', '飞艇', '维多利亚'], colors: ['#b47a3c', '#38291e', '#d8c69f'], theme: 'steam', image: null, year: '1980s—'
  },
  {
    id: 'dieselpunk', name: '柴油朋克', en: 'Dieselpunk', category: 'future', era: '1990s—', origin: '欧美科幻文化', region: 'EUROPE / US',
    tagline: '钢铁、烟尘与失控的机器时代。', desc: '借用两次世界大战之间的机械、装甲、装饰艺术和工业城市，塑造更沉重、更军事化的架空现代性。',
    keywords: ['钢铁', '装甲', '烟尘', '工业都市'], colors: ['#84765d', '#222522', '#c1ae7d'], theme: 'diesel', image: null, year: '1990s—'
  },
  {
    id: 'afrofuturism', name: '非洲未来主义', en: 'Afrofuturism', category: 'future', era: '1950s—', origin: '非洲侨民文化', region: 'AFRICA / DIASPORA',
    tagline: '未来也拥有祖先的记忆。', desc: '将非洲与侨民历史、宇宙想象、科技和解放叙事连接起来，重新书写谁能够拥有未来。',
    keywords: ['宇宙', '侨民文化', '科技', '祖先记忆'], colors: ['#e4a52c', '#272044', '#3db5a2'], theme: 'afrofuture', image: null, year: '1950s—'
  },
  {
    id: 'soviet-constructivism', name: '苏联构成主义', en: 'Soviet Constructivism', category: 'movement', era: '1915—1930s', origin: '苏联', region: 'USSR',
    tagline: '图形成为社会机器的一部分。', desc: '强烈对角线、红黑色块、摄影蒙太奇和粗体字将艺术推向出版、建筑与公共传播，成为革命时代的视觉工程。',
    keywords: ['红黑', '对角线', '蒙太奇', '宣传设计'], colors: ['#d52b1e', '#171512', '#e9dfc7'], theme: 'constructivist', image: null, year: '1915—1930s'
  },
  {
    id: 'socialist-realism', name: '社会主义现实主义', en: 'Socialist Realism', category: 'movement', era: '1930s—1980s', origin: '苏联及社会主义国家', region: 'USSR / GLOBAL',
    tagline: '现实被画成一种共同的方向。', desc: '以纪念性构图描绘劳动者、工业建设与集体生活，在不同国家形成各具地方特征的公共艺术传统。',
    keywords: ['纪念性', '劳动者', '工业建设', '公共叙事'], colors: ['#b73327', '#58432c', '#e6ce96'], theme: 'socialist', image: null, year: '1930s—1980s'
  },
  {
    id: 'soviet-modernism', name: '苏联现代主义', en: 'Soviet Modernism', category: 'movement', era: '1955—1991', origin: '苏联', region: 'USSR',
    tagline: '混凝土也能指向宇宙。', desc: '战后公共建筑、纪念碑、疗养院与太空时代结构在标准化体系中寻找雕塑性和地方表达。',
    keywords: ['混凝土', '纪念碑', '太空时代', '公共建筑'], colors: ['#a7aaa5', '#393b39', '#d8c9aa'], theme: 'soviet-modern', image: null, year: '1955—1991'
  },
  {
    id: 'art-nouveau', name: '新艺术运动', en: 'Art Nouveau', category: 'movement', era: '1890—1910', origin: '欧洲 / 全球', region: 'EUROPE / GLOBAL',
    tagline: '植物的曲线进入现代生活。', desc: '花茎般的线条、女性形象、彩色玻璃与整体设计连接建筑、海报、珠宝和室内空间。',
    keywords: ['曲线', '植物纹样', '彩色玻璃', '整体艺术'], colors: ['#8ca47a', '#4a3155', '#e7d8b5'], theme: 'nouveau', image: null, year: '1890—1910'
  },
  {
    id: 'de-stijl', name: '风格派', en: 'De Stijl', category: 'movement', era: '1917—1931', origin: '荷兰', region: 'NETHERLANDS',
    tagline: '世界被还原成线、面与基础色。', desc: '水平垂直结构、红黄蓝基础色与非对称平衡追求普遍秩序，深刻影响建筑、家具与平面设计。',
    keywords: ['正交网格', '基础色', '非对称', '抽象'], colors: ['#df2a20', '#1955a5', '#f1cf27'], theme: 'destijl', image: null, year: '1917—1931'
  },
  {
    id: 'renaissance', name: '文艺复兴', en: 'Renaissance', category: 'fine-art', era: '14—17世纪', origin: '意大利 / 欧洲', region: 'EUROPE',
    tagline: '世界重新获得比例、身体与光。', desc: '透视法、古典人文主义和对自然观察的重视改变了欧洲绘画，人物、空间与叙事趋向统一。',
    keywords: ['透视', '人文主义', '明暗', '古典比例'], colors: ['#9a6a43', '#3c2b24', '#d7c19c'], theme: 'renaissance', image: null, year: '14—17世纪'
  },
  {
    id: 'baroque', name: '巴洛克', en: 'Baroque', category: 'fine-art', era: '17世纪', origin: '欧洲 / 拉丁美洲', region: 'GLOBAL',
    tagline: '光从黑暗中切开戏剧。', desc: '强烈明暗、动态构图、丰盛材质和情感张力让画面成为舞台，并随殖民与宗教网络传播至全球。',
    keywords: ['明暗对照', '动态', '戏剧性', '丰盛'], colors: ['#c08b45', '#211713', '#8c2420'], theme: 'baroque', image: null, year: '17世纪'
  },
  {
    id: 'rococo', name: '洛可可', en: 'Rococo', category: 'fine-art', era: '18世纪', origin: '法国 / 欧洲', region: 'EUROPE',
    tagline: '轻盈、亲密，以及过量的优雅。', desc: '粉彩、贝壳曲线、花园与亲密场景取代宏大庄严，形成精巧、装饰性极强的宫廷视觉。',
    keywords: ['粉彩', '贝壳曲线', '花园', '轻盈'], colors: ['#e2b7b8', '#9cb1b7', '#f2e6cf'], theme: 'rococo', image: null, year: '18世纪'
  },
  {
    id: 'romanticism', name: '浪漫主义', en: 'Romanticism', category: 'fine-art', era: '18世纪末—19世纪', origin: '欧洲 / 美洲', region: 'EUROPE / AMERICAS',
    tagline: '自然比理性更辽阔。', desc: '风暴、废墟、远方和个体情感对抗理性秩序，崇高自然成为现代主体凝视自身的镜面。',
    keywords: ['崇高', '风暴', '废墟', '个体情感'], colors: ['#66727b', '#2d3032', '#c79b65'], theme: 'romantic', image: null, year: '18世纪末—19世纪'
  },
  {
    id: 'impressionism', name: '印象派', en: 'Impressionism', category: 'fine-art', era: '1860s—1880s', origin: '法国', region: 'FRANCE',
    tagline: '光不是照在物体上，光就是画面。', desc: '可见笔触、户外写生和瞬间光色打破学院绘画的完成感，将现代生活带入画布。',
    keywords: ['光色', '可见笔触', '户外', '现代生活'], colors: ['#8db1c1', '#d8bd7e', '#e9d9c0'], theme: 'impression', image: null, year: '1860s—1880s'
  },
  {
    id: 'post-impressionism', name: '后印象派', en: 'Post-Impressionism', category: 'fine-art', era: '1880s—1900s', origin: '法国 / 欧洲', region: 'EUROPE',
    tagline: '颜色开始表达看见之外的世界。', desc: '塞尚、梵高、高更等以结构、象征和主观色彩回应印象派，把绘画推向多条现代主义道路。',
    keywords: ['主观色彩', '结构', '象征', '厚涂'], colors: ['#e2a425', '#2f6987', '#934d3f'], theme: 'postimpression', image: null, year: '1880s—1900s'
  },
  {
    id: 'ukiyo-e', name: '浮世绘', en: 'Ukiyo-e', category: 'fine-art', era: '17—19世纪', origin: '日本', region: 'JAPAN',
    tagline: '把流动世界刻进纸张。', desc: '木版套色、平涂轮廓、斜向构图和城市生活题材塑造江户时代视觉，并深刻影响欧洲现代艺术。',
    keywords: ['木版画', '平涂', '轮廓', '江户生活'], colors: ['#315f77', '#d56a48', '#e5d3aa'], theme: 'ukiyoe', image: null, year: '17—19世纪'
  },
  {
    id: 'surrealism', name: '超现实主义', en: 'Surrealism', category: 'fine-art', era: '1920s—', origin: '欧洲 / 全球', region: 'GLOBAL',
    tagline: '理性睡去以后，物体重新排列。', desc: '梦、潜意识、自动技法和不可能并置挑战日常逻辑，随后扩展至摄影、电影、时装与广告。',
    keywords: ['梦', '潜意识', '错置', '自动技法'], colors: ['#a8b7c4', '#463858', '#d18d63'], theme: 'surreal', image: null, year: '1920s—'
  },
  {
    id: 'classical-oil', name: '古典油画', en: 'Classical Oil Painting', category: 'fine-art', era: '15—19世纪', origin: '欧洲 / 全球传播', region: 'GLOBAL',
    tagline: '颜料一层层沉淀成皮肤、丝绸与时间。', desc: '透明罩染、细密塑形和画布肌理构成油画的物质传统，覆盖肖像、静物、历史画与风景等多种类型。',
    keywords: ['罩染', '画布', '肖像', '油彩肌理'], colors: ['#846047', '#2b211b', '#c9a871'], theme: 'oil', image: null, year: '15—19世纪'
  },
  {
    id: 'islamic-geometry', name: '伊斯兰几何', en: 'Islamic Geometry', category: 'regional', era: '8世纪—当代', origin: '西亚 / 北非 / 南亚', region: 'MENA / S. ASIA',
    tagline: '重复不是复制，而是无限的入口。', desc: '星形、多边形、交错线和瓷砖色彩在建筑与手工艺中形成连续秩序，连接数学、信仰与材料。',
    keywords: ['星形', '镶嵌', '重复', '瓷砖'], colors: ['#21848c', '#174e63', '#d3a34f'], theme: 'islamic', image: null, year: '8世纪—当代'
  },
  {
    id: 'mughal-miniature', name: '莫卧儿细密画', en: 'Mughal Miniature', category: 'regional', era: '16—19世纪', origin: '南亚', region: 'S. ASIA',
    tagline: '宏大的宫廷，被收进一页纸。', desc: '精密线描、矿物色彩、植物边饰与多视点空间记录宫廷、狩猎、肖像和跨文化交流。',
    keywords: ['细密线描', '矿物色', '边饰', '宫廷叙事'], colors: ['#b84d37', '#2d6f6d', '#d9b95f'], theme: 'mughal', image: null, year: '16—19世纪'
  },
  {
    id: 'acid-design', name: '酸性设计', en: 'Acid Design', category: 'graphic', era: '1990s / 2010s—', origin: '锐舞文化 / 网络设计社区', region: 'GLOBAL',
    tagline: '让字体熔化，让秩序产生眩晕。', desc: '以液态金属字体、荧光色、线框、迷幻纹理和高密度构图制造视觉失谐，根源连接九十年代锐舞传单，并在二〇一〇年代以 Acidgrafix 复兴。',
    keywords: ['液态金属', '实验字体', '荧光', '恐空症构图'], colors: ['#d7ff00', '#101010', '#8d5cff'], theme: 'acid', image: null, year: '1990s / 2010s—'
  },
  {
    id: 'psychedelia', name: '迷幻艺术', en: 'Psychedelia', category: 'graphic', era: '1960s—', origin: '欧美反文化', region: 'GLOBAL',
    tagline: '颜色开始振动，字形拒绝静止。', desc: '互补色震颤、弯曲字体、欧普图案与新艺术曲线把感官经验转译为海报、唱片封面和沉浸空间。',
    keywords: ['色彩振动', '弯曲字形', '欧普', '反文化'], colors: ['#ff4aa2', '#6328ff', '#ffea32'], theme: 'psychedelic', image: null, year: '1960s—'
  },
  {
    id: 'rave', name: '锐舞视觉', en: 'Rave', category: 'graphic', era: '1980s—', origin: '英国 / 欧洲俱乐部文化', region: 'EUROPE',
    tagline: '一张传单，就是通往午夜的坐标。', desc: '荧光传单、笑脸、激光、工业空间与粗粝复制技术共同记录地下电子音乐的速度、匿名性与临时共同体。',
    keywords: ['传单', '笑脸', '激光', '俱乐部'], colors: ['#f6ff00', '#161616', '#ff3b8d'], theme: 'rave', image: null, year: '1980s—'
  },
  {
    id: 'vectordelia', name: '矢量迷幻', en: 'Vectordelia', category: 'digital', era: '2000s—2010s', origin: '全球数码设计', region: 'GLOBAL',
    tagline: '矢量软件曾经相信越多越好。', desc: '光泽渐变、流线、花叶、城市剪影与高密度矢量装饰构成前扁平化时代的人性化数码繁复。',
    keywords: ['矢量', '流线', '光泽', '数码繁复'], colors: ['#00b8d9', '#672caa', '#f4ef3b'], theme: 'vector', image: null, year: '2000s—2010s'
  },
  {
    id: 'webcore', name: '网页核', en: 'Webcore', category: 'digital', era: '1990s—2000s 回潮', origin: '早期互联网 / 全球社区', region: 'GLOBAL',
    tagline: '粗糙的网页，也有自己的体温。', desc: '旧系统窗口、像素图、闪烁动画、低清三维和早期网页布局被重新组合，强调未经平台统一的网络个性。',
    keywords: ['旧系统', '像素', '早期网页', '低清三维'], colors: ['#3a63ff', '#dedede', '#00d686'], theme: 'webcore', image: null, year: '1990s—2000s 回潮'
  },
  {
    id: 'atompunk', name: '原子朋克', en: 'Atompunk', category: 'future', era: '1945—1965 想象', origin: '北美 / 欧洲', region: 'N. AMERICA / EUROPE',
    tagline: '未来由原子、火箭和乐观主义驱动。', desc: '以原子时代插画、流线家电、太空竞赛和世纪中期现代主义构造战后社会想象的未来。',
    keywords: ['原子时代', '火箭', '世纪中期', '太空竞赛'], colors: ['#e94c38', '#233b57', '#f0d56b'], theme: 'atomic', image: null, year: '1945—1965'
  },
  {
    id: 'raygun-gothic', name: '射线枪哥特', en: 'Raygun Gothic', category: 'future', era: '1930s—1960s 想象', origin: '美国科幻文化', region: 'N. AMERICA',
    tagline: '昨天的明天，带着尾翼与星芒。', desc: '铬金属、弧线、天线、火箭尾翼和星爆图形塑造世纪中期科幻中轻盈、戏剧化的技术未来。',
    keywords: ['铬金属', '星爆', '尾翼', '复古科幻'], colors: ['#e95542', '#89cbd0', '#f6e4b5'], theme: 'raygun', image: null, year: '1930s—1960s'
  },
  {
    id: 'cassette-futurism', name: '磁带未来主义', en: 'Cassette Futurism', category: 'future', era: '1970s—1990s 想象', origin: '全球工业与科幻设计', region: 'GLOBAL',
    tagline: '未来有按键、磁带和沉重的显示器。', desc: '模拟仪表、实体键盘、阴极射线屏幕和模块化设备构成一种粗粝、可维修的近未来技术观。',
    keywords: ['模拟仪表', 'CRT', '实体按键', '工业科幻'], colors: ['#d46d37', '#282c2c', '#9ba69b'], theme: 'cassette', image: null, year: '1970s—1990s'
  },
  {
    id: 'biopunk', name: '生物朋克', en: 'Biopunk', category: 'future', era: '1980s—', origin: '科幻文学 / 视觉文化', region: 'GLOBAL',
    tagline: '身体成为下一台机器。', desc: '基因工程、湿润实验室、人工器官与有机科技把赛博朋克的技术焦虑转向生命本身。',
    keywords: ['基因', '有机科技', '实验室', '身体改造'], colors: ['#8fbf38', '#17251d', '#c78488'], theme: 'bio', image: null, year: '1980s—'
  },
  {
    id: 'angelcore', name: '天使核', en: 'Angelcore', category: 'liminal', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '神圣被柔光重新想象。', desc: '羽翼、云层、圣像、白纱与过曝光线组成轻盈而疏离的网络神圣感。',
    keywords: ['羽翼', '云', '圣像', '过曝'], colors: ['#dce8f0', '#a7bbd2', '#fff8e8'], theme: 'angel', image: null, year: '2010s—'
  },
  {
    id: 'traumacore', name: '创伤核', en: 'Traumacore', category: 'liminal', era: '2010s—', origin: '匿名网络社区', region: 'GLOBAL',
    tagline: '可爱的表面，承载无法直说的记忆。', desc: '儿童图像、手写文字、柔色与突兀的不安元素并置，用视觉拼贴表达脆弱、创伤和自我安抚。',
    keywords: ['童年图像', '手写', '不安', '自我表达'], colors: ['#efc5cf', '#665675', '#dce6d5'], theme: 'trauma', image: null, year: '2010s—'
  },
  {
    id: 'lovecore', name: '爱核', en: 'Lovecore', category: 'liminal', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '把爱变成过量的红与粉。', desc: '心形、情书、蕾丝、糖果与情人节图像以高密度方式重组浪漫、痴迷和甜蜜的视觉符号。',
    keywords: ['心形', '情书', '蕾丝', '情人节'], colors: ['#f33d65', '#8e1535', '#ffd4dc'], theme: 'love', image: null, year: '2010s—'
  },
  {
    id: 'cloudcore', name: '云核', en: 'Cloudcore', category: 'liminal', era: '2010s—', origin: '全球互联网', region: 'GLOBAL',
    tagline: '天空成为一间没有墙的房间。', desc: '云海、空中阶梯、淡蓝渐变与漂浮建筑构成宁静、超现实的逃离空间。',
    keywords: ['云海', '天空', '漂浮', '淡蓝'], colors: ['#9ed0ec', '#6d91bb', '#f7f6eb'], theme: 'cloud', image: null, year: '2010s—'
  },
  {
    id: 'clowncore', name: '小丑核', en: 'Clowncore', category: 'liminal', era: '2010s—', origin: '网络亚文化', region: 'GLOBAL',
    tagline: '欢乐被推到诡异的边缘。', desc: '马戏团色彩、夸张妆容、气球和旧玩具在明快与恐惧之间形成反差。',
    keywords: ['马戏团', '小丑', '气球', '诡异欢乐'], colors: ['#e83d45', '#f1c52f', '#2f7cc1'], theme: 'clown', image: null, year: '2010s—'
  },
  {
    id: 'acid-house', name: '酸浩室', en: 'Acid House', category: 'subculture', era: '1980s—1990s', origin: '芝加哥 / 英国', region: 'N. AMERICA / UK',
    tagline: '黄色笑脸成为地下夜晚的通行证。', desc: '笑脸符号、荧光传单、宽松运动服和仓库派对共同标记酸浩室音乐及其跨越阶层的锐舞共同体。',
    keywords: ['笑脸', '荧光传单', '仓库派对', '运动服'], colors: ['#f7e700', '#131313', '#e54588'], theme: 'acidhouse', image: null, year: '1980s—1990s'
  },
  {
    id: 'goth', name: '哥特亚文化', en: 'Goth', category: 'subculture', era: '1980s—', origin: '英国后朋克场景', region: 'UK / GLOBAL',
    tagline: '黑色不是缺席，而是一整套语言。', desc: '黑色服装、戏剧化妆容、宗教与维多利亚意象连接后朋克音乐、夜店和多代亚文化身份。',
    keywords: ['黑色', '后朋克', '戏剧妆容', '维多利亚'], colors: ['#141216', '#6f263f', '#c6c0bf'], theme: 'goth', image: null, year: '1980s—'
  },
  {
    id: 'scene', name: 'Scene', en: 'Scene', category: 'subculture', era: '2000s—2010s', origin: '北美互联网与音乐场景', region: 'N. AMERICA',
    tagline: '社交网页把亚文化染成高饱和。', desc: '蓬松侧刘海、紧身裤、霓虹配件、卡通图形与 MySpace 自我展示共同构成千禧年代的网络青年视觉。',
    keywords: ['霓虹', '侧刘海', 'MySpace', '乐队文化'], colors: ['#ff2da1', '#171717', '#35d7ff'], theme: 'scene', image: null, year: '2000s—2010s'
  },
  {
    id: 'cybergoth', name: '赛博哥特', en: 'Cybergoth', category: 'subculture', era: '1990s—', origin: '欧洲工业音乐场景', region: 'EUROPE / GLOBAL',
    tagline: '工业黑暗与荧光未来在舞池相撞。', desc: '黑色基底、荧光管发、护目镜、防毒面具和工业舞蹈把哥特、锐舞与赛博朋克融合。',
    keywords: ['管发', '护目镜', '工业音乐', '荧光黑'], colors: ['#9cff00', '#111111', '#db2cff'], theme: 'cybergoth', image: null, year: '1990s—'
  },
  {
    id: 'decora', name: '装饰系', en: 'Decora', category: 'subculture', era: '1990s—', origin: '日本原宿', region: 'JAPAN',
    tagline: '配饰不是点缀，而是整个画面。', desc: '彩色发夹、层叠首饰、卡通玩具和多层服装通过极繁叠加形成原宿街头的个体表达。',
    keywords: ['发夹', '层叠配饰', '原宿', '极繁'], colors: ['#ff6db1', '#55ccef', '#ffe23c'], theme: 'decora', image: null, year: '1990s—'
  },
  {
    id: 'fairy-kei', name: '仙女系', en: 'Fairy Kei', category: 'subculture', era: '2000s—', origin: '日本', region: 'JAPAN',
    tagline: '八十年代玩具被穿成柔软的梦。', desc: '粉彩、蓬松轮廓、复古玩具与可爱角色形成轻盈的日本街头时尚语汇。',
    keywords: ['粉彩', '复古玩具', '蓬松', '可爱文化'], colors: ['#f4bddd', '#b7d8f3', '#fff3ae'], theme: 'fairykei', image: null, year: '2000s—'
  },
  {
    id: 'coquette', name: '娇俏美学', en: 'Coquette', category: 'subculture', era: '2010s—', origin: '欧美网络时尚', region: 'GLOBAL',
    tagline: '蝴蝶结将脆弱与表演绑在一起。', desc: '蝴蝶结、蕾丝、珍珠、芭蕾元素和柔粉色重组传统女性气质，并在网络语境中产生多种分支。',
    keywords: ['蝴蝶结', '蕾丝', '珍珠', '芭蕾'], colors: ['#e8bdca', '#7f4a58', '#f6eee8'], theme: 'coquette', image: null, year: '2010s—'
  },
  {
    id: 'whimsigoth', name: '奇想哥特', en: 'Whimsigoth', category: 'subculture', era: '1990s / 当代回潮', origin: '欧美流行文化', region: 'GLOBAL',
    tagline: '月亮、天鹅绒与室内的神秘夜色。', desc: '深蓝紫、星月图案、天鹅绒、复古木器和女巫意象构成温暖而神秘的九十年代幻想。',
    keywords: ['星月', '天鹅绒', '女巫', '深蓝紫'], colors: ['#2e294f', '#8f6c91', '#d6b967'], theme: 'whimsigoth', image: null, year: '1990s / 当代回潮'
  },
  {
    id: 'twee', name: 'Twee', en: 'Twee', category: 'subculture', era: '2000s—2010s', origin: '英美独立文化', region: 'UK / N. AMERICA',
    tagline: '复古日常被处理成俏皮的电影静帧。', desc: '彼得潘领、彩色袜、旧书、胶片色和独立流行音乐构成克制、书卷气又略显古怪的生活风格。',
    keywords: ['复古', '彼得潘领', '胶片', '独立流行'], colors: ['#d85543', '#426477', '#e5cb8b'], theme: 'twee', image: null, year: '2000s—2010s'
  },
  {
    id: 'mcbling', name: '闪钻千禧', en: 'McBling', category: 'subculture', era: '2003—2008', origin: '北美流行文化', region: 'N. AMERICA',
    tagline: '手机、闪钻和名人文化一起发光。', desc: '水钻、粉色、翻盖手机、天鹅绒运动套装与狗仔文化构成二〇〇〇年代中期的炫耀式流行视觉。',
    keywords: ['水钻', '翻盖手机', '粉色', '名人文化'], colors: ['#f370b7', '#8d57a7', '#d7d4d2'], theme: 'mcbling', image: null, year: '2003—2008'
  },
  {
    id: 'dadaism', name: '达达主义', en: 'Dadaism', category: 'fine-art', era: '1910s—1920s', origin: '苏黎世 / 柏林 / 纽约', region: 'EUROPE / N. AMERICA',
    tagline: '当世界失去理性，艺术拒绝守规矩。', desc: '拼贴、现成品、荒诞表演与反艺术姿态回应战争和现代社会，并深刻影响后续实验艺术。',
    keywords: ['拼贴', '现成品', '荒诞', '反艺术'], colors: ['#d14b37', '#1d1d1d', '#d5c7a5'], theme: 'dada', image: null, year: '1910s—1920s'
  },
  {
    id: 'cubism', name: '立体主义', en: 'Cubism', category: 'fine-art', era: '1907—1920s', origin: '法国', region: 'FRANCE',
    tagline: '一个物体，可以同时被看见很多次。', desc: '多重视点、几何分解和拼贴打破单一透视，重新组织物体、空间与时间。',
    keywords: ['多重视点', '几何分解', '拼贴', '空间'], colors: ['#9d8062', '#4e4944', '#c9b99b'], theme: 'cubism', image: null, year: '1907—1920s'
  },
  {
    id: 'expressionism', name: '表现主义', en: 'Expressionism', category: 'fine-art', era: '1900s—1920s', origin: '德国 / 北欧', region: 'EUROPE',
    tagline: '形体变形，只为让情绪更准确。', desc: '夸张轮廓、尖锐色彩与扭曲空间将主观焦虑置于自然再现之上。',
    keywords: ['变形', '主观色彩', '焦虑', '尖锐轮廓'], colors: ['#d35432', '#305d63', '#dda72b'], theme: 'expression', image: null, year: '1900s—1920s'
  },
  {
    id: 'fauvism', name: '野兽派', en: 'Fauvism', category: 'fine-art', era: '1905—1910', origin: '法国', region: 'FRANCE',
    tagline: '颜色不再服从自然。', desc: '高纯度色块、简化形体和直接笔触把绘画从再现中释放出来。',
    keywords: ['纯色', '直接笔触', '简化形体', '非自然色'], colors: ['#eb5e30', '#2d8e9c', '#f0c62d'], theme: 'fauvism', image: null, year: '1905—1910'
  },
  {
    id: 'pop-art', name: '波普艺术', en: 'Pop Art', category: 'fine-art', era: '1950s—1970s', origin: '英国 / 美国', region: 'UK / N. AMERICA',
    tagline: '商品、漫画和明星都可以进入艺术。', desc: '商业印刷、广告、漫画网点和大众偶像被挪用，模糊艺术与消费文化的边界。',
    keywords: ['商业印刷', '漫画网点', '消费', '挪用'], colors: ['#f1463d', '#168ad0', '#f7df2b'], theme: 'pop', image: null, year: '1950s—1970s'
  },
  {
    id: 'op-art', name: '欧普艺术', en: 'Op Art', category: 'fine-art', era: '1960s—', origin: '欧美', region: 'GLOBAL',
    tagline: '静止的图形开始移动。', desc: '高对比几何、重复线条与视错觉直接作用于观看身体，制造振动、深度和运动。',
    keywords: ['视错觉', '高对比', '重复', '振动'], colors: ['#111111', '#f1f1e8', '#ff4d58'], theme: 'opart', image: null, year: '1960s—'
  }
];

export const journal = [
  { no: '01', title: '为什么我们迷恋无人之境？', sub: '从阈限空间、梦核到池核的情绪谱系', ids: ['liminal-space', 'dreamcore', 'poolcore'] },
  { no: '02', title: '旧互联网从未真正消失', sub: 'Y2K、蒸汽波与 Frutiger Aero 的三次回潮', ids: ['y2k', 'vaporwave', 'frutiger-aero'] },
  { no: '03', title: '当界面重新拥有触感', sub: '从拟物到玻璃拟态：数字表面的二十年', ids: ['skeuomorphism', 'glassmorphism', 'neumorphism'] }
];

export const sources = [
  { name: 'CARI', label: '消费美学研究档案', url: 'https://cari.institute/' },
  { name: 'Aesthetics Wiki', label: '社区分类 · 1,000+ 条名称', url: 'https://aesthetics.fandom.com/wiki/List_of_Aesthetics' },
  { name: 'AestheticWiki', label: 'Reddit 社区讨论', url: 'https://www.reddit.com/r/AestheticWiki/' },
  { name: 'MelonLand', label: '独立网页创作论坛', url: 'https://forum.melonland.net/' },
  { name: 'Rijksmuseum IIIF', label: '博物馆开放图像 · IIIF', url: 'https://data.rijksmuseum.nl/tutorials/iiif/' },
  { name: 'Smithsonian IIIF', label: 'CC0 博物馆图像 · IIIF', url: 'https://iiif.si.edu/' },
  { name: 'Art Institute of Chicago', label: '公共领域馆藏 · IIIF', url: 'https://api.artic.edu/docs/' },
  { name: 'Wikimedia Commons', label: '开放许可图像库', url: 'https://commons.wikimedia.org/' },
  { name: 'V&A', label: '维多利亚与阿尔伯特博物馆', url: 'https://www.vam.ac.uk/collections' },
  { name: 'Tate', label: '艺术术语与流派资料', url: 'https://www.tate.org.uk/art/art-terms' }
];
