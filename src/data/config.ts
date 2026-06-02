/**
 * config.ts — 游戏默认配置
 *
 * 纯数据文件，定义游戏会话的静态常量。
 */

import type { GameConfig } from '../types/game'

/** 默认游戏配置 */
export const DEFAULT_CONFIG: GameConfig = {
  /** 需要存活 30 年（360 个月）方可获胜 */
  winYears: 30,

  /** 初始属性值 */
  initialStats: {
    gold: 500,
    military: 50,
    population: 5000,
    stability: 60,
    food: 800,
    health: 80,
    prestige: 50,
    lifespan: 360,
  },

  /** 每回合最多可录用的臣子数 */
  ministersPerTurn: 5,

  /** 每回合触发的事件数 */
  eventsPerTurn: 1,

  /** 初始寿命（月） */
  initialLifespan: 360,

  /** 选秀间隔（月），36 = 每三年一次 */
  selectionInterval: 36,
}
