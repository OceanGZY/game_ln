/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-19 07:23:27
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-20 19:34:34
 * @FilePath: /PlanBattle/assets/scripts/global/GameState.ts
 * @Description: 注释信息
 */

export enum GameStatus {
    Ready,
    Start,
    Restart,
    Pause,
    Success,
    Fail,
}

export class GameState {
    private static _instance: GameState;

    public static getInstance(): GameState {
        if (this._instance == null) {
            this._instance = new GameState()
        }
        return this._instance;
    }

    public gameStatus: GameStatus = GameStatus.Ready;

    public score: number = 0;
    public playerExp: number = 0;
    public playerHealth: number = 100;
    public playerMaxHealth: number = 100;
    public playerLevel: number = 0;
    public playerAttack: number = 0;

    public enemyCount: number = 100;

}

