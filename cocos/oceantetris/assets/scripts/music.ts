/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-22 01:07:57
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-24 22:54:51
 * @FilePath: /oceantetris/assets/scripts/music.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('music')
export class music extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    @property(AudioSource)
    soundControl: AudioSource = null!

    @property([AudioClip])
    effects: AudioClip[] = []

    onLoad() {
        this.initMusicEvent()
    }

    initMusicEvent() {
        this.node.on("bgm", () => this.soundControl.play(), this)
        this.node.on("bgmStop", () => this.soundControl.stop(), this)
        this.node.on("gameover", () => this.soundControl.playOneShot(this.effects[0], 0.3), this)
        this.node.on("cleanOneLine", () => this.soundControl.playOneShot(this.effects[0], 0.3), this)
        this.node.on("rotate", () => this.soundControl.playOneShot(this.effects[1], 0.6), this)

    }

}

