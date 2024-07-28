/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-22 20:35:29
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-28 22:20:12
 * @FilePath: \OceanDefense\assets\scripts\Game.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EPhysicsDrawFlags, instantiate, PhysicsSystem } from 'cc';
import { EnemyWaveModel } from './enemy/EnemyWaveModel';
import { BuildManager } from './buildSystem/BuildManager';
const { ccclass, property } = _decorator;


@ccclass('Game')
export class Game extends Component {

    @property([EnemyWaveModel])
    enemyWaveList: EnemyWaveModel[] = [];



    waveIndex: number = 0;
    curEnemyWave: EnemyWaveModel = null;
    curEnemyCount: number = 0;

    protected onLoad(): void {
        BuildManager.getInstance().wayPoints = this.node.scene.getChildByName("WayPoints").children;
        BuildManager.getInstance().groundCells = this.node.scene.getChildByName("Map").getChildByName("Ground").children;
    }

    start() {
        // 显示碰撞盒子
        // PhysicsSystem.instance.debugDrawFlags = EPhysicsDrawFlags.AABB;

    }

    update(deltaTime: number) {
        // console.log("(this.waveIndex", this.waveIndex);
        if (this.waveIndex > this.enemyWaveList.length - 1) {
            return;
        }
        this.spawnEnemy();
    }

    spawnEnemy() {
        if (BuildManager.getInstance().curEnemyCount == 0) {
            this.curEnemyWave = this.enemyWaveList[this.waveIndex];
            for (let i = 0; i < this.curEnemyWave.count; i++) {
                // console.log("触发生成敌人逻辑");
                this.timer(i);
            }
            this.waveIndex++;
            // console.log("this.waveIndex", this.waveIndex);
        }
    }


    timer(i: number) {
        setTimeout(() => {
            let tempEnemy = instantiate(this.curEnemyWave.enemyPrefab);
            let initPos = this.node.scene.getChildByName("StartPoint").getPosition();
            this.node.scene.addChild(tempEnemy);
            tempEnemy.setPosition(initPos);
            BuildManager.getInstance().curEnemyCount++;
        }, i * 1000);
    }



}


