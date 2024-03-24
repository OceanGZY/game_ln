/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-24 23:06:26
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-24 23:21:39
 * @FilePath: /Heros/assets/scripts/UI/UIStart.ts
 * @Description: 注释信息
 */
import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIStart')
export class UIStart extends Component {

    @property(Node)
    startBtn: Node = null;

    start() {
        this.startBtn.on(Button.EventType.CLICK, this.startGame, this);

    }

    update(deltaTime: number) {

    }

    startGame() {
        director.loadScene("Game");
    }
}

