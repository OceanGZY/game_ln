/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-05 20:54:01
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-05 20:58:01
 * @FilePath: \CocosLN\assets\制作一个操作按钮\player.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
import { main } from './main'
const { ccclass, property } = _decorator;


@ccclass('player')
export class player extends Component {

    @property(main) joystick: main;

    moveSpeed:number = 200;

    start() {

    }

    update(deltaTime: number) {
        const joyDir = this.joystick.getJoyDir();
        // 恒定速率
        const dir = joyDir.normalize();
        const x = this.node.position.x;
        const y = this.node.position.y;

        const nx = x+dir.x * deltaTime *this.moveSpeed;
        const ny = y+dir.y * deltaTime *this.moveSpeed;
        this.node.setPosition(nx,ny);
    }
}


