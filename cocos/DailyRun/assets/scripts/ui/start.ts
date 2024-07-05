/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-05 18:48:01
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-06-27 17:43:03
 * @FilePath: /DailyRun/assets/scripts/ui/start.ts
 * @Description: 注释信息
 */
import { _decorator, Button, Component, Node } from 'cc';
import { CSVLoader } from '../utils/CSVLoader';
import { ChangeScene } from '../utils/ChangeScene';
import { GameState } from '../global/GameState';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {

    @property(Node)
    startBtn: Node = null;


    async start() {
        this.startBtn.on(Button.EventType.CLICK, this.startGame, this);

        await GameState.getInstance().parseLevels("level"); // 初始化关卡
        await GameState.getInstance().parseCurLevel(1);
        await GameState.getInstance().parseCurLevelData(1);
    }

    update(deltaTime: number) {

    }
    startGame() {
        console.log("开始游戏")
        // director.loadScene("main");
        ChangeScene.getInstance().changeScene("main");
    }
}

