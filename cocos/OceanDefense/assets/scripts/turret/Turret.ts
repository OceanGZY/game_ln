/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-25 21:02:17
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-27 11:53:06
 * @FilePath: \OceanDefense\assets\scripts\turret\Turret.ts
 * @Description: 注释信息
 */
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Turret')
export class Turret extends Component {


    @property(Prefab)
    bulletPrefab: Prefab = null;

    firePoint: Node = null;


    start() {
        this.firePoint = this.node.getChildByName("FirePoint");
        this.schedule(() => {
            this.fire();
        },5)
    }

    update(deltaTime: number) {

    }

    fire() {
        const temp = instantiate(this.bulletPrefab);
        this.node.scene.getChildByName("BulletManager").addChild(temp);
        temp.setPosition(this.firePoint.position);
    }
}


