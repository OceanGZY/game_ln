import { _decorator, Component, lerp, Node, v2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('cameractl')
export class cameractl extends Component {

    @property(Node) player: Node;

    followOffset = v2(300, 100); // 设置跟随的偏移量， 平台闯关类相机一般在右上侧

    start() {

    }

    update(deltaTime: number) {

        // 直接通过获取玩家的位置，移动相机
        // const x = this.player.position.x + this.followOffset.x;
        // const y = this.player.position.y + this.followOffset.y;
        // this.node.setPosition(x, y);
        if (this.player.position.y > 0) {
            // 获取玩家位置以插值的方法，移动相机
            const x = this.node.position.x; // 相机原始位置
            const y = this.node.position.y;
            const aimX = this.player.position.x + this.followOffset.x;
            const aimY = this.player.position.y + this.followOffset.y;
            const lerpX = lerp(x, aimX, 0.5 * deltaTime);
            const lerpY = lerp(y, aimY, 0.5 * deltaTime);
            this.node.setPosition(lerpX, lerpY);
        }
    }
}

