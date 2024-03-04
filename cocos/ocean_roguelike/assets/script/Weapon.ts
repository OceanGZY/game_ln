/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-04 17:17:57
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-04 17:21:53
 * @FilePath: /ocean_roguelike/assets/script/Weapon.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Weapon')
export class Weapon extends Component {
    start() {

    }

    update(deltaTime: number) {
        console.log("开枪了");
    }
}

