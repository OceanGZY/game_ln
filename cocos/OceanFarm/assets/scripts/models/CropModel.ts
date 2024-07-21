/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-21 18:38:10
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-21 18:46:47
 * @FilePath: /OceanFarm/assets/scripts/models/CropModel.ts
 * @Description: 注释信息
 */
// scripts/models/CropModel.ts

export enum CropState {
    Planted, //
    Growing, // 生长
    Mature //成熟
}

export class Crop {
    public type: string;
    public state: CropState;
    public growTime: number; // seconds to mature
    public currentGrowTime: number; // time elapsed since planted

    constructor(type: string, growTime: number) {
        this.type = type;
        this.state = CropState.Growing;
        this.growTime = growTime;
        this.currentGrowTime = 0;
    }
}
