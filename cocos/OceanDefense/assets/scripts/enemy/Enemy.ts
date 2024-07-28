/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-22 20:52:41
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-28 18:40:15
 * @FilePath: \OceanDefense\assets\scripts\enemy\Enemy.ts
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

    moveSpeed: number = 5;

    health: number = 10;

    start() {
        this.wayNodes = BuildManager.getInstance().wayPoints;
        // console.log(this.wayNodes);
        this.targetPos = this.wayNodes[this.pointIndex].position;
        // console.log("this.node.position", this.node.position);
        // console.log(" this.targetPos ", this.targetPos);
    }

    update(deltaTime: number) {

        if (this.node.isValid) {
            if (this.health <= 0) {
                BuildManager.getInstance().curEnemyCount--;
                BuildManager.getInstance().killedEnemy++;
                BuildManager.getInstance().score += 10;
                this.node.destroy();
                return;
            }

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
            BuildManager.getInstance().escapeEnemy++;
            this.node.destroy();
            return;
        }
        this.targetPos = this.wayNodes[this.pointIndex].position;
        // console.log("此时的敌人目标方向", this.targetPos);
    }

    takeDamage(val: number) {
        if (this.node.isValid) {
            this.health -= val;
            if (this.health <= 0) {
                BuildManager.getInstance().curEnemyCount--;
                BuildManager.getInstance().killedEnemy++;
                BuildManager.getInstance().score += 10;
                this.node.destroy();
            }
        }
    }
}


