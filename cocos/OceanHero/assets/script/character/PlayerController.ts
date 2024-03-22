/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 17:09:57
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 21:21:55
 * @FilePath: /OceanHero/assets/script/character/PlayerController.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node } from 'cc';
import { Character } from './Character';
import { JoyInput } from '../input/JoyInput';
import { EnumAnimState } from './EnumAnimState';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('PlayerController')
@requireComponent(Character)
export class PlayerController extends Component {

    character: Character = null;

    start() {
        this.character = this.node.getComponent(Character);

    }

    update(deltaTime: number) {
        this.character.controlInput.x = JoyInput.horizontalIn;
        this.character.controlInput.z = -JoyInput.verticalIn;

        if (this.character.controlInput.length() > 0) {
            this.character.changeState(EnumAnimState.Run);
        } else {
            // console.log("虚拟摇杆已经不动了");
            this.character.changeState(EnumAnimState.Idle);
        }
    }
}

