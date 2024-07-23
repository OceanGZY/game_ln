import { _decorator, Camera, Color, Component, EventMouse, EventTouch, geometry, Input, input, Material, MeshRenderer, Node, PhysicsSystem, Vec2, Vec3, Vec4 } from 'cc';
import { BuildManager } from '../buildSystem/BuildManager';
const { ccclass, property } = _decorator;

@ccclass('GridCell')
export class GridCell extends Component {

    oldCellNode: Node = null;

    bInit: boolean = false;

    start() {

    }

    update(deltaTime: number) {

    }

    init() {
        if (this.bInit) {
            return;
        } else {
            this.bInit = true;
            console.log("初始化")
            input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
            input.on(Input.EventType.MOUSE_DOWN, this.doSet, this);
        }
    }

    onMouseMove(event: EventMouse) {
        // 从相机发射射线到鼠标位置进行检测
        const camera = this.node.scene.getChildByName("Main Camera").getComponent(Camera);
        const outRay = new geometry.Ray();
        camera.screenPointToRay(event.getLocation().x, event.getLocation().y, outRay);

        const bResult = PhysicsSystem.instance.raycast(outRay);
        if (bResult) {
            const results = PhysicsSystem.instance.raycastResults;
            results.forEach(res => {
                if (res.collider.getGroup() == 2) {
                    // console.log("碰到地面了", res.collider.node.name, res.collider.node.getComponent(MeshRenderer).getMaterialInstance(0).getProperty("albedo", 0));

                    if (res.collider.node.name != this.oldCellNode?.name) {
                        BuildManager.getInstance().curFieldCell = res.collider.node;
                        res.collider.node.getComponent(MeshRenderer).getMaterialInstance(0).setProperty("albedo", new Color(214, 125, 0, 30), 0);
                        this.oldCellNode?.getComponent(MeshRenderer).getMaterialInstance(0).setProperty("albedo", new Color(255, 255, 255, 10), 0);
                        this.oldCellNode = res.collider.node;
                    }
                }
            });
        }
    }
    doSet(event: EventMouse) {
        this.bInit = false;
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.off(Input.EventType.MOUSE_DOWN, this.doSet, this);
    }

    // onMoveTouch(event: EventTouch) {
    //     console.log(event.getLocation());

    //     console.log("3D位置", this.convertTouchTo3DPosition(event.getLocation()));
    // }

    // convertTouchTo3DPosition(touchLoc: Vec2): Vec3 {
    //     const camera = this.node.scene.getChildByName("Main Camera").getComponent(Camera);
    //     const viewSize = camera.screenToWorld(new Vec3(touchLoc.x, touchLoc.y, camera.orthoHeight));
    //     return viewSize;
    // }

}

