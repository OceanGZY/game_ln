/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-30 21:08:37
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-04-05 23:23:27
 * @FilePath: /Heros/assets/scripts/Player/Player.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EventKeyboard, Input, input, instantiate, KeyCode, Node, Prefab, ProgressBar, resources, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    _firePoint: Node;
    _arrow: Node;
    _lifeBar: ProgressBar

    start() {
        this._firePoint = this.node.getChildByName("FirePoint");
        this._lifeBar = this.node.getChildByName("CharacterUI").getChildByName("LifeBar").getComponent(ProgressBar);
        this._lifeBar.progress = 1;
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyUp, this);
        // console.log("血条的数值和位置", this._lifeBar.progress, this._lifeBar.node.position, this._lifeBar.node.worldPosition);
    }

    update(deltaTime: number) {

    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                resources.load("Characters/weapons/Arrow", Prefab, (err: Error, data: Prefab) => {
                    let _arrow = instantiate(data);
                    this.node.parent.addChild(_arrow);
                    _arrow.worldPosition = this._firePoint.worldPosition.add(v3(-0.5, -3, 1));
                    _arrow.forward = this.node.getChildByName("Knight").forward;
                    this.schedule((i = 0.01) => {
                        _arrow.worldPosition = v3(_arrow.worldPosition.x, _arrow.worldPosition.y, _arrow.worldPosition.z * 100 * i);
                        i = i + 0.01;
                    }, 1)
                })
                break;
            default:
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {

    }
}

