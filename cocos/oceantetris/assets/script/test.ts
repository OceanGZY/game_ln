/*
 * @Author: OCEAN.GZY
 * @Date: 2022-11-20 11:53:57
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2022-11-20 12:06:10
 * @FilePath: \oceantetris\assets\script\test.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, Prefab, instantiate, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    start() {

    }

    update(deltaTime: number) {

    }
    onLoad() {
        log("加在了")
        this.addBlock()

    }

    @property(Node)
    bgCont: Node = null!

    @property(Prefab)
    block: Prefab = null!

    addBlock() {
        for (let index = 0; index < 30; index++) {
            var node_block = instantiate(this.block)
            node_block.parent = this.bgCont
        }
    }


}


