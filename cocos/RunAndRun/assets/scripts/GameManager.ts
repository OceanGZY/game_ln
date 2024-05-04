/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-03 11:07:28
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-03 23:13:02
 * @FilePath: /RunAndRun/assets/scripts/GameManager.ts
 * @Description: 注释信息
 */
import { Player } from './Player';
import { _decorator, Component, Node, Prefab, instantiate, random, randomRangeInt, math, Label, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManage')
export class GameManage extends Component {

    @property(Player)
    player: Player = null;

    @property(Node)
    platformRoot: Node = null;

    @property(Prefab)
    platformBoard: Prefab = null;

    @property(Label)
    scoreLabel: Label = null;


    private _curentIndex: number = 0;
    private _curentSocre: number = 0;



    start() {
        // 初始化生成踏板
        for (let i = 0; i < 10; i++) {
            this.generatePlatform();
        }
        this.jumpToNext();

    }

    update(deltaTime: number) {

    }

    /**
     * 跳跃向下一个方块
     * @returns 
     */
    jumpToNext() {
        if (this._curentIndex >= this.platformRoot.children.length - 1) {
            return;
        }
        var tarPos = this.platformRoot.children[this._curentIndex + 1].getWorldPosition();
        tarPos.y = 0.6;
        this.player.jumpTo(tarPos, () => {
            // 加分
            this._curentSocre += 10;
            this.scoreLabel.string = "分数：" + this._curentSocre.toString();

            this._curentIndex++;
            this.jumpToNext(); //继续跳跃
            this.generatePlatform(); //继续生成方块
        });
    }

    
    /**
     * 踏板生成函数，实际踏板的生成位置可以根据后续自己准备的音乐卡点时间表，待开发。。。
     */
    generatePlatform() {
        var board = instantiate(this.platformBoard);
        if (this.platformRoot.children.length > 0) {
            var pos = this.platformRoot.children[this.platformRoot.children.length - 1].getWorldPosition();
        }
        var pos = this.platformRoot.children[this.platformRoot.children.length - 1].getWorldPosition();
        pos.z += (-4 * math.randomRangeInt(1, 3));
        pos.x = math.randomRange(-1, 1);
        this.platformRoot.addChild(board);
        board.setWorldPosition(pos);

        if (this._curentIndex > 10) {
            for (let i = 0; i < 10; i++) {
                this.platformRoot.children[0].removeFromParent();
            }
            this._curentIndex -= 10;
        }
    }

}


