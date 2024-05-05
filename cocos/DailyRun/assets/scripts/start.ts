import { _decorator, Button, Component, director, Input, Node } from 'cc';
import { CSVLoader } from './utils/CSVLoader';
const { ccclass, property } = _decorator;

@ccclass('start')
export class start extends Component {

    @property(Node)
    startBtn: Node = null;


    async start() {
        this.startBtn.on(Button.EventType.CLICK, this.startGame, this);
        let res = await CSVLoader.getInstance().loadCSV("level");
        console.log("start", res);

    }

    update(deltaTime: number) {

    }
    startGame() {
        console.log("开始游戏")
        director.loadScene("main");
    }
}

