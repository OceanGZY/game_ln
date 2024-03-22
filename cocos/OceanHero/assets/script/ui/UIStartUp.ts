/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 10:34:33
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 11:38:29
 * @FilePath: /OceanHero/assets/script/UIStartUp.ts
 * @Description: 注释信息
 */
import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIStartUp')
export class UIStartUp extends Component {
    start() {
        let btn = this.node.getChildByName("StartBtn");
        btn.on(Button.EventType.CLICK,this.onStartBtnClicked,this)

    }

    update(deltaTime: number) {
        
    }

    onStartBtnClicked(){
        console.log("按钮被点击");
        director.loadScene("Game");
    }
}

