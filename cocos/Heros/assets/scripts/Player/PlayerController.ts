/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-19 17:49:13
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-21 18:14:28
 * @FilePath: /Heros/assets/scripts/PlayerController.ts
 * @Description: 注释信息
 */
import { _decorator, CapsuleCharacterController, CharacterController, Component, EventKeyboard, Input, input, KeyCode, Quat, RigidBody, SkeletalAnimation, v3, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    moverDir: Vec3 = v3(0, 0, 0);

    moveSpeed: number = 10;
    turnSpeed: number = 100;

    playerRigidBody: RigidBody;
    playerAnim: SkeletalAnimation;

    start() {
        this.playerRigidBody = this.getComponent(RigidBody);
        this.playerAnim = this.getComponent(SkeletalAnimation);
        this.playerAnim.playOnLoad = true;
        this.playerAnim.play("Idle");
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        // console.log("init的forward", this.node.forward);
    }

    update(deltaTime: number) {
        let velocity = this.moverDir.normalize().multiplyScalar(this.moveSpeed * deltaTime);
        // console.log("此时的速度",velocity);
        if (this.playerRigidBody) {
            if (velocity.length() > 0) {
                var _state = this.playerAnim.getState("Walking_A");
                // console.log("Walking_A的state", _state);
                if (!_state.isPlaying) {
                    this.playerAnim.play("Walking_A");
                }
            } else {
                // console.log("停止运动了");
                var _state = this.playerAnim.getState("Idle");
                // console.log("Idle的state", _state);
                if (!_state.isPlaying) {
                    this.playerAnim.play("Idle");
                }
            }
            this.playerRigidBody.setLinearVelocity(velocity);  //运动速度设置

        }

    }

    onKeyDown(event: EventKeyboard) {
        this.moverDir = v3(0, 0, 0);
        this.moveSpeed = 100;
        console.log(event.keyCode);

        switch (event.keyCode) {
            case KeyCode.KEY_W:
                console.log("前进");
                this.moverDir.z = -1;
                console.log(this.node.forward);
                this.node.forward = v3(this.moverDir.x, this.moverDir.y, -this.moverDir.z);

                break;
            case KeyCode.KEY_S:
                console.log("后退")
                this.moverDir.z = 1;
                console.log(this.node.forward);
                this.node.forward = v3(this.moverDir.x, this.moverDir.y, -this.moverDir.z);

                break;
            case KeyCode.KEY_A:
                console.log("向左")
                this.moverDir.x = -1;
                console.log(this.node.forward);
                this.node.forward = v3(-this.moverDir.x, this.moverDir.y, this.moverDir.z);

                break;
            case KeyCode.KEY_D:
                console.log("向右")
                this.moverDir.x = 1;
                console.log(this.node.forward);
                this.node.forward = v3(-this.moverDir.x, this.moverDir.y, this.moverDir.z);

                break;
        }

    }
    onKeyUp(event: EventKeyboard) {
        console.log("按键松开");
        this.moveSpeed = 0;
    }

}

