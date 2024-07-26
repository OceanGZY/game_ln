/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-23 22:09:23
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-24 22:28:38
 * @FilePath: \OceanDefense\assets\scripts\model\EnemyWaveModel.ts
 * @Description: 注释信息
 */
import { _decorator, CCFloat, CCInteger, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyWaveModel')
export class EnemyWaveModel {

    @property(Prefab)
    public enemyPrefab: Prefab;

    @property(CCInteger)
    public count: number = 1;

    @property(CCFloat)
    public rate: number = 1;

}


