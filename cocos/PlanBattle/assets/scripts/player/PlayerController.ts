/*
 * @Author: OCEAN.GZY
 * @Date: 2024-07-16 20:05:09
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-20 20:38:09
 * @FilePath: /PlanBattle/assets/scripts/player/PlayerController.ts
 * @Description: 注释信息
 */
import { __private, _decorator, Camera, Collider, Component, director, EventTouch, ICollisionEvent, Input, input, instantiate, Material, MeshRenderer, Node, Prefab, tween, Vec2, Vec3 } from 'cc';
import { GameState, GameStatus } from '../global/GameState';
import { AudioManager } from '../manager/AudioManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property({ type: Prefab })
    bulletPrefab: Prefab = null;

    bulletContainer: Node = null;

    @property(Material)
    flashMaterial: Material = null;

    @property({ type: Prefab })
    explosionPrefab: Prefab = null;


    private fireInterval: number = 0.1;
    private fireTimer: number = 0;
    private health: number;
    private moveSpeed: number = 10;

    gameState: GameState = GameState.getInstance();

    start() {
        this.init();
    }

    update(deltaTime: number) {
        this.updatePosition(deltaTime);
        this.autoFire(deltaTime);
    }

    init() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        this.bulletContainer = this.node.parent.getChildByName("BulletContainer");
        this.health = this.gameState.playerHealth;

        let collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
        }
    }


    private velocity: Vec3 = new Vec3(0, 0, 0);

    updatePosition(deltaTime: number) {
        let newPos = this.node.position.clone().add(this.velocity.clone().multiplyScalar(deltaTime));
        this.node.setPosition(newPos);
    }

    onTouchStart(event: EventTouch) {
        // 运动变换模式
        const delta = event.getDelta();
        let pos = this.node.position;
        this.node.setPosition(pos.x + 0.01 * this.moveSpeed * delta.x, pos.y, pos.z - 0.01 * this.moveSpeed * delta.y);

        /* 点击位置转换为3D世界坐标，并设置飞机位置
            const touchLoc = event.getLocation();
            const newPos = this.convertTouchTo3DPosition(touchLoc);
            this.playerNode.setPosition(newPos);
        */
    }

    onTouchMove(event: EventTouch) {
        // 运动变换模式
        const delta = event.getDelta();
        let pos = this.node.position;
        this.node.setPosition(pos.x + 0.01 * this.moveSpeed * delta.x, pos.y, pos.z - 0.01 * this.moveSpeed * delta.y);

        /* 点击位置转换为3D世界坐标，并设置飞机位置
            const touchLoc = event.getLocation();
            const newPos = this.convertTouchTo3DPosition(touchLoc);
            this.playerNode.setPosition(newPos);
        */
    }

    onTouchEnd(event: EventTouch) {
        console.log("touch end");
    }

    convertTouchTo3DPosition(touchLoc: Vec2): Vec3 {
        const camera = this.node.scene.getChildByName('Main Camera').getComponent(Camera);
        const viewSize = camera.screenToWorld(new Vec3(touchLoc.x, touchLoc.y, camera.orthoHeight));
        return new Vec3(viewSize.x, this.node.position.y, viewSize.z);
    }


    autoFire(deltaTime: number) {
        this.fireTimer += deltaTime;
        if (this.fireTimer >= this.fireInterval) {
            this.fireTimer = 0;
            this.fireBullet();
        }
    }

    fireBullet() {
        // console.log("发射子弹");
        this.node.scene.getChildByName("Audio").getComponent(AudioManager).playFireSFX();
        let pos = this.node.worldPosition;
        // console.log("player世界位置", pos);
        let bullet = instantiate(this.bulletPrefab);
        bullet.setParent(this.bulletContainer);
        bullet.setWorldPosition(pos.x - 2.5, pos.y, pos.z - 7);
    }

    takeDamage(damage: number) {
        this.health -= damage;
        this.gameState.playerHealth = this.health;
        const renderer = this.node.getChildByName("body").getComponentInChildren(MeshRenderer);
        renderer.setMaterialInstance(this.flashMaterial, 0);
        const rimInstensity = this.flashMaterial.passes[0].getHandle('rimInstensity'); // 获取对应的 Uniform 的句柄
        tween(this.node)
            .delay(0.05)
            .call(() => {
                this.flashMaterial.passes[0].setUniform(rimInstensity, 0);
            })
            .delay(0.01)
            .call(() => {
                this.flashMaterial.passes[0].setUniform(rimInstensity, 10);
            })
            .start();
        // console.log("this.flashMaterial.passes[0]", this.flashMaterial.passes[0]);

        console.log("player现在的生命值", this.health);
        if (this.health <= 0 && this.node.isValid) {
            // Implement game over logic here
            this.node.active = false;
            this.createExplosion(this.node.position);
            this.node.scene.getChildByName("Audio").getComponent(AudioManager).playBgm(false);
            setTimeout(() => {
                this.gameState.gameStatus = GameStatus.Fail;
                this.node.destroy();
            }, 2000);
        }
    }

    onTriggerEnter(event: ICollisionEvent) {
    }

    createExplosion(position: Vec3) {
        this.health = 0;
        this.gameState.playerHealth = this.health;
        this.node.scene.getChildByName("Audio").getComponent(AudioManager).playExplodeSFX();
        let explosion = instantiate(this.explosionPrefab);
        explosion.setParent(this.node.parent);
        explosion.setPosition(position);
        setTimeout(() => {
            explosion.destroy();
        }, 300);
    }
}

