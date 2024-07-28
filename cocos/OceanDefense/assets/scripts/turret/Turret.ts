/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-25 21:02:17
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-28 18:17:52
 * @FilePath: \OceanDefense\assets\scripts\turret\Turret.ts
 * @Description: 注释信息
 */
import { _decorator, Component, instantiate, ITriggerEvent, misc, Node, Prefab, Quat, SphereCollider, v3, Vec3 } from 'cc';
import { Bullet } from '../Bullet';
const { ccclass, property } = _decorator;

@ccclass('Turret')
export class Turret extends Component {


    @property(Prefab)
    bulletPrefab: Prefab = null;

    firePoint: Node = null;

    findEnemyCollider: SphereCollider = null;

    findEnemies: Node[] = [];

    fireTarget: Node = null;


    start() {
        // this.firePoint = this.node.getChildByName("Weapon").getChildByName("FirePoint");

        this.findEnemyCollider = this.node.getComponent(SphereCollider);
        this.findEnemyCollider.on("onTriggerEnter", this.onFindEnemy, this);
        this.findEnemyCollider.on("onTriggerExit", this.onMissEnemy, this);

        this.schedule(() => {
            this.fire();
        }, 1)
    }

    update(deltaTime: number) {
        // 自动检测攻击范围内的敌人，并旋转炮台武器
        this.fireTarget = this.findEnemies.length > 0 ? this.findEnemies[0] : null;
        if (this.fireTarget == null) {
            return;
        }
        if (!this.fireTarget.isValid) {
            this.findEnemies.splice(this.findEnemies.indexOf(this.fireTarget), 1);
            return;
        }

        // console.log("this.fireTarget.position", this.fireTarget.position);
        // console.log("当前位置信息", this.node.position.x, this.node.position.y + 2, this.node.position.z);

        const direction = this.fireTarget.position.clone().subtract(v3(this.node.position.x, this.node.position.y + 2, this.node.position.z));
        let rotationQuat = new Quat();
        Quat.fromViewUp(rotationQuat, direction, Vec3.UP);
        // 应用旋转
        this.node.getChildByName("Weapon").setRotation(rotationQuat);
        // console.log("炮台的forward方向", this.node.getChildByName("Weapon").forward);

    }

    fire() {
        if (this.fireTarget == null || !this.fireTarget.isValid) {
            return;
        }
        const temp = instantiate(this.bulletPrefab);
        this.node.scene.getChildByName("BulletManager").addChild(temp);
        temp.setPosition(this.node.position.x, 2, this.node.position.z);
        const direction = this.fireTarget!.position.clone().subtract(v3(this.node.position.x, this.node.position.y + 2, this.node.position.z));
        let rotationQuat = new Quat();
        Quat.fromViewUp(rotationQuat, direction, Vec3.UP);
        // 应用旋转
        temp.setRotation(rotationQuat);
        temp.getComponent(Bullet).fireDir = this.node.getChildByName("Weapon").forward;

    }

    onFindEnemy(event: ITriggerEvent) {
        if (event.otherCollider.getGroup() == 2) {
            console.log("发现敌人了", event.otherCollider.node.name);
            this.findEnemies.push(event.otherCollider.node);
        }
    }

    onMissEnemy(event: ITriggerEvent) {
        if (event.otherCollider.getGroup() == 2) {
            console.log("敌人离开了", event.otherCollider.node.name);
            this.findEnemies.splice(this.findEnemies.indexOf(event.otherCollider.node), 1);
        }
    }

}


