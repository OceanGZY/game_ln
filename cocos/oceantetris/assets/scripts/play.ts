/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-20 20:59:19
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-20 21:10:19
 * @FilePath: \oceantetris\assets\scripts\play.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('play')
export class play extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    // 游戏状态 0已结束 1运行中 2已暂停
    gameState: number = null!

    gameStart() {
        let _gameWelcome = find("Canvas/GameWelcome")
        _gameWelcome!.active = false
        this.gameState = 1
    }

    gameResume() {
        this.gameState = 1

    }

    gamePause() {
        this.gameState = 2

    }

    isGameOver(): boolean {
        if (this.gameState == 0) {
            return true
        } else {
            return false
        }
    }

}


