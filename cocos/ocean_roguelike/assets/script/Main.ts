import { Global } from './Global';
import { Monster } from './Monster';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-28 22:05:38
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-02 21:54:15
 * @FilePath: /ocean_roguelike/assets/script/Main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EPhysics2DDrawFlags, Node, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    @property(Node) orCamera: Node;
    @property(Node) orPlayer: Node;
    @property(Node) orJoyStick: Node;

    protected onLoad(): void {
        Global.player = this.orPlayer;
    }

    start() {
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;

    }

    update(deltaTime: number) {
        this.orCamera.worldPosition = this.orPlayer.worldPosition;

    }
}


