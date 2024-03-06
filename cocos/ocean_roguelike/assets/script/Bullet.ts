/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-05 10:09:22
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-05 23:40:10
 * @FilePath: /ocean_roguelike/assets/script/Bullet.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, RigidBody, RigidBody2D, v2, Vec2, } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    speed: number = 20;
    fireDirection: Vec2 = v2(20, 0);

    
    protected onLoad(): void {
        if (Global.player.getComponent(RigidBody2D).linearVelocity.length() > 0) {
            this.fireDirection = Global.player.getComponent(RigidBody2D).linearVelocity.normalize();
        }
        this.getComponent(RigidBody2D).linearVelocity = this.fireDirection.multiplyScalar(this.speed);
    }

    update(deltaTime: number) {
        if (this.node.position.length() > 200) {
            console.log("分出去了80距离");
            this.node.destroy();
        }
    }
}

