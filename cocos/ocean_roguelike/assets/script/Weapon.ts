import { Vec2, v2 } from 'cc';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-04 17:17:57
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-05 23:35:35
 * @FilePath: /ocean_roguelike/assets/script/Weapon.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, instantiate, Prefab, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class Weapon extends Component {

    @property(Prefab) bullet: Prefab

    // 以秒为单位的时间间隔
    interval: number = 1;

    start() {
        this.schedule(function () {
            var firePoint = this.node.getChildByName("FirePoint");
            var _bullet = instantiate(this.bullet);
            _bullet.setPosition(firePoint.position);
            let _bullet_body = _bullet.getComponent(RigidBody2D);
            this.node.addChild(_bullet);
        }, this.interval);
    }

    update(deltaTime: number) {
    }

}

