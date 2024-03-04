import { v2 } from 'cc';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-04 17:17:57
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-04 23:03:49
 * @FilePath: \ocean_roguelike\assets\script\Weapon.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, instantiate, Prefab, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class Weapon extends Component {

    @property(Prefab) bullet: Prefab

    firePoint: Node
    i:number = 0;


    start() {
        this.firePoint = this.node.getChildByName("FirePoint");
    }

    update(deltaTime: number) {
       
        console.log(this.i);
        if (Math.round(this.i / 5)==1) {
            var _bullet = instantiate(this.bullet);
            _bullet.setPosition(this.firePoint.position);

            let _bullet_body = _bullet.getComponent(RigidBody2D);
            this.node.addChild(_bullet);

            _bullet_body.linearVelocity = v2(10, 0);
        }
        this.i = this.i+deltaTime;
    }
}

