/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-28 15:04:10
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-28 15:20:34
 * @FilePath: /testPrj/assets/scripts/bgscroll.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bgscroll')
export class bgscroll extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    @property(Node)
    bg1: Node = null!

    @property(Node)
    bg2: Node = null!

    speed: number = 100

    

}

