/*
 * @Author: OCEAN.GZY
 * @Date: 2024-06-26 23:28:09
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-05 17:21:57
 * @FilePath: /DailyRun/assets/scripts/coin.ts
 * @Description: 注释信息
 */
import { _decorator, CircleCollider2D, Component } from 'cc';
const { ccclass } = _decorator;

@ccclass('coin')
export class coin extends Component {

    bgSpeed: number = 256;
    start() {

        this.schedule(this.coinMove);

    }

    update(deltaTime: number) {
    }

    coinMove(): void {
        if (!this.node) { return; }

        let dt: number = 0.02;
        var distance = this.bgSpeed * dt;
        this.node.setWorldPosition(this.node.worldPosition.x - distance, this.node.worldPosition.y, this.node.worldPosition.z);
        this.node.getComponent(CircleCollider2D).apply();

        if (this.node.worldPosition.x < -640) {
            // console.log("金币开始移动了,this.node.worldPosition", this.node.worldPosition);
            this.node.emit("hide", this.node);
        }

    }
}

