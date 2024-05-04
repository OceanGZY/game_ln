/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-04 17:05:34
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-04 22:42:02
 * @FilePath: \DailyRun\assets\scripts\main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, PhysicsSystem2D, EPhysics2DDrawFlags, BoxCollider2D, Contact2DType, IPhysics2DContact, EventTouch, Input, v2, tween, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {


    @property(Node)
    player: Node = null;
    playerColider: BoxCollider2D = null;
    playBody: RigidBody2D = null;

    @property(Node)
    backgrounds: Array<Node> = []; // 背景图片

    jumpForce: number = 100; // 跳跃力度  
    jumpDuration: number = 3; // 跳跃持续时间  
    maxJumpCount: number = 2; // 最大连跳次数

    bgSpeed: number = 128; // 背景运动速度


    start() {
        // 显示碰撞区域
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;

        this.playerColider = this.player.getComponent(BoxCollider2D);
        this.playBody = this.player.getComponent(RigidBody2D);

        this.playerColider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)

        this.node.parent.on(Input.EventType.TOUCH_START, this.doJump, this);

        this.schedule(this.backgoundMove);
    }

    update(deltaTime: number) {

    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
    }

    doJump(event: EventTouch) {
        this.playBody.applyLinearImpulse(v2(0, this.jumpForce), v2(this.playBody.node.worldPosition.x, this.playBody.node.worldPosition.y), true);
    }

    backgoundMove() {
        let dt:number=0.01;
        let posX0 = this.backgrounds[0].position.x - this.bgSpeed * dt;
        let posX1 = this.backgrounds[1].position.x - this.bgSpeed * dt;

        if (posX0 <= -1280) {
            posX0 = 640;
            posX1 = 0;

        }
        if (posX1 <= -1280) {
            posX1 = 640;
            posX0 = 0;

        }
        this.backgrounds[0].setPosition(posX0, 0);
        this.backgrounds[1].setPosition(posX1, 0);


        tween(this.backgrounds[0])                                                                              
    }
}


