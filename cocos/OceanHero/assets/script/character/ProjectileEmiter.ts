/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 17:12:12
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-24 20:06:52
 * @FilePath: /OceanHero/assets/script/character/ProjectileEmiter.ts
 * @Description: 注释信息
 */
import { _decorator, Component, director, instantiate, Node, Pool, Prefab } from 'cc';
import { Projectile } from './Projectile';
import { Events } from '../event/Events';
const { ccclass, property } = _decorator;

@ccclass('ProjectileEmiter')
export class ProjectileEmiter extends Component {

    @property(Prefab)
    arrowPrefab: Prefab = null;

    projectilePool: Pool<Node> = null;

    start() {
        this.projectilePool = new Pool(
            () => {
                return instantiate(this.arrowPrefab);
            }, 5,
            (node: Node) => {
                node.removeFromParent();
            }
        );
    }

    update(deltaTime: number) {

    }

    create(): Projectile {
        let node = this.projectilePool.alloc();
        if (node.parent == null) {
            director.getScene().addChild(node);
        }

        let projectile = node.getComponent(Projectile);
        node.once(Events.OnProjectileDead, this.onProjectileDead, this);
        node.active = true;
        console.log("创建子弹，开始ruturn");
        return projectile;
    }

    onProjectileDead(prj: Projectile) {
        console.log("子弹onProjectileDead");
        prj.node.active = false;
        this.projectilePool.free(prj.node);
    }

    protected onDestroy(): void {
        this.projectilePool.destroy();
    }
}

