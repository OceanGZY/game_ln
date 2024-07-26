/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-25 21:02:17
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-26 22:51:31
 * @FilePath: \OceanDefense\assets\scripts\turret\Turret.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Turret')
export class Turret extends Component {

    @property(Prefab)
    bulletPrefab: Prefab = null;


    start() {

    }

    update(deltaTime: number) {

    }
}


