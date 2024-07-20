/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-16 20:05:19
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-20 20:37:26
 * @FilePath: /PlanBattle/assets/scripts/enemy/EnemyController.ts
 * @Description: 注释信息
 */
import { _decorator, Collider, Component, Material, ICollisionEvent, instantiate, Node, Prefab, Vec3, MeshRenderer, tween } from 'cc';
import { PlayerController } from '../player/PlayerController';
import { GameState, GameStatus } from '../global/GameState';
import { AudioManager } from '../manager/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {
    @property({ type: Prefab })
    bulletPrefab: Prefab = null;

    // @property(Node)
    bulletContainer: Node = null;

    // @property(Node)
    playerNode: Node = null;

    @property(Material)
    flashMaterial: Material = null;

    // @property(Material)
    // originalMaterial: Material = null;


    @property({ type: Prefab })
    explosionPrefab: Prefab = null;

    private moveSpeed: number = 5;
    private fireInterval: number = 10;
    private health: number = 10;
    private fireTimer: number = 0;

    gameState: GameState = GameState.getInstance();
    start() {
        let collider = this.getComponent(Collider);
        this.playerNode = this.node.parent.getChildByName("Player");
        this.bulletContainer = this.node.parent.getChildByName("BulletContainer");
        // console.log("this.bulletContainer", this.bulletContainer);

        if (collider) {
            // console.log("enemy collider", collider.getMask(), collider.getGroup());
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
        }
    }

    update(deltaTime: number) {
        this.moveTowardsPlayer(deltaTime);
        this.autoFire(deltaTime);
    }

    autoFire(deltaTime: number) {
        this.fireTimer += deltaTime;
        if (this.fireTimer >= this.fireInterval) {
            this.fireTimer = 0;
            this.fireBullet();
        }
    }

    fireBullet() {
        // console.log("敌人发射子弹");
        let pos = this.node.worldPosition;
        // console.log("敌人世界位置", pos);
        let bullet = instantiate(this.bulletPrefab);
        bullet.setParent(this.bulletContainer);
        bullet.setWorldPosition(pos.x, pos.y, pos.z + 7);
    }


    moveTowardsPlayer(deltaTime: number) {
        if (this.playerNode == null || !this.playerNode.isValid) {
            return;
        }
        let direction = this.playerNode.position.clone().subtract(this.node.position).normalize();
        let movement = direction.multiplyScalar(this.moveSpeed * deltaTime);
        this.node.setPosition(this.node.position.add(movement));
    }

    onTriggerEnter(event: ICollisionEvent) {
        // console.log("有东西碰到敌人了", event.otherCollider.node.name);
        if (event.otherCollider.getGroup() == 2) {
            this.createExplosion(this.node.position);
            event.otherCollider.node.getComponent(PlayerController).takeDamage(10);
            if (this.node.isValid) {
                this.node.destroy();
            }
        }
    }

    takeDamage(damage: number) {
        this.health -= damage;
        this.gameState.score += 10;
        this.gameState.playerExp += 10;
        const renderer = this.node.getChildByName("body").getComponentInChildren(MeshRenderer);
        renderer.setMaterialInstance(this.flashMaterial, 0);
        const rimInstensity = this.flashMaterial.passes[0].getHandle('rimInstensity'); // 获取对应的 Uniform 的句柄
        tween(this.node)
            // .delay(0.05)
            .call(() => {
                this.flashMaterial.passes[0].setUniform(rimInstensity, 0);
            })
            .delay(0.05)
            .call(() => {
                this.flashMaterial.passes[0].setUniform(rimInstensity, 10);
                // renderer.setMaterialInstance(this.originalMaterial, 0);
            })
            .start();



        if (this.health <= 0 && this.node.isValid) {
            this.createExplosion(this.node.position);
            this.node.destroy();
        }
    }

    createExplosion(position: Vec3) {
        let explosion = instantiate(this.explosionPrefab);
        explosion.setParent(this.node.parent);
        explosion.setPosition(position);
        this.node.scene.getChildByName("Audio").getComponent(AudioManager).playExplodeSFX();

        setTimeout(() => {
            explosion.destroy();
        }, 300);
        this.gameState.enemyCount--;
        if (this.gameState.enemyCount <= 0) {
            this.node.scene.getChildByName("Audio").getComponent(AudioManager).playBgm(false);
            this.gameState.gameStatus = GameStatus.Success;
        }
    }
}

