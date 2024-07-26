/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-25 22:06:23
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-26 22:09:55
 * @FilePath: \OceanDefense\assets\scripts\map\GrounCell.ts
 * @Description: 注释信息
 */
import { _decorator, Camera, Component, EventMouse, geometry, Input, input, instantiate, Material, MeshRenderer, Node, PhysicsSystem } from 'cc';
import { BuildManager } from '../buildSystem/BuildManager';
const { ccclass, property } = _decorator;

@ccclass('GrounCell')
export class GrounCell extends Component {
    oldCellNode: Node = null;

    @property(Material)
    baseMaterial: Material = null;

    @property(Material)
    selMaterial: Material = null;

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
        if (BuildManager.getInstance().curTurretToBuild != null) {
            // 从相机发射射线到鼠标位置进行检测
            const camera = this.node.scene.getChildByName("Main Camera").getComponent(Camera);
            const outRay = new geometry.Ray();
            camera.screenPointToRay(event.getLocation().x, event.getLocation().y, outRay);

            const bResult = PhysicsSystem.instance.raycast(outRay);
            if (bResult) {
                const results = PhysicsSystem.instance.raycastResults;
                results.forEach(res => {
                    // console.log("碰到物体了", res.collider.node.name,);
                    if (res.collider.getGroup() == 4) {
                        // console.log("碰到地面了", res.collider.node.name,);
                        if (res.collider.node.name != this.oldCellNode?.name) {
                            BuildManager.getInstance().curSelectGroundCell = res.collider.node;
                            res.collider.node.getComponent(MeshRenderer).setSharedMaterial(this.selMaterial, 0);
                            this.oldCellNode?.getComponent(MeshRenderer).setSharedMaterial(this.baseMaterial, 0);
                            this.oldCellNode = res.collider.node;
                        }
                    }
                });
            }
        }
    }


    doSet(event: EventMouse) {
        if (BuildManager.getInstance().curTurretToBuild != null) {
            const temp = instantiate(BuildManager.getInstance().curTurretToBuild);
            temp.parent = this.node.scene.getChildByName("Weapons")
            temp.setPosition(BuildManager.getInstance().curSelectGroundCell?.position);
            this.bInit = false;
            BuildManager.getInstance().curTurretToBuild = null;
        }

        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.off(Input.EventType.MOUSE_DOWN, this.doSet, this);
    }

}



