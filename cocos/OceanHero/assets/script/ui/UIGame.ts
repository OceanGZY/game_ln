/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 11:26:20
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 16:08:39
 * @FilePath: /OceanHero/assets/script/ui/UIGame.ts
 * @Description: 注释信息
 */
import { _decorator, Button, Component, director, Label, Node } from 'cc';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('UIGame')
export class UIGame extends Component {

    pauseBtnLabel: Label;

    start() {
        let pauseBtn = this.node.getChildByName("Tools").getChildByName("PauseBtn");
        let soundBtn = this.node.getChildByName("Tools").getChildByName("SoundBtn");
        let exitBtn = this.node.getChildByName("Tools").getChildByName("ExitBtn");

        this.pauseBtnLabel = pauseBtn.getChildByName("Label").getComponent(Label);

        pauseBtn.on(Button.EventType.CLICK, this.onPauseGame, this);
        soundBtn.on(Button.EventType.CLICK, this.onSoundSetting, this);
        exitBtn.on(Button.EventType.CLICK, this.onExit, this);

    }

    update(deltaTime: number) {

    }

    onPauseGame() {
        if (!director.isPaused()) {
            console.log("暂停游戏");
            director.pause();
            this.pauseBtnLabel.string = "继续";

        } else {
            console.log("开始游戏");
            director.resume();
            this.pauseBtnLabel.string = "暂停";
        }

    }

    onSoundSetting() {
        // director.pause();
        UIManager.instance.openDialog("UISound");
    }

    onExit() {
        // UIManager.instance.openDialog("UISkillUpgrade");
        director.loadScene("Start");
    }
}

