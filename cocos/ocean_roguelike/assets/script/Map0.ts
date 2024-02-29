/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-29 15:51:25
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-29 17:45:01
 * @FilePath: /ocean_roguelike/assets/script/Map0.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, TiledMap } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Map0')
export class Map0 extends Component {

    protected onLoad(): void {
        var tiled_map =  this.node.getComponent("cc.TiledMap") as TiledMap;
        console.log(tiled_map);

        var obs  = tiled_map.getObjectGroup("Obstacle");
        console.log("obs",obs);

        console.log("obs内部的objects",obs.getObjects());
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

