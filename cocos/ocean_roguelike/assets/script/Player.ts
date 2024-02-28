/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-28 00:02:08
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-28 22:31:24
 * @FilePath: \ocean_roguelike\assets\script\Player.ts
 * @Description: 注释信息
 */
import { JoyStick } from './JoyStick';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(JoyStick) joyStick: JoyStick;

    moveSpeed: number = 2;

    start() {

    }

    update(deltaTime: number) {
        const direction = this.joyStick.getJoyDir();

        const x = this.node.position.x;
        const y = this.node.position.y;

        if (direction.x >= 0){
            this.node.setScale(1,1,1);
        }else{
            this.node.setScale(-1,1,1);
        }

        const nx = x + direction.x * this.moveSpeed * deltaTime;
        const ny = y + direction.y * this.moveSpeed * deltaTime;

        this.node.setPosition(nx, ny);
    }
}

