import { UITransform } from 'cc';
/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-28 15:04:10
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-28 22:00:05
 * @FilePath: \testPrj\assets\scripts\bgscroll.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bgscroll')
export class bgscroll extends Component {
    start() {

    }

    update(deltaTime: number) {
        this.bg1.setPosition(this.bg1.position.x - deltaTime * this.speed, this.bg1.position.y)
        this.bg2.setPosition(this.bg2.position.x - deltaTime * this.speed, this.bg2.position.y)

        //重置
        if (this.bg1.position.x <= this.triggerX) {
            this.bg1.setPosition(
                this.bg2.position.x + this.bg1.getComponent(UITransform).width,
                this.bg1.position.y)
        } else if (this.bg2.position.x <= this.triggerX) {
            this.bg2.setPosition(
                this.bg1.position.x + this.bg1.getComponent(UITransform).width,
                this.bg2.position.y)
        }
    }

    onLoad() {
        // 获取重置触发坐标点
        this.triggerX = -this.bg1.getComponent(UITransform).width
    }

    @property(Node)
    bg1: Node = null!

    @property(Node)
    bg2: Node = null!

    speed: number = 100
    triggerX: number = 0





}

