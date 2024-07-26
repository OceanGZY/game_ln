import { _decorator, Button, Component, Node } from 'cc';
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

    start() {
        this.selectStandardTurretBtn.on(Button.EventType.CLICK, this.onStandTurretSelected, this);

    }

    update(deltaTime: number) {

    }

    onStandTurretSelected(bIsOn: boolean) {
        BuildManager.getInstance().curTurretToBuild = this.standTurret.baseTurretPrefab;
        BuildManager.getInstance().groundCells.forEach(e => {
            e.getComponent(GrounCell)?.init();
        });
        // console.log("选中炮台", BuildManager.getInstance().curTurretToBuild);
    }
}


