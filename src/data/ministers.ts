/**
 * ministers.ts — 臣子数据
 *
 * 12 位历史名臣，各具特色。纯数据文件，不含运行时逻辑。
 */

import type { Minister } from '../types/game'

/** 臣子数据池 */
export const MINISTERS: Minister[] = [
  {
    id: 'zhang_juzheng',
    name: '张居正',
    title: '宰相',
    description: '万历首辅，推行一条鞭法，整顿吏治，国库充盈。才华横溢，手段凌厉，权倾朝野。',
    skill: { stat: 'gold', value: 8 },
    loyalty: 85,
    ambition: 80,
  },
  {
    id: 'qi_jiguang',
    name: '戚继光',
    title: '大将军',
    description: '抗倭名将，组建戚家军，百战百胜。编练新军，改良火器，武功赫赫。',
    skill: { stat: 'military', value: 9 },
    loyalty: 95,
    ambition: 30,
  },
  {
    id: 'hai_rui',
    name: '海瑞',
    title: '都察御史',
    description: '刚正不阿，清廉自守，敢于直谏天子。百姓称为"海青天"，贪官闻之色变。',
    skill: { stat: 'stability', value: 7 },
    loyalty: 98,
    ambition: 15,
  },
  {
    id: 'wei_zhongxian',
    name: '魏忠贤',
    title: '司礼监掌印',
    description: '权倾朝野的大太监，结党营私，打压异己。天启年间号称"九千岁"，其党羽遍布朝堂。',
    skill: { stat: 'gold', value: 5 },
    loyalty: 20,
    ambition: 90,
  },
  {
    id: 'he_shen',
    name: '和珅',
    title: '户部尚书',
    description: '精明狡黠，善于敛财。深得乾隆宠信，官至军机大臣。家中金银珠宝堆积如山。',
    skill: { stat: 'gold', value: 10 },
    loyalty: 30,
    ambition: 85,
  },
  {
    id: 'di_renjie',
    name: '狄仁杰',
    title: '大理寺卿',
    description: '断案如神，明察秋毫。武则天时期名臣，刚正不阿，心系社稷，有再造唐室之功。',
    skill: { stat: 'stability', value: 8 },
    loyalty: 92,
    ambition: 25,
  },
  {
    id: 'yue_fei',
    name: '岳飞',
    title: '枢密使',
    description: '精忠报国，岳家军所向披靡。文武双全，治军严明，一生以收复中原为志。',
    skill: { stat: 'military', value: 10 },
    loyalty: 99,
    ambition: 20,
  },
  {
    id: 'liu_jin',
    name: '刘瑾',
    title: '司礼监太监',
    description: '正德年间权宦，号称"立皇帝"。把持朝政，排斥忠良，贪赃枉法，终被凌迟处死。',
    skill: { stat: 'gold', value: 4 },
    loyalty: 15,
    ambition: 88,
  },
  {
    id: 'bao_zheng',
    name: '包拯',
    title: '开封府尹',
    description: '铁面无私，不畏权贵。民间称为"包青天"，审案公正廉明，百姓拥戴。',
    skill: { stat: 'stability', value: 8 },
    loyalty: 96,
    ambition: 10,
  },
  {
    id: 'zhuge_liang',
    name: '诸葛亮',
    title: '军师',
    description: '卧龙先生，运筹帷幄，决胜千里。鞠躬尽瘁，死而后已。千古名相，万世师表。',
    skill: { stat: 'prestige', value: 9 },
    loyalty: 99,
    ambition: 35,
  },
  {
    id: 'zheng_he',
    name: '郑和',
    title: '内官监太监',
    description: '七下西洋，扬我国威。船队远达非洲东岸，四海诸国莫不宾服。开拓海疆，功在千秋。',
    skill: { stat: 'prestige', value: 7 },
    loyalty: 90,
    ambition: 20,
  },
  {
    id: 'li_shimin_advisor',
    name: '房玄龄',
    title: '中书令',
    description: '贞观名相，善于谋划，为唐太宗左膀右臂。知人善任，虚怀若谷，有"房谋杜断"之美誉。',
    skill: { stat: 'population', value: 6 },
    loyalty: 94,
    ambition: 22,
  },
]
