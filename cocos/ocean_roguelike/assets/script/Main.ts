import { Monster } from './Monster';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-28 22:05:38
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-28 23:17:48
 * @FilePath: \ocean_roguelike\assets\script\Main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    @property(Node) orCamera:Node;
    @property(Node) orPlayer:Node;
    @property(Node) orJoyStick:Node;
    @property(Node) monster:Node;
    

    start() {

    }

    update(deltaTime: number) {
        this.orCamera.worldPosition = this.orPlayer.worldPosition;

    }
}


