/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-20 20:49:27
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-21 16:30:28
 * @FilePath: /oceantetris/assets/scripts/init.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Prefab, instantiate, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('init')
export class init extends Component {
    start() {

    }

    update(deltaTime: number) {

    }
    onLoad() {
        this.initBgBlock()
        this.initGameBlock()
        this.autoDown()
    }

    @property(Node)
    gcBgLayout: Node = null!
    @property(Prefab)
    gbBlock: Prefab = null!


    @property(Node)
    gcLayout: Node = null!
    @property(Prefab)
    gameBlock0: Prefab = null!
    @property(Prefab)
    gameBlock1: Prefab = null!
    @property(Prefab)
    gameBlock2: Prefab = null!
    @property(Prefab)
    gameBlock3: Prefab = null!
    @property(Prefab)
    gameBlock4: Prefab = null!
    @property(Prefab)
    gameBlock5: Prefab = null!
    @property(Prefab)
    gameBlock6: Prefab = null!

    @property(Prefab)
    gameBlockCenter: Prefab = null!

    @property(Node)
    testLayout: Node = null!

    rand: number = null!
    // 游戏格子
    box: Node[][] = null!
    // 当前块
    curBlock: Node = null!
    curBlockP1: Node = null!
    curBlockP2: Node = null!
    curBlockP3: Node = null!
    curBlockP4: Node = null!

    initBgBlock() {
        log("初始化程序")
        for (let index = 0; index < 200; index++) {
            var _gbBlock = instantiate(this.gbBlock)
            _gbBlock.parent = this.gcBgLayout

        }
    }


    initBox() {


    }

    initGameBlock() {
        this.rand = Math.floor(7 * Math.random())
        // for (let index = 0; index < 10; index++) {
        //     var _gameBlock = instantiate(this.gameBlock0)
        //     _gameBlock.parent = this.gcLayout
        // }
        this.createBlockColor(this.rand)
        this.createBlockShape(this.rand)

    }

    createBlockColor(rand: number) {
        switch (rand) {
            //正方形
            case 0:
                log("初始化正方形颜色")
                this.curBlockP1 = instantiate(this.gameBlock0)
                this.curBlockP2 = instantiate(this.gameBlock0)
                this.curBlockP3 = instantiate(this.gameBlock0)
                this.curBlockP4 = instantiate(this.gameBlock0)
                this.curBlock = instantiate(this.gameBlockCenter)
                this.curBlock.parent = this.gcLayout
                this.curBlock.setPosition(0, 571)

                log("正方形颜色的位置,", this.curBlock.position)
                break;

            // Z
            case 1:
                log("初始化Z形颜色")
                this.curBlockP1 = instantiate(this.gameBlock1)
                this.curBlockP2 = instantiate(this.gameBlock1)
                this.curBlockP3 = instantiate(this.gameBlock1)
                this.curBlockP4 = instantiate(this.gameBlock1)
                this.curBlock = instantiate(this.gameBlockCenter)
                this.curBlock.parent = this.gcLayout
                this.curBlock.setPosition(27, 569)

                log("Z颜色的位置,", this.curBlock.position)

                break;

            // 反Z
            case 2:
                log("初始化反Z形颜色")
                this.curBlockP1 = instantiate(this.gameBlock2)
                this.curBlockP2 = instantiate(this.gameBlock2)
                this.curBlockP3 = instantiate(this.gameBlock2)
                this.curBlockP4 = instantiate(this.gameBlock2)
                this.curBlock = instantiate(this.gameBlockCenter)
                this.curBlock.parent = this.gcLayout
                this.curBlock.setPosition(27, 569)

                log("反Z颜色的位置,", this.curBlock.position)
                break;

            // 左L

            case 3:
                log("初始化左L形颜色")
                this.curBlockP1 = instantiate(this.gameBlock3)
                this.curBlockP2 = instantiate(this.gameBlock3)
                this.curBlockP3 = instantiate(this.gameBlock3)
                this.curBlockP4 = instantiate(this.gameBlock3)
                this.curBlock = instantiate(this.gameBlockCenter)
                this.curBlock.parent = this.gcLayout
                this.curBlock.setPosition(27, 569)

                log("左L颜色的位置,", this.curBlock.position)

                break;
            // 右L

            case 4:
                log("初始化右L形颜色")
                this.curBlockP1 = instantiate(this.gameBlock4)
                this.curBlockP2 = instantiate(this.gameBlock4)
                this.curBlockP3 = instantiate(this.gameBlock4)
                this.curBlockP4 = instantiate(this.gameBlock4)
                this.curBlock = instantiate(this.gameBlockCenter)
                this.curBlock.parent = this.gcLayout
                this.curBlock.setPosition(27, 569)

                log("右L颜色的位置,", this.curBlock.position)
                break;
            // T
            case 5:
                log("初始化T形颜色")
                this.curBlockP1 = instantiate(this.gameBlock5)
                this.curBlockP2 = instantiate(this.gameBlock5)
                this.curBlockP3 = instantiate(this.gameBlock5)
                this.curBlockP4 = instantiate(this.gameBlock5)
                this.curBlock = instantiate(this.gameBlockCenter)
                this.curBlock.parent = this.gcLayout
                this.curBlock.setPosition(27, 569)

                log("T颜色的位置,", this.curBlock.position)
                break;

            // 长条
            case 6:
                log("初始化长形颜色")
                this.curBlockP1 = instantiate(this.gameBlock6)
                this.curBlockP2 = instantiate(this.gameBlock6)
                this.curBlockP3 = instantiate(this.gameBlock6)
                this.curBlockP4 = instantiate(this.gameBlock6)
                this.curBlock = instantiate(this.gameBlockCenter)
                this.curBlock.parent = this.gcLayout
                this.curBlock.setPosition(27, 569)

                log("T颜色的位置,", this.curBlock.position)

                break;

            default:
                break;
        }

        this.curBlock.addChild(this.curBlockP1)
        this.curBlock.addChild(this.curBlockP2)
        this.curBlock.addChild(this.curBlockP3)
        this.curBlock.addChild(this.curBlockP4)
    }

    createBlockShape(rand: number) {
        switch (rand) {
            //正方形
            case 0:
                log("初始化正方形")
                this.curBlockP1!.setPosition(26, 26) //右上
                this.curBlockP2!.setPosition(-26, 26) //左上
                this.curBlockP3!.setPosition(26, -26) // 右下
                this.curBlockP4!.setPosition(-26, -26) // 左下
                break;

            // Z
            case 1:
                log("初始化Z形")
                this.curBlockP1!.setPosition(-52, 0) //左
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -52) // 下
                this.curBlockP4!.setPosition(52, -52) // 下右
                break;

            // 反Z
            case 2:
                log("初始化反Z形")
                this.curBlockP1!.setPosition(52, 52) //上右
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -52) // 下
                this.curBlockP4!.setPosition(-52, -52) // 下左
                break;

            // 左L
            case 3:
                log("初始化左L形")
                this.curBlockP1!.setPosition(0, 52) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -52) // 下
                this.curBlockP4!.setPosition(52, -52) // 下右
                break;

            // 右L
            case 4:
                log("初始化右L形")
                this.curBlockP1!.setPosition(0, 52) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -52) // 下
                this.curBlockP4!.setPosition(-52, -52) // 下左
                break;

            // T
            case 5:
                log("初始化T形")
                this.curBlockP1!.setPosition(0, 52) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(-52, 0) // 左
                this.curBlockP4!.setPosition(52, 0) // 右
                break;

            // 长条
            case 6:
                log("初始化竖形")
                this.curBlockP1!.setPosition(0, 104) //上上
                this.curBlockP2!.setPosition(0, 52) //上
                this.curBlockP3!.setPosition(0, 0) // 中
                this.curBlockP4!.setPosition(0, -52) // 下
                break;

            default:
                break;

        }
    }


    // 自动下落
    autoDown() {
        this.schedule(() => {
            this.curBlock.setPosition(this.curBlock.position.x, this.curBlock.position.y - 52)
        }, 1)
    }

}


