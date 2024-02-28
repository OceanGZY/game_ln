import { Vec2, v2, Vec3 } from 'cc';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-28 23:07:39
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-28 23:17:00
 * @FilePath: \ocean_roguelike\assets\script\Monster.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends Component {

    moveSpeed: number = 2;
    aimDirection:Vec2 = v2(0,0);

    start() {

    }

    update(deltaTime: number) {


        const x = this.node.position.x;
        const y = this.node.position.y;

        if (this.aimDirection.x >= 0){
            this.node.setScale(1,1,1);
        }else{
            this.node.setScale(-1,1,1);
        }

        const nx = x + this.aimDirection.x * this.moveSpeed * deltaTime;
        const ny = y + this.aimDirection.y * this.moveSpeed * deltaTime;

        this.node.setPosition(nx, ny);
    }

    setAim(vec:Vec3){
        this.aimDirection = v2(vec.x,vec.y);
    }
}


