/*
 * @Author: OCEAN.GZY
 * @Date: 2024-04-23 15:26:51
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-04-23 16:30:56
 * @FilePath: /OceanRun/assets/scripts/PlayerController.ts
 * @Description: 注释信息
 */
import { _decorator, Camera, CapsuleCollider, Collider, Component, Node, RigidBody, SkeletalAnimation, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    @property(Node)
    heroModel: Node = null;

    @property(Node)
    playerCamera: Node = null;

    playerRigidBody: RigidBody = null;
    playerCollider: CapsuleCollider = null;

    start() {
        this.playerRigidBody = this.heroModel.getComponent(RigidBody);
        this.scheduleOnce(() => {
            this.heroModel.forward = v3(0, 0, 1);
        }, 2);
    }

    update(deltaTime: number) {

        this.playerRigidBody.setLinearVelocity(v3(0, 0, -8));
        let _anim = this.heroModel.getChildByName("Rogue").getComponent(SkeletalAnimation);
        if (!_anim.getState("Running_A").isPlaying) {
            _anim.play("Running_A");
        }
        this.playerCamera.position = this.heroModel.position.add(v3(0, 35, 39.9));

    }
}

