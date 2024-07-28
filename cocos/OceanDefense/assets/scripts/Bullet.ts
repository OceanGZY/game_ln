/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-27 10:21:14
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-28 17:28:44
 * @FilePath: \OceanDefense\assets\scripts\Bullet.ts
 * @Description: 注释信息
 */
import { _decorator, Component, ITriggerEvent, Node, Quat, SphereCollider, Vec3 } from 'cc';
import { Enemy } from './enemy/Enemy';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    fireDir: Vec3 = Vec3.ZERO;
    speed: number = 20;

    start() {
        this.node.getComponent(SphereCollider).on("onTriggerEnter", this.onTriggerEnter, this);

    }

    update(deltaTime: number) {
        if (this.node.isValid && this.fireDir != Vec3.ZERO) {
            let oldPos = this.node.position;
            this.node.setPosition(oldPos.x - this.fireDir.x * deltaTime * this.speed, oldPos.y, oldPos.z - this.fireDir.z * deltaTime * this.speed);
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        if (this.node.isValid) {
            if (event.otherCollider.getGroup() == 2) {
                event.otherCollider.node.getComponent(Enemy).takeDamage(10);
                this.node.destroy();
            }
        }
    }
}


