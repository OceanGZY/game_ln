/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-24 16:00:00
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-24 16:09:44
 * @FilePath: /OceanFarm/assets/scripts/filed.ts
 * @Description: 注释信息
 */
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('filed')
export class filed extends Component {


    @property(Prefab)
    baseGroundPrefab: Prefab = null;

    gridSize: number = 1.466;
    row: number = 10;
    column: number = 10;

    start() {
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                const temp = instantiate(this.baseGroundPrefab)
                this.node.scene.getChildByName("GroundMap").addChild(temp);
                temp.setPosition(this.gridSize * i, 0, this.gridSize * j);
            }
        }
    }

    update(deltaTime: number) {

    }
}

