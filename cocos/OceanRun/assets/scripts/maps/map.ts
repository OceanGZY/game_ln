/*
 * @Author: OCEAN.GZY
 * @Date: 2024-04-23 10:53:35
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-04-23 11:52:07
 * @FilePath: /OceanRun/assets/scripts/maps/map.ts
 * @Description: 注释信息
 */
import { _decorator, Component, instantiate, Node, Prefab, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('map0')
export class map0 extends Component {
    @property(Prefab)
    roadItemNormal: Prefab = null;

    @property(Prefab)
    roadItemHalloween: Prefab = null;

    road: Node = null;

    roadItems: Array<Node> = [];


    start() {
        this.road = this.node.getChildByName("Road");
        if (this.roadItems.length == 0) {
            for (let i = 0; i < 6; i++) {
                let _road = instantiate(this.roadItemNormal);
                this.roadItems.push(_road);
                this.road.addChild(_road);
                _road.position = v3(0, 0, -35.949 * i);
            }
        }
        console.log("roadItems：", this.roadItems);

        console.log("road", this.road);
    }

    update(deltaTime: number) {

    }
}

