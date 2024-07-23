/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-23 16:53:04
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-23 17:54:53
 * @FilePath: /OceanFarm/assets/scripts/CursorTemp.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EventMouse, Input, input } from 'cc';
import { BuildManager } from './buildSystem/BuildManager';
const { ccclass, property } = _decorator;

@ccclass('CursorTemp')
export class CursorTemp extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    init() {
        input.on(Input.EventType.MOUSE_MOVE, this.followMouse, this);
        input.on(Input.EventType.MOUSE_DOWN, this.doSet, this);
    }

    followMouse(event: EventMouse) {
        this.node.position = BuildManager.getInstance().curFieldCell.position;
    }

    doSet(event: EventMouse) {
        input.off(Input.EventType.MOUSE_MOVE, this.followMouse, this);
        input.off(Input.EventType.MOUSE_DOWN, this.doSet, this);
        const curProp = this.node.children[0]!;
        curProp?.setParent(this.node.scene.getChildByName("FieldMap"));
        curProp.setPosition(this.node.position);
    }
}

