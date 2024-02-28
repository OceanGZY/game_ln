/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-29 00:32:35
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-29 00:46:02
 * @FilePath: /ocean_roguelike/assets/script/Constant.ts
 * @Description: 注释信息
 */
import { Node } from 'cc';

export class Constant {
    static readonly ColliderGroup = {
        DEFAULT: 1 << 0,
        Player: 1 << 1,
        Monster: 1 << 2,
        PlayerWeapon: 1 << 3,
        MonsterWeapon: 1 << 4,
        Obstacle: 1 << 5,
    };
}

