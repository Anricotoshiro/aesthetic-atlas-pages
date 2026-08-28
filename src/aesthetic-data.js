import { aesthetics as coreAesthetics, journal, sources } from './data.js';

const categoryDefinitions = [
  { id: 'psyche', name: '梦境、心理与空间', en: 'Dreams, Psyche & Space', note: '梦境、幻想、异常空间与情绪视觉' },
  { id: 'digital', name: '网络时代与数字', en: 'Internet & Digital', note: '互联网文化、数字怀旧、软件界面与虚拟空间' },
  { id: 'future', name: '未来主义与科幻', en: 'Futurism & Science Fiction', note: '未来社会、科技幻想与科幻世界观' },
  { id: 'industrial', name: '工业、机械与科技', en: 'Industry, Machines & Technology', note: '工业设计、军事视觉、机械系统与工程文化' },
  { id: 'design', name: '建筑、设计与视觉运动', en: 'Architecture & Design Movements', note: '建筑、平面设计与现代视觉运动' },
  { id: 'art', name: '艺术史与绘画', en: 'Art History & Painting', note: '传统艺术、现代艺术与绘画流派' },
  { id: 'lifestyle', name: '生活方式与空间氛围', en: 'Lifestyle & Atmosphere', note: '居住空间、日常生活与消费文化' },
  { id: 'fashion', name: '时尚、穿搭与亚文化', en: 'Fashion & Subcultures', note: '服饰风格、青年文化与街头身份' },
  { id: 'narrative', name: '影视、游戏与叙事视觉', en: 'Screen, Games & Narrative', note: '由影视、游戏与文学形成的独立视觉体系' }
];

const categoryMap = {
  liminal: 'psyche', digital: 'digital', future: 'future', movement: 'design',
  'fine-art': 'art', regional: 'art', interface: 'digital', graphic: 'design',
  subculture: 'fashion', nature: 'lifestyle'
};

const primaryOverrides = {
  kidcore: 'psyche', fairycore: 'psyche', goblincore: 'psyche',
  'socialist-realism': 'art', 'analog-horror': 'digital'
};

const relatedCategoryOverrides = {
  'analog-horror': ['narrative'], goth: ['narrative'], cybergoth: ['future'],
  'acid-design': ['digital'], rave: ['digital'], psychedelia: ['art'],
  synthwave: ['future'], y2k: ['future']
};

const historicalRanges = {
  'wabi-sabi': [1200, 2026], 'zen-ink': [600, 2026], renaissance: [1400, 1600],
  baroque: [1600, 1750], rococo: [1720, 1780], romanticism: [1780, 1850],
  impressionism: [1860, 1890], 'post-impressionism': [1886, 1905],
  'ukiyo-e': [1603, 1868], 'classical-oil': [1400, 1900],
  'islamic-geometry': [700, 2026], 'mughal-miniature': [1526, 1857],
  synthwave: [1980, 2026], y2k: [1980, 2004], cyberpunk: [1980, 2026],
  'cassette-futurism': [1970, 1999]
};

const displayOverrides = {
  'frutiger-aero': { name: '清新科技美学' },
  y2k: { name: '千禧未来主义', en: 'Y2K' },
  glitchcore: { name: '故障美学', en: 'Glitch' },
  goth: { name: '哥特风' }
};

function inferYears(item) {
  if (historicalRanges[item.id]) return historicalRanges[item.id];
  const years = [...String(item.year || item.era).matchAll(/(?:18|19|20)\d{2}/g)].map(match => Number(match[0]));
  if (!years.length) return [1900, 2026];
  if (years.length === 1) return [years[0], /—|以后|当代|回潮/.test(item.year || item.era) ? 2026 : years[0]];
  return [Math.min(...years), Math.max(...years)];
}

const make = (id, name, en, category, startYear, endYear, origin, region, keywords, colors, tagline, desc, options = {}) => ({
  id, name, en, category, categories: [category, ...(options.relatedCategories || [])], startYear, endYear,
  era: options.era || `${startYear}${endYear === 2026 ? '—' : `—${endYear}`}`,
  year: options.era || `${startYear}${endYear === 2026 ? '—' : `—${endYear}`}`,
  origin, region, keywords, colors, tagline, desc, theme: options.theme || id.replaceAll('-', ''), hidden: Boolean(options.hidden)
});

const additions = [
  make('voidcore','虚空核','Voidcore','psyche',2015,2026,'全球互联网','GLOBAL',['黑暗空域','孤立物体','深渊','失重'],['#050609','#35384a','#b3b6c9'],'凝视空无，直到空无拥有形状。','以无边黑暗、孤立光源和失去尺度的物体表现存在感消退与宇宙性孤独。'),
  make('witchcore','女巫核','Witchcore','psyche',2010,2026,'欧美互联网','GLOBAL',['草药','占星','烛光','仪式'],['#3c2c46','#74835b','#d5b77c'],'知识藏在草叶、月相和旧书边缘。','以民俗巫术、草药、占星图、古籍与自然仪式构成神秘而日常的精神空间。'),
  make('forestcore','森林核','Forestcore','psyche',2010,2026,'全球互联网','GLOBAL',['密林','苔藓','雾','林间光'],['#243b2b','#71845d','#c2c9ad'],'树冠之下，世界改用另一种时间。','沉入茂密森林、苔藓、雾气和散射光，强调自然空间的包围感与古老感。'),
  make('dark-fairytale','黑暗童话','Dark Fairytale','psyche',1800,2026,'欧洲民间故事 / 全球视觉文化','EUROPE / GLOBAL',['寓言','暗林','诅咒','古堡'],['#1b1920','#6b2638','#b69b74'],'童话没有消失，只是收回了糖衣。','将民间故事的森林、诅咒、异兽与道德阴影转化为幽暗、华丽的幻想图景。'),
  make('pixel-art','像素美学','Pixel Art','digital',1970,2026,'电子游戏与早期计算机图形','GLOBAL',['像素网格','有限色板','精灵图','低分辨率'],['#251b45','#4fc3c8','#f6c85f'],'限制越清晰，想象越精确。','以可见像素、有限色板和逐帧动画形成数字图像最基础也最持久的视觉语言。'),
  make('net-art','网络艺术','Net Art','digital',1994,2026,'欧美早期互联网','GLOBAL',['浏览器','超链接','交互','网络协议'],['#1010a8','#efefef','#ff3b30'],'网络不只是画廊，它本身就是材料。','艺术家直接使用网页、协议、链接与在线身份，把互联网结构变成作品。'),
  make('cyberdelic','数字乌托邦','Cyberdelic','digital',1990,2026,'网络文化 / 迷幻艺术','GLOBAL',['虚拟现实','分形','霓虹','意识扩展'],['#471b82','#00d9d2','#ff5cc8'],'屏幕被想象成意识的下一层空间。','将赛博文化、迷幻图形与早期虚拟现实融合，表达技术带来的感知扩张。'),
  make('frutiger-metro','Frutiger Metro','Frutiger Metro / Vectordelia','digital',2004,2013,'全球消费品牌、游戏与数字媒体','GLOBAL',['扁平矢量','抽象花纹','人物剪影','渐变色块','音乐图形'],['#ef3b86','#43b8d3','#f5d84d'],'二维图形也可以拥有过量的乐观。','2000 年代的高饱和矢量图形语言：人物剪影、花纹、音响与抽象曲线在平面中叠加。它与清新科技美学同属一个时代，却以 2D 图形和人文装饰取代了水滴、玻璃与 3D 自然风景。',{relatedCategories:['design']}),
  make('aqua-ui','水晶界面','Aqua UI','digital',2000,2012,'Apple 软件界面','N. AMERICA / GLOBAL',['凝胶按钮','高光','半透明','水滴'],['#3d9fe8','#b8e5ff','#e9f7ff'],'界面曾像一颗可以按下的水滴。','以凝胶质感、高光、透明层与圆润控件塑造千禧年代的软件亲和力。'),
  make('windows-xp','Windows XP 美学','Windows XP Aesthetic','digital',2001,2014,'Microsoft / 全球个人电脑文化','GLOBAL',['Luna界面','蓝绿配色','桌面壁纸','系统图标'],['#245edb','#70b83d','#f0e7c2'],'个人电脑第一次显得明亮而日常。','由 Luna 主题、经典桌面、圆润窗口和大众化图标共同构成的早期家庭计算视觉。'),
  make('space-age','太空时代美学','Space Age','future',1955,1975,'美国 / 苏联太空竞赛','GLOBAL',['轨道','卫星','流线家具','宇航'],['#e6ded0','#e45a3d','#537b91'],'航天工程进入了客厅和城市。','太空竞赛把火箭、轨道与失重想象带入建筑、家具、平面和大众消费品。'),
  make('nasa-punk','NASA 朋克','NASA Punk','future',1960,2026,'现实航天工程 / 科幻设计','GLOBAL',['工程白','警示标识','模块舱','实用主义'],['#ecebe4','#e05a35','#1f344c'],'未来必须先通过工程审查。','以现实航天器、模块舱、标签系统和可维护结构为基础的硬科幻视觉。'),
  make('lunarpunk','月球朋克','Lunarpunk','future',2010,2026,'全球网络与生态科幻','GLOBAL',['月光','生物荧光','夜间生态','去中心化'],['#171b3f','#7b75cf','#a7efcf'],'太阳朋克入夜以后，城市开始发出柔光。','强调夜间生态、互助网络、生物荧光与神秘主义的可持续未来想象。'),
  make('oceanpunk','海洋朋克','Oceanpunk','future',2000,2026,'海洋科幻与气候想象','GLOBAL',['海上城市','潜水科技','珊瑚结构','蓝色能源'],['#073f57','#1ea6a8','#d4f0e8'],'未来城市把地平线交给海洋。','围绕海上聚落、深海工程、潮汐能源与海洋生态形成的未来视觉。'),
  make('medicalcore','医疗核','Medicalcore','psyche',2010,2026,'全球互联网与医疗视觉文化','GLOBAL',['病房灯光','药盒','无菌白','医疗标识'],['#dce7e5','#83b5b1','#f2bcc6'],'消毒水、白光与编号让脆弱变得可见。','从医院空间、医学图表、药物包装与照护用品中提炼出的临床视觉语汇；图集以非血腥、非创伤性的物件与空间为主。',{relatedCategories:['fashion']}),
  make('ghostcore','幽灵核','Ghostcore','psyche',2010,2026,'Tumblr、短视频与超自然叙事社群','GLOBAL',['雾','旧宅','墓园','闪光灯残影'],['#25292f','#aeb3ad','#727a84'],'像一张没有被解释的旧照片。','围绕幽灵、废弃住宅、墓园、旧物与低照度摄影展开，以安静、悬置和若有若无的超自然感构成空间氛围。',{relatedCategories:['narrative']}),
  make('retrogamevideo','复古游戏影像','Retrogamevideo','digital',1980,2026,'主机游戏、录像媒介与互联网剪辑文化','GLOBAL',['CRT扫描线','录像带噪点','像素HUD','主机启动画面'],['#1c2143','#5fb6cb','#edb653'],'游戏曾经先以一段模糊录像抵达房间。','聚焦 8 位、16 位与早期 3D 游戏被 CRT、录像带、录屏界面和剪辑文化重新观看时形成的视听视觉。',{relatedCategories:['narrative']}),
  make('dollcore','娃娃核','Dollcore','fashion',2010,2026,'日本球体关节娃娃文化与网络摄影','JAPAN / GLOBAL',['球体关节','瓷偶','蕾丝','人偶妆'],['#eadde1','#826c77','#c9b0a4'],'精致与脆弱被安排成一场静止的凝视。','受古董瓷偶与日本球体关节娃娃启发，以细致服装、关节、玻璃眼和人偶式摄影组织柔美而略带距离感的造型。',{relatedCategories:['lifestyle']}),
  make('royalcore','皇家核','Royalcore','lifestyle',2018,2026,'Tumblr、Pinterest 与历史剧视觉文化','EUROPE / GLOBAL',['礼服','冠冕','宫殿','珠宝'],['#78533f','#e2c583','#d9d9e2'],'日常被暂时布置成一座宫廷。','以巴洛克、洛可可与摄政时期的宫廷想象为灵感，围绕礼服、珠宝、器物与仪式感构造当代网络式的华丽逃逸。',{relatedCategories:['fashion']}),
  make('bluntcore','钝核','Bluntcore','lifestyle',2020,2026,'当代网络小众视觉标签','GLOBAL',['雾面','钝角物件','低刺激色','迟缓日常'],['#6f766e','#c9c6b7','#9a8f83'],'不锋利，也不急着取悦任何人。','以低对比、雾面材质、圆钝轮廓和不追求精致的日常物件为线索，记录一种反锐利、反效率的松弛视觉。'),
  make('gorecore','血腥核','Gorecore','fashion',2010,2026,'恐怖媒介与网络亚文化','GLOBAL',['血色','假肢化妆','恐怖道具','黑红对比'],['#211417','#8e2028','#d1c2b7'],'恐怖图像被用作极端的视觉符号。','以恐怖片、特效化妆和虚构暴力的符号系统为主；该条目不收录真实伤害或现实暴力影像。',{relatedCategories:['narrative'],hidden:true}),
  make('rotcore','腐烂核','Rotcore','psyche',2015,2026,'网络恐怖与有机衰败视觉','GLOBAL',['剥落表面','霉斑','锈蚀','枯萎植物'],['#3f4734','#8c7957','#b7a56e'],'生命与物质都在缓慢改变形状。','以有机衰败、潮湿建筑、锈蚀和剥落质地表现时间留下的痕迹；图集仅呈现物件、自然与虚构材质。',{hidden:true}),
  make('morute','Morute','Morute','fashion',2014,2026,'Tumblr 社群','GLOBAL',['旧睡裙','褪色玩偶','蕾丝','阴郁肖像'],['#b6a2a6','#5d5358','#e1d4ca'],'甜美在褪色之后留下了更复杂的情绪。','源自 Tumblr 的阴郁可爱风格，以旧睡裙、古董儿童物件、哥特元素与脆弱感摄影构成；不以创伤或自伤内容作为图像素材。',{relatedCategories:['psyche'],hidden:true}),
  make('gurokawa','怪诞可爱','Gurokawa','fashion',2000,2026,'日本原宿与怪诞可爱文化','JAPAN / GLOBAL',['眼球饰品','荧光色','怪物图形','Decora'],['#f05b9a','#26213b','#b4f15a'],'可爱与不安在同一件饰品上并存。','日本“怪诞可爱”视觉，将鲜艳配饰、卡通怪物和恐怖符号并置；图集使用风格化、非写实的图形表达。',{hidden:true}),
  make('devilcore','恶魔核','Devilcore','fashion',2010,2026,'网络暗黑时尚与流行文化','GLOBAL',['角','火焰','黑红配色','暗黑符号'],['#170f15','#a82931','#d6874c'],'黑红的轮廓把反叛变成角色。','围绕恶魔轮廓、黑红配色、火焰图形和暗黑舞台感发展的网络时尚标签；图集避免现实暴力和仇恨符号。',{relatedCategories:['narrative'],hidden:true}),
  make('cutecore','可爱核','Cutecore','fashion',2020,2026,'Tumblr、TikTok 与可爱恐怖拼贴文化','GLOBAL',['玩偶','粉彩','绷带图形','像素贴纸'],['#f4bdd5','#a8c9ed','#f5df7d'],'粉彩世界里藏着一点不协调。','以可爱角色、粉彩房间、玩偶和数字贴纸与轻度恐怖符号并置的网络视觉；图集采用非写实、非血腥的安全表达。',{relatedCategories:['digital'],hidden:true}),
  make('post-apocalypse','后末日美学','Post-Apocalypse','future',1950,2026,'全球科幻文化','GLOBAL',['废墟','拾荒','风化设施','生存装备'],['#5b5140','#a36d3c','#c8bd9a'],'文明退场以后，物品重新获得用途。','以废墟、临时聚落、回收机械和极端环境描绘灾变后的生存秩序。'),
  make('corporate-dystopia','企业反乌托邦','Corporate Dystopia','future',1970,2026,'科幻影视 / 企业视觉','GLOBAL',['巨型企业','无菌办公','监控','品牌霸权'],['#d8dcdf','#33404c','#e04b45'],'品牌比政府更长寿，办公室比城市更安静。','以无菌空间、统一制服、权限系统和巨型品牌表现组织对个体的全面占有。'),
  make('industrial','工业美学','Industrial','industrial',1900,2026,'工业生产与现代设计','GLOBAL',['裸露结构','钢铁','管线','磨损'],['#383b3b','#8b6f4c','#c1beb2'],'机器的结构就是它的表情。','保留钢铁、铆钉、管线与制造痕迹，以生产逻辑直接构成视觉。'),
  make('military','军事美学','Military','industrial',1914,2026,'全球军事系统','GLOBAL',['制式装备','迷彩','编号','战地摄影'],['#3f4733','#77745f','#c3b99e'],'识别、耐用与秩序先于装饰。','由制服、载具、标识、地图和战地影像构成的功能性视觉系统。'),
  make('tactical','战术美学','Tactical','industrial',1980,2026,'现代特战装备 / 民用战术文化','GLOBAL',['板甲系统','胸挂与腰带','Multicam / Ranger Green','低饱和纪实'],['#171a1a','#4f554e','#9a927e'],'每一处结构都对应一种动作。','以板甲、胸挂、战术腰带、通讯与夜视系统为核心，结合低饱和纪实摄影和训练场景呈现当代战术视觉。'),
  make('cold-war','冷战美学','Cold War','industrial',1947,1991,'美苏冷战文化','GLOBAL',['掩体','雷达','宣传图形','核警报'],['#324852','#b44c3e','#d6c9a9'],'世界被分成阵营、频率与警戒等级。','防空设施、情报技术、宣传设计与核焦虑共同构成冷战视觉记忆。'),
  make('soviet-aesthetic','苏联美学','Soviet Aesthetic','industrial',1917,1991,'苏联','E. EUROPE / EURASIA',['公共工程','红色符号','集体叙事','纪念性'],['#b52b24','#d4bd8c','#27343b'],'现代化被塑造成一种集体尺度。','涵盖苏联公共视觉、工业设计、交通、纪念建筑与日常物质文化的综合风格。'),
  make('laboratory-core','实验室美学','Laboratory Core','industrial',1940,2026,'科研机构 / 科幻文化','GLOBAL',['玻璃器皿','无菌白','标本','仪器'],['#d8e4e1','#6d9e9b','#26363b'],'知识在透明容器与编号之间生长。','以实验器材、样本、无菌空间和测量界面表现科学工作的物质环境。'),
  make('control-room','控制室美学','Control Room','industrial',1950,2026,'航天、能源与工业系统','GLOBAL',['仪表墙','状态灯','控制台','系统图'],['#24343a','#c66c37','#8aa28f'],'复杂世界被压缩成灯、表和开关。','密集仪表、控制台、状态灯和系统图将大型基础设施转译为可操作界面。'),
  make('mechanical','机械美学','Mechanical','industrial',1750,2026,'工业工程与机械设计','GLOBAL',['齿轮','连杆','剖面','精密加工'],['#43484b','#b18451','#c9c6bd'],'运动从结构内部变得可见。','关注齿轮、轴承、连杆、剖面与加工表面呈现的机械秩序。'),
  make('neo-brutalism','新粗野主义','Neo-Brutalism','design',1990,2026,'建筑 / 数字设计','GLOBAL',['强边框','高对比','直白排版','粗粝表面'],['#f3f0e8','#141414','#ff5a36'],'粗野主义进入屏幕以后变得更直接。','用强边框、硬阴影、极端比例和直白信息层级重新解释粗野主义。'),
  make('minimalism','极简主义','Minimalism','design',1960,2026,'欧美艺术与设计','GLOBAL',['减法','留白','几何','单一材料'],['#f0eee8','#252525','#9d9d95'],'减少不是空缺，而是提高每个决定的重量。','通过有限材料、基础几何与严格秩序排除非必要元素。'),
  make('postmodernism','后现代主义','Postmodernism','design',1960,2000,'欧美建筑与设计','GLOBAL',['引用','拼贴','戏仿','多义性'],['#b55a72','#418b91','#e2c56d'],'规则可以被引用，也可以被调侃。','以历史引用、符号拼贴和矛盾修辞反对单一现代主义秩序。'),
  make('deconstructivism','解构主义','Deconstructivism','design',1980,2026,'欧美建筑','GLOBAL',['碎裂体块','倾斜轴线','冲突结构','不稳定'],['#6f7680','#262b31','#d05c41'],'建筑像在运动中暂停。','以碎裂、错位和结构冲突制造受控的不稳定空间。'),
  make('parametricism','参数主义','Parametricism','design',1990,2026,'数字建筑与计算设计','GLOBAL',['算法曲面','连续系统','参数','网格'],['#d9e2e3','#526d78','#9bb9a7'],'形式由关系生长，而不是被单独画出。','借助参数和算法组织连续曲面、构件变化与复杂空间系统。'),
  make('anti-design','反设计','Anti Design','design',1965,2026,'意大利激进设计 / 当代平面','GLOBAL',['冲突字体','反功能','噪声','挑衅'],['#f2e849','#e84d3c','#171717'],'当好设计成为规范，拒绝规范就是方法。','主动使用冲突、失衡和反功能姿态质疑主流品味与商业秩序。'),
  make('gothic-art','哥特艺术','Gothic Art','art',1150,1500,'欧洲','EUROPE',['尖拱','彩色玻璃','手抄本','垂直性'],['#24374d','#9b2f45','#d5b76c'],'光穿过彩窗，把石头变成叙事。','中世纪晚期建筑、雕塑、彩窗与手抄本形成指向神圣空间的视觉体系。'),
  make('byzantine-art','拜占庭艺术','Byzantine Art','art',330,1453,'东罗马帝国','E. MEDITERRANEAN',['金色背景','圣像','马赛克','正面性'],['#b88a28','#263f59','#6b2f42'],'金色不是背景，而是超越时间的空间。','以圣像、穹顶马赛克、正面人物和金色光场建立神圣秩序。'),
  make('symbolism','象征主义','Symbolism','art',1880,1910,'欧洲','EUROPE',['神话','梦境','隐喻','主观色彩'],['#3e3651','#8e6a78','#c5a46a'],'可见世界只是精神世界的入口。','以神话、梦、死亡和欲望等隐喻反对自然主义再现。'),
  make('futurism-art','未来主义艺术','Futurism','art',1909,1944,'意大利 / 俄罗斯','EUROPE',['速度线','机器','分解运动','都市'],['#cc3d2f','#263e52','#e0b642'],'速度第一次成为画面的主角。','通过重复轮廓、斜线和机械主题表现现代都市的运动与冲击。'),
  make('graffiti','涂鸦艺术','Graffiti','art',1960,2026,'纽约街头文化 / 全球公共空间','GLOBAL',['喷漆字形','墙面','署名','公共空间'],['#202124','#e23d5b','#39b8b2'],'城市表面也是一种公开出版物。','从署名、列车绘画到大型墙面作品，涂鸦以字形、色彩与地点争夺公共空间中的可见性。'),
  make('light-academia','光明学院','Light Academia','lifestyle',2010,2026,'欧美互联网','GLOBAL',['浅色书房','古典教育','亚麻','日光'],['#e8dfca','#b69b73','#7d7465'],'知识也可以发生在明亮的午后。','用浅色古典空间、艺术学习与温暖日光构成较轻盈的学院想象。'),
  make('old-money','老钱风','Old Money','lifestyle',1900,2026,'欧美上层阶级视觉 / 当代网络','EUROPE / N. AMERICA',['传统剪裁','庄园','马术','低调纹样'],['#213b32','#d1c2a4','#6f5942'],'身份通过惯例而不是标志被看见。','以传统服装、庄园生活和克制材质模拟代际财富的视觉习惯。'),
  make('quiet-luxury','静奢风','Quiet Luxury','lifestyle',1990,2026,'全球高端时尚','GLOBAL',['无标识','优质材质','中性色','精准剪裁'],['#d8d0c2','#6f675d','#20201f'],'价值藏在触感、比例和不显眼的细节里。','用无标识设计、中性色和高质量材料表达克制的奢华。'),
  make('scandinavian','北欧美学','Scandinavian','lifestyle',1930,2026,'北欧','N. EUROPE',['浅木','自然光','功能家具','柔和色'],['#e8e5dc','#a9b5ad','#ba8e67'],'让日常器物安静地服务生活。','自然材料、柔和光线与人本功能塑造北欧居住和产品设计。'),
  make('japanese-minimalism','日式极简','Japanese Minimalism','lifestyle',1950,2026,'日本','JAPAN',['低矮空间','自然材质','收纳','留白'],['#dfd8c8','#8c8271','#30312e'],'空间通过克制获得呼吸。','将传统留白、现代生活组织与自然材料结合，强调秩序和日常使用。'),
  make('showa-retro','昭和复古','Showa Retro','lifestyle',1926,1989,'日本','JAPAN',['喫茶店','家电','招牌字','暖色胶片'],['#b84e39','#d5aa62','#476b68'],'城市记忆停在霓虹、木纹和一杯苏打水里。','昭和时期的商业空间、家电、印刷与街景形成温暖而具体的日本怀旧。'),
  make('american-vintage','美式复古','American Vintage','lifestyle',1940,1980,'美国','N. AMERICA',['公路标牌','餐馆','汽车','广告印刷'],['#c74438','#e2c36d','#3e7080'],'公路、餐馆和广告共同塑造大众年代感。','中世纪美国消费空间、汽车文化与印刷广告构成高辨识度的日常视觉。'),
  make('cafe-aesthetic','咖啡馆美学','Cafe Aesthetic','lifestyle',1900,2026,'全球城市文化','GLOBAL',['暖光','木桌','杯具','街角空间'],['#4e352a','#b98b62','#e0d3bd'],'一间小空间容纳城市的暂停键。','以座椅、杯具、菜单、暖光与街景组织亲密的公共日常。'),
  make('punk-fashion','朋克风','Punk','fashion',1975,2026,'英国 / 美国音乐场景','UK / N. AMERICA',['皮革','别针','DIY','反权威'],['#171717','#bd2632','#d8d2c3'],'衣服成为可以穿着的反对意见。','以改造服装、拼贴文字、皮革和破坏性细节表达反权威立场。'),
  make('emo','Emo','Emo','fashion',1985,2026,'美国音乐场景','N. AMERICA',['侧刘海','紧身服装','乐队图形','情绪表达'],['#17171a','#7e2435','#d7d3d2'],'私人情绪在乐队、照片和穿搭之间公开。','由情绪硬核及其后续流行文化形成的服饰、摄影和网络自我表达。'),
  make('visual-kei','视觉系','Visual Kei','fashion',1980,2026,'日本摇滚文化','JAPAN',['戏剧妆容','夸张发型','舞台服装','性别模糊'],['#261d2d','#9d3159','#d4c8cb'],'舞台人格从音乐延伸到每一根发丝。','日本摇滚场景中以戏剧化妆发、服装和视觉角色构成的表演文化。'),
  make('lolita','洛丽塔','Lolita','fashion',1980,2026,'日本街头时尚','JAPAN',['裙撑轮廓','蕾丝','头饰','历史服装'],['#e6cbd5','#6b4355','#f3eee7'],'历史服装被重写为自主而完整的日常造型。','借鉴洛可可与维多利亚服饰，以严格轮廓和细节体系形成日本街头时尚。'),
  make('harajuku','原宿风','Harajuku','fashion',1980,2026,'日本东京原宿','JAPAN',['混搭','街拍','DIY','青年文化'],['#ff5d7d','#3fbfc0','#f4db42'],'街道就是每天更新的编辑部。','原宿不同世代的青年通过混搭、改造与街拍不断制造新的视觉身份。'),
  make('techwear','科技机能风','Techwear','fashion',1990,2026,'日本 / 欧洲功能服饰','GLOBAL',['防水面料','模块口袋','人体工学','深色'],['#111416','#465158','#9ca5a4'],'服装像一套贴身的城市工具系统。','以高性能材料、活动结构和模块收纳回应复杂城市环境。',{relatedCategories:['industrial']}),
  make('gorpcore','户外机能风','Gorpcore','fashion',2010,2026,'欧美户外与街头文化','GLOBAL',['冲锋衣','抓绒','户外品牌','亮色装备'],['#d86d34','#59705b','#d4c7a6'],'山地装备进入城市以后仍保留功能痕迹。','将徒步、攀登和露营装备转化为城市日常穿搭。'),
  make('darkwear','暗黑系','Darkwear','fashion',2000,2026,'全球网络时尚','GLOBAL',['全黑层次','垂坠','不对称','遮蔽'],['#0d0e0f','#33363a','#858585'],'黑色通过材质和层次获得体积。','以全黑配色、长比例、遮蔽结构和技术面料形成都市暗色穿搭。'),
  make('jirai-kei','地雷系','Jirai Kei','fashion',2010,2026,'日本网络与夜生活文化','JAPAN',['黑粉配色','蝴蝶结','厚底鞋','精致妆容'],['#efb5c8','#292029','#9a4463'],'甜美轮廓与危险情绪同时出现。','以黑粉服装、精致妆容和网络人格形成的日本青年风格。'),
  make('yami-kawaii','病娇可爱','Yami Kawaii','fashion',2010,2026,'日本原宿与网络文化','JAPAN',['粉彩','医疗符号','可爱角色','心理表达'],['#f3bfd9','#9ed4cf','#6f6687'],'可爱被用来讲述不再隐形的痛苦。','将粉彩可爱视觉与医疗、心理健康符号并置的表达文化。'),
  make('guro','猎奇美学','Guro','fashion',1920,2026,'日本艺术与亚文化','JAPAN',['身体变形','恐怖插画','冲击性','禁忌'],['#28181a','#7b2025','#c3a48e'],'身体边界被推向令人不安的位置。','围绕身体恐怖、变形与禁忌意象形成的小众视觉文化。',{hidden:true}),
  make('ero-guro','情色怪诞','Ero Guro','fashion',1920,2026,'日本现代主义文化','JAPAN',['怪诞','颓废','禁忌','都市现代性'],['#2b191c','#9f3139','#d3b29b'],'欲望与怪诞在都市阴影中交叠。','源自日本“情色、怪诞、无意义”文化语境的极端艺术与视觉传统。',{hidden:true}),
  make('film-noir','黑色电影','Film Noir','narrative',1940,1959,'美国电影','N. AMERICA',['低调光','百叶窗影','雨夜城市','道德暧昧'],['#0e0f10','#555b60','#d7d2c9'],'光线把城市切成无法信任的两半。','低调摄影、强烈阴影、都市夜景与宿命叙事共同形成的电影视觉。'),
  make('victorian-gothic','维多利亚哥特','Victorian Gothic','narrative',1837,1901,'英国文学与建筑','UK',['古宅','煤气灯','哀悼服','超自然'],['#211b22','#64404d','#b39b7a'],'现代城市的进步始终带着一间闹鬼的旧宅。','维多利亚时代建筑、服饰与哥特文学共同形成的幽暗历史想象。'),
  make('dark-fantasy','黑暗奇幻','Dark Fantasy','narrative',1970,2026,'全球文学、影视与游戏','GLOBAL',['衰败王国','异兽','诅咒','低照度'],['#1c2324','#66443b','#9a8e68'],'奇迹仍然存在，但它从不保证善意。','把奇幻世界与恐怖、衰败和道德复杂性结合的叙事视觉。'),
  make('space-opera','太空歌剧','Space Opera','narrative',1920,2026,'欧美科幻文学与影视','GLOBAL',['星舰','银河文明','宏大战争','异星宫廷'],['#101b35','#546ec4','#d4b965'],'私人命运被放大到银河尺度。','以星际文明、舰队、异星政治与宏大冒险构成的科幻视觉体系。'),
  make('wasteland','废土美学','Wasteland','narrative',1950,2026,'全球末日题材','GLOBAL',['荒漠','废弃设施','改装载具','资源匮乏'],['#66513c','#b17b45','#c7b58d'],'风沙把旧世界磨成新的生存工具。','集中于荒漠、工业遗迹、改装装备和资源争夺的末日叙事视觉。'),
  make('military-thriller','军事惊悚','Military Thriller','narrative',1960,2026,'影视、小说与电子游戏','GLOBAL',['战术界面','情报室','夜视','现代武器'],['#172229','#4c665e','#9b8e70'],'危险通过坐标、倒计时和通讯被组织。','以现代军事行动、情报系统与高压决策构成的现实主义叙事视觉。'),
  make('wuxia','武侠美学','Wuxia','narrative',1900,2026,'中国文学、电影与游戏','CHINA / E. ASIA',['山水','剑术','江湖','古装'],['#1f3030','#8d3d31','#c9b995'],'身体穿过山水，也穿过礼法与恩怨。','由武侠文学、戏曲、电影与游戏共同塑造的江湖、身法和东方空间美学。'),
  make('lovecraftian','克苏鲁美学','Lovecraftian','narrative',1920,2026,'美国文学 / 全球文化','GLOBAL',['宇宙恐怖','不可名状','古代遗迹','理智崩塌'],['#142324','#3f6860','#9c8f67'],'人类尺度在宇宙面前突然失效。','以不可理解的古老存在、深海、遗迹与认知崩塌构成宇宙恐怖视觉。')
];

const normalizedCore = coreAesthetics
  .filter(item => item.id !== 'acid-house')
  .map(item => {
    const category = primaryOverrides[item.id] || categoryMap[item.category] || item.category;
    const [startYear, endYear] = inferYears(item);
    return { ...item, ...(displayOverrides[item.id] || {}), category, categories: [category, ...(relatedCategoryOverrides[item.id] || [])], startYear, endYear, galleryCount: 50, hidden: false };
  });

export const aesthetics = [...normalizedCore, ...additions];
export const categories = categoryDefinitions.map(category => ({
  ...category,
  count: aesthetics.filter(item => !item.hidden && item.categories.includes(category.id)).length
}));
export const publicAesthetics = aesthetics.filter(item => !item.hidden);
export { journal, sources };

export const eraPresets = [
  { id: 'pre1900', label: '1900年前', start: 0, end: 1899 },
  { id: '1900-1950', label: '1900—1950', start: 1900, end: 1950 },
  { id: '1950-1980', label: '1950—1980', start: 1950, end: 1980 },
  { id: '1980-2000', label: '1980—2000', start: 1980, end: 2000 },
  { id: '2000-2010', label: '2000—2010', start: 2000, end: 2010 },
  { id: 'post2010', label: '2010以后', start: 2010, end: 2026 }
];

export const activeInYear = (item, year) => item.startYear <= year && item.endYear >= year;
export const overlapsEra = (item, era) => item.startYear <= era.end && item.endYear >= era.start;
