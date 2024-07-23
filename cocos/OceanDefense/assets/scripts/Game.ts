/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-22 20:35:29
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-24 00:00:17
 * @FilePath: \OceanDefense\assets\scripts\Game.ts
 * @Description: 注释信息
 */
import { _decorator, Component, instantiate, Node, Prefab, tween } from 'cc';
import { GameState } from './GameState';
import { EnemyWave } from './EnemyWave';
const { ccclass, property } = _decorator;


@ccclass('Game')
export class Game extends Component {

    @property([EnemyWave])
    enemyWaveList: EnemyWave[] = [];

    waveIndex: number = 0;
    curEnemyWave: EnemyWave = null;
    curEnemyCount: number = 0;

    protected onLoad(): void {
        GameState.getInstance().wayPoints = this.node.scene.getChildByName("WayPoints").children;
    }

    start() {

    }

    update(deltaTime: number) {
        if (this.waveIndex > this.enemyWaveList.length - 1) {
            return;
        }
        this.curEnemyWave = this.enemyWaveList[this.waveIndex];
        this.spawnEnemy();
    }

    spawnEnemy() {
        if (GameState.getInstance().curEnemyCount == 0) {
            for (let i = 0; i < this.curEnemyWave.count; i++) {
                console.log("触发生成逻辑");
                setTimeout(() => {
                    let tempEnemy = instantiate(this.curEnemyWave.enemyPrefab);
                    let initPos = this.node.scene.getChildByName("StartPoint").getPosition();
                    this.node.scene.addChild(tempEnemy);
                    tempEnemy.setPosition(initPos);
                    GameState.getInstance().curEnemyCount++;
                }, this.curEnemyWave.rate * 1000);
            }

            this.waveIndex++;
            console.log("this.waveIndex", this.waveIndex);
        }
    }
}


