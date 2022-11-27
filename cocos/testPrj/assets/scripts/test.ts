/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-26 21:59:07
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-27 11:29:51
 * @FilePath: \testPrj\assets\scripts\test.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Prefab, instantiate, Layout, log, find, UI, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {


    start() {
        this.init()
    }

    update(deltaTime: number) {

    }

    onLoad() {

    }

    init() {
        this.initSize()
        this.initBg()
    }

    @property(Prefab)
    test_block: Prefab = null!
    @property(Node)
    test_bg: Node = null!

    vHeight: number = null!
    vWidth: number = null!
    blockSize: number = null!

    initSize() {

        let _windowW = screen.availWidth
        let _windowH = screen.availHeight
        let _pbg = find("Canvas/GameView/playspace")
        let _pbg_size = _pbg.getComponent(UITransform).contentSize
        log(_pbg_size)


        log(screen.availHeight)
        log(screen.availWidth)
        log(screen.orientation)
        if (_windowW == 390 && _windowH == 844) {
            log(screen.availHeight)
            log(screen.availWidth)
            log(screen.orientation)
            
        }



        let _h = _pbg_size.height
        let _w = _pbg_size.width

        let _tmpSizeh = (_h - 38) / 20
        let _tmpSizew = (_w - 18) / 20

        log(_tmpSizew)
        log(_tmpSizeh)
    }

    initBg() {
        log("初始化背景")
        for (let i = 0; i < 200; i++) {
            var _bgblock = instantiate(this.test_block)
            // log(_bgblock)
            _bgblock.parent = this.test_bg
        }
        // log(this.test_bg)
    }
}

