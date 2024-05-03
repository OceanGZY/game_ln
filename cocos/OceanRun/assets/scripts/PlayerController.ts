/*
 * @Author: OCEAN.GZY
 * @Date: 2024-04-23 15:26:51
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-04-30 15:40:17
 * @FilePath: /OceanRun/assets/scripts/PlayerController.ts
 * @Description: 注释信息
 */
import { _decorator, Camera, CapsuleCollider, Collider, Component, EventTouch, Input, input, Node, Prefab, resources, RigidBody, SkeletalAnimation, v2, v3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {


    @property(Node)
    heroModel: Node = null;

    @property(Node)
    playerCamera: Node = null;

    playerRigidBody: RigidBody = null;
    playerCollider: CapsuleCollider = null;

    _startPos: Vec2 = v2(0, 0);
    _endPos: Vec2 = v2(0, 0);

    _roadWidth: number = 12;



    weapons: Array<Node> = [];



    start() {
        this.playerRigidBody = this.heroModel.getComponent(RigidBody);
        this.scheduleOnce(() => {
            this.heroModel.forward = v3(0, 0, 1);
        }, 2);

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);


        resources.load("prefab/weapons/", (err: Error, data: Prefab) => {
            console.log("读取到的预制体",data);
        })



    }

    update(deltaTime: number) {
        if (this.heroModel.forward.z > 0) {
            this.playerRigidBody.setLinearVelocity(v3(0, 0, -8));
            let _anim = this.heroModel.getChildByName("Rogue").getComponent(SkeletalAnimation);
            if (!_anim.getState("Running_A").isPlaying) {
                _anim.play("Running_A");
            }
            this.playerCamera.position = this.heroModel.position.add(v3(0, 35, 39.9));

        }
    }

    onTouchStart(event: EventTouch) {
        this._startPos = event.getUILocation();

    }

    onTouchEnd(event: EventTouch) {
        this._endPos = event.getUILocation();
        let tempX = this._endPos.x - this._startPos.x;
        console.log("滑动之后", tempX);

        if (tempX > 10 && this.heroModel.position.x < this._roadWidth) {
            this.heroModel.position = v3(this.heroModel.position.x + this._roadWidth, this.heroModel.position.y, this.heroModel.position.z);
        }

        if (tempX < -10 && this.heroModel.position.x > -this._roadWidth) {
            this.heroModel.position = v3(this.heroModel.position.x - this._roadWidth, this.heroModel.position.y, this.heroModel.position.z);
        }

        console.log("玩家运动之后", this.heroModel.position.x);
    }



}

