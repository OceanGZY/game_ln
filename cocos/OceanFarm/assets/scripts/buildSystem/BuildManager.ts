/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-22 17:25:03
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-23 19:41:24
 * @FilePath: /OceanFarm/assets/scripts/buildSystem/BuildManager.ts
 * @Description: 注释信息
 */
import { Node } from 'cc';

export class BuildManager {

    static _instance: BuildManager;
    public static getInstance(): BuildManager {
        if (this._instance == null) {
            this._instance = new BuildManager();
        }
        return this._instance;
    }



    public gridCells: Node[];
    public propsPrefabPath: {} = {
        "方块": "prefabs/fields/Field",
        "土地": "prefabs/fields/BaseField",
        "草地": "prefabs/fields/GrassField",
        "石路": "prefabs/fields/StonesField",
        "水": "prefabs/fields/WaterField",
    }

    public curFieldCell: Node;

}

