/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 17:09:57
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-24 21:18:57
 * @FilePath: /OceanHero/assets/script/character/PlayerController.ts
 * @Description: 注释信息
 */
import { _decorator, Component, instantiate, math, Node, Prefab, resources, v3, Vec3 } from 'cc';
import { Character } from './Character';
import { JoyInput } from '../input/JoyInput';
import { EnumAnimState } from './EnumAnimState';
import { MathUtil } from '../util/MathUtils';
import { ProjectileEmiter } from './ProjectileEmiter';
import { CharacterManager } from '../level/CharacterManager';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('PlayerController')
@requireComponent(Character)
export class PlayerController extends Component {

    character: Character = null;

    @property(Node)
    bowPoint: Node = null;

    private _splitAngle: Array<number> = [];

    start() {
        this.character = this.node.getComponent(Character);
        this.node.on("onStartAttack", this.onStartAttack, this);

    }

    update(deltaTime: number) {
        this.character.controlInput.x = JoyInput.horizontalIn;
        this.character.controlInput.z = -JoyInput.verticalIn;

        if (this.character.controlInput.length() > 0) {
            this.character.changeState(EnumAnimState.Run);
        } else {
            // console.log("虚拟摇杆已经不动了");
            let enemy = this.getNearEnemy();
            if (enemy == null) {
                this.character.changeState(EnumAnimState.Idle);
            } else {
                Vec3.subtract(this.character.controlInput, enemy.worldPosition, this.node.worldPosition);
                this.character.controlInput.y = 0;
                this.character.controlInput.normalize();
                this.character.changeState(EnumAnimState.Attack);
            }

        }
    }

    onStartAttack() {
        console.log("开始射箭了");
        const arrowStartPosition = this.bowPoint.worldPosition;
        for (let i = 0; i < this.character.cProperty.projectileCount; i++) {
            let arrowForward: Vec3 = v3();
            MathUtil.rotateAround(arrowForward, this.node.forward, Vec3.UP, this._splitAngle[i]);

            let emitter = this.node.getComponent(ProjectileEmiter);
            let projectile = emitter.create();
            projectile.node.forward = arrowForward;
            projectile.node.worldPosition = arrowStartPosition;
            projectile.target = CharacterManager.instance.randomEnemy;
        }

    }

    set projectileCount(cnt: number) {
        this._splitAngle = [];
        const rad = math.toRadian(10);// 角度转弧度
        const isOdd = cnt % 2 != 0; // 是否奇数
        const len = Math.floor(cnt / 2);

        for (let i = 0; i < len; i++) {
            this._splitAngle.push(-rad * (i + 1));
            this._splitAngle.push(rad * (i + 1));
        }

        if (isOdd) {
            this._splitAngle.push(0);
        }
    }

    getNearEnemy(): Node {
        let _minDistance: number = 999;
        let _minNode: Node = null;

        for (let enemy of CharacterManager.instance.enemies) {
            let distacne = Vec3.distance(this.node.worldPosition, enemy.worldPosition);

            if (distacne < _minDistance) {
                _minDistance = distacne;
                _minNode = enemy;
            }
        }
        return _minNode; // 返回离player最近的敌人
    }
}

