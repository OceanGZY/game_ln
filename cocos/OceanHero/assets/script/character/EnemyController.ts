/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 17:11:01
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-23 18:05:38
 * @FilePath: /OceanHero/assets/script/character/EnemyController.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
import { Character } from './Character';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('EnemyController')
@requireComponent(Character)
export class EnemyController extends Component {
    start() {

    }

    update(deltaTime: number) {

    }
}

