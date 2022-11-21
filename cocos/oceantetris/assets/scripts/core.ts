/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-20 20:49:27
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-22 01:55:59
 * @FilePath: /oceantetris/assets/scripts/core.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Prefab, instantiate, log, Vec2, v2, find, KeyCode, input, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('core')
export class core extends Component {
    start() {
        this.initBgBlock()
        find("GameMusic")!.emit("bgm")
    }

    update(deltaTime: number) {

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
                this.curBlock.setPosition(27, 596)

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
                this.curBlock.setPosition(27, 596)

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
                this.curBlock.setPosition(27, 596)

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
                this.curBlock.setPosition(27, 596)

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
                this.curBlock.setPosition(27, 546)

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
                this.curBlock.setPosition(27, 596)

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

                this.curBlockP1Pos = v2(21, 5)
                this.curBlockP2Pos = v2(21, 4)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 4)
                break;

            // Z
            case 1:
                log("初始化Z形")
                this.curBlockP1!.setPosition(-52, 0) //左
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -52) // 下
                this.curBlockP4!.setPosition(52, -52) // 下右

                this.curBlockP1Pos = v2(21, 4)
                this.curBlockP2Pos = v2(21, 5)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 6)
                break;

            // 反Z
            case 2:
                log("初始化反Z形")
                this.curBlockP1!.setPosition(52, 0) //上右
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -52) // 下
                this.curBlockP4!.setPosition(-52, -52) // 下左

                this.curBlockP1Pos = v2(21, 6)
                this.curBlockP2Pos = v2(21, 5)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 4)
                break;

            // 左L
            case 3:
                log("初始化左L形")
                this.curBlockP1!.setPosition(0, 52) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -52) // 下
                this.curBlockP4!.setPosition(52, -52) // 下右

                this.curBlockP1Pos = v2(22, 5)
                this.curBlockP2Pos = v2(21, 5)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 6)
                break;

            // 右L
            case 4:
                log("初始化右L形")
                this.curBlockP1!.setPosition(0, 52) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(0, -52) // 下
                this.curBlockP4!.setPosition(-52, -52) // 下左

                this.curBlockP1Pos = v2(22, 5)
                this.curBlockP2Pos = v2(21, 5)
                this.curBlockP3Pos = v2(20, 5)
                this.curBlockP4Pos = v2(20, 4)
                break;

            // T
            case 5:
                log("初始化T形")
                this.curBlockP1!.setPosition(0, 52) //上
                this.curBlockP2!.setPosition(0, 0) //中
                this.curBlockP3!.setPosition(-52, 0) // 左
                this.curBlockP4!.setPosition(52, 0) // 右

                this.curBlockP1Pos = v2(21, 5)
                this.curBlockP2Pos = v2(20, 5)
                this.curBlockP3Pos = v2(20, 4)
                this.curBlockP4Pos = v2(20, 6)
                break;

            // 长条
            case 6:
                log("初始化竖形")
                this.curBlockP1!.setPosition(0, 104) //上上
                this.curBlockP2!.setPosition(0, 52) //上
                this.curBlockP3!.setPosition(0, 0) // 中
                this.curBlockP4!.setPosition(0, -52) // 下

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

        let mParamX = Math.abs(tNode.position.x / 52)
        let mParamY = Math.abs(tNode.position.y / 52)

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
            if (tNode.position.x >= 52 && tNode.position.y >= 52) {
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
            if (tNode.position.x >= 52 && tNode.position.y <= -52) {
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
            if (tNode.position.x <= -52 && tNode.position.y <= -52) {
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
            if (tNode.position.x <= -52 && tNode.position.y >= 52) {
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
        this.schedule(() => {
            if (this.isClashBottom()) {
                log("碰到底部了")
                this.deleteRow()
                this.initGameBlock()

            } else if (this.isClashBottomBlock()) {
                log("碰到下面的方块了")
                this.isGameOver()
                this.deleteRow()
                this.initGameBlock()

            } else {
                this.curBlock.setPosition(this.curBlock.position.x, this.curBlock.position.y - 52)
                this.deleteCurrentBlockPos()
                this.curBlockP1Pos.x -= 1
                this.curBlockP2Pos.x -= 1
                this.curBlockP3Pos.x -= 1
                this.curBlockP4Pos.x -= 1
                this.checkCurrentBlockPos()
            }
        }, 0.5)
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
                }
                this.rowDown(i)
                i--
            }
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
                    this.box[m][j].setPosition(this.box[m][j].position.x, this.box[m][j].position.y - 52)
                    if (this.box[m + 1][j] == null) {
                        this.box[temp + k][j] = null!
                    }
                }
            }
        }
    }

    // 键盘事件
    onKeyDown(e: any) {
        switch (e.keyCode) {
            case KeyCode.ARROW_LEFT:
                // 左移
                log("左移动")
                if (this.isClashLeft()) {
                    break
                } else if (this.isClashLeftBlock()) {
                    break
                } else {
                    this.curBlock.setPosition(this.curBlock.position.x - 52, this.curBlock.position.y)
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
                if (this.isClashRight()) {
                    break
                } else if (this.isClashRightBlock()) {
                    break
                } else {
                    this.curBlock.setPosition(this.curBlock.position.x + 52, this.curBlock.position.y)
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
                if (this.isClashBottom()) {
                    break
                } else if (this.isClashBottomBlock()) {
                    break
                } else {
                    this.curBlock.setPosition(this.curBlock.position.x, this.curBlock.position.y - 52)
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

    // 游戏状态 0已结束 1运行中 2已暂停
    gameState: number = null!

    gameStart() {
        let _gameWelcome = find("Canvas/GameWelcome")
        let _gameOver = find("Canvas/GameOver")
        _gameWelcome!.active = false
        _gameOver!.active = false
        this.gameState = 1
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        this.initBox()
        this.autoDown()

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
        this.enabled = false
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    gameRestart() {
        this.gameState = 1
        let _gameOver = find("Canvas/GameOver")
        _gameOver!.active = false
        this.enabled = true
        this.gcLayout.removeAllChildren()
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        this.initBox()
        this.autoDown()
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


