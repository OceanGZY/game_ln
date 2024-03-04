import { Vec2, v2, Vec3, RigidBody2D } from 'cc';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-28 23:07:39
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-04 19:50:19
 * @FilePath: /ocean_roguelike/assets/script/Monster.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends Component {

    moveSpeed: number = 50;
    aimDirection: Vec2 = v2(0, 0);
    body: RigidBody2D

    start() {
        this.body = this.getComponent(RigidBody2D);
    }

    update(deltaTime: number) {
        // console.log("this.node.worldPosition",this.node.worldPosition);
        // console.log("Global.player.worldPosition",Global.player.worldPosition);
        this.aimDirection = v2(Global.player.worldPosition.x - this.node.worldPosition.x, Global.player.worldPosition.y - this.node.worldPosition.y).normalize();

        // console.log("this.aimDirection", this.aimDirection);

        // const x = this.node.position.x;
        // const y = this.node.position.y;

        if (this.aimDirection.x >= 0) {
            this.node.setScale(1, 1, 1);
        } else {
            this.node.setScale(-1, 1, 1);
        }

        const nx = this.aimDirection.x * this.moveSpeed * deltaTime;
        const ny = this.aimDirection.y * this.moveSpeed * deltaTime;

        // console.log("new nx",nx);
        // console.log("new ny",ny);

        this.body.linearVelocity = v2(nx, ny);
    }

}


