/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 16:43:31
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 16:49:12
 * @FilePath: /OceanHero/assets/script/config/SaveTool.ts
 * @Description: 注释信息
 */
export class SaveTool {
    static setFloat(key: string, value: number) {
        localStorage.setItem(key, value.toString());
    }

    static getFloat(key: string) {
        let v = localStorage.getItem(key);
        return Number.parseFloat(v);
    }
}