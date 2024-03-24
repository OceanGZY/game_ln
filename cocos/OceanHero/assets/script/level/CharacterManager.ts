/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 17:14:10
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-24 10:31:03
 * @FilePath: /OceanHero/assets/script/level/CharacterManager.ts
 * @Description: 注释信息
 */

import { Pool, Prefab, director, instantiate, randomRangeInt, resources, Node, Animation, SkeletalAnimationState } from "cc";
import { Character } from "../character/Character";
import { EnumAnimState } from "../character/EnumAnimState";
import { Events } from "../event/Events";

export class CharacterManager {
    private static _instance: CharacterManager = null;
    static get instance(): CharacterManager {
        if (this._instance == null) {
            this._instance = new CharacterManager();
        }
        return this._instance;
    }


    // 角色引用
    playerCharacter: Character = new Character();
    // 敌人信息
    enemies: Array<Node> = [];
    enemyPool: Pool<Node>;


    init(onComplete: () => void) {

        resources.loadDir("character/enemy/", Prefab, (err: Error, prefabs: Prefab[]) => {
            console.log("读取的信息", prefabs);
            if (err) {
                throw (err);
            }

            this.enemyPool = new Pool<Node>(
                (): Node => {
                    let prefab = prefabs[0];
                    let node = instantiate(prefab);
                    director.getScene().addChild(node);
                    return node;
                }, 10 * prefabs.length,
                (node: Node) => {
                    node.removeFromParent();
                }
            );

            onComplete();
        });
    }


    destroy() {
        this.enemyPool.destroy();
        this.enemies = [];
    }


    createEnemy(): Node {
        let node = this.enemyPool.alloc();
        node.active = true;
        this.enemies.push(node);
        node.once(Events.OnDie, this.onEnemyDie, this);
        return node;
    }

    onEnemyDie(node: Node) {
        const index = this.enemies.indexOf(node);
        this.enemies.splice(index, 1); // 移除
        let _tempEnemy = node.getComponent(Character);
        _tempEnemy.skAnim.on(Animation.EventType.FINISHED,
            (type: Animation.EventType, state: SkeletalAnimationState) => {
                if (state.name == EnumAnimState.Die) {
                    this.enemyPool.free(node);
                    node.active = false;
                }
            });
    }


    get randomEnemy() {
        return this.enemies[randomRangeInt(0, this.enemies.length)];
    }

}

