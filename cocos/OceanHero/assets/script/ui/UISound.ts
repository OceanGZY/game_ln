/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 15:54:09
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 16:49:19
 * @FilePath: /OceanHero/assets/script/ui/UISound.ts
 * @Description: 注释信息
 */
import { _decorator, Button, Component, director, Node, ProgressBar, Slider } from 'cc';
import { UIManager } from './UIManager';
import { SaveTool } from '../config/SaveTool';
const { ccclass, property } = _decorator;

@ccclass('UISound')
export class UISound extends Component {

    soundSlider: Slider = null;
    soundProgessVolume: ProgressBar = null;

    soundEffectSlider: Slider = null;
    soundEffectProgessVolume: ProgressBar = null;

    start() {
        let closeBtn = this.node.getChildByName("Layout").getChildByName("CloseBtn");
        closeBtn.on(Button.EventType.CLICK, this.onCloseSoundSetting, this);


        this.soundSlider = this.node.getChildByPath("Layout/Sound/SoundSlider").getComponent(Slider);
        this.soundProgessVolume = this.node.getChildByPath("Layout/Sound/SoundSlider/ProgressBar").getComponent(ProgressBar);
        this.soundSlider.node.on("slide", this.onSoundSliderChanged, this);

        this.soundEffectSlider = this.node.getChildByPath("Layout/SoundEffect/SoundEffectSlider").getComponent(Slider);
        this.soundEffectProgessVolume = this.node.getChildByPath("Layout/SoundEffect/SoundEffect/ProgressBar").getComponent(ProgressBar);
        this.soundEffectSlider.node.on("slide", this.onSoundEffectSliderChanged, this);

    }

    update(deltaTime: number) {

    }

    onCloseSoundSetting() {
        console.log("被点击了");
        UIManager.instance.closeDialog();
        director.resume();
    }


    onSoundSliderChanged(value) {
        this.soundProgessVolume.progress = value;

        // 保存数据
        SaveTool.setFloat("soundVol", value);
    }

    onSoundEffectSliderChanged(value) {
        this.soundEffectProgessVolume.progress = value;

        // 保存数据
        SaveTool.setFloat("soundEffectVol", value);
    }
}

