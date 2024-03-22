/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 16:47:42
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 16:56:14
 * @FilePath: /OceanHero/assets/script/config/UserSeting.ts
 * @Description: 注释信息
 */

import { math } from 'cc';
import { SaveTool } from './SaveTool';

export class UserSetting extends EventTarget {

    private static _instance: UserSetting = null;

    static get instance(): UserSetting {
        if (this._instance == null) {
            this._instance = new UserSetting();
        }
        return this._instance;
    }


    private _soundVolume: number = 1.0;

    set soundVolume(value) {
        this._soundVolume = math.clamp01(this._soundVolume);
        SaveTool.setFloat("soundVol", value);
        // 发送音量调整的事件

    }

    get soundVolume(): number {
        return this._soundVolume;
    }

    private _soundEffectVolume: number = 1.0;

    set soundEffectVolume(value) {
        this._soundEffectVolume = math.clamp01(this._soundEffectVolume);
        SaveTool.setFloat("soundEffectVol", value);
        // 发送音量调整的事件

    }

    get soundEffectVolume(): number {
        return this._soundEffectVolume;
    }


    load() {
        this._soundVolume = SaveTool.getFloat("soundVol");
        this._soundEffectVolume = SaveTool.getFloat("soundEffectVol");
    }
}