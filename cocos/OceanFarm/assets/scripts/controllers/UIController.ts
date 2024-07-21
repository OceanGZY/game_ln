/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-21 18:39:37
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-21 18:54:27
 * @FilePath: /OceanFarm/assets/scripts/controllers/UIController.ts
 * @Description: 注释信息
 */
// scripts/views/UIController.ts

import { _decorator, Component, Node, Button } from 'cc';

import { TileController } from './TileController';
import { TileState } from '../models/TileModel';
import { FarmGame } from '../FarmGame';



const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {
    @property(FarmGame)
    public farmGame: FarmGame = null;

    @property(Button)
    public cropButtons: Button[] = [];

    onLoad() {
        this.cropButtons.forEach(button => {
            button.node.on('click', this.onCropButtonClicked, this);
        });
    }

    onCropButtonClicked(event) {
        const button = event.target.getComponent(Button);
        const cropType = button.node.name; // assuming button node name is the crop type
        const growTime = 10; // assume all crops take 10 seconds to grow, can be different based on crop type
        this.farmGame.selectCrop(cropType, growTime);
    }

    onTileClicked(tileController: TileController) {
        if (tileController.tile.state === TileState.Plain) {
            this.farmGame.plowTile(tileController);
        } else if (tileController.tile.state === TileState.Farmland) {
            this.farmGame.plantSelectedCrop(tileController);
        }
    }
}
