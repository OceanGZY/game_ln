/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-19 17:49:13
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-04-05 22:58:54
 * @FilePath: /Heros/assets/scripts/Player/PlayerController.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, RigidBody, SkeletalAnimation, v3, Vec2, Vec3 } from 'cc';
import { UserInputControll } from '../Global/UserInputControll';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    moverDir: Vec3 = v3(0, 0, 0);

    moveSpeed: number = 100;
    turnSpeed: number = 100;

    playerRigidBody: RigidBody;
    playerAnim: SkeletalAnimation;

    playerUI: Node;
    firePoint: Node;

    start() {
        this.playerRigidBody = this.getComponent(RigidBody);
        this.playerAnim = this.getComponent(SkeletalAnimation);
        this.playerAnim.playOnLoad = true;
        this.playerAnim.play("Idle");

        this.playerUI = this.node.parent.getChildByName("CharacterUI");
        this.firePoint = this.node.parent.getChildByName("FirePoint");
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        // input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        // console.log("init的forward", this.node.forward);
    }

    update(deltaTime: number) {
        this.playerUI.position = this.node.position.add(v3(0, 3, 0));
        this.firePoint.position = this.node.position.add(v3(0, 1, 1));
        if (UserInputControll.virtualInputDirection != Vec2.ZERO) {
            // 玩家移动速度方向
            this.moverDir = v3(UserInputControll.virtualInputDirection.x, 0, -UserInputControll.virtualInputDirection.y);
            // console.log("虚拟摇杆控制的速度方向", this.moverDir);
            // 玩家面部朝向
            this.node.forward = v3(-this.moverDir.x, this.moverDir.y, -this.moverDir.z);
        } else {
            this.moverDir = v3(0, 0, 0);
        }

        let velocity = this.moverDir.normalize().multiplyScalar(this.moveSpeed * deltaTime);

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


    // 已停用 按键输入，启用虚拟摇杆输入
    // onKeyDown(event: EventKeyboard) {
    //     this.moverDir = v3(0, 0, 0);
    //     this.moveSpeed = 100;
    //     console.log(event.keyCode);

    //     switch (event.keyCode) {
    //         case KeyCode.KEY_W:
    //             console.log("前进");
    //             this.moverDir.z = -1;

    //             this.node.forward = v3(this.moverDir.x, this.moverDir.y, -this.moverDir.z);

    //             break;
    //         case KeyCode.KEY_S:
    //             console.log("后退")
    //             this.moverDir.z = 1;

    //             this.node.forward = v3(this.moverDir.x, this.moverDir.y, -this.moverDir.z);

    //             break;
    //         case KeyCode.KEY_A:
    //             console.log("向左")
    //             this.moverDir.x = -1;

    //             this.node.forward = v3(-this.moverDir.x, this.moverDir.y, this.moverDir.z);

    //             break;
    //         case KeyCode.KEY_D:
    //             console.log("向右")
    //             this.moverDir.x = 1;

    //             this.node.forward = v3(-this.moverDir.x, this.moverDir.y, this.moverDir.z);

    //             break;
    //     }

    // }
    // onKeyUp(event: EventKeyboard) {
    //     console.log("按键松开");
    //     this.moveSpeed = 0;
    // }

}

