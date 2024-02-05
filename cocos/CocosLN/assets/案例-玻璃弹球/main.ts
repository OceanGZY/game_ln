import { CircleCollider2D, Collider2D, Contact2DType, Director, director } from 'cc';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-05 15:16:46
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-05 16:01:29
 * @FilePath: /CocosLN/assets/案例-玻璃弹球/main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EPhysics2DDrawFlags, Node, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    @property(Node) aimNode: Node;

    start() {
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Shape;
        this.handleAttackAim();
    }

    update(deltaTime: number) {

    }

    handleAttackAim() {
        const collider = this.aimNode.getComponent(CircleCollider2D); // 获取碰撞体
        collider.on(Contact2DType.BEGIN_CONTACT, (slef: CircleCollider2D, other: CircleCollider2D) => {
            console.log(other.node.name);
            director.once(Director.EVENT_AFTER_PHYSICS, () => { // 物理结束后销毁玻璃球
                other.node.destroy();
            }, this)
        }, this);

    }
}

