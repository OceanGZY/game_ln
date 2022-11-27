/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-26 21:59:07
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-26 22:48:17
 * @FilePath: /testPrj/assets/scripts/test.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Prefab, instantiate, Layout, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {


    @property(Prefab)
    test_block: Prefab = null!
    @property(Node)
    test_bg: Node = null!


    start() {
        this.init()
    }

    update(deltaTime: number) {

    }

    onLoad() {

    }

    init() {
        this.initBg()
    }

    initBg() {
        log("初始化背景")
        for (let i = 0; i < 200; i++) {
            var _bgblock = instantiate(this.test_block)
            log(_bgblock)
            _bgblock.parent = this.test_bg
        }
        log(this.test_bg)
    }
}

