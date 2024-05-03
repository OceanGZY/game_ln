/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-03 11:07:28
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-03 19:51:28
 * @FilePath: \RunAndRun\assets\scripts\GameManager.ts
 * @Description: 注释信息
 */
import { Player } from './Player';
import { _decorator, Component, Node, Prefab, instantiate, random, randomRangeInt, math, Label } from 'cc';
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

        for (let i = 0; i < 10; i++) {
            this.generatePlatform();
        }
        this.jumpToNext();
    }

    update(deltaTime: number) {

    }

    jumpToNext() {
        if (this._curentIndex >= this.platformRoot.children.length - 1) {
            return;
        }
        var tarPos = this.platformRoot.children[this._curentIndex + 1].getWorldPosition();
        tarPos.y = 0.6;
        this.player.jumpTo(tarPos, () => {

            this._curentSocre += 10;
            this.scoreLabel.string = "分数："+this._curentSocre.toString();

            this._curentIndex++;
            this.jumpToNext();
            this.generatePlatform();
        });
    }

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


