import { Global } from './Global';
import { Monster } from './Monster';
/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-28 22:05:38
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-07 23:03:22
 * @FilePath: /ocean_roguelike/assets/script/Main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EPhysics2DDrawFlags, instantiate, Node, PhysicsSystem2D, Prefab, random, randomRangeInt, TiledMap, v3 } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {

    @property(Node) orCamera: Node;
    @property(Player) orPlayer: Player;
    @property(Node) orJoyStick: Node;
    @property(TiledMap) orMap0: TiledMap;
    @property(Prefab) orMonster: Prefab;
    bnode: Node = new Node;
    enemyNum: number = 0;

    protected onLoad(): void {
        Global.player = this.orPlayer;

        this.node.addChild(this.bnode);
        Global.weaponBullets = this.bnode;

        console.log(this.orMap0.getMapSize());
    }

    start() {
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;

        var cb = function () {
            if (this.enemyNum > 100) {
                this.unschedule(cb);
            }
            var tempEnemy = instantiate(this.orMonster);
            tempEnemy.position = v3(randomRangeInt(20, 300), randomRangeInt(20, 900), 0);
            this.node.addChild(tempEnemy);
            this.enemyNum++;
        };
        this.schedule(cb, 3)
    }

    update(deltaTime: number) {
        this.orCamera.worldPosition = this.orPlayer.getWorldPosition();
        if (this.enemyNum > 100) {

        }
    }
}


