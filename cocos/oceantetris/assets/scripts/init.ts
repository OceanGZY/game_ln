/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-20 20:49:27
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-20 21:06:02
 * @FilePath: \oceantetris\assets\scripts\init.ts
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
    }

    @property(Node)
    gcBgLayout: Node = null!

    @property(Prefab)
    gbBlock: Prefab = null!

    initBgBlock() {
        log("初始化程序")
        for (let index = 0; index < 200; index++) {
            var _gbBlock = instantiate(this.gbBlock)
            _gbBlock.parent = this.gcBgLayout

        }
    }
}


