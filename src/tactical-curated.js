const records = [
  ['tactical-14.jpg', 'Green Berets preparing to breach an entryway', 'U.S. Army photo by Staff Sgt. William Howard', '2020-04-25', 'https://commons.wikimedia.org/wiki/File:Green_Beret_breach_training_at_ATG,_25_April_2020.jpg', '完整特战装备与小队协同'],
  ['tactical-01.jpg', 'Naval Special Warfare close-quarters training 01', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-30', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_Bilateral_Training_with_Allied_Special_Operations_Forces_(8196635).jpg', '夜视轮廓与低照度行动'],
  ['tactical-02.jpg', 'Naval Special Warfare close-quarters training 02', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-30', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_Bilateral_Training_with_Allied_Special_Operations_Forces_(8196636).jpg', '板甲、头盔与室内推进'],
  ['tactical-03.jpg', 'Naval Special Warfare close-quarters training 03', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-30', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_Bilateral_Training_with_Allied_Special_Operations_Forces_(8196637).jpg', '双人堆叠与现代步枪系统'],
  ['tactical-04.jpg', 'Cyprus special operations urban training 01', 'U.S. Marine Corps photo by Staff Sgt. Ryan Sammet', '2024-10-02', 'https://commons.wikimedia.org/wiki/File:24th_MEU_(SOC)_MSPF_Conducts_Urban_Operations_Training_Alongside_Republic_of_Cyprus_Special_Operations_Forces_(8676315).jpg', 'Multicam、板甲与城市战术'],
  ['tactical-05.jpg', 'Cyprus special operations urban training 02', 'U.S. Marine Corps photo by Staff Sgt. Ryan Sammet', '2024-10-02', 'https://commons.wikimedia.org/wiki/File:24th_MEU_(SOC)_MSPF_Conducts_Urban_Operations_Training_Alongside_Republic_of_Cyprus_Special_Operations_Forces_(8676316).jpg', '战术腰带与动作细节'],
  ['tactical-06.jpg', 'Cyprus special operations urban training 03', 'U.S. Marine Corps photo by Staff Sgt. Ryan Sammet', '2024-10-02', 'https://commons.wikimedia.org/wiki/File:24th_MEU_(SOC)_MSPF_Conducts_Urban_Operations_Training_Alongside_Republic_of_Cyprus_Special_Operations_Forces_(8676319).jpg', '室内小队与抑制器配置'],
  ['tactical-07.jpg', 'Naval Special Warfare breacher training 01', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-13', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_Breacher_Training_with_Romanian_Special_Operations_Forces_(8142225).jpg', '破门工具与胸挂系统'],
  ['tactical-08.jpg', 'Naval Special Warfare breacher training 02', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-13', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_Breacher_Training_with_Romanian_Special_Operations_Forces_(8142226).jpg', '护目、背负与工具协作'],
  ['tactical-09.jpg', 'Naval Special Warfare breacher training 03', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-13', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_Breacher_Training_with_Romanian_Special_Operations_Forces_(8142227).jpg', '破拆装备与训练现场'],
  ['tactical-10.jpg', 'Naval Special Warfare CQC training 01', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-14', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_CQC_Training_with_Romanian_Special_Operations_Forces_(8142232).jpg', '通讯耳机与小队协同'],
  ['tactical-11.jpg', 'Naval Special Warfare CQC training 02', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-14', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_CQC_Training_with_Romanian_Special_Operations_Forces_(8142233).jpg', '头盔附件与紧凑步枪'],
  ['tactical-12.jpg', 'Naval Special Warfare CQC training 03', 'U.S. Navy photo by Petty Officer 1st Class William Carlisle', '2023-11-14', 'https://commons.wikimedia.org/wiki/File:NSW_Conducts_CQC_Training_with_Romanian_Special_Operations_Forces_(8142234).jpg', '野外队形与现代装备'],
  ['tactical-13.jpg', '7th Special Forces Group night-vision training', 'Tech. Sgt. Barry Loo', '2017-03-07', 'https://commons.wikimedia.org/wiki/File:7th_Special_Forces_Group_soldier,_Emerald_Warrior_17_170307-F-IJ878-1025_(cropped).jpg', '单筒夜视与绿色成像'],
  ['tactical-15.jpg', 'Joint special forces team deploying from a CV-22', 'U.S. Air Force photo by Senior Airman Clayton Cupit', '2018-02-26', 'https://commons.wikimedia.org/wiki/File:A_joint_special_forces_team_moves_together_out_of_an_Air_Force_CV-22_Osprey_aircraft,_Feb._26,_2018.jpg', '航空投送与小队推进']
];

export const tacticalGallery = records.map(([file, title, creator, date, sourceUrl, subject]) => ({
  title,
  creator,
  date,
  license: 'Public domain',
  sourceUrl,
  provider: 'Wikimedia Commons / U.S. Department of Defense',
  src: `./assets/gallery/${file}`,
  subject
}));
