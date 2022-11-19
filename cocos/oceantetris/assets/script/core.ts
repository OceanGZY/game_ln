/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-15 22:58:20
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-19 20:21:45
 * @FilePath: /oceantetris/assets/script/core.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Prefab, Vec2, instantiate, v2, log, find } from 'cc'
const { ccclass, property } = _decorator

@ccclass('core')
export class core extends Component {
    start() {
    
    }

    update(deltaTime: number) {

    }

    @property(Prefab)
    block_0: Prefab = null!
    @property(Prefab)
    block_1: Prefab = null!
    @property(Prefab)
    block_2: Prefab = null!
    @property(Prefab)
    block_3: Prefab = null!
    @property(Prefab)
    block_4: Prefab = null!
    @property(Prefab)
    block_5: Prefab = null!
    @property(Prefab)
    block_6: Prefab = null!

    // 方块集合的中心
    @property(Prefab)
    currentBlockCentre = null!


    //整个游戏区域的格子用二维数组保存
    box: Node[][] = []
    // 随机数，用于随机块的颜色和形状
    rand: number = null!

    //当前的块
    currentBlock: Node = null!
    currentBlockPart01: Node = null!
    currentBlockPart02: Node = null!
    currentBlockPart03: Node = null!
    currentBlockPart04: Node = null!

    // 当前的位置
    currentBlockPart01Pos: Vec2 = null!
    currentBlockPart02Pos: Vec2 = null!
    currentBlockPart03Pos: Vec2 = null!
    currentBlockPart04Pos: Vec2 = null!

    // 游戏状态
    gameState: number | undefined

    InitBox() {
        for (let i = 0; i < 20; i++) {
            this.box[i] = []
            for (let j = 0; j < 10; j++) {
                this.box[i][j] = null!
            }
        }
        // 生成不同的方块集合
        this.initBlock()
    }


    // 生成不同的方块集合
    initBlock() {
        log("开发初始化方块")
        this.rand = Math.floor(7 * Math.random())
        this.initColor(this.rand)
        this.initShape(this.rand)
    }

    // 设置颜色
    initColor(rand: number) {
        // 正方形的颜色
        if (rand == 0) {
            this.currentBlockPart01 = instantiate(this.block_0)
            this.currentBlockPart02 = instantiate(this.block_0)
            this.currentBlockPart03 = instantiate(this.block_0)
            this.currentBlockPart04 = instantiate(this.block_0)
            this.currentBlock = instantiate(this.currentBlockCentre)

            this.node.addChild(this.currentBlock)
            this.currentBlock.setPosition(0, 480) // 将当前生成的方块设定在游戏区域的最上面，准备后续下落
        }

        // Z形的颜色
        if (rand == 1) {
            this.currentBlockPart01 = instantiate(this.block_1)
            this.currentBlockPart02 = instantiate(this.block_1)
            this.currentBlockPart03 = instantiate(this.block_1)
            this.currentBlockPart04 = instantiate(this.block_1)
            this.currentBlock = instantiate(this.currentBlockCentre)

            this.node.addChild(this.currentBlock)
            this.currentBlock.setPosition(30, 510) // 将当前生成的方块设定在游戏区域的最上面，准备后续下落
        }

        // 左L形的颜色
        if (rand == 2) {
            this.currentBlockPart01 = instantiate(this.block_2)
            this.currentBlockPart02 = instantiate(this.block_2)
            this.currentBlockPart03 = instantiate(this.block_2)
            this.currentBlockPart04 = instantiate(this.block_2)
            this.currentBlock = instantiate(this.currentBlockCentre)

            this.node.addChild(this.currentBlock)
            this.currentBlock.setPosition(30, 510) // 将当前生成的方块设定在游戏区域的最上面，准备后续下落
        }

        // 右L形的颜色
        if (rand == 3) {
            this.currentBlockPart01 = instantiate(this.block_3)
            this.currentBlockPart02 = instantiate(this.block_3)
            this.currentBlockPart03 = instantiate(this.block_3)
            this.currentBlockPart04 = instantiate(this.block_3)
            this.currentBlock = instantiate(this.currentBlockCentre)

            this.node.addChild(this.currentBlock)
            this.currentBlock.setPosition(30, 510) // 将当前生成的方块设定在游戏区域的最上面，准备后续下落
        }


        // 反Z形的颜色
        if (rand == 4) {
            this.currentBlockPart01 = instantiate(this.block_4)
            this.currentBlockPart02 = instantiate(this.block_4)
            this.currentBlockPart03 = instantiate(this.block_4)
            this.currentBlockPart04 = instantiate(this.block_4)
            this.currentBlock = instantiate(this.currentBlockCentre)

            this.node.addChild(this.currentBlock)
            this.currentBlock.setPosition(30, 510) // 将当前生成的方块设定在游戏区域的最上面，准备后续下落
        }


        // 长条形的颜色
        if (rand == 5) {
            this.currentBlockPart01 = instantiate(this.block_5)
            this.currentBlockPart02 = instantiate(this.block_5)
            this.currentBlockPart03 = instantiate(this.block_5)
            this.currentBlockPart04 = instantiate(this.block_5)
            this.currentBlock = instantiate(this.currentBlockCentre)

            this.node.addChild(this.currentBlock)
            this.currentBlock.setPosition(0, 480) // 将当前生成的方块设定在游戏区域的最上面，准备后续下落
        }


        // T形的颜色
        if (rand == 6) {
            this.currentBlockPart01 = instantiate(this.block_6)
            this.currentBlockPart02 = instantiate(this.block_6)
            this.currentBlockPart03 = instantiate(this.block_6)
            this.currentBlockPart04 = instantiate(this.block_6)
            this.currentBlock = instantiate(this.currentBlockCentre)

            this.node.addChild(this.currentBlock)
            this.currentBlock.setPosition(30, 510) // 将当前生成的方块设定在游戏区域的最上面，准备后续下落
        }

    }

    // 设置形状
    initShape(rand: number) {
        // 正方形
        if (rand == 0) {
            // 正方形右上
            this.currentBlockPart01.setPosition(30, 30)
            this.currentBlockPart01Pos = v2(18, 5)  // 初始化当前块的位置，相对于 currentBlock
            log(this.currentBlockPart01Pos)


            //正方形 左上
            this.currentBlockPart02.setPosition(-30, 30)
            this.currentBlockPart02Pos = v2(18, 4)

            // 正方形右下
            this.currentBlockPart03.setPosition(30, -30)
            this.currentBlockPart03Pos = v2(17, 5)

            // 正方形左下
            this.currentBlockPart04.setPosition(-30, -30)
            this.currentBlockPart04Pos = v2(17, 4)
        }

        // Z形
        if (rand == 1) {
            // Z左
            this.currentBlockPart01.setPosition(-60, 0)
            this.currentBlockPart01Pos = v2(18, 4)

            // Z中
            this.currentBlockPart02.setPosition(0, 0)
            this.currentBlockPart02Pos = v2(18, 5)

            // Z下
            this.currentBlockPart03.setPosition(0, -60)
            this.currentBlockPart03Pos = v2(17, 5)

            // Z右
            this.currentBlockPart04.setPosition(60, -60)
            this.currentBlockPart04Pos = v2(17, 6)
        }

        // 左L形
        if (rand == 2) {
            // 上
            this.currentBlockPart01.setPosition(0, 60)
            this.currentBlockPart01Pos = v2(19, 5)

            // 中
            this.currentBlockPart02.setPosition(0, 0)
            this.currentBlockPart02Pos = v2(18, 5)

            // 下
            this.currentBlockPart03.setPosition(0, -60)
            this.currentBlockPart03Pos = v2(17, 5)

            // 右
            this.currentBlockPart04.setPosition(60, -60)
            this.currentBlockPart04Pos = v2(17, 6)
        }

        // 右L形
        if (rand == 3) {
            // 上
            this.currentBlockPart01.setPosition(0, 60)
            this.currentBlockPart01Pos = v2(19, 5)

            // 中
            this.currentBlockPart02.setPosition(0, 0)
            this.currentBlockPart02Pos = v2(18, 5)

            // 下
            this.currentBlockPart03.setPosition(0, -60)
            this.currentBlockPart03Pos = v2(17, 5)

            // 左
            this.currentBlockPart04.setPosition(-60, -60)
            this.currentBlockPart04Pos = v2(17, 4)
        }


        // 反Z形
        if (rand == 4) {
            // 右
            this.currentBlockPart01.setPosition(0, 60)
            this.currentBlockPart01Pos = v2(18, 6)

            // 中
            this.currentBlockPart02.setPosition(0, 0)
            this.currentBlockPart02Pos = v2(18, 5)

            // 下
            this.currentBlockPart03.setPosition(0, -60)
            this.currentBlockPart03Pos = v2(17, 5)

            // 左
            this.currentBlockPart04.setPosition(-60, -60)
            this.currentBlockPart04Pos = v2(17, 4)
        }


        // 长条形
        if (rand == 5) {
            // 上上
            this.currentBlockPart01.setPosition(0, 120)
            this.currentBlockPart01Pos = v2(19, 5)

            // 上
            this.currentBlockPart02.setPosition(0, 60)
            this.currentBlockPart02Pos = v2(18, 5)

            // 中
            this.currentBlockPart03.setPosition(0, 0)
            this.currentBlockPart03Pos = v2(17, 5)

            // 下
            this.currentBlockPart04.setPosition(0, -60)
            this.currentBlockPart04Pos = v2(16, 5)

        }


        // T形
        if (rand == 6) {
            // 上
            this.currentBlockPart01.setPosition(0, 60)
            this.currentBlockPart01Pos = v2(18, 5)

            // 左
            this.currentBlockPart02.setPosition(-60, 0)
            this.currentBlockPart02Pos = v2(17, 4)

            // 中
            this.currentBlockPart03.setPosition(0, 0)
            this.currentBlockPart03Pos = v2(17, 5)

            // 右
            this.currentBlockPart04.setPosition(60, 0)
            this.currentBlockPart04Pos = v2(17, 6)
        }
        this.checkCurrentBlockPos()
    }

    // 读取当前操作方块集合的位置信息
    checkCurrentBlockPos() {
        this.box[this.currentBlockPart01Pos.x][this.currentBlockPart01Pos.y] = this.currentBlockPart01
        this.box[this.currentBlockPart02Pos.x][this.currentBlockPart02Pos.y] = this.currentBlockPart02
        this.box[this.currentBlockPart03Pos.x][this.currentBlockPart03Pos.y] = this.currentBlockPart03
        this.box[this.currentBlockPart04Pos.x][this.currentBlockPart04Pos.y] = this.currentBlockPart04
    }

    // 清除上个位置的当前操作方块集合的位置信息
    deleteCurrentBlockPos() {
        this.box[this.currentBlockPart01Pos.x][this.currentBlockPart01Pos.y] = null!
        this.box[this.currentBlockPart02Pos.x][this.currentBlockPart02Pos.y] = null!
        this.box[this.currentBlockPart03Pos.x][this.currentBlockPart03Pos.y] = null!
        this.box[this.currentBlockPart04Pos.x][this.currentBlockPart04Pos.y] = null!
    }

    // 判断是否到达左边界
    isClashLeft() {
        if (
            this.currentBlockPart01Pos.y - 1 < 0 ||
            this.currentBlockPart02Pos.y - 1 < 0 ||
            this.currentBlockPart03Pos.y - 1 < 0 ||
            this.currentBlockPart04Pos.y - 1 < 0
        ) {
            return true
        }
        return false
    }

    // 判断是否到达右边界
    isClashRight() {
        if (
            this.currentBlockPart01Pos.y + 1 > 9 ||
            this.currentBlockPart02Pos.y + 1 > 9 ||
            this.currentBlockPart03Pos.y + 1 > 9 ||
            this.currentBlockPart04Pos.y + 1 > 9
        ) {
            return true
        }
        return false
    }

    // 判断是否到达下边界
    isClashBottom() {
        if (
            this.currentBlockPart01Pos.x - 1 < 0 ||
            this.currentBlockPart02Pos.x - 1 < 0 ||
            this.currentBlockPart03Pos.x - 1 < 0 ||
            this.currentBlockPart04Pos.x - 1 < 0
        ) {
            return true
        }
        return false
    }

    // 判断是否是当前操作方块集合的子块
    isCurrentBlockChild(tNode: Node) {
        for (let i = 0; i < 4; i++) {
            if (tNode === this.currentBlock.children[i]) {
                return true
            }
        }
        return false
    }

    // 判断是否碰撞到其他方块 -下
    isClashBlockBottom() {
        let tmp: Node = new Node
        if (this.box[this.currentBlockPart01Pos.x - 1][this.currentBlockPart01Pos.y] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart01Pos.x - 1][this.currentBlockPart01Pos.y]) ||
            this.box[this.currentBlockPart02Pos.x - 1][this.currentBlockPart02Pos.y] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart02Pos.x - 1][this.currentBlockPart02Pos.y]) ||
            this.box[this.currentBlockPart03Pos.x - 1][this.currentBlockPart03Pos.y] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart03Pos.x - 1][this.currentBlockPart03Pos.y]) ||
            this.box[this.currentBlockPart04Pos.x - 1][this.currentBlockPart04Pos.y] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart04Pos.x - 1][this.currentBlockPart04Pos.y])) {
            return true
        }
        return false
    }

    // 判断是否碰撞到其他方块 -左
    isClashBlockLeft() {
        //向左检测方块碰撞
        let tmp: Node = new Node
        if (this.box[this.currentBlockPart01Pos.x][this.currentBlockPart01Pos.y - 1] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart01Pos.x][this.currentBlockPart01Pos.y - 1]) ||
            this.box[this.currentBlockPart02Pos.x][this.currentBlockPart02Pos.y - 1] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart02Pos.x][this.currentBlockPart02Pos.y - 1]) ||
            this.box[this.currentBlockPart03Pos.x][this.currentBlockPart03Pos.y - 1] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart03Pos.x][this.currentBlockPart03Pos.y - 1]) ||
            this.box[this.currentBlockPart04Pos.x][this.currentBlockPart04Pos.y - 1] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart04Pos.x][this.currentBlockPart04Pos.y - 1])) {
            return true
        }
        return false
    }

    // 判断是否碰撞到其他方块 -右
    isClashBlockRight() {
        //向右检测方块碰撞
        let tmp: Node = new Node
        if (this.box[this.currentBlockPart01Pos.x][this.currentBlockPart01Pos.y + 1] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart01Pos.x][this.currentBlockPart01Pos.y + 1]) ||
            this.box[this.currentBlockPart02Pos.x][this.currentBlockPart02Pos.y + 1] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart02Pos.x][this.currentBlockPart02Pos.y + 1]) ||
            this.box[this.currentBlockPart03Pos.x][this.currentBlockPart03Pos.y + 1] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart03Pos.x][this.currentBlockPart03Pos.y + 1]) ||
            this.box[this.currentBlockPart04Pos.x][this.currentBlockPart04Pos.y + 1] != tmp && !this.isCurrentBlockChild(this.box[this.currentBlockPart04Pos.x][this.currentBlockPart04Pos.y + 1])) {
            return true
        }
        return false
    }

    // 旋转
    revolveShape() {
        // this.revolveShapePart()
    }

    // 具体旋转的位置
    revolveShapePart(tNode: Node, tPos: Vec2) {
        // 顺时针旋转，左到上， 上到右， 右到下，下到左
        log(tNode.position)
        let paramX = Math.abs(tNode.position.x / 60)
        let paramY = Math.abs(tNode.position.y / 60)

        let paramMax = Math.max(paramX, paramY)
        // y轴上半
        if (tNode.position.x == 0 && tNode.position.y > 0) {
            tPos.x -= paramMax
            tPos.y += paramMax

            // 旋转当前块的位置
            tNode.setPosition(tNode.position.y, tNode.position.x)
        }

        // X轴左半
        else if (tNode.position.x < 0 && tNode.position.y == 0) {
            tPos.x += paramMax
            tPos.y += paramMax

            // 旋转当前块的位置
            tNode.setPosition(tNode.position.y, -tNode.position.x)
        }

        // y轴下半
        else if (tNode.position.x == 0 && tNode.position.y < 0) {
            tPos.x += paramMax
            tPos.y -= paramMax

            // 旋转当前块的位置
            tNode.setPosition(tNode.position.y, tNode.position.x)
        }

        // x轴右半
        else if (tNode.position.x > 0 && tNode.position.y == 0) {
            tPos.x -= paramMax
            tPos.y -= paramMax

            // 旋转当前块的位置
            tNode.setPosition(tNode.position.y, -tNode.position.x)
        }

        // 第一象限
        else if (
            tNode.position.x > 0 && tNode.position.y > 0
        ) {
            if (tNode.position.x >= 60 && tNode.position.y >= 60) {
                tPos.x -= 2
            } else {
                tPos.x -= 1
            }
            // 旋转当前块的位置
            // tNode.setPosition()

        }

        // 第二象限
        else if (
            tNode.position.x > 0 && tNode.position.y < 0
        ) {

        }

        // 第三象限
        else if (
            tNode.position.x < 0 && tNode.position.y < 0
        ) {

        }

        // 第四象限
        else if (
            tNode.position.x < 0 && tNode.position.y > 0
        ) {

        }

    }


    gameStart() {
        let startBtn = find("Canvas/GameOption")
        let gameCont = find("Canvas/GameContainer")
        startBtn!.active = false
        gameCont!.active = true
        this.InitBox()
        this.autoDown()
    }

    gamePause() {
        let pauseBtn = find("Canvas/GameContainer/PauseBtn")
        let resumeBtn = find("Canvas/GameContainer/ResumeBtn")
        pauseBtn!.active = false
        resumeBtn!.active = true
        log("点击了一个pause按钮")
        this.gameStart()
    }

    gameResume() {
        let pauseBtn = find("Canvas/GameContainer/PauseBtn")
        let resumeBtn = find("Canvas/GameContainer/ResumeBtn")
        pauseBtn!.active = true
        resumeBtn!.active = false
    }

    // 自动下落
    autoDown() {
        this.schedule(() => {
            if (this.isClashBottom()) {

            }
            else if (this.isClashBlockBottom()) {

            }
            else {
                this.currentBlock.setPosition(this.currentBlock.position.x, this.currentBlock.position.y - 60)
                this.deleteCurrentBlockPos()
                this.currentBlockPart01Pos.x -= 1
                this.currentBlockPart02Pos.x -= 1
                this.currentBlockPart03Pos.x -= 1
                this.currentBlockPart04Pos.x -= 1
                this.checkCurrentBlockPos()
            }
        }, 1)

    }
}

