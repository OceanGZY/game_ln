import { Color, Label } from 'cc';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-03 16:32:36
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-03 20:13:36
 * @FilePath: \CocosLN\assets\Learn01\scripts\GameRoot.ts
 * @Description: 注释信息
 */
import { _decorator, Component, easing, EventTouch, Node, tween, v3, Tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('GameRoot')
export class GameRoot extends Component {

    @property(Node) cbutton: Node; // 通过property来绑定其他Node进行访问
    @property(Node) title: Node;
    @property(Node) leftCtl: Node;
    @property(Node) rightCtl: Node;
    @property(Node) stopCtl: Node;

    moveTween: Tween<object>;
    titleLabel: Label;

    start() {
        this.myAnimation();
        this.titleLabel = this.title.getComponent(Label);
        this.colorChangeAnimation();
        this.cbutton.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
            this.cbutton.setScale(0.5, 0.5);
        }, this);

        this.cbutton.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
            this.cbutton.setScale(1, 1);

            // 触发动画
            // this.myAnimation();

        }, this);

        this.leftCtl.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
            this.leftCtl.setScale(0.9, 0.9);
        }, this);

        this.rightCtl.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
            this.rightCtl.setScale(0.9, 0.9);
        }, this);

        this.leftCtl.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
            this.leftCtl.setScale(1, 1);
            this.leftControlAnimation();
        }, this);

        this.rightCtl.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
            this.rightCtl.setScale(1, 1);
            this.rightControlAnimation();
        }, this);

        this.stopCtl.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
            this.moveTween.stop();
        }, this);
    }
    myAnimation() { // 基础类型的缓动
        // 方法一 循环动画
        // tween(this.title)
        //     .to(0.5, { position: v3(0, 500, 0) }, { easing: "quadOut" }) // 在1S的时间内，改成【属性值对象】：譬如位置
        //     .to(0.5, { position: v3(0, 395, 0) }, { easing: "quadIn" })
        //     .union()// 合并动作
        //     .repeatForever() //重复
        //     .start();

        // 方法二 循环动画
        const obj = {
            n: this.title.position.y,
        };
        this.moveTween = tween(obj).repeatForever(
            tween(obj).to(0.5, { n: 500 }, {
                onUpdate: (target: object, ratio: number) => {
                    this.title.setPosition(this.title.position.x, obj.n)
                },
                easing: "quadOut"
            }).to(0.5, { n: 0 }, {
                onUpdate: (target: object, ratio: number) => {
                    this.title.setPosition(this.title.position.x, obj.n)
                },
                easing: "quadIn"
            })

        ).start();
    }



    leftControlAnimation() {
        const obj = {
            n: this.title.position.x,
        };
        tween(obj)
            .to(1, { n: this.title.position.x - 50 }, {
                onUpdate: (target: object, ratio: number) => {
                    this.title.setPosition(obj.n, this.title.position.y)
                }
            }).start()
    }

    rightControlAnimation() {
        const obj = {
            n: this.title.position.x,
        };
        tween(obj)
            .to(1, { n: this.title.position.x + 50 }, {
                onUpdate: (target: object, ratio: number) => {
                    this.title.setPosition(obj.n, this.title.position.y)
                }
            }).start()
    }

    colorChangeAnimation() {
        const color = new Vec3(255, 255, 255);
        tween(color)
            .to(2, { x: 10, y: 150, z: 0 }, { onUpdate: () => { this.titleLabel.color = new Color(color.x, color.y, color.z) } })
            .to(2, { x: 120, y: 0, z: 100 }, { onUpdate: () => { this.titleLabel.color = new Color(color.x, color.y, color.z) } })
            .union()
            .repeatForever()
            .start()
    }

    update(deltaTime: number) {

    }
}

