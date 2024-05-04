/*
 * @Author: OCEAN.GZY
 * @Date: 2024-04-23 15:26:51
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-01 22:58:00
 * @FilePath: /OceanRun/assets/scripts/PlayerController.ts
 * @Description: 注释信息
 */
import { _decorator, Camera, CapsuleCollider, Collider, Component, EventTouch, Input, input, instantiate, Node, Prefab, resources, RigidBody, SkeletalAnimation, v2, v3, Vec2 } from 'cc';
import { WeaponEnum, WeaponDetail } from "./common/WeaponEnum";
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

    currentWeaponId: WeaponEnum = WeaponEnum.Arrow;
    newWeaponId: WeaponEnum = WeaponEnum.Arrow;
    currentWeapon: Object = WeaponDetail["Arrow"];

    weapons: Object = {};



    start() {
        this.playerRigidBody = this.heroModel.getComponent(RigidBody);
        this.scheduleOnce(() => {
            this.heroModel.forward = v3(0, 0, 1);
        }, 2);//掉头

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        this.initBulletPool("Arrow");



    }

    update(deltaTime: number) {

        if (this.currentWeaponId != this.newWeaponId) {
            switch (this.newWeaponId) {
                case WeaponEnum.Arrow:
                    this.initBulletPool("Arrow");
                    break;
                case WeaponEnum.Gun:
                    this.initBulletPool("Gun");
                    break;
            }
        }

        if (this.heroModel.forward.z > 0) {
            this.playerRigidBody.setLinearVelocity(v3(0, 0, -8));
            let _anim = this.heroModel.getChildByName("Rogue").getComponent(SkeletalAnimation);
            if (!_anim.getState("Running_A").isPlaying) {
                _anim.play("Running_A"); //开始运动
            }

            this.shoot(); //自动开火

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


    initBulletPool(name: string) {
        if (this.weapons[name] == undefined || this.weapons[name].length() == 0) {
            this.weapons[name] = [];
            this.currentWeapon = WeaponDetail[name];
            resources.load(this.currentWeapon["prefabPath"], Prefab, (err: Error, data: Prefab) => {
                for (let i = 0; i < 10; i++) {
                    let _bullet = instantiate(data);
                    this.weapons[name].push(_bullet);
                }
            })
        }

    }



    shoot() {
        let bullets: Array<Node> = this.weapons[this.currentWeapon["name"]];
        if (bullets != undefined || bullets.length > 0) {
            let _bullet = bullets.pop();
            console.log("此时的_bullet", _bullet);
            // this.node.parent.addChild(_bullet);
        }
    }
}

