/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-24 22:01:40
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-25 20:58:48
 * @FilePath: \OceanDefense\assets\scripts\model\TurretModel.ts
 * @Description: 注释信息
 */
import { _decorator, CCFloat, Enum, Prefab } from 'cc';
const { ccclass, property } = _decorator;

enum TurretType {
    StandardTurret,
}
Enum(TurretType)

@ccclass('TurretModel')
export class TurretModel {

    @property(Prefab)
    baseTurretPrefab: Prefab = null;

    @property(Prefab)
    upgradeTurretPrefab: Prefab = null;

    @property(CCFloat)
    cost: number = 50;

    @property(CCFloat)
    costUpgrade: number = 200;

    @property({ type: TurretType })
    turretType: TurretType = TurretType.StandardTurret;
}



