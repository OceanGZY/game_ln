/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-16 20:02:27
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-19 06:50:32
 * @FilePath: /PlanBattle/assets/scripts/bullet/EnemyBullet.ts
 * @Description: 注释信息
 */
import { _decorator, Collider, Component, ICollisionEvent } from 'cc';
import { PlayerController } from '../player/PlayerController';

const { ccclass, property } = _decorator;

@ccclass('EnemyBullet')
export class EnemyBullet extends Component {
    private speed: number = 25;

    start() {
        let collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
        }
    }

    update(deltaTime: number) {
        let newPos = this.node.position.clone().add3f(0, 0, this.speed * deltaTime,);
        this.node.setPosition(newPos);

        if (this.node.position.z > 1000) {
            if (this.node.isValid) {
                this.node.destroy();
            }
        }
    }

    onTriggerEnter(event: ICollisionEvent) {
        console.log("敌人的子弹击中了什么", event.otherCollider.name);
        if (event.otherCollider.getGroup() == 2) {
            if (this.node.isValid) {
                this.node.destroy();
            }
            event.otherCollider.node.getComponent(PlayerController).takeDamage(10);
        }
    }
}

