/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-22 22:25:28
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-23 09:07:25
 * @FilePath: \OceanDefense\assets\scripts\GameState.ts
 * @Description: 注释信息
 */

import { Node } from 'cc';

export class GameState {

    static _instance: GameState;

    public static getInstance() {
        if (this._instance == null) {
            this._instance = new GameState();
        }
        return this._instance;
    }

    public wayPoints: Array<Node> = [];
    public curEnemyCount: number = 0;


};