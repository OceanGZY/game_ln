
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-25 21:47:58
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-28 18:22:45
 * @FilePath: \OceanDefense\assets\scripts\buildSystem\BuildManager.ts
 * @Description: 注释信息
 */
import { _decorator, Node, Prefab } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('BuildManager')
export class BuildManager {
    static _instance: BuildManager;

    public static getInstance() {
        if (this._instance == null) {
            this._instance = new BuildManager();
        }
        return this._instance;
    }

    public wayPoints: Array<Node> = [];
    public curEnemyCount: number = 0;
    public curTurretToBuild: Prefab = null;
    public curSelectGroundCell: Node;
    public groundCells: Node[];
    public score: number = 0;
    public killedEnemy: number = 0;
    public escapeEnemy: number = 0;

    reset() {
        this.wayPoints = [];
        this.curEnemyCount = 0;
        this.curTurretToBuild = null;
        this.curSelectGroundCell = null;
        this.groundCells = [];
        this.score = 0;
        this.killedEnemy = 0;
        this.escapeEnemy = 0;
    }
}
