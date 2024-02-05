/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-04 22:40:20
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-05 08:24:25
 * @FilePath: /CocosLN/assets/案例-卡片配对/image.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

export type TCardId = 1 | 2 | 3 | 4 | 5 | 6;

@ccclass('image')
export class image extends Component {

    @property([SpriteFrame]) cardsSF: SpriteFrame[] = [];

    getCardSFById(id: TCardId) {
        return this.cardsSF[id];
    }

    getCardBackSF() {
        return this.cardsSF[0];
    }
}


