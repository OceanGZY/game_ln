/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-26 19:02:09
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-28 22:19:43
 * @FilePath: \OceanDefense\assets\scripts\ui\UIController.ts
 * @Description: 注释信息
 */
import { _decorator, Button, Component, director, Label, Node } from 'cc';
import { TurretModel } from '../turret/TurretModel';
import { BuildManager } from '../buildSystem/BuildManager';
import { GrounCell } from '../map/GrounCell';

const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {

    @property(TurretModel)
    standTurret: TurretModel;

    @property(Node)
    selectStandardTurretBtn: Node = null;

    @property(Label)
    scoreLabel: Label = null;

    @property(Node)
    successNode: Node = null;

    @property(Node)
    failNode: Node = null;

    start() {
        this.selectStandardTurretBtn.on(Button.EventType.CLICK, this.onStandTurretSelected, this);
        this.successNode.active = false;
        this.failNode.active = false;

    }

    update(deltaTime: number) {
        this.scoreLabel.string = "分数：" + BuildManager.getInstance().score.toString();
        if (BuildManager.getInstance().killedEnemy >= 21) {
            this.successNode.active = true; //游戏胜利
            this.failNode.active = false;
            director.pause();
        }
        if (BuildManager.getInstance().escapeEnemy > 4) {
            this.successNode.active = false;
            this.failNode.active = true; //游戏失败
            director.pause();
        }

    }

    onStandTurretSelected(bIsOn: boolean) {
        BuildManager.getInstance().curTurretToBuild = this.standTurret.baseTurretPrefab;
        BuildManager.getInstance().groundCells.forEach(e => {
            e.getComponent(GrounCell)?.init();
        });
        // console.log("选中炮台", BuildManager.getInstance().curTurretToBuild);
    }


}


