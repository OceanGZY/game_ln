import { Vec2, v2, Vec3 } from 'cc';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-28 23:07:39
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-29 00:17:45
 * @FilePath: /ocean_roguelike/assets/script/Monster.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends Component {

    moveSpeed: number = 20;
    aimDirection: Vec2 = v2(0, 0);

    start() {

    }

    update(deltaTime: number) {
        // console.log("this.node.worldPosition",this.node.worldPosition);
        // console.log("Global.player.worldPosition",Global.player.worldPosition);
        this.aimDirection = v2(Global.player.worldPosition.x - this.node.worldPosition.x, Global.player.worldPosition.y - this.node.worldPosition.y).normalize();

        console.log("this.aimDirection", this.aimDirection);

        const x = this.node.position.x;
        const y = this.node.position.y;

        if (this.aimDirection.x >= 0) {
            this.node.setScale(1, 1, 1);
        } else {
            this.node.setScale(-1, 1, 1);
        }

        const nx = x + this.aimDirection.x * this.moveSpeed * deltaTime;
        const ny = y + this.aimDirection.y * this.moveSpeed * deltaTime;

        console.log("new nx",nx);
        console.log("new ny",ny);
        
        this.node.setPosition(nx, ny);
    }

}


