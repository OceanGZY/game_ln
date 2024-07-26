
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-21 21:04:13
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-24 21:22:37
 * @FilePath: \OceanDefense\assets\scripts\CameraController.ts
 * @Description: 注释信息
 */
import { _decorator, CCFloat, CCInteger, Component, EventKeyboard, EventMouse, input, Input, KeyCode, MouseJoint2D, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {

    @property(CCFloat)
    speed: number = 1;

    @property(CCFloat)
    zoomSpeed: number = 1;

    start() {
        input.on(Input.EventType.KEY_PRESSING, this.cameraMove, this);
        input.on(Input.EventType.MOUSE_WHEEL, this.cameraScale, this);

    }

    update(deltaTime: number) {
    }

    cameraMove(event: EventKeyboard) {
        let pos = this.node.getPosition();
        switch (event.keyCode) {
            case KeyCode.KEY_W: {
                this.node.setPosition(pos.x - this.speed, pos.y, pos.z);
                break;
            }
            case KeyCode.KEY_S: {
                this.node.setPosition(pos.x + this.speed, pos.y, pos.z);
                break;
            }
            case KeyCode.KEY_A: {
                this.node.setPosition(pos.x, pos.y, pos.z - this.speed);
                break;
            }
            case KeyCode.KEY_D: {
                this.node.setPosition(pos.x, pos.y, pos.z + this.speed);
                break;
            }
        }
    }

    cameraScale(event: EventMouse) {
        let pos = this.node.getPosition();
        this.node.setPosition(pos.x, pos.y + this.zoomSpeed * event.getScrollY(), pos.z);
    }

}