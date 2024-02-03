/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-03 16:32:36
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-03 17:07:14
 * @FilePath: /CocosLN/assets/Learn01/scripts/GameRoot.ts
 * @Description: 注释信息
 */
import { _decorator, Component, easing, EventTouch, Node, tween, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameRoot')
export class GameRoot extends Component {

    @property(Node) cbutton: Node; // 通过property来绑定其他Node进行访问
    @property(Node) title: Node;
    @property(Node) leftCtl: Node;
    @property(Node) rightCtl: Node;

    start() {
        this.myAnimation();
        // this.cbutton.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
        //     this.cbutton.setScale(0.5, 0.5);
        // }, this);

        // this.cbutton.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
        //     this.cbutton.setScale(1, 1);

        //     // 触发动画
        //     this.myAnimation();

        // }, this);

        this.leftCtl.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
            this.leftCtl.setScale(0.9, 0.9);
        }, this);

        this.rightCtl.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
            this.rightCtl.setScale(0.9, 0.9);
        }, this);

        this.leftCtl.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
            this.leftCtl.setScale(1, 1);
            this.myControlAnimation();
        }, this);

        this.rightCtl.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
            this.rightCtl.setScale(1, 1);
            this.myControlAnimation();
        }, this);
    }
    myAnimation() { // 基础类型的缓动
        tween(this.title)
            .to(1, { position: v3(100, 700, 0) }, { easing: "quadOut" }) // 在1S的时间内，改成【属性值对象】：譬如位置
            .to(1, { position: v3(0, 395, 0) }, { easing: "quadIn" })
            .start();
    }
    myControlAnimation() {
        const obj = {
            n: this.title.position.x,
        };
        tween(obj)
            .to(1, { n: this.title.position.x - 50 })

    }


    update(deltaTime: number) {

    }
}

