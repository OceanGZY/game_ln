/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-06 14:40:40
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-06 14:47:06
 * @FilePath: /DailyRun/assets/scripts/ui/loading.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, ProgressBar } from 'cc';
import { ChangeScene } from '../utils/ChangeScene';
const { ccclass, property } = _decorator;

@ccclass('loading')
export class loading extends Component {

    @property(ProgressBar)
    loadingProgressBar: ProgressBar = null;

    protected onLoad(): void {
        this.loadingProgressBar.progress = 0.0;
    }

    start() {

    }

    update(deltaTime: number) {
        this.loadingProgressBar.progress = ChangeScene.getInstance().getCurrentProgress();
    }
}

