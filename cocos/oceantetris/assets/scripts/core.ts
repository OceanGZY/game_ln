/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-20 20:49:19
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-24 22:12:53
 * @FilePath: \oceantetris\assets\scripts\core.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Prefab, instantiate, log, Vec2, v2, find, KeyCode, input, Input, Label, Button, screen, Widget, Sprite, TransformBit, UITransform, Layout, Size } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('core')
export class core extends Component {
    start() {
        this.initBgBlock()
        this.scoreValue.string = "0"
        // find("GameMusic")!.emit("bgm")
    }

    update(deltaTime: number) {
        // log("最新的尺寸")
        // log(view.getVisibleSizeInPixel())
        // log(view.getVisibleSize())

    }
    onLoad() {
        this.fitDevice()
    }

    fitDevice() {
        log("加载的时候，最新的尺寸")
        log(screen.windowSize)
        this._vHeight = screen.windowSize.width > 900 ? screen.windowSize.height / 3 : screen.windowSize.height / 2
        this._vWidth = screen.windowSize.width > 900 ? screen.windowSize.width / 3 : screen.windowSize.width / 2

        // 屏幕适配
        //375的iOS
        if (this._vWidth <= 375) {
            this._playBgTop = 56
            this._playBgBottom = 44
            this._playBgH = this._vHeight - this._playBgTop - this._playBgBottom
            this._blockSize = (this._playBgH - 38) / 20
            this._playBgW = this._blockSize * 10 + 18
            this._playBgLeft = (this._vWidth - this._playBgW) / 2
            this._playBgRight = (this._vWidth - this._playBgW) / 2
            let _playBg = find("Canvas/GameCont/GCPlayGroundMask/GCBgPlayGround")
            _playBg!.active = false
        }
        this.scoreValue.string = screen.windowSize.toString()
        
        let _playBgMsak = find("Canvas/GameCont/GCPlayGroundMask")
        let _playBgWidget = _playBgMsak?.getComponent(Widget)
        _playBgWidget!.top = this._playBgTop
        _playBgWidget!.bottom = this._playBgBottom
        _playBgWidget!.left = this._playBgLeft
        _playBgWidget!.right = this._playBgRight
        _playBgMsak!.getComponent(UITransform)?.setContentSize(this._playBgW, this._playBgH)

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

    @property(Button)
    leftBtn: Button = null!
    @property(Button)
    topBtn: Button = null!
    @property(Button)
    rightBtn: Button = null!
    @property(Button)
    bottomBtn: Button = null!


    @property(Prefab)
    gameBlockCenter: Prefab = null!

    @property(Node)
    testLayout: Node = null!

    @property(Label)
    scoreValue: Label = null!

    rand: number = null!

    _score: number = 0
    _timer: number = 0.5

    _vWidth: number = 414
    _vHeight: number = 896

    _blockSize: number = 34

    _playBgW: number = 358
    _playBgH: number = 718
    _playBgTop: number = 89
    _playBgBottom: number = 89
    _playBgLeft: number = 28
    _playBgRight: number = 28



    // 游戏格子
    box: Node[][] = []
    // 当前块
    curBlock: Node = null!
    curBlockP1: Node = null!
    curBlockP2: Node = null!
    curBlockP3: Node = null!
    curBlockP4: Node = null!

    curBlockP1Pos: Vec2 = null!
    curBlockP2Pos: Vec2 = null!
    curBlockP3Pos: Vec2 = null!
    curBlockP4Pos: Vec2 = null!




    initBgBlock() {
        log("初始化程序")
        for (let index = 0; index < 200; index++) {
            var _gbBlock = instantiate(this.gbBlock)
            // _gbBlock.setScale(this._blockSize / 34, this._blockSize / 34)
            _gbBlock.getComponent(UITransform)!.setContentSize(this._blockSize, this._blockSize)
            _gbBlock.parent = this.gcBgLayout

        }
    }


    initBox() {
        for (let i = 0; i < 24; i++) {
            this.box[i] = []
            for (let j = 0; j < 10; j++) {
                this.box[i][j] = null!
            }
        }
        this.initGameBlock()

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
                this.curBlock.setPosition(0, this._playBgH / 2 + 3 + this._blockSize)

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
                this.curBlock.setPosition(this._blockSize / 2 + 2, this._playBgH / 2 + this._blockSize * 1.5 + 4)

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
                this.curBlock.setPosition(this._blockSize / 2 + 2, this._playBgH / 2 + this._blockSize * 1.5 + 4)

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
                this.curBlock.setPosition(this._blockSize / 2 + 2, this._playBgH / 2 + this._blockSize * 1.5 + 4)

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
                this.curBlock.setPosition(this._blockSize / 2 + 2, this._playBgH / 2 + this._blockSize * 1.5 + 4)

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
                this.curBlock.setPosition(this._blockSize / 2 + 2, this._playBgH / 2 + this._blockSize / 2 + 2)

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
                this.curBlock.setPosition(this._blockSize / 2 + 2, this._playBgH / 2 + this._blockSize * 1.5 + 4)

                log("T颜色的位置,", this.curBlock.position)

                break;

            default:
                break;
        }

        this.curBlockP1.getComponent(UITransform)?.setContentSize(this._blockSize, this._blockSize)
        this.curBlockP2.getComponent(UITransform)?.setContentSize(this._blockSize, this._blockSize)
        this.curBlockP3.getComponent(UITransform)?.setContentSize(this._blockSize, this._blockSize)
        this.curBlockP4.getComponent(UITransform)?.setContentSize(this._blockSize, this._blockSize)


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
                this.curBlockP1!.setPosition((this._blockSize / 2 + 1), (this._blockSize / 2 + 1)) //右上
                this.curBlockP2!.setPosition(-(this._blockSize / 2 + 1), (this._blockSize / 2 + 1)) //左上
                this.curBlockP3!.setPosition((this._blockSize / 2 + 1), -(this._blockSize / 2 + 1)) // 右下
                this.curBlockP4!.setPosition(-(this._blockSize / 2 + 1), -(this._blockSize / 2 + 1)) // 左下

                this.curBlockP1Pos = v2(21, 5)
                this.curBlockP2Pos = v2(21, 4)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 4)
                break;

            // Z
            case 1:
                log("初始化Z形")
                this.curBlockP1!.setPosition(-(this._blockSize + 2), 0) //左
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -(this._blockSize + 2)) // 下
                this.curBlockP4!.setPosition((this._blockSize + 2), -(this._blockSize + 2)) // 下右

                this.curBlockP1Pos = v2(21, 4)
                this.curBlockP2Pos = v2(21, 5)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 6)
                break;

            // 反Z
            case 2:
                log("初始化反Z形")
                this.curBlockP1!.setPosition((this._blockSize + 2), 0) //上右
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -(this._blockSize + 2)) // 下
                this.curBlockP4!.setPosition(-(this._blockSize + 2), -(this._blockSize + 2)) // 下左

                this.curBlockP1Pos = v2(21, 6)
                this.curBlockP2Pos = v2(21, 5)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 4)
                break;

            // 左L
            case 3:
                log("初始化左L形")
                this.curBlockP1!.setPosition(0, (this._blockSize + 2)) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -(this._blockSize + 2)) // 下
                this.curBlockP4!.setPosition((this._blockSize + 2), -(this._blockSize + 2)) // 下右

                this.curBlockP1Pos = v2(22, 5)
                this.curBlockP2Pos = v2(21, 5)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 6)
                break;

            // 右L
            case 4:
                log("初始化右L形")
                this.curBlockP1!.setPosition(0, (this._blockSize + 2)) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -(this._blockSize + 2)) // 下
                this.curBlockP4!.setPosition(-(this._blockSize + 2), -(this._blockSize + 2)) // 下左

                this.curBlockP1Pos = v2(22, 5)
                this.curBlockP2Pos = v2(21, 5)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 4)
                break;

            // T
            case 5:
                log("初始化T形")
                this.curBlockP1!.setPosition(0, (this._blockSize + 2)) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(-(this._blockSize + 2), 0) // 左
                this.curBlockP4!.setPosition((this._blockSize + 2), 0) // 右

                this.curBlockP1Pos = v2(21, 5)
                this.curBlockP2Pos = v2(20, 5)
                this.curBlockP3Pos = v2(20, 4)
                this.curBlockP4Pos = v2(20, 6)
                break;

            // 长条
            case 6:
                log("初始化竖形")
                this.curBlockP1!.setPosition(0, (this._blockSize + 2) * 2) //上上
                this.curBlockP2!.setPosition(0, (this._blockSize + 2)) //上
                this.curBlockP3!.setPosition(0, 0) // 中
                this.curBlockP4!.setPosition(0, -(this._blockSize + 2)) // 下

                this.curBlockP1Pos = v2(23, 5)
                this.curBlockP2Pos = v2(22, 5)
                this.curBlockP3Pos = v2(21, 5)
                this.curBlockP4Pos = v2(20, 5)
                break;

            default:
                break;

        }

        this.checkCurrentBlockPos()
    }

    // 判断是否触碰下边界
    isClashBottom() {
        if (
            this.curBlockP1Pos.x - 1 < 0 ||
            this.curBlockP2Pos.x - 1 < 0 ||
            this.curBlockP3Pos.x - 1 < 0 ||
            this.curBlockP4Pos.x - 1 < 0
        ) {
            return true
        }
        return false
    }

    // 检测是否碰到下方其他方块
    isClashBottomBlock() {
        log(this.box)
        log(this.box[this.curBlockP1Pos.x - 1][this.curBlockP1Pos.y])
        if (
            (this.box[this.curBlockP1Pos.x - 1][this.curBlockP1Pos.y] != null && !this.isCurrentBlockChild(this.box[this.curBlockP1Pos.x - 1][this.curBlockP1Pos.y])) ||
            (this.box[this.curBlockP2Pos.x - 1][this.curBlockP2Pos.y] != null && !this.isCurrentBlockChild(this.box[this.curBlockP2Pos.x - 1][this.curBlockP2Pos.y])) ||
            (this.box[this.curBlockP3Pos.x - 1][this.curBlockP3Pos.y] != null && !this.isCurrentBlockChild(this.box[this.curBlockP3Pos.x - 1][this.curBlockP3Pos.y])) ||
            (this.box[this.curBlockP4Pos.x - 1][this.curBlockP4Pos.y] != null && !this.isCurrentBlockChild(this.box[this.curBlockP4Pos.x - 1][this.curBlockP4Pos.y]))
        ) {
            return true
        }
        return false
    }

    // 检测是否碰到左边界
    isClashLeft() {
        if (
            this.curBlockP1Pos.y - 1 < 0 ||
            this.curBlockP2Pos.y - 1 < 0 ||
            this.curBlockP3Pos.y - 1 < 0 ||
            this.curBlockP4Pos.y - 1 < 0
        ) {
            return true
        }
        return false
    }

    // 检测是否碰到左边方块
    isClashLeftBlock() {
        log(this.box)
        log(this.box[this.curBlockP1Pos.x][this.curBlockP1Pos.y - 1])
        if (
            (this.box[this.curBlockP1Pos.x][this.curBlockP1Pos.y - 1] != null && !this.isCurrentBlockChild(this.box[this.curBlockP1Pos.x][this.curBlockP1Pos.y - 1])) ||
            (this.box[this.curBlockP2Pos.x][this.curBlockP2Pos.y - 1] != null && !this.isCurrentBlockChild(this.box[this.curBlockP2Pos.x][this.curBlockP2Pos.y - 1])) ||
            (this.box[this.curBlockP3Pos.x][this.curBlockP3Pos.y - 1] != null && !this.isCurrentBlockChild(this.box[this.curBlockP3Pos.x][this.curBlockP3Pos.y - 1])) ||
            (this.box[this.curBlockP4Pos.x][this.curBlockP4Pos.y - 1] != null && !this.isCurrentBlockChild(this.box[this.curBlockP4Pos.x][this.curBlockP4Pos.y - 1]))
        ) {
            return true
        }
        return false
    }

    // 检测是否碰到右边界
    isClashRight() {
        if (
            this.curBlockP1Pos.y + 1 > 9 ||
            this.curBlockP2Pos.y + 1 > 9 ||
            this.curBlockP3Pos.y + 1 > 9 ||
            this.curBlockP4Pos.y + 1 > 9
        ) {
            return true
        }
        return false
    }

    // 检测是否碰到右边方块
    isClashRightBlock() {
        log(this.box)
        log(this.box[this.curBlockP1Pos.x][this.curBlockP1Pos.y + 1])
        if (
            (this.box[this.curBlockP1Pos.x][this.curBlockP1Pos.y + 1] != null && !this.isCurrentBlockChild(this.box[this.curBlockP1Pos.x][this.curBlockP1Pos.y + 1])) ||
            (this.box[this.curBlockP2Pos.x][this.curBlockP2Pos.y + 1] != null && !this.isCurrentBlockChild(this.box[this.curBlockP2Pos.x][this.curBlockP2Pos.y + 1])) ||
            (this.box[this.curBlockP3Pos.x][this.curBlockP3Pos.y + 1] != null && !this.isCurrentBlockChild(this.box[this.curBlockP3Pos.x][this.curBlockP3Pos.y + 1])) ||
            (this.box[this.curBlockP4Pos.x][this.curBlockP4Pos.y + 1] != null && !this.isCurrentBlockChild(this.box[this.curBlockP4Pos.x][this.curBlockP4Pos.y + 1]))
        ) {
            return true
        }
        return false

    }

    // 顺时针旋转
    rotateShape() {
        log("旋转图形")
        this.rotateShapePart(this.curBlockP1, this.curBlockP1Pos)
        this.rotateShapePart(this.curBlockP2, this.curBlockP2Pos)
        this.rotateShapePart(this.curBlockP3, this.curBlockP3Pos)
        this.rotateShapePart(this.curBlockP4, this.curBlockP4Pos)
    }

    // 顺时针旋转子模块
    rotateShapePart(tNode: Node, tPos: Vec2) {
        log(tNode.position)

        let mParamX = Math.abs(tNode.position.x / (this._blockSize + 2))
        let mParamY = Math.abs(tNode.position.y / (this._blockSize + 2))

        let mParamMax = Math.max(mParamX, mParamY)

        // 在X、Y轴上
        // 在Y轴，上半轴 ， 顺时针旋转
        if (tNode.position.x == 0 && tNode.position.y > 0) {
            tPos.x -= mParamMax
            tPos.y += mParamMax

            // 旋转当前方块的位置
            tNode.setPosition(tNode.position.y, tNode.position.x)
        }

        // 在X轴 ，右半轴
        else if (tNode.position.x > 0 && tNode.position.y == 0) {
            tPos.x -= mParamMax
            tPos.y -= mParamMax

            // 旋转当前位置
            tNode.setPosition(tNode.position.y, -tNode.position.x)
        }

        // 在Y轴，下半轴 
        else if (tNode.position.x == 0 && tNode.position.y < 0) {
            tPos.x += mParamMax
            tPos.y -= mParamMax

            // 旋转当前位置
            tNode.setPosition(tNode.position.y, tNode.position.x)
        }

        // 在X轴 ，左半轴
        else if (tNode.position.x < 0 && tNode.position.y == 0) {
            tPos.x += mParamMax
            tPos.y += mParamMax

            // 旋转当前位置
            tNode.setPosition(tNode.position.y, -tNode.position.x)
        }

        // 第一象限 (右上)
        else if (tNode.position.x > 0 && tNode.position.y > 0) {
            log("从右上顺时针旋转")
            if (tNode.position.x >= (this._blockSize + 2) && tNode.position.y >= (this._blockSize + 2)) {
                tPos.x -= 2
            } else {
                tPos.x -= 1
            }

            // 旋转当前位置
            tNode.setPosition(tNode.position.x, -tNode.position.y)

        }

        // 第四象限 (右下)
        else if (tNode.position.x > 0 && tNode.position.y < 0) {
            log("从右下顺时针旋转")
            if (tNode.position.x >= (this._blockSize + 2) && tNode.position.y <= -(this._blockSize + 2)) {
                tPos.y -= 2
            } else {
                tPos.y -= 1
            }

            // 旋转当前位置
            tNode.setPosition(-tNode.position.x, tNode.position.y)

        }

        // 第三象限 (左下)
        else if (tNode.position.x < 0 && tNode.position.y < 0) {
            log("从左下顺时针旋转")
            if (tNode.position.x <= -(this._blockSize + 2) && tNode.position.y <= -(this._blockSize + 2)) {
                tPos.x += 2
            } else {
                tPos.x += 1
            }

            // 旋转当前位置
            tNode.setPosition(tNode.position.x, -tNode.position.y)
        }

        // 第二象限 (左上)
        else if (tNode.position.x < 0 && tNode.position.y > 0) {
            log("从左上顺时针旋转")
            if (tNode.position.x <= -(this._blockSize + 2) && tNode.position.y >= (this._blockSize + 2)) {
                tPos.y += 2
            } else {
                tPos.y += 1
            }

            // 旋转当前位置
            tNode.setPosition(-tNode.position.x, tNode.position.y)

        }

        log("旋转后最新对位置：", tNode.position)
    }

    // 检测是否是当前操作方块集合的子块
    isCurrentBlockChild(tNode: Node): boolean {
        for (let i = 0; i < 4; i++) {
            if (tNode === this.curBlock.children[i]) {
                return true
            }
        }
        return false
    }

    // 写入当前操作方块的位置信息
    checkCurrentBlockPos() {
        this.box[this.curBlockP1Pos.x][this.curBlockP1Pos.y] = this.curBlockP1
        this.box[this.curBlockP2Pos.x][this.curBlockP2Pos.y] = this.curBlockP2
        this.box[this.curBlockP3Pos.x][this.curBlockP3Pos.y] = this.curBlockP3
        this.box[this.curBlockP4Pos.x][this.curBlockP4Pos.y] = this.curBlockP4
    }

    // 删除当前操作方块的位置信息
    deleteCurrentBlockPos() {
        this.box[this.curBlockP1Pos.x][this.curBlockP1Pos.y] = null!
        this.box[this.curBlockP2Pos.x][this.curBlockP2Pos.y] = null!
        this.box[this.curBlockP3Pos.x][this.curBlockP3Pos.y] = null!
        this.box[this.curBlockP4Pos.x][this.curBlockP4Pos.y] = null!
    }

    // 自动下落
    autoDown() {
        log("最新的_timer是：", this._timer)
        if (this.isClashBottom()) {
            log("碰到底部了")
            log(this.curBlock.position)
            this.deleteRow()
            this.initGameBlock()

        } else if (this.isClashBottomBlock()) {
            log("碰到下面的方块了")
            log(this.curBlock.position)
            this.isGameOver()
            this.deleteRow()
            this.initGameBlock()

        } else {
            this.curBlock.setPosition(this.curBlock.position.x, this.curBlock.position.y - (this._blockSize + 2))
            this.deleteCurrentBlockPos()
            this.curBlockP1Pos.x -= 1
            this.curBlockP2Pos.x -= 1
            this.curBlockP3Pos.x -= 1
            this.curBlockP4Pos.x -= 1
            this.checkCurrentBlockPos()
        }
    }

    // 删除行
    deleteRow() {
        for (let i = 0; i < 18; i++) {
            let count = 0
            for (let j = 0; j < 10; j++) {
                if (this.box[i][j] != null) {
                    count++
                }
            }

            if (count == 10) {
                for (let k = 0; k < 10; k++) {
                    this.box[i][k].removeFromParent()
                    this.box[i][k] = null!
                    find("GameMusic")!.emit("cleanOneLine")
                    this._score += 1
                }
                this.rowDown(i)
                i--
            }
        }
        this.scoreValue.string = this._score.toString()
        if (this._score < 100) {
            this._timer = 0.5
            this.unschedule(this.autoDown)
            this.schedule(this.autoDown, this._timer)
        } else if (this._score < 250) {
            this._timer = 0.4
            this.unschedule(this.autoDown)
            this.schedule(this.autoDown, this._timer)
        } else if (this._score < 500) {
            this._timer = 0.35
            this.unschedule(this.autoDown)
            this.schedule(this.autoDown, this._timer)
        }
        else if (this._score < 1000) {
            this._timer = 0.25
            this.unschedule(this.autoDown)
            this.schedule(this.autoDown, this._timer)
        } else {
            this._timer = 0.2
            this.unschedule(this.autoDown)
            this.schedule(this.autoDown, this._timer)
        }
    }

    // 整体下移动
    rowDown(i: number) {
        // 记录当前被消除的行
        let k = i
        for (let j = 0; j < 10; j++) {
            // 用于计算当被消除的行 上面有多少行
            let temp = -1
            for (let m = k; m < 18; m++) {
                temp++
                if (this.box[m][j] != null) {
                    this.box[m - 1][j] = this.box[m][j]
                    this.box[m][j].setPosition(this.box[m][j].position.x, this.box[m][j].position.y - (this._blockSize + 2))
                    if (this.box[m + 1][j] == null) {
                        this.box[temp + k][j] = null!
                    }
                }
            }
        }
    }

    // 键盘按下事件
    onKeyDown(e: any) {
        switch (e.keyCode) {
            case KeyCode.ARROW_LEFT:
                // 左移
                log("左移动")
                find("GameMusic")!.emit("rotate")
                let _leftBtnNode = this.leftBtn.node
                _leftBtnNode.setScale(0.8, 0.8)
                if (this.isClashLeft()) {
                    break
                } else if (this.isClashLeftBlock()) {
                    break
                } else {
                    this.curBlock.setPosition(this.curBlock.position.x - (this._blockSize + 2), this.curBlock.position.y)
                    this.deleteCurrentBlockPos()
                    this.curBlockP1Pos.y -= 1
                    this.curBlockP2Pos.y -= 1
                    this.curBlockP3Pos.y -= 1
                    this.curBlockP4Pos.y -= 1
                    this.checkCurrentBlockPos()
                    break
                }

            case KeyCode.ARROW_RIGHT:
                // 右移
                log("右移动")
                find("GameMusic")!.emit("rotate")
                let _rightBtnNode = this.rightBtn.node
                _rightBtnNode.setScale(0.8, 0.8)
                if (this.isClashRight()) {
                    break
                } else if (this.isClashRightBlock()) {
                    break
                } else {
                    this.curBlock.setPosition(this.curBlock.position.x + (this._blockSize + 2), this.curBlock.position.y)
                    this.deleteCurrentBlockPos()
                    this.curBlockP1Pos.y += 1
                    this.curBlockP2Pos.y += 1
                    this.curBlockP3Pos.y += 1
                    this.curBlockP4Pos.y += 1
                    this.checkCurrentBlockPos()
                    break
                }
            case KeyCode.ARROW_UP:
                //变形
                find("GameMusic")!.emit("rotate")
                let _topBtnNode = this.topBtn.node
                _topBtnNode.setScale(0.8, 0.8)
                if (this.isClashBottom()) {
                    break
                } else if (this.isClashBottomBlock()) {
                    break
                } else if (this.isClashLeft()) {
                    break
                } else if (this.isClashLeftBlock()) {
                    break
                } else if (this.isClashRight()) {
                    break
                } else if (this.isClashRightBlock()) {
                    break
                } else {
                    this.deleteCurrentBlockPos()
                    this.rotateShape()
                    this.checkCurrentBlockPos()
                    break
                }

            case KeyCode.ARROW_DOWN:
                // 手动向下
                log("下移动")
                find("GameMusic")!.emit("rotate")
                let _bottomBtnNode = this.bottomBtn.node
                _bottomBtnNode.setScale(0.8, 0.8)
                if (this.isClashBottom()) {
                    break
                } else if (this.isClashBottomBlock()) {
                    break
                } else {
                    this.curBlock.setPosition(this.curBlock.position.x, this.curBlock.position.y - (this._blockSize + 2))
                    this.deleteCurrentBlockPos()
                    this.curBlockP1Pos.x -= 1
                    this.curBlockP2Pos.x -= 1
                    this.curBlockP3Pos.x -= 1
                    this.curBlockP4Pos.x -= 1
                    this.checkCurrentBlockPos()
                    break
                }

            default:
                break;
        }
    }

    // 键盘弹起事件
    onKeyUp(e: any) {
        switch (e.keyCode) {
            case KeyCode.ARROW_LEFT:
                let _leftBtnNode = this.leftBtn.node
                _leftBtnNode.setScale(1, 1)
                break;

            case KeyCode.ARROW_RIGHT:
                let _rightBtnNode = this.rightBtn.node
                _rightBtnNode.setScale(1, 1)
                break;
            case KeyCode.ARROW_UP:
                let _topBtnNode = this.topBtn.node
                _topBtnNode.setScale(1, 1)
                break;
            case KeyCode.ARROW_DOWN:
                let _bottomBtnNode = this.bottomBtn.node
                _bottomBtnNode.setScale(1, 1)
                break;
            default:
                break;
        }
    }


    // 点击left
    clickLeft() {
        log("点击left")
        let _leftBtnNode = this.leftBtn.node
        _leftBtnNode.on(Input.EventType.TOUCH_START, () => _leftBtnNode.setScale(0.8, 0.8))
        _leftBtnNode.on(Input.EventType.TOUCH_END, () => _leftBtnNode.setScale(1, 1))
        find("GameMusic")!.emit("rotate")
        if (!(this.isClashLeft() ||
            this.isClashLeftBlock())) {
            this.curBlock.setPosition(this.curBlock.position.x - (this._blockSize + 2), this.curBlock.position.y)
            this.deleteCurrentBlockPos()
            this.curBlockP1Pos.y -= 1
            this.curBlockP2Pos.y -= 1
            this.curBlockP3Pos.y -= 1
            this.curBlockP4Pos.y -= 1
            this.checkCurrentBlockPos()
        }
    }

    // 点击right
    clickRight() {
        log("点击right")
        let _rightBtnNode = this.rightBtn.node
        _rightBtnNode.on(Input.EventType.TOUCH_START, () => _rightBtnNode.setScale(0.8, 0.8))
        _rightBtnNode.on(Input.EventType.TOUCH_END, () => _rightBtnNode.setScale(1, 1))
        find("GameMusic")!.emit("rotate")
        if (!(this.isClashRight() ||
            this.isClashRightBlock())) {
            this.curBlock.setPosition(this.curBlock.position.x + (this._blockSize + 2), this.curBlock.position.y)
            this.deleteCurrentBlockPos()
            this.curBlockP1Pos.y += 1
            this.curBlockP2Pos.y += 1
            this.curBlockP3Pos.y += 1
            this.curBlockP4Pos.y += 1
            this.checkCurrentBlockPos()
        }

    }

    // 点击top
    clickTop() {
        log("点击top")
        let _topBtnNode = this.topBtn.node
        _topBtnNode.on(Input.EventType.TOUCH_START, () => _topBtnNode.setScale(0.8, 0.8))
        _topBtnNode.on(Input.EventType.TOUCH_END, () => _topBtnNode.setScale(1, 1))
        find("GameMusic")!.emit("rotate")
        if (!(this.isClashBottom() ||
            this.isClashBottomBlock() ||
            this.isClashLeft() ||
            this.isClashLeftBlock() ||
            this.isClashRight() ||
            this.isClashRightBlock())) {
            this.deleteCurrentBlockPos()
            this.rotateShape()
            this.checkCurrentBlockPos()
        }
    }

    // 点击bottom
    clickBottom() {
        log("点击bottom")
        let _bottomBtnNode = this.bottomBtn.node
        _bottomBtnNode.on(Input.EventType.TOUCH_START, () => _bottomBtnNode.setScale(0.8, 0.8))
        _bottomBtnNode.on(Input.EventType.TOUCH_END, () => _bottomBtnNode.setScale(1, 1))
        find("GameMusic")!.emit("rotate")
        if (!(this.isClashBottom() ||
            this.isClashBottomBlock())) {
            this.curBlock.setPosition(this.curBlock.position.x, this.curBlock.position.y - (this._blockSize + 2))
            this.deleteCurrentBlockPos()
            this.curBlockP1Pos.x -= 1
            this.curBlockP2Pos.x -= 1
            this.curBlockP3Pos.x -= 1
            this.curBlockP4Pos.x -= 1
            this.checkCurrentBlockPos()
        }
    }

    // 游戏状态 0已结束 1运行中 2已暂停
    gameState: number = null!

    gameStart() {
        let _gameWelcome = find("Canvas/GameWelcome")
        let _gameOver = find("Canvas/GameOver")
        _gameWelcome!.active = false
        _gameOver!.active = false
        this.gameState = 1
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        this.initBox()
        this.schedule(this.autoDown, this._timer)
    }

    gameResume() {
        this.gameState = 1

    }

    gamePause() {
        this.gameState = 2

    }

    gameOver() {
        this.gameState = 0
        let _gameOver = find("Canvas/GameOver")
        _gameOver!.active = true
        find("GameMusic")!.emit("gameover")
        find("GameMusic")!.emit("bgmStop")
        this.unschedule(this.autoDown)
        this.enabled = false
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    gameRestart() {
        this.gameState = 1
        let _gameOver = find("Canvas/GameOver")
        _gameOver!.active = false
        this.enabled = true
        this.gcLayout.removeAllChildren()
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        // find("GameMusic")!.emit("bgm")
        this._score = 0
        this.scoreValue.string = this._score.toString()
        this._timer = 0.5
        this.initBox()
        this.schedule(this.autoDown, this._timer)
    }


    isGameOver() {
        for (let i = 18; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                if (this.box[i][j] != null) {
                    this.gameOver()
                }
            }
        }
    }
}


