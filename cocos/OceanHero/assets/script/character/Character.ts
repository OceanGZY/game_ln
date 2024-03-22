/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 17:09:34
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 22:31:43
 * @FilePath: /OceanHero/assets/script/character/Character.ts
 * @Description: 注释信息
 */
import { _decorator, CCFloat, Collider, Component, Node, RigidBody, SkeletalAnimation, v2, v3, Vec3 } from 'cc';
import { EnumAnimState } from './EnumAnimState';
import { MathUtil } from '../util/MathUtils';
const { ccclass, property } = _decorator;

let _tempVelocity = v3();
let _tempVelocity1 = v3();

@ccclass('Character')
export class Character extends Component {

    currentState: EnumAnimState = EnumAnimState.Idle;

    @property(SkeletalAnimation)
    skAnim: SkeletalAnimation = null;

    rigidBody: RigidBody = null;
    bodyCollider: Collider = null;

    @property({ type: CCFloat })
    moveSpeed: number = 1.0;

    @property({ type: CCFloat })
    turnSpeed: number = 1.0;

    controlInput: Vec3 = v3();


    start() {
        this.rigidBody = this.node.getComponent(RigidBody);
        this.bodyCollider = this.node.getComponent(Collider);
    }

    update(deltaTime: number) {
        if (this.currentState == EnumAnimState.Die) {
            return;
        }

        switch (this.currentState) {
            case EnumAnimState.Run:
                this.dorotate();
                this.domove();
                break;
        }
    }


    domove() {

        _tempVelocity = v3(this.node.forward.x * this.moveSpeed * this.controlInput.length(), 0, this.node.forward.z * this.moveSpeed * this.controlInput.length());
        // console.log("开始移动了", _tempVelocity);
        this.rigidBody.setLinearVelocity(_tempVelocity);
    }

    stopmove() {
        _tempVelocity = Vec3.ZERO;
        _tempVelocity1 = Vec3.ZERO;
        this.rigidBody.setLinearVelocity(_tempVelocity);
        this.rigidBody.setAngularVelocity(_tempVelocity1);
    }


    dorotate() { // 平滑转向

        console.log("转向input", this.controlInput);

        // 输入方向和当前朝向的夹角
        _tempVelocity1 = v3(0, MathUtil.signAngle(this.node.forward, this.controlInput, Vec3.UP) * this.turnSpeed, 0);

        this.rigidBody.setAngularVelocity(_tempVelocity1);

    }


    // 切换状态
    changeState(nextState: EnumAnimState) {
        if (this.currentState == EnumAnimState.Die) {
            return;
        }

        if (nextState == this.currentState && nextState != EnumAnimState.Hit) {
            return;
        }

        if (this.currentState = EnumAnimState.Run) {
            this.stopmove();
        }

        this.currentState = nextState;
        this.skAnim.crossFade(nextState, 0.3)
    }

    // 复活
    respawn() {
        this.currentState = EnumAnimState.Idle;
        this.skAnim.crossFade(this.currentState, 0.3)
    }
}

