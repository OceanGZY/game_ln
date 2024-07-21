/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-21 18:36:00
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-21 18:38:40
 * @FilePath: /OceanFarm/assets/scripts/models/TileModel.ts
 * @Description: 注释信息
 */
// scripts/models/TileModel.ts

import { Vec2 } from "cc";
import { Crop } from "./CropModel";

export enum TileState {
    Plain,   // 未开垦
    Farmland, // 耕地
    Planted   // 已种植
}

export class Tile {
    public position: Vec2;
    public state: TileState;
    public crop: Crop | null;

    constructor(position: Vec2) {
        this.position = position;
        this.state = TileState.Plain;
        this.crop = null;
    }
}