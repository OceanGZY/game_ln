/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-21 18:42:11
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-21 18:54:58
 * @FilePath: /OceanFarm/assets/scripts/FarmGame.ts
 * @Description: 注释信息
 */


import { _decorator, Component, Node, instantiate, Prefab, } from 'cc';
import { TileController } from './controllers/TileController';


const { ccclass, property } = _decorator;

@ccclass('FarmGame')
export class FarmGame extends Component {
    @property([Prefab])
    public tilePrefabs: Prefab[] = [];

    @property(Node)
    public tileContainer: Node = null;

    private selectedCropType: string = null;
    private selectedGrowTime: number = 0;

    start() {
        // Initialize tiles (for example, a 5x5 grid)
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                const tile = instantiate(this.tilePrefabs[0]);
                tile.setPosition(x * 100, y * 100); // Adjust positioning as needed
                this.tileContainer.addChild(tile);
            }
        }
    }

    selectCrop(cropType: string, growTime: number) {
        this.selectedCropType = cropType;
        this.selectedGrowTime = growTime;
    }

    plantSelectedCrop(tileController: TileController) {
        if (this.selectedCropType && this.selectedGrowTime > 0 && tileController.canPlantCrop()) {
            tileController.plantCrop(this.selectedCropType, this.selectedGrowTime);
        }
    }

    plowTile(tileController: TileController) {
        tileController.plowTile();
    }

    update(deltaTime: number) {
        // Update crop growth for each tile
        this.tileContainer.children.forEach(child => {
            const tileController = child.getComponent(TileController);
            if (tileController) {
                tileController.updateCropGrowth(deltaTime);
            }
        });
    }
}
