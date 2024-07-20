/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-16 20:00:06
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-20 20:32:47
 * @FilePath: /PlanBattle/assets/scripts/manager/AudioManager.ts
 * @Description: 注释信息
 */
import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {

    @property(AudioClip)
    fireSFX: AudioClip = null;

    @property(AudioClip)
    explodeSFX: AudioClip = null;

    start() {

    }

    update(deltaTime: number) {

    }

    playBgm(bToStart: boolean) {
        if (bToStart) {
            this.node.getComponent(AudioSource).play();
        } else {
            this.node.getComponent(AudioSource).stop();
        }
    }

    playFireSFX() {
        this.node.getComponent(AudioSource).playOneShot(this.fireSFX, 0.1);
    }

    playExplodeSFX() {
        this.node.getComponent(AudioSource).playOneShot(this.explodeSFX, 0.5);
    }
}

