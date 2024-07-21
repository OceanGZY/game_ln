/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-21 18:40:50
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-21 18:41:07
 * @FilePath: /OceanFarm/assets/scripts/player/TileController.ts
 * @Description: 注释信息
 */

import { _decorator, Component, Node, Vec2 } from 'cc';
import { Tile, TileState } from '../models/TileModel';
import { Crop, CropState } from '../models/CropModel';

const { ccclass, property } = _decorator;

@ccclass('TileController')
export class TileController extends Component {
    public tile: Tile = null;

    onLoad() {
        // Assuming the tile's position is set in the editor
        const position = new Vec2(this.node.position.x, this.node.position.y);
        this.tile = new Tile(position);
    }

    updateTileVisual() {
        if (this.tile.state === TileState.Farmland) {
            // Update the visual to show it's farmland (e.g., change texture)
        } else if (this.tile.state === TileState.Planted) {
            // Update the visual to show it's planted (e.g., show crop)
        } else {
            // Update the visual to show it's plain land
        }
    }

    plowTile() {
        if (this.tile.state === TileState.Plain) {
            this.tile.state = TileState.Farmland;
            this.updateTileVisual();
        }
    }

    plantCrop(cropType: string, growTime: number) {
        if (this.tile.state === TileState.Farmland) {
            this.tile.crop = new Crop(cropType, growTime);
            this.tile.state = TileState.Planted;
            this.updateTileVisual();
        }
    }

    updateCropGrowth(deltaTime: number) {
        if (this.tile.crop && this.tile.crop.state === CropState.Growing) {
            this.tile.crop.currentGrowTime += deltaTime;
            if (this.tile.crop.currentGrowTime >= this.tile.crop.growTime) {
                this.tile.crop.state = CropState.Mature;
                this.updateTileVisual();
            }
        }
    }

    canPlantCrop(): boolean {
        return this.tile.state === TileState.Farmland;
    }
}
