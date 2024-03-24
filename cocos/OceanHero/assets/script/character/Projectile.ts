/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 17:11:49
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-24 23:18:51
 * @FilePath: /OceanHero/assets/script/character/Projectile.ts
 * @Description: 注释信息
 */
import { _decorator, CCFloat, Collider, Component, ICollisionEvent, math, Node, v3, Vec3 } from 'cc';
import { ProjectileProperty } from './ProjectileProperty';
import { Events } from '../event/Events';
import { MathUtil } from '../util/MathUtils';
const { ccclass, property } = _decorator;

let tempPos: Vec3 = v3();

@ccclass('Projectile')
export class Projectile extends Component {

    @property(CCFloat)
    linearSpeed: number = 3;

    @property(CCFloat)
    angularSpeed: number = 180;

    hots: Node = null;

    prjProperty: ProjectileProperty = new ProjectileProperty();

    collider: Collider = null;

    target: Node = null;

    spawnTime: number = 0;

    forward: Vec3 = v3();

    start() {
        this.collider = this.node.getComponent(Collider);
        this.collider.on("onTriggerEnter", this.onTriggerEnter, this);

    }

    update(deltaTime: number) {
        this.spawnTime += deltaTime;
        if (this.spawnTime > this.prjProperty.lifeTime) {
            this.node.emit(Events.OnProjectileDead, this);
            return;
        }

        if (this.target != null) {// 追踪敌人
            let _forward: Vec3 = v3();
            let _tmppos: Vec3 = v3();
            Vec3.subtract(_tmppos, this.target.worldPosition, this.node.worldPosition); // 目标位置-当前位置
            _tmppos.normalize();
            const angle = math.toRadian(this.angularSpeed) * deltaTime;
            MathUtil.rotateToward(_forward, this.node.forward, _tmppos, angle);
            this.node.forward = _forward;
        }

        // 新的位置
        Vec3.scaleAndAdd(tempPos, this.node.worldPosition, this.node.forward, this.linearSpeed);
    }

    onTriggerEnter(event: ICollisionEvent) {
        this.prjProperty.penetration--; //打一次穿透减1
        if (this.prjProperty.penetration <= 0) {
            this.node.emit(Events.OnProjectileDead, this);
        }
    }
}

