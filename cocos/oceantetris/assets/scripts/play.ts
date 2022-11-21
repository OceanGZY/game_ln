/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-20 20:59:19
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-21 20:00:10
 * @FilePath: /oceantetris/assets/scripts/play.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, find } from 'cc';
import { init } from "./init"
const { ccclass, property } = _decorator;

@ccclass('play')
export class play extends Component {
    start() {
        this.gameInit = new init

    }
    gameInit: init = null!


    update(deltaTime: number) {

    }

    // 游戏状态 0已结束 1运行中 2已暂停
    gameState: number = null!

    gameStart() {
        let _gameWelcome = find("Canvas/GameWelcome")
        _gameWelcome!.active = false
        this.gameState = 1
        this.gameInit.initBox()
        this.gameInit.autoDown()
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


