/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-21 18:55:13
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-21 18:58:46
 * @FilePath: /OceanFarm/assets/scripts/StartUI.ts
 * @Description: 注释信息
 */
import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartUI')
export class StartUI extends Component {

    @property(Node)
    startBtn: Node = null;

    start() {
        this.startBtn.on(Button.EventType.CLICK, this.onStartGame, this);
    }

    update(deltaTime: number) {

    }

    onStartGame() {
        director.loadScene("FarmGame.scene");
    }
}

