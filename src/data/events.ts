/**
 * events.ts — 游戏事件数据
 *
 * 41 个 GameEvent 对象，覆盖教程、后宫、灾难、军事、朝政、经济、外交、文化、皇帝个人等类别。
 * 纯数据文件，不含运行时逻辑。
 */

import type { GameEvent } from '../types/game'

/** 全部游戏事件 */
export const EVENTS: GameEvent[] = [
  // ========================================================================
  // TUTORIAL / 教程
  // ========================================================================
  {
    id: 'tutorial_dowager',
    title: '太后塞人',
    description:
      '太后在慈宁宫召见你，说为你物色了一门亲事——当朝宰相的嫡女，温婉贤淑，知书达理。你若应下，宰相一党必为助力；若拒绝，只怕太后面上不好看。',
    category: 'tutorial',
    conditions: [{ stat: 'prestige', min: 0, minTurn: 1, maxTurn: 1 }],
    baseWeight: 10,
    cooldown: 999,
    maxOccurrences: 1,
    minDifficulty: 0,
    isForced: true,
    choices: [
      {
        id: 'tutorial_accept',
        text: '恭敬从命',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'stability', delta: 5 },
        ],
        outcomeText: '你恭恭敬敬行了大礼，太后龙颜大悦。宰相亲至谢恩，满朝文武皆赞陛下孝顺通达。',
        flags: { married_dowager_choice: true },
      },
      {
        id: 'tutorial_decline',
        text: '婉言谢绝',
        effects: [
          { stat: 'prestige', delta: -5 },
          { stat: 'stability', delta: -3 },
          { stat: 'health', delta: 3 },
        ],
        outcomeText: '你以"国事为重"婉拒了太后。太后虽未动怒，但拂袖而去。宰相面色阴沉，朝堂暗流涌动。',
      },
    ],
  },

  // ========================================================================
  // HAREM / 后宫
  // ========================================================================
  {
    id: 'selection_time',
    title: '三年选秀',
    description:
      '三年一度的选秀大典开始了！各地秀女云集京城，环肥燕瘦，各有千秋。太常寺已拟好名册，请陛下定夺。',
    category: 'harem',
    conditions: [{ stat: 'prestige', min: 0 }],
    baseWeight: 8,
    cooldown: 36,
    maxOccurrences: 10,
    minDifficulty: 0,
    choices: [
      {
        id: 'selection_personally',
        text: '亲自挑选',
        effects: [
          { stat: 'gold', delta: -50 },
          { stat: 'prestige', delta: 3 },
          { stat: 'health', delta: -2 },
        ],
        outcomeText: '你亲临选秀大典，从百余名秀女中择其佼佼者二人纳入后宫。佳人入宫，六宫增色。',
        flags: { add_concubines: true },
      },
      {
        id: 'selection_delegate',
        text: '交由礼部',
        effects: [
          { stat: 'gold', delta: -20 },
          { stat: 'prestige', delta: 1 },
        ],
        outcomeText: '礼部依制选秀，择一人送入后宫。虽非你亲自过目，倒也省心。',
        flags: { add_random_concubine: true },
      },
      {
        id: 'selection_skip',
        text: '暂停选秀',
        effects: [{ stat: 'prestige', delta: 5 }],
        outcomeText: '你下旨暂停选秀，以示勤政爱民。朝臣纷纷上表称颂圣德。',
      },
    ],
  },
  {
    id: 'concubine_jealousy',
    title: '后宫争宠',
    description:
      '近日后宫不太平。两位妃嫔因争宠而大闹了一场，贵妃哭诉到你面前，说淑妃在背后诋毁她。你该如何处置？',
    category: 'harem',
    conditions: [{ stat: 'prestige', min: 0, hasConcubines: 2 }],
    baseWeight: 7,
    cooldown: 6,
    maxOccurrences: 5,
    minDifficulty: 0,
    choices: [
      {
        id: 'jealousy_punish',
        text: '各打五十大板',
        effects: [
          { stat: 'stability', delta: 2 },
          { stat: 'prestige', delta: -2 },
        ],
        outcomeText: '你将二人各罚禁足一月。后宫虽暂安，但两人心中怨气更甚。',
      },
      {
        id: 'jealousy_side_concubine',
        text: '偏向贵妃',
        effects: [
          { stat: 'stability', delta: -3 },
          { stat: 'prestige', delta: -1 },
        ],
        outcomeText: '你训斥了淑妃，将其降为贵人。贵妃得意洋洋，淑妃含泪而去。后宫从此势同水火。',
      },
      {
        id: 'jealousy_forgive',
        text: '一笑置之',
        effects: [{ stat: 'stability', delta: -2 }],
        outcomeText: '你哈哈一笑，说后宫和睦方为正道。二人虽表面和好，暗地里较劲更凶了。',
      },
    ],
  },
  {
    id: 'concubine_pregnant',
    title: '妃嫔有喜',
    description:
      '太医来报，你最宠爱的妃嫔有了身孕！这可是天大的好消息。但后宫之中，有人欢喜有人愁。',
    category: 'harem',
    conditions: [{ stat: 'prestige', min: 0, hasConcubines: 1 }],
    baseWeight: 7,
    cooldown: 12,
    maxOccurrences: 5,
    minDifficulty: 0,
    choices: [
      {
        id: 'pregnant_reward',
        text: '大加赏赐',
        effects: [
          { stat: 'gold', delta: -30 },
          { stat: 'prestige', delta: 5 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你龙颜大悦，赏赐珠玉锦缎无数。后宫上下皆贺，举朝欢庆。',
        flags: { heir_pending: true },
      },
      {
        id: 'pregnant_normal',
        text: '照常即可',
        effects: [
          { stat: 'prestige', delta: 2 },
          { stat: 'stability', delta: 1 },
        ],
        outcomeText: '你命太医好生照料，赏了些日常补品。妃嫔感恩戴德。',
        flags: { heir_pending: true },
      },
    ],
  },
  {
    id: 'concubine_plot',
    title: '宫闱秘事',
    description:
      '锦衣卫密报：有妃嫔暗中勾结外臣，图谋不轨。证据确凿，但此事若张扬出去，有损皇家颜面。',
    category: 'harem',
    conditions: [{ stat: 'stability', min: 0, hasConcubines: 2 }],
    baseWeight: 5,
    cooldown: 10,
    maxOccurrences: 3,
    minDifficulty: 2,
    choices: [
      {
        id: 'plot_execute',
        text: '秘密处决',
        effects: [
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: -3 },
          { stat: 'health', delta: -5 },
        ],
        outcomeText: '你令锦衣卫连夜动手，将涉案者秘密赐死。此事无人知晓，但你每每想起，心中总有些不安。',
      },
      {
        id: 'plot_imprison',
        text: '打入冷宫',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'prestige', delta: 1 },
        ],
        outcomeText: '你将那妃嫔打入冷宫，永世不得出。外臣闻风丧胆，再无人敢勾结后宫。',
      },
      {
        id: 'plot_confront',
        text: '当面对质',
        effects: [
          { stat: 'stability', delta: -2 },
          { stat: 'prestige', delta: -5 },
        ],
        outcomeText: '你在御前召见二人，当面质问。那妃嫔痛哭流涕，外臣矢口否认。此事闹得满城风雨，皇家颜面尽失。',
      },
    ],
  },
  {
    id: 'concubine_illness',
    title: '爱妃染疾',
    description:
      '你的宠妃突然高烧不退，太医束手无策。后宫人心惶惶，流言四起，说是有人在汤药中下了毒。',
    category: 'harem',
    conditions: [{ stat: 'health', min: 0, hasConcubines: 1 }],
    baseWeight: 5,
    cooldown: 8,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'illness_heal',
        text: '全力救治',
        effects: [
          { stat: 'gold', delta: -40 },
          { stat: 'health', delta: -3 },
        ],
        outcomeText: '你遍访名医，重金求药。妃嫔终于转危为安，感激涕零。',
      },
      {
        id: 'illness_investigate',
        text: '彻查此事',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'prestige', delta: -2 },
        ],
        outcomeText: '你下令严查，果然揪出一名下毒的宫女。后宫肃整，但流言已传遍京城。',
      },
      {
        id: 'illness_ignore',
        text: '顺其自然',
        effects: [{ stat: 'prestige', delta: -5 }],
        outcomeText: '你只是命太医照方抓药。妃嫔的病时好时坏，后宫中人皆说陛下薄情。',
      },
    ],
  },

  // ========================================================================
  // DISASTER / 灾难
  // ========================================================================
  {
    id: 'drought',
    title: '大旱之年',
    description:
      '入夏以来，滴雨未降。田间禾苗枯死，河床龟裂。百姓惶恐不安，各地纷纷上报旱情。钦天监奏称此乃天象示警。',
    category: 'disaster',
    conditions: [{ stat: 'food', min: 0, season: 'summer' }],
    baseWeight: 8,
    cooldown: 6,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'drought_pray',
        text: '祭天祈雨',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'food', delta: -50 },
          { stat: 'stability', delta: -5 },
        ],
        outcomeText: '你亲赴天坛祈雨，三日不食不休。天公作美，降下甘霖。百姓欢呼，皆称陛下感天动地。',
      },
      {
        id: 'drought_relief',
        text: '开仓放粮',
        effects: [
          { stat: 'food', delta: -100 },
          { stat: 'stability', delta: 5 },
          { stat: 'gold', delta: -30 },
        ],
        outcomeText: '你下令开仓放粮，赈济灾民。虽粮仓损耗不少，但百姓感恩戴德，流民渐安。',
      },
      {
        id: 'drought_ignore',
        text: '按兵不动',
        effects: [
          { stat: 'stability', delta: -10 },
          { stat: 'population', delta: -200 },
          { stat: 'food', delta: -30 },
        ],
        outcomeText: '旱灾持续数月，饿殍遍野。各地民变四起，朝廷威信大损。',
      },
    ],
  },
  {
    id: 'flood',
    title: '黄河决堤',
    description:
      '黄河大堤决口，洪水滔天，沿岸数州县尽成泽国。灾民流离失所，哀鸿遍野。工部急报请求拨款修堤。',
    category: 'disaster',
    conditions: [{ stat: 'food', min: 0, season: ['summer', 'autumn'] }],
    baseWeight: 7,
    cooldown: 8,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'flood_repair',
        text: '拨款修堤',
        effects: [
          { stat: 'gold', delta: -80 },
          { stat: 'stability', delta: 5 },
          { stat: 'population', delta: 100 },
        ],
        outcomeText: '你拨银八十万两，征调民夫十万修筑堤坝。灾后重建有序，百姓得以安居。',
      },
      {
        id: 'flood_relocate',
        text: '迁移灾民',
        effects: [
          { stat: 'gold', delta: -30 },
          { stat: 'food', delta: -60 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你将灾区百姓迁往高处安置，发放口粮。虽耗钱粮，但保全了大部分百姓性命。',
      },
      {
        id: 'flood_neglect',
        text: '无暇顾及',
        effects: [
          { stat: 'stability', delta: -8 },
          { stat: 'population', delta: -300 },
          { stat: 'food', delta: -40 },
        ],
        outcomeText: '洪水肆虐数月，死者无数。灾民揭竿而起，局势岌岌可危。',
      },
    ],
  },
  {
    id: 'earthquake',
    title: '地动山摇',
    description:
      '京城突然地动山摇，房屋倒塌无数，死伤惨重。钦天监奏报此乃地龙翻身，非人力所能抗。民间传言此乃天罚。',
    category: 'disaster',
    conditions: [{ stat: 'stability', min: 0 }],
    baseWeight: 5,
    cooldown: 10,
    maxOccurrences: 2,
    minDifficulty: 1,
    choices: [
      {
        id: 'earthquake_rebuild',
        text: '拨款重建',
        effects: [
          { stat: 'gold', delta: -60 },
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: 3 },
        ],
        outcomeText: '你拨银六十万两重建京城，灾民安置妥当。百姓皆赞陛下仁德。',
      },
      {
        id: 'earthquake_austerity',
        text: '下罪己诏',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'stability', delta: 3 },
          { stat: 'gold', delta: -20 },
        ],
        outcomeText: '你下罪己诏，自省施政之失。群臣感动，百姓安心。虽花了些银两赈灾，但人心大定。',
      },
      {
        id: 'earthquake_blame',
        text: '迁怒钦天监',
        effects: [
          { stat: 'stability', delta: -3 },
          { stat: 'prestige', delta: -5 },
        ],
        outcomeText: '你斥责钦天监失职，将其革职。群臣窃窃私语，说陛下推卸天责，非明君所为。',
      },
    ],
  },
  {
    id: 'locust_plague',
    title: '蝗虫过境',
    description:
      '铺天盖地的蝗虫从东而来，所过之处寸草不留。田间庄稼被吞噬殆尽，百姓望着空荡荡的田地，欲哭无泪。',
    category: 'disaster',
    conditions: [{ stat: 'food', min: 0, season: 'summer' }],
    baseWeight: 7,
    cooldown: 6,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'locust_army',
        text: '派军捕蝗',
        effects: [
          { stat: 'military', delta: -3 },
          { stat: 'food', delta: -30 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你调派军队协助百姓捕蝗，虽损失了部分粮食，但百姓看到朝廷出力，士气大振。',
      },
      {
        id: 'locust_pray',
        text: '祭拜蝗神',
        effects: [
          { stat: 'prestige', delta: -3 },
          { stat: 'food', delta: -60 },
          { stat: 'stability', delta: -5 },
        ],
        outcomeText: '你率百官祭拜蝗神，然而蝗虫并未退去。百姓失望，说陛下不务实际。',
      },
      {
        id: 'locust_relief',
        text: '调配余粮',
        effects: [
          { stat: 'food', delta: -80 },
          { stat: 'stability', delta: 5 },
          { stat: 'gold', delta: -20 },
        ],
        outcomeText: '你从其他州县紧急调粮，赈济灾区。虽粮仓损耗巨大，但避免了大规模饥荒。',
      },
    ],
  },
  {
    id: 'epidemic',
    title: '瘟疫蔓延',
    description:
      '一场瘟疫从南方传来，京城已有人染病。太医院束手无策，百姓人心惶惶，纷纷逃离京城。若不及时遏制，后果不堪设想。',
    category: 'disaster',
    conditions: [{ stat: 'population', min: 0 }],
    baseWeight: 6,
    cooldown: 10,
    maxOccurrences: 2,
    minDifficulty: 1,
    choices: [
      {
        id: 'epidemic_quarantine',
        text: '封城隔离',
        effects: [
          { stat: 'stability', delta: -5 },
          { stat: 'population', delta: -150 },
          { stat: 'food', delta: -40 },
        ],
        outcomeText: '你下令封城，病者隔离医治。虽死了不少人，但瘟疫最终得到控制。',
      },
      {
        id: 'epidemic_doctors',
        text: '广召名医',
        effects: [
          { stat: 'gold', delta: -50 },
          { stat: 'population', delta: -80 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你悬赏求医，终于寻得一方。瘟疫渐退，百姓称颂圣德。',
      },
      {
        id: 'epidemic_panic',
        text: '置之不理',
        effects: [
          { stat: 'population', delta: -500 },
          { stat: 'stability', delta: -10 },
          { stat: 'food', delta: -30 },
        ],
        outcomeText: '瘟疫失控，死者枕藉。京城十室九空，朝野上下怨声载道。',
      },
    ],
  },

  // ========================================================================
  // MILITARY / 军事
  // ========================================================================
  {
    id: 'barbarian_invasion',
    title: '蛮族入侵边境',
    description:
      '北方蛮族大举南侵，十万铁骑压境！边关急报雪片般飞来，守将请求增援。朝堂之上，主战主和两派争论不休。',
    category: 'military',
    conditions: [{ stat: 'military', min: 0 }],
    baseWeight: 8,
    cooldown: 8,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'barbarian_fight',
        text: '御驾亲征',
        effects: [
          { stat: 'military', delta: 5 },
          { stat: 'prestige', delta: 10 },
          { stat: 'health', delta: -10 },
          { stat: 'gold', delta: -50 },
        ],
        outcomeText: '你亲率大军北上，与蛮族决战于长城之下。大获全胜，蛮族远遁。威震四海，万国来朝。',
      },
      {
        id: 'barbarian_general',
        text: '遣将迎敌',
        effects: [
          { stat: 'military', delta: -3 },
          { stat: 'gold', delta: -30 },
          { stat: 'prestige', delta: 3 },
        ],
        outcomeText: '你派大将率军迎敌，虽未能全歼蛮族，但成功将其击退。边关暂安。',
      },
      {
        id: 'barbarian_tribute',
        text: '纳贡求和',
        effects: [
          { stat: 'gold', delta: -40 },
          { stat: 'prestige', delta: -8 },
          { stat: 'stability', delta: -3 },
        ],
        outcomeText: '你遣使携金帛求和，蛮族暂退。但此举令朝野耻笑，威望大损。',
      },
    ],
  },
  {
    id: 'peasant_uprising',
    title: '流民起义',
    description:
      '连年灾荒，百姓活不下去了。流民聚众造反，打出"均田免赋"的旗号，攻州掠县，声势浩大。',
    category: 'military',
    conditions: [{ stat: 'stability', min: 0, max: 40 }],
    baseWeight: 8,
    cooldown: 8,
    maxOccurrences: 3,
    minDifficulty: 1,
    choices: [
      {
        id: 'uprising_army',
        text: '派军镇压',
        effects: [
          { stat: 'military', delta: -5 },
          { stat: 'stability', delta: 8 },
          { stat: 'population', delta: -100 },
        ],
        outcomeText: '你派大军镇压起义，血战数月，终于平定叛乱。但死者无数，你望着满目疮痍，心中沉重。',
      },
      {
        id: 'uprising_amnesty',
        text: '下旨招安',
        effects: [
          { stat: 'stability', delta: 5 },
          { stat: 'food', delta: -40 },
          { stat: 'gold', delta: -20 },
        ],
        outcomeText: '你下旨赦免流民，分田安置。百姓感恩戴德，纷纷放下兵器。乱局渐平。',
      },
      {
        id: 'uprising_ignore',
        text: '按兵不动',
        effects: [
          { stat: 'stability', delta: -10 },
          { stat: 'population', delta: -200 },
          { stat: 'military', delta: -5 },
        ],
        outcomeText: '起义军越聚越多，连下数州。朝廷颜面尽失，局势一发不可收拾。',
      },
    ],
  },
  {
    id: 'general_rebellion',
    title: '边将拥兵自重',
    description:
      '西北边将手握重兵，已有不臣之心。暗探来报，那厮私造龙袍，与敌国暗通款曲。若不及时处置，恐生大变。',
    category: 'military',
    conditions: [{ stat: 'military', min: 0, max: 50 }],
    baseWeight: 6,
    cooldown: 10,
    maxOccurrences: 2,
    minDifficulty: 3,
    choices: [
      {
        id: 'rebellion_purge',
        text: '削藩夺兵',
        effects: [
          { stat: 'military', delta: 8 },
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: 5 },
        ],
        outcomeText: '你下旨削去其兵权，召其入京。那将果然抗旨不遵，你果断出兵平叛。经此一役，军权归于朝廷。',
      },
      {
        id: 'rebellion_bribe',
        text: '以金笼络',
        effects: [
          { stat: 'gold', delta: -40 },
          { stat: 'military', delta: -3 },
          { stat: 'stability', delta: -3 },
        ],
        outcomeText: '你重金封赏，加官进爵。那将暂时安分，但野心已露，终究是隐患。',
      },
      {
        id: 'rebellion_spy',
        text: '离间计',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'military', delta: 3 },
          { stat: 'prestige', delta: 2 },
        ],
        outcomeText: '你派细作在其部将之间散布谣言，果然引起内讧。边将众叛亲离，最终自缚请罪。',
      },
    ],
  },
  {
    id: 'border_skirmish',
    title: '边境小规模冲突',
    description:
      '边境游牧部族小股骑兵频繁袭扰，抢夺边民牛羊粮食。边将请求出击，但也有人主张坚守不出。',
    category: 'military',
    conditions: [{ stat: 'military', min: 20 }],
    baseWeight: 7,
    cooldown: 4,
    maxOccurrences: 5,
    minDifficulty: 0,
    choices: [
      {
        id: 'skirmish_attack',
        text: '主动出击',
        effects: [
          { stat: 'military', delta: -2 },
          { stat: 'prestige', delta: 3 },
          { stat: 'gold', delta: -10 },
        ],
        outcomeText: '边军出击，击退游牧骑兵。虽小胜一场，但草原广阔，难以根除。',
      },
      {
        id: 'skirmish_defend',
        text: '加固防线',
        effects: [
          { stat: 'military', delta: 2 },
          { stat: 'gold', delta: -15 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你拨款加固边防，修建烽火台。游牧骑兵见无机可乘，渐渐减少了袭扰。',
      },
    ],
  },
  {
    id: 'military_parade',
    title: '阅兵大典',
    description:
      '秋高气爽，正是阅兵的好时节。兵部奏请在京城举行大阅，以振军威、慑四夷。',
    category: 'military',
    conditions: [{ stat: 'military', min: 40, season: 'autumn' }],
    baseWeight: 6,
    cooldown: 12,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'parade_grand',
        text: '盛大阅兵',
        effects: [
          { stat: 'prestige', delta: 8 },
          { stat: 'military', delta: 3 },
          { stat: 'gold', delta: -30 },
        ],
        outcomeText: '你亲临检阅，十万大军甲胄鲜明，旌旗蔽日。四方使节惊叹不已，我朝军威远播。',
      },
      {
        id: 'parade_modest',
        text: '简朴阅兵',
        effects: [
          { stat: 'prestige', delta: 3 },
          { stat: 'military', delta: 2 },
        ],
        outcomeText: '你只检阅了精锐部队，虽规模不大，但将士英姿飒爽，足以震慑宵小。',
      },
    ],
  },
  {
    id: 'weapon_discovery',
    title: '神机营研制新火器',
    description:
      '神机营工匠呈上一件新式火器，射程远超现有火铳。若能量产装备全军，我朝军力将大幅提升。',
    category: 'military',
    conditions: [{ stat: 'military', min: 30 }],
    baseWeight: 5,
    cooldown: 10,
    maxOccurrences: 2,
    minDifficulty: 2,
    choices: [
      {
        id: 'weapon_invest',
        text: '拨款量产',
        effects: [
          { stat: 'military', delta: 10 },
          { stat: 'gold', delta: -60 },
          { stat: 'prestige', delta: 5 },
        ],
        outcomeText: '你拨银六十万两，命神机营量产新火器。全军装备后，战力大增，边疆安宁。',
      },
      {
        id: 'weapon_test',
        text: '先小批试制',
        effects: [
          { stat: 'military', delta: 4 },
          { stat: 'gold', delta: -20 },
        ],
        outcomeText: '你命先试制一批，效果确实不俗。工匠们继续改良，待成熟后再大规模装备。',
      },
      {
        id: 'weapon_reject',
        text: '暂不考虑',
        effects: [{ stat: 'military', delta: -2 }],
        outcomeText: '你将此事搁置。工匠们失望而去，不久后几名巧匠被敌国收买，带着图纸叛逃。',
      },
    ],
  },

  // ========================================================================
  // COURT / 朝政
  // ========================================================================
  {
    id: 'minister_corruption',
    title: '大臣贪腐案',
    description:
      '都察院查实，工部侍郎在修缮皇宫时中饱私囊，贪墨银两达数十万。铁证如山，该如何处置？',
    category: 'court',
    conditions: [{ stat: 'stability', min: 0 }],
    baseWeight: 7,
    cooldown: 6,
    maxOccurrences: 4,
    minDifficulty: 0,
    choices: [
      {
        id: 'corruption_execute',
        text: '依法严惩',
        effects: [
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: 5 },
          { stat: 'gold', delta: 15 },
        ],
        outcomeText: '你下令抄家问斩，追回赃款。满朝文武为之一震，贪腐之风大为收敛。',
      },
      {
        id: 'corruption_demote',
        text: '贬官了事',
        effects: [
          { stat: 'stability', delta: 2 },
          { stat: 'prestige', delta: -2 },
        ],
        outcomeText: '你将其贬为庶民，逐出京城。虽保了皇家体面，但朝臣私下议论陛下过于宽纵。',
      },
      {
        id: 'corruption_cover',
        text: '压下不报',
        effects: [
          { stat: 'stability', delta: -5 },
          { stat: 'prestige', delta: -3 },
          { stat: 'gold', delta: -10 },
        ],
        outcomeText: '你将此事压下不发。那侍郎感恩戴德，继续贪墨。朝中风气日坏，正直之臣心寒。',
      },
    ],
  },
  {
    id: 'faction_struggle',
    title: '朝堂党争',
    description:
      '朝中渐分两派：一派以首辅为首，主张变法图强；另一派以老臣为领袖，力主守祖宗成法。两派水火不容，每日在朝堂上唇枪舌剑。',
    category: 'court',
    conditions: [{ stat: 'stability', min: 20 }],
    baseWeight: 7,
    cooldown: 8,
    maxOccurrences: 4,
    minDifficulty: 0,
    choices: [
      {
        id: 'faction_reform',
        text: '支持变法',
        effects: [
          { stat: 'stability', delta: -3 },
          { stat: 'gold', delta: 10 },
          { stat: 'prestige', delta: 3 },
        ],
        outcomeText: '你力挺变法派，推行新政。虽遭保守派激烈反对，但新政初见成效，国库渐丰。',
      },
      {
        id: 'faction_conservative',
        text: '维持现状',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'prestige', delta: -2 },
        ],
        outcomeText: '你选择维持祖制，变法派黯然退场。朝局暂安，但积弊未除。',
      },
      {
        id: 'faction_mediate',
        text: '居中调停',
        effects: [
          { stat: 'stability', delta: 2 },
          { stat: 'prestige', delta: 2 },
        ],
        outcomeText: '你召集两派和谈，各退一步。虽未能彻底化解矛盾，但朝堂暂时恢复了平静。',
      },
      {
        id: 'faction_purge',
        text: '清洗异己',
        effects: [
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: -5 },
          { stat: 'health', delta: -3 },
        ],
        outcomeText: '你将反对派官员尽数罢免，朝堂上下唯你独尊。权柄虽重，但已无人敢说真话。',
      },
    ],
  },
  {
    id: 'assassination_attempt',
    title: '宫中遇刺',
    description:
      '夜深人静，你正在御书房批阅奏折。忽然窗外寒光一闪——有刺客！锦衣卫拼死护卫，刺客被当场格杀。但幕后主使尚未查明。',
    category: 'court',
    conditions: [{ stat: 'stability', min: 0, max: 60 }],
    baseWeight: 5,
    cooldown: 12,
    maxOccurrences: 2,
    minDifficulty: 2,
    choices: [
      {
        id: 'assassin_investigate',
        text: '彻查到底',
        effects: [
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: 3 },
          { stat: 'health', delta: -3 },
        ],
        outcomeText: '你命锦衣卫全力追查，终于揪出幕后黑手。原来是某位心怀不满的藩王。叛党伏诛，朝野震动。',
      },
      {
        id: 'assassin_reinforce',
        text: '加强守卫',
        effects: [
          { stat: 'military', delta: 3 },
          { stat: 'gold', delta: -20 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你下令加强宫禁，增设巡逻。虽未能查出幕后主使，但至少安全有了保障。',
      },
      {
        id: 'assassin_fear',
        text: '惊魂未定',
        effects: [
          { stat: 'health', delta: -5 },
          { stat: 'prestige', delta: -5 },
          { stat: 'stability', delta: -3 },
        ],
        outcomeText: '你连日噩梦，不敢独处。朝臣见陛下如此，私下议论纷纷，说天子胆怯不堪大任。',
      },
    ],
  },
  {
    id: 'eunuch_power',
    title: '宦官干政',
    description:
      '司礼监掌印太监恃宠而骄，开始代你批阅奏折，私下安插亲信。朝中大臣敢怒不敢言，纷纷上密折弹劾。',
    category: 'court',
    conditions: [{ stat: 'stability', min: 0, max: 70 }],
    baseWeight: 6,
    cooldown: 10,
    maxOccurrences: 3,
    minDifficulty: 2,
    choices: [
      {
        id: 'eunuch_purge',
        text: '严惩不贷',
        effects: [
          { stat: 'stability', delta: 8 },
          { stat: 'prestige', delta: 5 },
        ],
        outcomeText: '你果断将那太监拿下，抄家灭族。朝中风气为之一清，百官皆赞圣明。',
      },
      {
        id: 'eunuch_restrain',
        text: '稍加约束',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'prestige', delta: -1 },
        ],
        outcomeText: '你训斥了那太监，命其收敛。他表面恭顺，暗地里变本加厉。',
      },
      {
        id: 'eunuch_ally',
        text: '借力打力',
        effects: [
          { stat: 'stability', delta: 2 },
          { stat: 'gold', delta: 10 },
          { stat: 'prestige', delta: -3 },
        ],
        outcomeText: '你利用太监与权臣的矛盾，让他们互相牵制。虽暂时平衡，但朝纲日乱。',
      },
    ],
  },
  {
    id: 'succession_debate',
    title: '立储之争',
    description:
      '你膝下已有数位皇子，但立储之事一直悬而未决。朝中大臣纷纷站队，各为其主。长子贤能但体弱，幼子聪慧但年幼。再不决断，恐生变故。',
    category: 'court',
    conditions: [{ stat: 'prestige', min: 20, hasConcubines: 1 }],
    baseWeight: 6,
    cooldown: 15,
    maxOccurrences: 2,
    minDifficulty: 1,
    choices: [
      {
        id: 'succession_eldest',
        text: '立长子',
        effects: [
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: 3 },
        ],
        outcomeText: '你册封长子为太子，昭告天下。朝中拥护长子的大臣欢欣鼓舞，局势暂安。',
        flags: { crown_prince: true },
      },
      {
        id: 'succession_youngest',
        text: '立幼子',
        effects: [
          { stat: 'stability', delta: -3 },
          { stat: 'prestige', delta: 2 },
        ],
        outcomeText: '你力排众议，册封幼子为太子。长子一党心怀不满，朝堂暗流涌动。',
        flags: { crown_prince: true },
      },
      {
        id: 'succession_delay',
        text: '暂缓立储',
        effects: [
          { stat: 'stability', delta: -5 },
          { stat: 'prestige', delta: -3 },
        ],
        outcomeText: '你将立储之事搁置。但皇子们之间的争斗愈演愈烈，大臣们忧心忡忡。',
      },
    ],
  },
  {
    id: 'spy_discovery',
    title: '抓获敌国细作',
    description:
      '锦衣卫抓获一名潜伏多年的敌国细作，此人竟是兵部的一名主事。搜出大量军事情报，细作招供还有同党。',
    category: 'court',
    conditions: [{ stat: 'stability', min: 10 }],
    baseWeight: 5,
    cooldown: 10,
    maxOccurrences: 3,
    minDifficulty: 1,
    choices: [
      {
        id: 'spy_interrogate',
        text: '严刑逼供',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'prestige', delta: 2 },
        ],
        outcomeText: '你命锦衣卫严审，果然挖出一张间谍网。敌国在我朝的情报体系被一举摧毁。',
      },
      {
        id: 'spy_double',
        text: '反间计',
        effects: [
          { stat: 'military', delta: 5 },
          { stat: 'prestige', delta: 3 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你威逼细作为你所用，向敌国传递假情报。数月后敌国中计，我朝趁势出击，大获全胜。',
      },
      {
        id: 'spy_execute',
        text: '公开处决',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'stability', delta: -2 },
        ],
        outcomeText: '你将细作押赴刑场，公开处决。百姓拍手称快，但其余细作闻风而遁，线索中断。',
      },
    ],
  },
  {
    id: 'treason_accusation',
    title: '谋反大案',
    description:
      '密报传来：某位皇亲国戚暗中招兵买马，意图谋反。证据虽不充分，但空穴来风，未必无因。你该如何应对？',
    category: 'court',
    conditions: [{ stat: 'stability', min: 0, max: 55 }],
    baseWeight: 5,
    cooldown: 15,
    maxOccurrences: 2,
    minDifficulty: 3,
    choices: [
      {
        id: 'treason_preempt',
        text: '先下手为强',
        effects: [
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: 3 },
          { stat: 'health', delta: -3 },
        ],
        outcomeText: '你果断将其拿下，搜出兵器甲胄无数。谋反铁证如山，满门抄斩。朝野震慑。',
      },
      {
        id: 'treason_watch',
        text: '暗中监视',
        effects: [
          { stat: 'stability', delta: 2 },
          { stat: 'military', delta: 2 },
        ],
        outcomeText: '你派锦衣卫暗中监视，果然发现其确有反心。数月后证据确凿，你从容将其拿下。',
      },
      {
        id: 'treason_confront',
        text: '当面质问',
        effects: [
          { stat: 'stability', delta: -3 },
          { stat: 'prestige', delta: -5 },
        ],
        outcomeText: '你将其召入宫中当面质问。他矢口否认，但回去后立刻起兵。你仓促应对，朝野大乱。',
      },
    ],
  },
  {
    id: 'loyal_minister_death',
    title: '忠臣病逝',
    description:
      '你最倚重的老臣病重不起，临终前上最后一道奏折，字字泣血，劝陛下亲贤臣、远小人。你亲往探视，老臣已阖然长逝。',
    category: 'court',
    conditions: [{ stat: 'prestige', min: 10 }],
    baseWeight: 5,
    cooldown: 20,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'death_honor',
        text: '追封厚葬',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'gold', delta: -20 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你追封其为太师，辍朝三日，亲撰祭文。天下士子闻之，皆赞陛下有情有义。',
      },
      {
        id: 'death_read',
        text: '谨遵遗言',
        effects: [
          { stat: 'prestige', delta: 3 },
          { stat: 'stability', delta: 5 },
        ],
        outcomeText: '你将老臣的奏折悬于御座之旁，时时警醒自己。朝臣感念先臣之忠，纷纷自省。',
      },
    ],
  },

  // ========================================================================
  // ECONOMY / 经济
  // ========================================================================
  {
    id: 'trade_caravan',
    title: '西域商队来访',
    description:
      '一支庞大的西域商队抵达京城，带来了香料、宝石、毛皮等奇珍异宝。他们请求通商互市，互通有无。',
    category: 'economy',
    conditions: [{ stat: 'gold', min: 0 }],
    baseWeight: 6,
    cooldown: 8,
    maxOccurrences: 4,
    minDifficulty: 0,
    choices: [
      {
        id: 'trade_open',
        text: '开放互市',
        effects: [
          { stat: 'gold', delta: 30 },
          { stat: 'prestige', delta: 3 },
          { stat: 'population', delta: 50 },
        ],
        outcomeText: '你下令开放边市，互通有无。商队络绎不绝，关税收入大增，京城愈发繁华。',
      },
      {
        id: 'trade_tax',
        text: '重税征收',
        effects: [
          { stat: 'gold', delta: 50 },
          { stat: 'prestige', delta: -3 },
        ],
        outcomeText: '你对商队课以重税，虽充实了国库，但西域商人怨声载道，此后商队日渐稀少。',
      },
      {
        id: 'trade_reject',
        text: '拒绝通商',
        effects: [
          { stat: 'prestige', delta: -2 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你以"天朝上国不与蛮夷通商"为由拒绝。商队悻悻而去，百姓少了许多新奇物件。',
      },
    ],
  },
  {
    id: 'tax_reform',
    title: '赋税改革',
    description:
      '户部尚书上书，建议推行新的赋税制度。新法将简化税目，按田亩计税，可增加国库收入。但地方豪强必然反对。',
    category: 'economy',
    conditions: [{ stat: 'gold', min: 0 }],
    baseWeight: 6,
    cooldown: 15,
    maxOccurrences: 2,
    minDifficulty: 1,
    choices: [
      {
        id: 'tax_reform_yes',
        text: '推行新法',
        effects: [
          { stat: 'gold', delta: 40 },
          { stat: 'stability', delta: -5 },
          { stat: 'prestige', delta: 5 },
        ],
        outcomeText: '你力排众议推行新法，国库收入大增。但地方豪强阳奉阴违，暗中抵制。改革之路任重道远。',
      },
      {
        id: 'tax_reform_gradual',
        text: '循序渐进',
        effects: [
          { stat: 'gold', delta: 15 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你选择在部分地区试行，效果尚可。虽见效慢，但阻力也小。待时机成熟再全面推行。',
      },
      {
        id: 'tax_reform_no',
        text: '维持旧制',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'gold', delta: -5 },
        ],
        outcomeText: '你否决了新法。户部尚书失望告退，此后税制积弊日深，国库日渐空虚。',
      },
    ],
  },
  {
    id: 'salt_monopoly',
    title: '盐铁专营之议',
    description:
      '朝中有人提议将盐铁收归国有，由朝廷统一经营。此法可大幅增加税收，但会触动盐商巨贾的利益。',
    category: 'economy',
    conditions: [{ stat: 'gold', min: 0 }],
    baseWeight: 5,
    cooldown: 12,
    maxOccurrences: 2,
    minDifficulty: 2,
    choices: [
      {
        id: 'salt_monopoly_yes',
        text: '收归国有',
        effects: [
          { stat: 'gold', delta: 60 },
          { stat: 'stability', delta: -5 },
          { stat: 'prestige', delta: 3 },
        ],
        outcomeText: '你下令盐铁收归国有，国库大为充实。但盐商巨贾破产，地方豪强怨声载道。',
      },
      {
        id: 'salt_monopoly_regulate',
        text: '加强监管',
        effects: [
          { stat: 'gold', delta: 25 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你选择加强盐铁监管，严惩偷税漏税。虽不如专营收益大，但朝野相安无事。',
      },
    ],
  },
  {
    id: 'granary_overflow',
    title: '粮仓丰盈',
    description:
      '今年风调雨顺，五谷丰登。各州县粮仓爆满，谷价跌至历史最低。户部建议趁机出售余粮换取银两。',
    category: 'economy',
    conditions: [{ stat: 'food', min: 500 }],
    baseWeight: 5,
    cooldown: 10,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'granary_sell',
        text: '出售余粮',
        effects: [
          { stat: 'gold', delta: 40 },
          { stat: 'food', delta: -100 },
        ],
        outcomeText: '你命户部趁谷价低迷时出售余粮，换成银两充实国库。一进一出，两全其美。',
      },
      {
        id: 'granary_reserve',
        text: '以备不时',
        effects: [
          { stat: 'food', delta: 50 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你下令严守粮仓，以备荒年。群臣赞陛下深谋远虑，居安思危。',
      },
      {
        id: 'granary_grant',
        text: '减免赋税',
        effects: [
          { stat: 'stability', delta: 8 },
          { stat: 'prestige', delta: 5 },
          { stat: 'gold', delta: -15 },
        ],
        outcomeText: '你下旨减免今年赋税，百姓欢天喜地。万民称颂，皆说遇上了好年景。',
      },
    ],
  },
  {
    id: 'treasury_theft',
    title: '国库被盗',
    description:
      '户部急报：国库昨夜遭窃，丢失黄金万两！守卫被迷药迷倒，库门完好无损。此案手法老练，绝非寻常盗贼所为。',
    category: 'economy',
    conditions: [{ stat: 'gold', min: 50 }],
    baseWeight: 5,
    cooldown: 12,
    maxOccurrences: 2,
    minDifficulty: 2,
    choices: [
      {
        id: 'theft_investigate',
        text: '严查此案',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'gold', delta: 5 },
        ],
        outcomeText: '你命锦衣卫全力追查，终于发现是内贼勾结外盗。追回大部分赃款，涉案者尽数伏法。',
      },
      {
        id: 'theft_compensate',
        text: '自掏腰包',
        effects: [
          { stat: 'gold', delta: -20 },
          { stat: 'prestige', delta: 3 },
        ],
        outcomeText: '你从内帑拨银补上亏空，未惊动朝野。虽损失了些私房钱，但皇家体面得以保全。',
      },
      {
        id: 'theft_blame',
        text: '问责户部',
        effects: [
          { stat: 'stability', delta: -3 },
          { stat: 'prestige', delta: -2 },
          { stat: 'gold', delta: -10 },
        ],
        outcomeText: '你斥责户部失职，罚俸一年。但案件并未侦破，盗贼逍遥法外，朝野议论纷纷。',
      },
    ],
  },

  // ========================================================================
  // DIPLOMACY / 外交
  // ========================================================================
  {
    id: 'foreign_envoy',
    title: '异国使臣觐见',
    description:
      '远方海国派来使臣，携带珍奇异宝，请求通商。使臣言辞傲慢，称其国"不逊天朝"。朝臣纷纷请旨如何接待。',
    category: 'diplomacy',
    conditions: [{ stat: 'prestige', min: 20 }],
    baseWeight: 6,
    cooldown: 10,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'envoy_grand',
        text: '隆重接待',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'gold', delta: -20 },
        ],
        outcomeText: '你以最高礼仪接待使臣，设宴款待。使臣被天朝气度折服，回国后大力推崇。',
      },
      {
        id: 'envoy_humble',
        text: '令其行跪拜礼',
        effects: [
          { stat: 'prestige', delta: 8 },
          { stat: 'stability', delta: -2 },
        ],
        outcomeText: '你坚持令使臣行三跪九叩之礼。使臣虽不情愿，但慑于天朝威势，只得从命。',
      },
      {
        id: 'envoy_reject',
        text: '不予接见',
        effects: [
          { stat: 'prestige', delta: -3 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你以"蛮夷不识礼数"为由拒不见。使臣悻悻而去，回国后对天朝多有不敬之辞。',
      },
    ],
  },
  {
    id: 'tribute_state',
    title: '藩属国朝贡',
    description:
      '南方藩属国遣使来朝，进贡大象、香料、珠宝无数。使臣恳请天朝庇护，抵御北方蛮族侵扰。',
    category: 'diplomacy',
    conditions: [{ stat: 'prestige', min: 30 }],
    baseWeight: 6,
    cooldown: 12,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'tribute_protect',
        text: '允其所请',
        effects: [
          { stat: 'prestige', delta: 8 },
          { stat: 'gold', delta: 15 },
          { stat: 'military', delta: -3 },
        ],
        outcomeText: '你应允出兵庇护，藩属国感恩戴德。此后岁岁来朝，贡献不绝。',
      },
      {
        id: 'tribute_accept',
        text: '照单全收',
        effects: [
          { stat: 'gold', delta: 20 },
          { stat: 'prestige', delta: 3 },
        ],
        outcomeText: '你收下贡品，赐予回礼。藩属使臣满意而归，但并未给予军事承诺。',
      },
    ],
  },
  {
    id: 'marriage_alliance',
    title: '和亲之议',
    description:
      '北方强邻遣使求婚，请求以和亲换和平。朝中主战派坚决反对，说这是示弱于人；主和派则认为可免刀兵之苦。',
    category: 'diplomacy',
    conditions: [{ stat: 'military', min: 0, max: 60 }],
    baseWeight: 5,
    cooldown: 15,
    maxOccurrences: 2,
    minDifficulty: 1,
    choices: [
      {
        id: 'alliance_yes',
        text: '同意和亲',
        effects: [
          { stat: 'military', delta: 5 },
          { stat: 'prestige', delta: -8 },
          { stat: 'stability', delta: 5 },
        ],
        outcomeText: '你选宗室女封为公主，远嫁北方。边境暂获和平，但朝野皆说天子畏敌。',
      },
      {
        id: 'alliance_counter',
        text: '提出反条件',
        effects: [
          { stat: 'prestige', delta: 3 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你提出对方先送王子为质，方可谈和亲。对方犹豫不决，谈判陷入僵持。',
      },
      {
        id: 'alliance_reject',
        text: '断然拒绝',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'military', delta: -3 },
          { stat: 'stability', delta: -3 },
        ],
        outcomeText: '你严词拒绝，说"天朝公主不嫁蛮夷"。使者拂袖而去，边境战云密布。',
      },
    ],
  },
  {
    id: 'border_treaty',
    title: '边境划界之约',
    description:
      '邻国遣使商议边境划界之事。双方各执一词，争议地区涉及数座城池和大片牧场。若能谈成，可免去百年纷争。',
    category: 'diplomacy',
    conditions: [{ stat: 'military', min: 20 }],
    baseWeight: 5,
    cooldown: 15,
    maxOccurrences: 2,
    minDifficulty: 1,
    choices: [
      {
        id: 'treaty_generous',
        text: '大方让步',
        effects: [
          { stat: 'stability', delta: 5 },
          { stat: 'prestige', delta: -3 },
          { stat: 'military', delta: 3 },
        ],
        outcomeText: '你主动让出争议牧场，换取和平条约。邻国感激涕零，边境从此安宁。',
      },
      {
        id: 'treaty_firm',
        text: '据理力争',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你寸步不让，据理力争。经过数月谈判，终于达成双方都能接受的划界方案。',
      },
      {
        id: 'treaty_reject',
        text: '拒绝谈判',
        effects: [
          { stat: 'military', delta: -3 },
          { stat: 'stability', delta: -3 },
        ],
        outcomeText: '你拒绝了谈判，邻国大怒。边境冲突愈演愈烈，烽烟再起。',
      },
    ],
  },

  // ========================================================================
  // CULTURE / 文化
  // ========================================================================
  {
    id: 'imperial_exam',
    title: '科举大考',
    description:
      '三年一度的科举大考即将举行。天下读书人齐聚京城，十年寒窗，只为一朝金榜题名。你是否要亲自主持殿试？',
    category: 'culture',
    conditions: [{ stat: 'prestige', min: 10 }],
    baseWeight: 6,
    cooldown: 12,
    maxOccurrences: 5,
    minDifficulty: 0,
    choices: [
      {
        id: 'exam_preside',
        text: '亲自主持',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你亲临殿试，出题考校。状元才学过人，当场赋诗一首，满堂喝彩。天下士子皆以入朝为荣。',
      },
      {
        id: 'exam_delegate',
        text: '交由礼部',
        effects: [
          { stat: 'prestige', delta: 2 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '礼部依制主持科举，选拔了一批才俊。你批阅试卷后钦点状元，万事妥当。',
      },
      {
        id: 'exam_reform',
        text: '改革科举',
        effects: [
          { stat: 'prestige', delta: 3 },
          { stat: 'stability', delta: -3 },
          { stat: 'population', delta: 30 },
        ],
        outcomeText: '你在科举中增设策论实务，打破只考诗赋的惯例。守旧派哗然，但新法选出了更多实干之才。',
      },
    ],
  },
  {
    id: 'great_construction',
    title: '修建皇陵',
    description:
      '工部奏请修建新皇陵，规模宏大，预计耗银百万两。群臣议论纷纷，有人说这是必要的皇家体面，有人说是劳民伤财。',
    category: 'culture',
    conditions: [{ stat: 'gold', min: 100 }],
    baseWeight: 5,
    cooldown: 20,
    maxOccurrences: 2,
    minDifficulty: 0,
    choices: [
      {
        id: 'construction_grand',
        text: '大兴土木',
        effects: [
          { stat: 'gold', delta: -100 },
          { stat: 'prestige', delta: 8 },
          { stat: 'stability', delta: -5 },
          { stat: 'population', delta: -50 },
        ],
        outcomeText: '你征调民夫十万，大修皇陵。历时三年，终成巍峨壮观的地下宫殿。但百姓怨声载道。',
      },
      {
        id: 'construction_modest',
        text: '从简修建',
        effects: [
          { stat: 'gold', delta: -40 },
          { stat: 'prestige', delta: 3 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你命工部从简修建，不事铺张。群臣赞陛下节俭，百姓也未受太大影响。',
      },
      {
        id: 'construction_defer',
        text: '暂缓修建',
        effects: [
          { stat: 'stability', delta: 3 },
          { stat: 'prestige', delta: -2 },
        ],
        outcomeText: '你将皇陵修建搁置，说"身后之事不急"。朝臣私下议论陛下太过洒脱。',
      },
    ],
  },
  {
    id: 'historical_compilation',
    title: '编纂史书',
    description:
      '翰林院学士上书，请旨编纂前朝史书。此事关乎千秋评价，若能编好，可彰圣德。但编纂耗时耗力，需拨银拨人。',
    category: 'culture',
    conditions: [{ stat: 'prestige', min: 20 }],
    baseWeight: 5,
    cooldown: 20,
    maxOccurrences: 2,
    minDifficulty: 0,
    choices: [
      {
        id: 'history_approve',
        text: '准奏拨款',
        effects: [
          { stat: 'gold', delta: -30 },
          { stat: 'prestige', delta: 8 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你拨银三十万两，命翰林院全力编纂。历时五载，终成煌煌巨著。后世史家皆赞此书公允。',
      },
      {
        id: 'history_revise',
        text: '要求据实直书',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'stability', delta: 5 },
        ],
        outcomeText: '你下旨"秉笔直书，不为尊者讳"。群臣感佩，史官们如实记载功过得失。此书流传后世，口碑极佳。',
      },
      {
        id: 'history_reject',
        text: '暂不编纂',
        effects: [
          { stat: 'prestige', delta: -2 },
        ],
        outcomeText: '你以国事繁忙为由驳回。翰林院学士叹息而退，此事遂搁。',
      },
    ],
  },

  // ========================================================================
  // PERSONAL / 皇帝个人
  // ========================================================================
  {
    id: 'emperor_illness',
    title: '龙体欠安',
    description:
      '你近日身体不适，太医诊脉后面色凝重，说是操劳过度，需静养数日。但朝中事务堆积如山，你该如何是好？',
    category: 'personal',
    conditions: [{ stat: 'health', min: 0, max: 80 }],
    baseWeight: 7,
    cooldown: 8,
    maxOccurrences: 5,
    minDifficulty: 0,
    choices: [
      {
        id: 'illness_rest',
        text: '安心静养',
        effects: [
          { stat: 'health', delta: 10 },
          { stat: 'stability', delta: -3 },
        ],
        outcomeText: '你放下朝政，静养数日。身体渐好，但朝中积压了不少奏折，大臣们颇有微词。',
      },
      {
        id: 'illness_medicine',
        text: '寻访名医',
        effects: [
          { stat: 'health', delta: 5 },
          { stat: 'gold', delta: -20 },
        ],
        outcomeText: '你重金聘请名医，配了一副灵药。服下后精神大振，继续批阅奏折。',
      },
      {
        id: 'illness_push',
        text: '带病理政',
        effects: [
          { stat: 'health', delta: -8 },
          { stat: 'prestige', delta: 3 },
          { stat: 'stability', delta: 3 },
        ],
        outcomeText: '你强撑病体上朝理政。群臣感动，纷纷称赞陛下勤政。但你的身体每况愈下。',
      },
    ],
  },
  {
    id: 'hunting_accident',
    title: '围猎坠马',
    description:
      '秋猎之时，你纵马追逐一头梅花鹿。不料坐骑受惊，将你掀翻在地！虽然侍卫及时扶起，但你已摔伤了手臂。',
    category: 'personal',
    conditions: [{ stat: 'health', min: 20, season: 'autumn' }],
    baseWeight: 5,
    cooldown: 15,
    maxOccurrences: 2,
    minDifficulty: 0,
    choices: [
      {
        id: 'hunting_heal',
        text: '安心养伤',
        effects: [
          { stat: 'health', delta: -5 },
          { stat: 'stability', delta: -2 },
        ],
        outcomeText: '你回宫养伤月余，方才痊愈。太医说日后须多加小心，不可再如此鲁莽。',
      },
      {
        id: 'hunting_brave',
        text: '继续围猎',
        effects: [
          { stat: 'health', delta: -10 },
          { stat: 'prestige', delta: 5 },
        ],
        outcomeText: '你裹伤上马，继续围猎。最终猎获梅花鹿一头，群臣赞陛下勇武过人。但伤口恶化，你卧床了更久。',
      },
    ],
  },
  {
    id: 'concubine_affair',
    title: '宠妃离世',
    description:
      '你最宠爱的妃嫔突然病故，太医说是旧疾复发，回天乏术。你悲痛万分，多日不理朝政。',
    category: 'personal',
    conditions: [{ stat: 'health', min: 0, hasConcubines: 1 }],
    baseWeight: 4,
    cooldown: 20,
    maxOccurrences: 2,
    minDifficulty: 0,
    choices: [
      {
        id: 'affair_mourn',
        text: '辍朝哀悼',
        effects: [
          { stat: 'health', delta: -5 },
          { stat: 'prestige', delta: -3 },
          { stat: 'stability', delta: -3 },
        ],
        outcomeText: '你辍朝五日，追封其为贵妃，以皇后之礼下葬。举朝皆感陛下深情，但政事荒废引人忧虑。',
      },
      {
        id: 'affair_move',
        text: '化悲为力',
        effects: [
          { stat: 'prestige', delta: 3 },
          { stat: 'stability', delta: 2 },
          { stat: 'health', delta: -3 },
        ],
        outcomeText: '你强忍悲痛，继续处理朝政。群臣赞陛下节哀顺变，以国事为重。但你每每独处时，仍会黯然神伤。',
      },
    ],
  },
  {
    id: 'heir_education',
    title: '皇子学业',
    description:
      '太子太傅来报，说太子近日常常逃学，与宫中侍卫厮混。若不严加管教，恐难成大器。你该如何处置？',
    category: 'personal',
    conditions: [{ stat: 'prestige', min: 10, hasConcubines: 1 }],
    baseWeight: 5,
    cooldown: 12,
    maxOccurrences: 3,
    minDifficulty: 0,
    choices: [
      {
        id: 'heir_punish',
        text: '严加训斥',
        effects: [
          { stat: 'prestige', delta: 3 },
          { stat: 'stability', delta: 2 },
        ],
        outcomeText: '你将太子召来严厉训斥，命其闭门读书三月。太子痛哭流涕，此后学业大有长进。',
      },
      {
        id: 'heir_tutor',
        text: '换名师教导',
        effects: [
          { stat: 'gold', delta: -10 },
          { stat: 'prestige', delta: 2 },
        ],
        outcomeText: '你重金聘请大儒为太子授课，太子对新老师颇为敬重，学业渐入正轨。',
      },
      {
        id: 'heir_spare',
        text: '亲自教导',
        effects: [
          { stat: 'prestige', delta: 5 },
          { stat: 'health', delta: -3 },
        ],
        outcomeText: '你每日抽出时间亲自教导太子，父子关系大为改善。太子用心向学，群臣赞陛下教子有方。',
      },
    ],
  },
]
