/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-23 16:28:08
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-23 16:31:11
 * @FilePath: /OceanHero/assets/script/character/AnimationEventListener.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AnimationEventListener')
export class AnimationEventListener extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onStartAttack(){
        this.node.parent.emit("onStartAttack");
    }
}

