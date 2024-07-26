
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-25 21:47:58
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-26 19:02:01
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

}
