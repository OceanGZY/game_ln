/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-04 22:40:20
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-04 22:41:33
 * @FilePath: \CocosLN\assets\案例-卡片配对\image.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('image')
export class image extends Component {

    @property([SpriteFrame]) cardsSF:SpriteFrame[]=[];

    start() {

    }

    update(deltaTime: number) {
        
    }
}


