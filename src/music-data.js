export const musicCategories = [
  { id: 'hip-hop', name: '嘻哈', en: 'Hip-Hop', note: '街区叙事、节拍技术与地域身份' },
  { id: 'jazz', name: '爵士', en: 'Jazz', note: '即兴语言、城市夜生活与现代舞台' },
  { id: 'electronic', name: '电子音乐', en: 'Electronic', note: '机器节奏、俱乐部空间与灯光系统' },
  { id: 'rock', name: '摇滚', en: 'Rock', note: '乐队文化、青年反叛与现场表演' },
  { id: 'metal', name: '金属', en: 'Metal', note: '极端音色、神话图形与地下共同体' },
  { id: 'pop', name: '流行音乐', en: 'Pop', note: '大众传播、明星工业与时代造型' },
  { id: 'japanese', name: '日本音乐文化', en: 'Japanese Music Culture', note: '都市消费、街头时尚与本土场景' },
  { id: 'experimental', name: '实验音乐', en: 'Experimental', note: '噪声、声音艺术与边界探索' }
];

const m = (id, name, en, categories, startYear, origin, region, artists, works, characteristics, visualElements, fashionElements, stageVisuals, relatedAesthetics, parent = '') => ({
  id, name, en, category: categories[0], categories, startYear, endYear: 2026, origin, region, artists, works,
  characteristics, visualElements, fashionElements, stageVisuals, relatedAesthetics, parent
});

export const musicStyles = [
  m('east-coast-hip-hop','东海岸嘻哈','East Coast Hip-Hop',['hip-hop'],1973,'纽约布朗克斯','New York, USA',['DJ Kool Herc','Grandmaster Flash','Nas'],['The Message','Illmatic'],'采样驱动、复杂押韵与城市叙事',['街区摄影','地铁涂鸦','黑白纪实'],['运动套装','棒球帽','宽松夹克'],'MC、DJ 与近距离街区舞台',['graffiti','american-vintage'],'Hip-Hop'),
  m('west-coast-hip-hop','西海岸嘻哈','West Coast Hip-Hop',['hip-hop'],1980,'洛杉矶与奥克兰','California, USA',['N.W.A','Dr. Dre','Snoop Dogg'],['Straight Outta Compton','The Chronic'],'放克采样、松弛律动与西海岸叙事',['低底盘汽车','棕榈街道','暖色胶片'],['工装衬衫','宽松卡其裤','运动鞋'],'大型户外舞台与汽车文化视觉',['american-vintage'],'Hip-Hop'),
  m('southern-hip-hop','南方嘻哈','Southern Hip-Hop',['hip-hop'],1985,'亚特兰大、休斯敦、新奥尔良','Southern USA',['OutKast','UGK','Lil Wayne'],['Aquemini','Ridin’ Dirty'],'低频、地域口音与多中心制作传统',['南方街区','糖果漆汽车','俱乐部摄影'],['宽松球衣','珠宝','地区品牌'],'重低音俱乐部与大型舞台',['mcbling'],'Hip-Hop'),
  m('trap','Trap','Trap',['hip-hop'],1990,'美国南部','Atlanta, USA',['T.I.','Gucci Mane','Future'],['Trap Muzik','DS2'],'滚奏踩镲、808 低频与冷峻循环',['夜间都市','高对比闪光','奢侈符号'],['设计师街装','厚重珠宝','运动鞋'],'LED 墙、烟雾与强脉冲灯光',['corporate-dystopia','mcbling'],'Southern Hip-Hop'),
  m('drill','Drill','Drill',['hip-hop'],2010,'芝加哥，后扩展至伦敦与纽约','Chicago / London / New York',['Chief Keef','Pop Smoke','Headie One'],['Finally Rich','Meet the Woo'],'滑动低频、冷硬鼓组与街头纪实',['阴天街区','蒙面群像','手持影像'],['羽绒服','运动套装','面罩'],'低照度、频闪与高密度人群',['military','darkwear'],'Hip-Hop'),
  m('memphis-rap','孟菲斯说唱','Memphis Rap',['hip-hop'],1990,'美国田纳西州孟菲斯','Memphis, USA',['Three 6 Mafia','DJ Spanish Fly','Tommy Wright III'],['Mystic Stylez','On the Run'],'低保真磁带、恐怖采样与重复节奏',['复印封面','VHS噪点','南方哥特'],['街头运动装','皮革','金色饰品'],'地下场地与低成本录像质感',['analog-horror','goth'],'Southern Hip-Hop'),
  m('cloud-rap','云说唱','Cloud Rap',['hip-hop'],2008,'互联网说唱场景','GLOBAL / INTERNET',['Lil B','A$AP Rocky','Yung Lean'],['Live. Love. A$AP','Unknown Memory'],'漂浮合成器、松散节奏与网络化情绪',['云层','早期网络图形','柔焦自拍'],['网络街装','宽松轮廓','混搭品牌'],'投影、雾化光与梦境影像',['cloudcore','webcore'],'Hip-Hop'),
  m('rage-rap','狂暴说唱','Rage Rap',['hip-hop'],2019,'美国网络说唱','USA / INTERNET',['Playboi Carti','Trippie Redd','Yeat'],['Whole Lotta Red','Trip at Knight'],'尖锐合成器、失真低频与高能重复',['红黑高对比','吸血鬼图形','游戏化字体'],['暗色街装','夸张配饰','皮革'],'频闪、巨型屏幕与高强度人群',['goth','cyberpunk'],'Trap'),

  m('traditional-jazz','传统爵士','Traditional Jazz',['jazz'],1900,'新奥尔良','New Orleans, USA',['Louis Armstrong','King Oliver','Jelly Roll Morton'],['West End Blues','Dippermouth Blues'],'集体即兴、铜管对话与行进节奏',['新奥尔良街景','铜管乐器','早期摄影'],['西装','礼帽','舞鞋'],'小型舞厅与街头乐队',['art-deco'],'Jazz'),
  m('swing','摇摆乐','Swing',['jazz'],1930,'美国大城市舞厅','USA',['Duke Ellington','Count Basie','Benny Goodman'],['Take the “A” Train','Sing, Sing, Sing'],'大乐队编制、强烈摇摆律动与舞蹈性',['装饰艺术舞厅','大乐队队形','聚光灯'],['晚礼服','宽肩西装','舞裙'],'大型舞厅、乐队台与成排谱架',['art-deco'],'Jazz'),
  m('bebop','比博普','Bebop',['jazz'],1940,'纽约哈莱姆','New York, USA',['Charlie Parker','Dizzy Gillespie','Thelonious Monk'],['Ko-Ko','A Night in Tunisia'],'高速和声、复杂旋律与小编制即兴',['夜间俱乐部','烟雾摄影','抽象唱片封面'],['窄身西装','贝雷帽','眼镜'],'紧凑俱乐部与演奏者中心灯光',['film-noir'],'Jazz'),
  m('cool-jazz','冷爵士','Cool Jazz',['jazz'],1949,'美国西海岸与纽约','USA',['Miles Davis','Chet Baker','Dave Brubeck'],['Birth of the Cool','Time Out'],'克制音色、空间感与精细编排',['中世纪现代空间','冷色摄影','几何封面'],['简洁西装','衬衫','学院式造型'],'低照度剧场与安静舞台',['swiss-style','minimalism'],'Jazz'),
  m('fusion-jazz','融合爵士','Jazz Fusion',['jazz'],1968,'美国与欧洲','GLOBAL',['Miles Davis','Weather Report','Herbie Hancock'],['Bitches Brew','Head Hunters'],'电声乐器、摇滚节奏与爵士即兴',['迷幻封面','模拟合成器','未来服装'],['七十年代剪裁','亮色图案','舞台服'],'扩声系统、彩色灯光与键盘阵列',['psychedelia','retrofuturism'],'Jazz'),

  m('house','浩室','House',['electronic'],1980,'芝加哥','Chicago, USA',['Frankie Knuckles','Marshall Jefferson','Larry Heard'],['Your Love','Move Your Body'],'四四拍、灵魂采样与持续舞池律动',['仓库空间','简洁传单','城市夜景'],['宽松舞衣','运动装','俱乐部造型'],'镜球、基础灯架与包围式音响',['rave'],'Electronic'),
  m('deep-house','深度浩室','Deep House',['electronic'],1985,'芝加哥 / 纽约','USA',['Larry Heard','Kerri Chandler','Moodymann'],['Can You Feel It','Atmosphere'],'温暖和弦、深沉低频与克制人声',['暗色俱乐部','暖光','极简唱片封面'],['低调俱乐部服饰','深色层次'],'低照度、暖色灯与亲密舞池',['minimalism'],'House'),
  m('acid-house','酸浩室','Acid House',['electronic'],1985,'芝加哥，后在英国扩张','Chicago / UK',['Phuture','DJ Pierre','808 State'],['Acid Tracks','Pacific State'],'TB-303 共振低音与催眠式循环',['黄色笑脸','荧光传单','仓库派对'],['宽松运动服','桶帽','荧光配件'],'频闪、烟雾、激光与非法仓库空间',['acid-design','rave'],'House'),
  m('techno','科技舞曲','Techno',['electronic'],1980,'底特律','Detroit, USA',['Juan Atkins','Derrick May','Kevin Saunderson'],['No UFO’s','Strings of Life'],'机器节奏、未来主义与重复结构',['工业城市','黑银图形','机器意象'],['黑色功能服','简洁街装'],'暗场、频闪与模块化视觉',['industrial','retrofuturism'],'Electronic'),
  m('detroit-techno','底特律科技舞曲','Detroit Techno',['electronic'],1981,'美国底特律','Detroit, USA',['Model 500','Rhythim Is Rhythim','Underground Resistance'],['Clear','The Bells'],'机械律动、未来灵魂与后工业城市想象',['汽车工业','未来城市','地下组织标识'],['黑色夹克','工业工装','未来配件'],'极简灯光与机器化舞台',['industrial','afrofuturism'],'Techno'),
  m('industrial-techno','工业科技舞曲','Industrial Techno',['electronic'],1990,'欧洲地下俱乐部','EUROPE',['Regis','Surgeon','Paula Temple'],['Gymnastics','Force + Form'],'高压鼓组、金属噪声与严酷重复',['混凝土空间','警示标识','钢铁结构'],['全黑服装','工装','战术配件'],'频闪、烟雾与巨大工业空间',['brutalism','industrial'],'Techno'),
  m('drum-and-bass','鼓打贝斯','Drum and Bass',['electronic'],1990,'英国','UK',['Goldie','Roni Size','LTJ Bukem'],['Timeless','New Forms'],'高速碎拍、重低频与复杂采样',['都市夜行','未来字体','高速模糊'],['运动装','街头夹克','球鞋'],'快速灯光、MC 与低频导向舞台',['y2k','cyberpunk'],'Electronic'),
  m('jungle','丛林舞曲','Jungle',['electronic'],1991,'英国黑人俱乐部文化','UK',['Shy FX','LTJ Bukem','A Guy Called Gerald'],['Original Nuttah','Terminator'],'切碎 breakbeat、雷鬼低频与采样文化',['地下电台','丛林图形','复印传单'],['运动服','迷彩','街头服饰'],'临时舞场、低频音箱与快速频闪',['rave','old-web'],'Electronic'),
  m('idm','智能舞曲','IDM',['electronic','experimental'],1992,'英国与全球电子实验场景','GLOBAL',['Aphex Twin','Autechre','Boards of Canada'],['Selected Ambient Works 85–92','Tri Repetae'],'非标准节拍、声音设计与抽象结构',['生成图形','技术极简','故障影像'],['低调日常服饰','功能服'],'视听同步、抽象投影与非传统舞台',['glitchcore','vectordelia'],'Electronic'),
  m('ambient','氛围音乐','Ambient',['electronic'],1970,'英国与全球实验音乐','GLOBAL',['Brian Eno','Tangerine Dream','Hiroshi Yoshimura'],['Ambient 1: Music for Airports','Green'],'缓慢变化、空间音色与非叙事聆听',['自然环境','柔和渐变','空旷建筑'],['宽松极简','自然材质'],'沉浸音响、环境投影与静态光场',['liminal-space','minimalism'],'Electronic'),

  m('classic-rock','经典摇滚','Classic Rock',['rock'],1960,'英国与美国','UK / USA',['The Beatles','Led Zeppelin','The Rolling Stones'],['Abbey Road','Led Zeppelin IV'],'吉他主导、乐队编制与专辑文化',['胶片摄影','巡演海报','模拟设备'],['牛仔布','皮革','长发'],'大型扩声、背线设备与聚光灯',['american-vintage'],'Rock'),
  m('punk-rock','朋克摇滚','Punk Rock',['rock'],1974,'纽约与伦敦','USA / UK',['Ramones','Sex Pistols','The Clash'],['Ramones','London Calling'],'短促直接、DIY 制作与反权威表达',['剪贴海报','复印刊物','手写字体'],['皮夹克','破损服装','别针'],'低矮舞台、高密度观众与直接照明',['punk-fashion','anti-design'],'Rock'),
  m('post-punk','后朋克','Post-Punk',['rock'],1977,'英国与欧洲','UK / EUROPE',['Joy Division','Talking Heads','Siouxsie and the Banshees'],['Unknown Pleasures','Remain in Light'],'低温律动、实验制作与艺术化结构',['黑白摄影','现代主义排版','工业城市'],['深色衬衫','极简西装','个性妆容'],'冷色侧光、烟雾与几何布景',['swiss-style','goth'],'Punk Rock'),
  m('alternative-rock','另类摇滚','Alternative Rock',['rock'],1980,'欧美独立音乐网络','USA / UK',['R.E.M.','Pixies','Radiohead'],['Doolittle','OK Computer'],'独立制作传统与多样吉他语言',['独立刊物','实验摄影','大学电台'],['二手服装','简洁街装'],'剧场与音乐节并行的弹性视觉',['twee'],'Rock'),
  m('grunge','垃圾摇滚','Grunge',['rock'],1985,'美国西雅图','Seattle, USA',['Nirvana','Soundgarden','Pearl Jam'],['Nevermind','Superunknown'],'厚重失真、强弱反差与厌倦情绪',['潮湿城市','粗粒胶片','复印海报'],['法兰绒','旧牛仔','工装靴'],'直接白光、简陋布景与高音量',['nostalgiacore'],'Alternative Rock'),
  m('shoegaze','盯鞋','Shoegaze',['rock'],1988,'英国与爱尔兰','UK / IRELAND',['My Bloody Valentine','Slowdive','Ride'],['Loveless','Souvlaki'],'吉他噪声墙、朦胧人声与内向动态',['过曝照片','模糊花朵','抽象色场'],['宽松毛衣','低调日常服'],'逆光、浓雾与柔焦投影',['dreamcore','cloudcore'],'Alternative Rock'),
  m('gothic-rock','哥特摇滚','Gothic Rock',['rock'],1979,'英国后朋克场景','UK',['Bauhaus','The Cure','Sisters of Mercy'],['In the Flat Field','Disintegration'],'阴郁贝斯、空间吉他与戏剧人声',['黑白肖像','宗教建筑','夜间雾气'],['黑色服装','戏剧妆容','网纱'],'低调红蓝光、烟雾与剪影',['goth','victorian-gothic'],'Post-Punk'),

  m('heavy-metal','重金属','Heavy Metal',['metal'],1968,'英国与美国','UK / USA',['Black Sabbath','Judas Priest','Iron Maiden'],['Paranoid','The Number of the Beast'],'重型吉他、强力节奏与宏大表演',['金属字标','幻想插画','机械舞台'],['皮革','铆钉','乐队T恤'],'大型灯架、烟火与扩声音墙',['mechanical','dark-fantasy'],'Metal'),
  m('black-metal','黑金属','Black Metal',['metal'],1980,'挪威与欧洲地下场景','N. EUROPE',['Mayhem','Darkthrone','Emperor'],['De Mysteriis Dom Sathanas','In the Nightside Eclipse'],'高速拨弦、尖锐音色与极端氛围',['黑白森林','尸妆','难辨字标'],['全黑皮革','钉饰','长发'],'极暗照明、烛火与森林意象',['forestcore','goth'],'Extreme Metal'),
  m('death-metal','死亡金属','Death Metal',['metal'],1985,'美国佛罗里达与全球地下场景','GLOBAL',['Death','Morbid Angel','Cannibal Corpse'],['Scream Bloody Gore','Altars of Madness'],'低音调吉他、快速鼓击与极端唱腔',['解剖插画','尖刺字标','高密度封面'],['黑色乐队服','工装裤','长发'],'高强度灯光、密集设备与直接表演',['guro','mechanical'],'Extreme Metal'),
  m('doom-metal','厄运金属','Doom Metal',['metal'],1970,'英国与全球金属场景','GLOBAL',['Candlemass','Saint Vitus','Electric Wizard'],['Epicus Doomicus Metallicus','Dopethrone'],'缓慢重型 riff、低沉音色与压迫空间',['荒原','宗教绘画','复古恐怖'],['深色长衣','复古乐队服'],'低速灯光、浓烟与巨大音箱墙',['dark-fantasy','wasteland'],'Metal'),
  m('symphonic-metal','交响金属','Symphonic Metal',['metal'],1990,'欧洲','EUROPE',['Nightwish','Within Temptation','Epica'],['Oceanborn','The Silent Force'],'金属编制与管弦、歌剧人声结合',['幻想建筑','华丽纹章','史诗摄影'],['戏剧礼服','皮革','历史元素'],'大型布景、管弦编排与电影化灯光',['baroque','dark-fantasy'],'Metal'),

  m('mainstream-pop','主流流行','Mainstream Pop',['pop'],1950,'全球唱片与广播工业','GLOBAL',['Michael Jackson','Madonna','Beyoncé'],['Thriller','Lemonade'],'强旋律、制作标准化与大众传播适配',['明星摄影','品牌化色彩','音乐录像'],['趋势服饰','舞台定制造型'],'大型舞美、编舞与屏幕叙事',['mcbling'],'Pop'),
  m('city-pop','城市流行','City Pop',['japanese','pop'],1970,'日本城市消费文化','JAPAN',['Tatsuro Yamashita','Mariya Takeuchi','Anri'],['For You','Timely!!'],'融合流行、放克与软摇滚的都市制作',['海滨都市','汽车','插画唱片封面'],['昭和都市休闲装','精致衬衫'],'乐队演奏、都市夜景与暖色灯光',['showa-retro','american-vintage'],'Japanese Pop'),
  m('dream-pop','梦幻流行','Dream Pop',['pop'],1980,'英国与欧美独立音乐','GLOBAL',['Cocteau Twins','Beach House','Mazzy Star'],['Heaven or Las Vegas','Bloom'],'空灵人声、混响吉他与柔和层次',['柔焦人像','夜色渐变','朦胧自然'],['复古轻盈服装','柔色层次'],'雾、逆光与慢速影像',['dreamcore','cloudcore'],'Pop'),
  m('hyperpop','超流行','Hyperpop',['pop'],2010,'全球互联网音乐场景','INTERNET / GLOBAL',['SOPHIE','A. G. Cook','Charli XCX'],['PRODUCT','how i’m feeling now'],'高度压缩、夸张音色与网络拼贴',['液态金属','过曝色彩','三维变形'],['未来街装','夸张妆发','混合材质'],'高亮屏幕、失真图形与网络化表演',['acid-design','y2k'],'Pop'),
  m('k-pop','韩国流行','K-Pop',['pop'],1990,'韩国娱乐工业','SOUTH KOREA',['Seo Taiji and Boys','Girls’ Generation','BTS'],['Into the New World','Love Yourself: Tear'],'高密度制作、视觉概念与团体表演',['概念摄影','精密编舞','系列化标识'],['舞台定制','趋势街装','统一造型'],'多层LED、机械舞台与同步灯光',['y2k','corporate-dystopia'],'Pop'),

  m('visual-kei-music','视觉系音乐','Visual Kei',['japanese','rock'],1980,'日本摇滚场景','JAPAN',['X Japan','Luna Sea','Malice Mizer'],['Blue Blood','Merveilles'],'摇滚、金属与哥特表演的多样融合',['戏剧肖像','华丽字标','叙事舞台照'],['夸张发型','历史服装','性别模糊造型'],'剧场化布景、角色表演与强灯光',['visual-kei','goth'],'Japanese Rock'),
  m('j-rock','日本摇滚','J-Rock',['japanese','rock'],1960,'日本','JAPAN',['Happy End','B’z','Number Girl'],['Kazemachi Roman','School Girl Distortional Addict'],'日本本土摇滚传统与多样乐队语言',['城市现场','杂志摄影','动画关联视觉'],['街头服装','乐队造型'],'Live house、音乐节与剧场舞台',['showa-retro'],'Rock'),
  m('future-funk','未来放克','Future Funk',['japanese','electronic'],2012,'全球互联网 / 日本流行采样文化','INTERNET / GLOBAL',['Macross 82-99','Yung Bae','Saint Pepsi'],['A Million Miles Away','Bae'],'City Pop 与放克采样、切片循环和舞曲节拍',['动漫片段','VHS色彩','日文广告'],['千禧复古','街头休闲'],'动态图形、循环影像与霓虹灯',['vaporwave','showa-retro'],'Vaporwave'),

  m('noise','噪音音乐','Noise',['experimental'],1913,'未来主义声音实验 / 全球地下文化','GLOBAL',['Luigi Russolo','Merzbow','Whitehouse'],['The Art of Noises','Pulse Demon'],'非传统噪声、极端音量与声音物质性',['黑白复印','设备堆叠','抽象波形'],['地下场景日常服','工业工装'],'设备本身、极简照明与高压声音',['industrial','anti-design'],'Experimental'),
  m('glitch-music','故障音乐','Glitch Music',['experimental','electronic'],1990,'数字声音实验','GLOBAL',['Oval','Ryoji Ikeda','Alva Noto'],['94diskont','Dataplex'],'数字错误、微小切片与数据化节奏',['像素断裂','数据网格','单色屏幕'],['极简黑白','技术服饰'],'精密视听同步与数据投影',['glitchcore','minimalism'],'Experimental Electronic'),
  m('dark-ambient','暗黑氛围','Dark Ambient',['experimental','electronic'],1980,'工业与实验音乐场景','GLOBAL',['Lustmord','Coil','Atrium Carceri'],['Heresy','Stalker'],'低频持续音、环境采样与幽暗空间感',['废弃设施','深黑画面','仪式图形'],['深色长衣','低调服装'],'黑场、极低照度与沉浸声场',['voidcore','industrial'],'Ambient'),
  m('experimental-electronic','实验电子','Experimental Electronic',['experimental','electronic'],1950,'电子音乐实验室与全球艺术场景','GLOBAL',['Karlheinz Stockhausen','Suzanne Ciani','Holly Herndon'],['Kontakte','Buchla Concerts 1975'],'新技术、非标准结构与跨媒介声音研究',['实验室设备','模块合成器','生成影像'],['艺术场景服饰','技术工作服'],'多声道、传感器与实时生成视觉',['laboratory-core','net-art'],'Experimental')
];

export const musicCategoryById = id => musicCategories.find(category => category.id === id);
export const musicStyleById = id => musicStyles.find(style => style.id === id);
export const musicActiveInYear = (style, year) => style.startYear <= year && style.endYear >= year;
