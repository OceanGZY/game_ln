/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-20 11:38:33
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-20 21:20:11
 * @FilePath: /PlanBattle/assets/scripts/level/level.ts
 * @Description: 注释信息
 */
import { _decorator, Component, instantiate, Node, Prefab, random, randomRange, randomRangeInt, resources } from 'cc';
import { GameManager } from '../manager/GameManager';
import { GameState, GameStatus } from '../global/GameState';
import { AudioManager } from '../manager/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('level')
export class level extends Component {

    curEnemyCnt: number = 0;
    enemyInterval: number = 1;

    gameState: GameState = GameState.getInstance();

    start() {
        const gameManager = this.node.parent.getComponentInChildren("GameManager") as GameManager;
        const player = instantiate(gameManager.playerPrefab);

        this.node.scene.getChildByName("Audio").getComponent(AudioManager).playBgm(true);
        this.node.addChild(player);
        player.setPosition(-2.6, 6, 26);
        for (let i = 0; i < 3; i++) {
            this.spawnEnemy();
        }
        this.schedule(this.spawnEnemy, this.enemyInterval);
    }

    update(deltaTime: number) {
        if (this.gameState.killedCnt >= this.gameState.enemyCount) {
            this.node.scene.getChildByName("Audio").getComponent(AudioManager).playBgm(false);
            this.gameState.gameStatus = GameStatus.Success;
        }
    }
    // 随机位置生成敌人
    spawnEnemy() {
        if (this.curEnemyCnt >= this.gameState.enemyCount) {
            return;
        }
        resources.loadDir<Prefab>("prefabs/enemy", (error, data) => {
            var index = randomRangeInt(0, data.length);
            var tempEnemy = instantiate(data[index]);
            this.node.addChild(tempEnemy);
            tempEnemy.setPosition(randomRangeInt(-25, 25), 6, randomRangeInt(0, -63));
            this.curEnemyCnt++;
        })
    }
}

