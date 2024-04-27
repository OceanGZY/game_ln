/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-24 23:30:11
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-29 16:23:55
 * @FilePath: /Heros/assets/scripts/UI/JoySticker.ts
 * @Description: 注释信息
 */
import { _decorator, CCFloat, Component, EventTouch, Input, input, math, Node, v2, v3, Vec2, Vec3 } from 'cc';
import { UserInputControll } from '../Global/UserInputControll';
const { ccclass, property } = _decorator;

@ccclass('JoySticker')
export class JoySticker extends Component {

    @property(Node)
    outterJoy: Node;

    @property(Node)
    innerJoy: Node;

    @property({ type: CCFloat })
    maxRadius: number = 50;

    initPos: Vec3;

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        this.initPos = this.outterJoy.getWorldPosition();

    }

    update(deltaTime: number) {

    }

    onTouchStart(event: EventTouch) {
        let outterPos = event.getUILocation();
        this.outterJoy.setWorldPosition(outterPos.x, outterPos.y, 0);
    }

    onTouchMove(event: EventTouch) {
        let tempPos = event.getUILocation();
        let wordPos = v3(tempPos.x, tempPos.y, 0);
        let localPos: Vec3 = v3();
        this.outterJoy.inverseTransformPoint(localPos, wordPos);
        let len: number;
        if (localPos.length() >= this.maxRadius) {
            len = this.maxRadius;
        } else {
            len = localPos.length();
        }
        localPos.normalize().multiplyScalar(len);
        // console.log("此时的localPos", localPos);
        UserInputControll.virtualInputDirection = v2(localPos.x, localPos.y);
        // console.log("此时的UserInputControll.virtualInputDirection", UserInputControll.virtualInputDirection);

        this.innerJoy.setPosition(localPos);
    }

    onTouchEnd(event: EventTouch) {
        // outterJoy归位
        this.outterJoy.setWorldPosition(this.initPos);
        // innerjoy归位
        this.innerJoy.setPosition(Vec3.ZERO);
        UserInputControll.virtualInputDirection = Vec2.ZERO;


    }
}

