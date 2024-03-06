/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-28 00:02:08
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-05 22:58:05
 * @FilePath: /ocean_roguelike/assets/script/Player.ts
 * @Description: 注释信息
 */
import { JoyStick } from './JoyStick';
import { Weapon } from './Weapon';
import { _decorator, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, PhysicsSystem2D, Prefab, RigidBody2D, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(JoyStick) joyStick: JoyStick;
    @property(Prefab) weapon: Prefab;

    moveSpeed: number = 5;
    body: RigidBody2D;
    weaponPoint: Node;
    curWeapon: Node;

    start() {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }

        this.body = this.getComponent(RigidBody2D);
        this.weaponPoint = this.node.getChildByName("WeaponPoint");

        this.curWeapon = instantiate(this.weapon);
        this.curWeapon.setPosition(this.weaponPoint.position);

        this.node.addChild(this.curWeapon);
    }

    update(deltaTime: number) {
        const direction = this.joyStick.getJoyDir();

        // if (direction.x >= 0) {
        //     this.node.setScale(1, 1, 1);
        // } else {
        //     this.node.setScale(-1, 1, 1);
        // }

        const nx = direction.x * this.moveSpeed * deltaTime;
        const ny = direction.y * this.moveSpeed * deltaTime;
        let radian = Math.atan2(ny, nx);
        var angle = radian / Math.PI * 180;

        this.curWeapon.angle = angle;
        console.log(" var angle = radian/Math.PI * 180;", angle);


        this.body.linearVelocity = v2(nx, ny);


    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('palyer onBeginContact');
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        console.log('palyer onEndContact');
    }

    onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次将要处理碰撞体接触逻辑时被调用
        console.log('palyer onPreSolve');
    }
    onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 每次处理完碰撞体接触逻辑时被调用
        console.log('palyer onPostSolve');
    }
}

