/*
 * @Author: OCEAN.GZY
 * @Date: 2024-04-30 22:23:20
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-01 22:39:30
 * @FilePath: /OceanRun/assets/scripts/common/WeaponEnum.ts
 * @Description: 注释信息
 */


export enum WeaponEnum {
    Arrow = 0,
    Gun,
}

export const WeaponDetail = {
    "Arrow": {
        "name":"Arrow",
        "prefabPath": "prefab/weapons/Arrow",
        "damge": 3,
        "staytime": 3
    },
    "Gun": {
        "name":"Gun",
        "prefabPath": "prefab/weapons/Gun",
        "damge": 10,
        "staytime": 3
    }
}

