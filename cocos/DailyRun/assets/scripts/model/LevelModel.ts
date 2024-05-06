import { Vec2 } from "cc";

/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-06 16:21:49
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-06 16:34:01
 * @FilePath: /DailyRun/assets/scripts/model/LevelModel.ts
 * @Description: 注释信息
 */
export interface LevelModel {
    id: number;
    levelType: string;
    levelTable: string;
    levelName: string;
    enemyCount: number;
    goldCount: number;
    silverCount: number;
    maxTime: number;
};


export interface LevelDetailModel {
    id: number;
    dtype: string;
    name: string;
    pfPath: string;
    pos: Vec2;
    scale: Vec2;
    speed: Vec2;
    damage: number;
    life: number;
    pscore: number;
};