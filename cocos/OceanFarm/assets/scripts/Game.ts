/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-23 15:58:54
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-23 16:12:56
 * @FilePath: /OceanFarm/assets/scripts/Game.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
import { BuildManager } from './buildSystem/BuildManager';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    onLoad() {
        BuildManager.getInstance().gridCells = this.node.parent.getChildByName("GridGround").children;
    }

    update(deltaTime: number) {

    }
}

