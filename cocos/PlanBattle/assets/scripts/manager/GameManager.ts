/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-16 19:59:58
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-20 21:23:06
 * @FilePath: /PlanBattle/assets/scripts/manager/GameManager.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EPhysicsDrawFlags, instantiate, Node, PhysicsSystem, Prefab } from 'cc';
import { GameState, GameStatus } from '../global/GameState';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Prefab)
    levelPrefab: Prefab = null;

    @property(Prefab)
    public playerPrefab: Prefab = null;

    curLevel: Node = null;

    gameState: GameState = GameState.getInstance();


    protected start(): void {
        // 显示碰撞盒子
        // PhysicsSystem.instance.debugDrawFlags = EPhysicsDrawFlags.AABB;

    }

    protected update(deltaTime: number): void {

        switch (this.gameState.gameStatus) {
            case GameStatus.Start: {
                if (this.curLevel) {
                    return;
                }
                this.curLevel = instantiate(this.levelPrefab);
                this.node.parent.addChild(this.curLevel);
                this.curLevel.setPosition(0, 0, 0);
                break;
            }
            case GameStatus.Restart: {
                // console.log("此时的this.curLevel", this.curLevel);
                if (this.curLevel != null) {
                    return;
                }
                // console.log("游戏重新开始了,");
                this.curLevel = instantiate(this.levelPrefab);
                this.node.parent.addChild(this.curLevel);
                this.curLevel.setPosition(0, 0, 0);
                break;
            }
            case GameStatus.Success: {
                if (this.curLevel != null) {
                    this.curLevel.destroy();
                    this.curLevel = null;
                }
            }
            case GameStatus.Fail: {
                if (this.curLevel != null) {
                    this.curLevel.destroy();
                    this.curLevel = null;
                    // console.log("游戏失败后的this.curLevel", this.curLevel);
                }
            }
        }
    }
}

