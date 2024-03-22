/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 15:02:14
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 21:29:53
 * @FilePath: /OceanHero/assets/script/ui/UIJoyStick.ts
 * @Description: 注释信息
 */
import { _decorator, CCFloat, Component, EventTouch, Input, input, math, Node, v3, Vec3 } from 'cc';
import { JoyInput } from '../input/JoyInput';
const { ccclass, property } = _decorator;

@ccclass('UIJoyStick')
export class UIJoyStick extends Component {

    @property(Node)
    outerJoy: Node = null;

    @property(Node)
    innerJoy: Node = null;

    @property({ type: CCFloat })
    maxRaddius: number = 0;

    initPos: Vec3;

    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        this.initPos = this.outerJoy.getWorldPosition();
    }

    update(deltaTime: number) {

    }


    onTouchStart(eventTouch: EventTouch) {
        // 移动outerjoy
        let x = eventTouch.touch.getUILocationX();
        let y = eventTouch.touch.getUILocationY();
        this.outerJoy.setWorldPosition(x, y, 0);
    }

    onTouchMove(eventTouch: EventTouch) {
        // 移动innerjoy
        let x = eventTouch.touch.getUILocationX();
        let y = eventTouch.touch.getUILocationY();

        // 按的地方
        let _wordPos = v3(x, y, 0);
        let _localPos = v3();

        this.outerJoy.inverseTransformPoint(_localPos, _wordPos); // 将世界位置 转换为本地位置

        let len = _localPos.length();
        _localPos.normalize();
        _localPos.multiplyScalar(math.clamp(len, 0, this.maxRaddius));
        this.innerJoy.setPosition(_localPos);

        // 存储摇杆的数据
        JoyInput.horizontalIn = this.innerJoy.position.x / this.maxRaddius;
        JoyInput.verticalIn = this.innerJoy.position.y / this.maxRaddius;
    }

    onTouchEnd(eventTouch: EventTouch) {
        // outterJoy归位
        this.outerJoy.setWorldPosition(this.initPos);
        // innerjoy归位
        this.innerJoy.setPosition(Vec3.ZERO);

        JoyInput.horizontalIn = 0;
        JoyInput.verticalIn = 0;
    }
}

