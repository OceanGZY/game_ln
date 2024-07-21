/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-19 07:35:01
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-21 09:08:00
 * @FilePath: /PlanBattle/assets/scripts/ui/uiView.ts
 * @Description: 注释信息
 */
import { _decorator, Button, Component, Label, Node, ProgressBar } from 'cc';
import { GameState, GameStatus } from '../global/GameState';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {
    @property(Node)
    startUI: Node = null;

    @property(Node)
    endUI: Node = null;

    @property(Node)
    gameStateUI: Node = null;

    @property(Node)
    attackScreenFlash: Node = null;

    gameState: GameState = GameState.getInstance();

    protected onLoad(): void {
        this.startUI.active = true;
        this.endUI.active = false;
        this.gameStateUI.active = false;
        this.attackScreenFlash.active = false;
    }

    start() {

        const startBtn = this.startUI.getChildByName("gameStart").getChildByName("startBtn");
        startBtn.on(Button.EventType.CLICK, this.onStartBtnClick, this);

        const scNextBtn = this.endUI.getChildByName("gameSuccess").getChildByName("nextBtn");
        scNextBtn.on(Button.EventType.CLICK, this.onScNextBtnClick, this);

        const faRestartBtn = this.endUI.getChildByName("gameOver").getChildByName("restartBtn");
        faRestartBtn.on(Button.EventType.CLICK, this.onFaRestartBtnClick, this);

        this.gameStateUI.getChildByName("Life").getChildByName("LifeBar").getComponent(ProgressBar).progress = 1;
        this.gameStateUI.getChildByName("Score").getChildByName("Slabel").getComponent(Label).string = "0";



    }

    update(deltaTime: number) {
        switch (this.gameState.gameStatus) {
            case GameStatus.Fail: {
                this.startUI.active = false;
                this.endUI.active = true;
                this.endUI.getChildByName("gameSuccess").active = false;
                this.endUI.getChildByName("gameOver").active = true;
                this.gameStateUI.active = false;
                this.attackScreenFlash.active = false;
                break;
            }
            case GameStatus.Success: {
                this.startUI.active = false;
                this.endUI.active = true;
                this.endUI.getChildByName("gameSuccess").active = true;
                this.endUI.getChildByName("gameOver").active = false;
                this.gameStateUI.active = false;
                this.attackScreenFlash.active = false;
                break;
            }
            case GameStatus.Ready: {
                this.startUI.active = true;
                this.endUI.active = false;
                this.gameStateUI.active = false;
                this.attackScreenFlash.active = false;
                break;
            }
        }
        this.gameStateUI.getChildByName("Life").getChildByName("LifeBar").getComponent(ProgressBar).progress = this.gameState.playerHealth / this.gameState.playerMaxHealth;
        this.gameStateUI.getChildByName("Score").getChildByName("Slabel").getComponent(Label).string = this.gameState.score.toString();


    }

    onStartBtnClick() {
        console.log("开始游戏按钮被点击");
        this.startUI.active = false;
        this.gameStateUI.active = true;
        this.gameState.gameStatus = GameStatus.Start;
    }

    // 目前仅设计了一个关卡，下一关相当于继续加载第一关，可以自行实现后续关卡
    onScNextBtnClick() {
        this.endUI.active = false;
        this.gameStateUI.active = true;
        this.gameState.gameStatus = GameStatus.Restart;
        this.gameState.playerHealth = 50;
        this.gameState.playerExp = 0;
        this.gameState.score = 0;
        this.gameState.killedCnt = 0;
    }

    onFaRestartBtnClick() {
        console.log("重新开始游戏按钮被点击");
        this.endUI.active = false;
        this.gameStateUI.active = true;
        this.gameState.gameStatus = GameStatus.Restart;
        this.gameState.playerHealth = 50;
        this.gameState.playerExp = 0;
        this.gameState.score = 0;
        this.gameState.killedCnt = 0;
    }

}
