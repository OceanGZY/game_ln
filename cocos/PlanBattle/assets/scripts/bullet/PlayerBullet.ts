/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-16 20:01:42
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-19 06:30:15
 * @FilePath: /PlanBattle/assets/scripts/bullet/PlayerBullet.ts
 * @Description: 注释信息
 */
import { _decorator, Collider, Component, ICollisionEvent } from 'cc';
import { EnemyController } from '../enemy/EnemyController';
const { ccclass, property } = _decorator;

@ccclass('PlayerBullet')
export class Bullet extends Component {
    private speed: number = 50;

    start() {
        let collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
        }
    }

    update(deltaTime: number) {
        let newPos = this.node.position.clone().add3f(0, 0, -this.speed * deltaTime);
        this.node.setPosition(newPos);

        if (this.node.position.z < -1000) {
            if (this.node.isValid) {
                this.node.destroy();
            }
        }
    }

    onTriggerEnter(event: ICollisionEvent) {
        if (event.otherCollider.getGroup() === 4) {
            if (this.node.isValid) {
                this.node.destroy();
            }
            event.otherCollider.node.getComponent(EnemyController).takeDamage(10);
        }
    }
}
