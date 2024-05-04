/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-03 10:48:00
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-03 23:16:05
 * @FilePath: /RunAndRun/assets/scripts/Player.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Vec3, TERRAIN_HEIGHT_BASE } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    private _gravity: number = -10; // 重力加速度

    private _velocityX: number = 0; // X轴速度
    private _velocityY: number = 0; // Y轴速度
    private _velocityZ: number = -10; // Z轴速度

    private _jumpTime: number = 0; // 每次跳跃时长
    private _passedTime: number = 0; // 消耗时长
    private _isJumping: boolean = false;

    private _endCB: Function = null;

    @property(Node)
    followCamera: Node = null;

    private _followCameraOffset: number = 0;

    start() {
        this._followCameraOffset = this.followCamera.worldPosition.z - this.node.worldPosition.z;
    }

    update(deltaTime: number) {
        if (this._isJumping === false) {
            return;
        }
        this._passedTime += deltaTime; // 累计过去了多长时间

        if (this._passedTime > this._jumpTime) {
            deltaTime -= (this._passedTime - this._jumpTime);
        }

        var oldPos = this.node.getWorldPosition();
        oldPos.x += (this._velocityX * deltaTime);
        oldPos.z += (this._velocityZ * deltaTime);

        oldPos.y += (this._velocityY * deltaTime + this._gravity * deltaTime * deltaTime * 0.5);
        this._velocityY += this._gravity * deltaTime; // 受重力加速度影响

        this.node.setWorldPosition(oldPos);
        this.followCamera.setWorldPosition(this.followCamera.worldPosition.x, this.followCamera.worldPosition.y, oldPos.z + this._followCameraOffset);

        if (this._passedTime >= this._jumpTime) {
            this._isJumping = false;
            if (this._endCB) {
                this._endCB();
            }
        }
    }


    /**
     * 跳向下一个踏板
     * @param targetPos 
     */
    public jumpTo(targetPos: Vec3, endCB: Function) {
        if (this._isJumping === true) {
            return;
        }
        this._endCB = endCB;

        var startPos = this.node.getWorldPosition();
        // console.log("起始位置", startPos);
        // console.log("目标位置", targetPos);

        this._jumpTime = (targetPos.z - startPos.z) / this._velocityZ;

        if (this._jumpTime <= 0) {
            this._isJumping = false;
            return;
        }

        this._velocityX = (targetPos.x - startPos.x) / this._jumpTime;
        this._velocityY = -this._gravity * 0.5 * this._jumpTime;

        this._isJumping = true;
        this._passedTime = 0;

    }
}


