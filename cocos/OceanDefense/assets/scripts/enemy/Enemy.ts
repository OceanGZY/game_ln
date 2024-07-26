/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-22 20:52:41
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-23 23:46:28
 * @FilePath: \OceanDefense\assets\scripts\Enemy.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, v3, Vec3 } from 'cc';
import { BuildManager } from '../buildSystem/BuildManager';

const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    pointIndex: number = 0;

    targetPos: Vec3 = Vec3.ZERO;

    wayNodes: Array<Node> = [];

    moveSpeed: number = 20;

    start() {
        this.wayNodes = BuildManager.getInstance().wayPoints;
        // console.log(this.wayNodes);
        this.targetPos = this.wayNodes[this.pointIndex].position;
        // console.log("this.node.position", this.node.position);
        // console.log(" this.targetPos ", this.targetPos);
    }

    update(deltaTime: number) {

        if (this.node.isValid) {
            let pos = this.node.position;
            let moveDelta = v3(this.targetPos.x - pos.x, this.targetPos.y - pos.y, this.targetPos.z - pos.z).normalize().multiplyScalar(this.moveSpeed * deltaTime);

            // console.log("this.moveDelta", moveDelta);
            this.node.setPosition(pos.add(moveDelta));
            if (Vec3.distance(this.targetPos, this.node.position) < 0.2) {
                this.moveToNextPoint();
            }
        }
    }

    moveToNextPoint() {
        this.pointIndex++;
        if (this.pointIndex > this.wayNodes.length - 1) {
            BuildManager.getInstance().curEnemyCount--;
            this.node.destroy();
            return;
        }
        this.targetPos = this.wayNodes[this.pointIndex].position;
    }
}


