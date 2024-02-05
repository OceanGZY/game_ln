/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-05 16:07:17
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-05 17:39:59
 * @FilePath: /CocosLN/assets/案例-2D跑酷/main.ts
 * @Description: 注释信息
 */
import { _decorator, Collider2D, Component, Contact2DType, Director, director, EPhysics2DDrawFlags, EventKeyboard, Input, input, KeyCode, Node, PhysicsSystem2D, RigidBody2D, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

    @property(RigidBody2D) playerRigidBody: RigidBody2D;

    // 键盘左右键按压状态
    kaySate = [false, false];

    speedX = 8;
    speedY = 20;

    jumpTimes = 2;

    start() {
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;
        this.openInputEvents();
        this.dealJumpTimes();

    }

    openInputEvents() {
        input.on(Input.EventType.KEY_DOWN, this.handleKeyPressEvents, this);
        input.on(Input.EventType.KEY_UP, this.handleKeyReleaseEvents, this);

    }

    update(deltaTime: number) {
        // const tmpVelocity = this.playerRigidBody.linearVelocity;
        if (this.kaySate[0]) {
            // this.playerRigidBody.linearVelocity = v2(-3, tmpVelocity.y); // x负方向的线速度
            this.changeRigidBodyCelocityX(this.playerRigidBody, -this.speedX);
        }
        if (this.kaySate[1]) {
            // this.playerRigidBody.linearVelocity = v2(3, tmpVelocity.y);// x正方向的线速度
            this.changeRigidBodyCelocityX(this.playerRigidBody, this.speedX);
        }

        this.deadCheck();

    }

    // 控制键盘按下时的状态
    handleKeyPressEvents(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                console.log("按下空格键了");
                this.doJump();
                break;
            case KeyCode.KEY_A:
                console.log("按下左键了");
                this.kaySate[0] = true;
                break;
            case KeyCode.KEY_D:
                console.log("按下右键了");
                this.kaySate[1] = true;
                break;
            default:
                console.log("无效按键");
                break;
        }
    }
    // 控制键盘释放时的状态
    handleKeyReleaseEvents(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                console.log("释放空格键了");
                break;
            case KeyCode.KEY_A:
                console.log("释放左键了");
                this.kaySate[0] = false;
                break;
            case KeyCode.KEY_D:
                console.log("释放右键了");
                this.kaySate[1] = false;
                break;
            default:
                console.log("无效按键");
                break;
        }
    }

    doJump() { // 仅改变Y分量， 保持X分量不变
        // const tmpVelocity = this.playerRigidBody.linearVelocity;
        // this.playerRigidBody.linearVelocity = v2(tmpVelocity.x, 10);
        if (this.jumpTimes <= 2 && this.jumpTimes > 0) {
            this.changeRigidBodyCelocityY(this.playerRigidBody, this.speedY);
            this.jumpTimes--;
        }
    }

    dealJumpTimes() {
        const node = this.playerRigidBody.node;
        const collider = node.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, (self: Collider2D, other: Collider2D) => {
            if (other.group == 4) {
                console.log("碰到地面了");
                this.jumpTimes = 2;
            }
        }, this);

    }

    changeRigidBodyCelocityX(rigidbody: RigidBody2D, x: number) {
        const tmpVelocity = rigidbody.linearVelocity;
        rigidbody.linearVelocity = v2(x, tmpVelocity.y);
    }

    changeRigidBodyCelocityY(rigidbody: RigidBody2D, y: number) {
        const tmpVelocity = rigidbody.linearVelocity;
        rigidbody.linearVelocity = v2(tmpVelocity.x, y);
    }


    deadCheck() {
        const y = this.playerRigidBody.node.position.y;
        if (y < -100) {
            console.log("GameOver!");
        }
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.handleKeyPressEvents, this);
        input.off(Input.EventType.KEY_DOWN, this.handleKeyReleaseEvents, this);
    }

}

