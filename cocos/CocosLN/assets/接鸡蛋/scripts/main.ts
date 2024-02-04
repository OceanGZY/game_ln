/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-03 23:26:42
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-04 15:23:30
 * @FilePath: /CocosLN/assets/接鸡蛋/scripts/main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, EventKeyboard, KeyCode, input, Input, Prefab, instantiate, Collider2D, Contact2DType, IPhysics2DContact, RigidBody2D, director, Director, Label, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    @property(Node) player: Node;
    @property(Node) chickensRoot: Node;
    @property(Node) eggsRoot: Node;
    @property(Prefab) eggPrefab: Prefab;
    @property(Label) hp: Label;
    @property(Label) score: Label;

    playerPosIndex: number = 0; // 玩家位置
    chickensPosXArray: Array<number> = []; // 小鸡位置

    hpLife: number = 100;
    scoreVal: number = 0;


    start() {
        this.hp.color = Color.GREEN;
        this.score.color = Color.YELLOW;
        this.initData();
        this.handleInput();
        this.startCreateEggs();
        this.handleColliderEvent();

    }

    update(deltaTime: number) {
        for (let index = 0; index < this.eggsRoot.children.length; index++) {
            const element = this.eggsRoot.children[index];
            const x = element.position.x;
            const y = element.position.y - 150 * deltaTime;
            element.setPosition(x, y);

            if (y < -600) {
                element.destroy();
                this.hpLife = this.hpLife - 10;
                this.hp.string = "生命值:" + this.hpLife;

                if (this.hpLife > 50) {
                    this.hp.color = Color.GREEN;
                } else if (this.hpLife > 20) {
                    this.hp.color = Color.BLUE;
                }
                else if (this.hpLife > 0) {
                    this.hp.color = Color.RED;
                } else {
                    this.hp.string = "游戏结束！";
                }
            }
        }

    }

    initData() { // 初始化数据
        for (let index = 0; index < this.chickensRoot.children.length; index++) {
            const element = this.chickensRoot.children[index];
            this.chickensPosXArray[index] = element.position.x;
        }

        this.setPlayerPos();
    }

    handleInput() { // 监听输入
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) { // 键盘事件
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.movePlayer(-1);
                break;
            case KeyCode.ARROW_RIGHT:
                this.movePlayer(1);
                break;
        }
    }

    setPlayerPos() { // 设置玩家位置
        const x = this.chickensPosXArray[this.playerPosIndex];
        const y = this.player.position.y;
        this.player.setPosition(x, y);
    }

    movePlayer(direction: -1 | 1) { //玩家移动
        this.playerPosIndex += direction;
        if (this.playerPosIndex < 0) {
            this.playerPosIndex = 4;
        }
        if (this.playerPosIndex > 4) {
            this.playerPosIndex = 0;
        }
        this.setPlayerPos();
    }

    startCreateEggs() { // 定时任务，每2s生成一个egg
        this.schedule(this.createEgg, 2);
    }

    createEgg() { // 随机在一个位置生产鸡蛋
        const randomIndex = Math.floor(Math.random() * 5);
        const egg = instantiate(this.eggPrefab);
        this.eggsRoot.addChild(egg);
        egg.setPosition(this.chickensPosXArray[randomIndex], this.chickensRoot.position.y);

    }

    handleColliderEvent() {
        const playerCollider = this.player.getComponent(Collider2D);
        // console.log(playerCollider);
        playerCollider.on(Contact2DType.BEGIN_CONTACT,
            (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) => {
                // 触发销毁鸡蛋
                director.once(Director.EVENT_AFTER_PHYSICS, () => {
                    otherCollider.node.destroy(); //销毁
                }, this);
                console.log("接到鸡蛋了，分数加1");
                this.scoreVal += 20;
                this.score.string = "分数:" + this.scoreVal;
            }, this);
    }
}


