/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-03 09:59:25
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-03 11:09:48
 * @FilePath: \CocosLN\assets\Learn01\scripts\Learn01.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, EventTouch } from 'cc';
const { ccclass, property } = _decorator;


let logoNode: Node;
let nameNode: Node;
@ccclass('Learn01')
export class Learn01 extends Component {
    start() {
        logoNode = this.node.getChildByName("Logo");
        nameNode = this.node.getChildByName("Name");
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    update(deltaTime: number) {

    }

    onTouchStart(event: EventTouch) {

        logoNode.setScale(0.5, 0.5);
        const canvasPos = event.getLocation();  // 界面上的实际位置，会因为放大缩小而改变
        const uiPos = event.getUILocation(); // 获取UI粒度的位置，已经将屏幕的分辨率影响变化
        console.log("onTouchStart", canvasPos, uiPos);
    }

    onTouchMove(event: EventTouch) {
        console.log("onTouchMove");
       const a =  nameNode.getComponentInChildren("Label");
        const delta = event.getUIDelta();
        const x = logoNode.position.x;
        const y = logoNode.position.y;
        logoNode.setPosition(x + delta.x, y + delta.y);
    }

    onTouchEnd(event: EventTouch) {
        console.log("onTouchEnd");
        logoNode.setScale(1, 1);
    }

    onTouchCancel(event: EventTouch) {


    }
}


