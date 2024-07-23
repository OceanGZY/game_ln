import { _decorator, Button, Component, EventHandler, instantiate, Label, Node, Prefab, resources } from 'cc';
import { BuildManager } from '../buildSystem/BuildManager';
import { GridCell } from '../filed/gridCell';
import { CursorTemp } from '../CursorTemp';
const { ccclass, property } = _decorator;

@ccclass('UIController')
export class UIController extends Component {

    curProp: Node = null;

    protected onLoad(): void {
        const propTools = this.node.parent.getChildByName("PropsBar").children;
        propTools.forEach(prop => {
            console.log("prop.name", prop.name);
            const clickEventHandler = new EventHandler();
            clickEventHandler.target = this.node.parent.getChildByName("UIController");
            clickEventHandler.component = 'UIController';// 这个是脚本类名
            clickEventHandler.handler = 'onChooseProp';
            clickEventHandler.customEventData = prop.getComponentInChildren(Label).string;
            prop.getComponent(Button).clickEvents.push(clickEventHandler);

        });
    }

    protected start(): void {

    }

    update(deltaTime: number) {

    }

    onChooseProp(event: Event, customEventData: string) {
        console.log("customEventData", customEventData);
        BuildManager.getInstance().gridCells.forEach(gridCell => {
            gridCell.getComponent(GridCell)?.init();
        });

        console.log("BuildManager.getInstance().propsPrefabPath[customEventData]", BuildManager.getInstance().propsPrefabPath[customEventData]);
        resources.load(BuildManager.getInstance().propsPrefabPath[customEventData], Prefab, (err, data) => {
            const temp = instantiate(data);
            this.node.scene.getChildByName("CursorTemp").getComponent(CursorTemp).init();
            temp.parent = this.node.scene.getChildByName("CursorTemp");
        })
    }

}

