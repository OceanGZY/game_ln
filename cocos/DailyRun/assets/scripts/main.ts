/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-04 17:05:34
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-06 18:13:05
 * @FilePath: /DailyRun/assets/scripts/main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, PhysicsSystem2D, EPhysics2DDrawFlags, BoxCollider2D, Contact2DType, IPhysics2DContact, EventTouch, Input, v2, tween, RigidBody2D, Collider2D, Label, AudioClip, AudioSource, Prefab, instantiate } from 'cc';
import { GameState } from './global/GameState';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {


    @property(Node)
    player: Node = null;
    playerColider: BoxCollider2D = null;
    playBody: RigidBody2D = null;

    @property(Node)
    backgrounds: Array<Node> = []; // 背景图片

    @property(Label)
    scoreLabel: Label = null;
    @property(Label)
    goldLabel: Label = null;
    @property(Label)
    sliverLabel: Label = null;


    curBg: Node = null;

    jumpForce: number = 120; // 跳跃力度  
    jumpDuration: number = 3; // 跳跃持续时间  
    maxJumpCount: number = 2; // 最大连跳次数

    bgSpeed: number = 256; // 背景运动速度

    score: number = 0;
    goldPerScore: number = 10;
    silverPerScore: number = 5;
    goldCnt: number = 0;
    silverCnt: number = 0;

    @property(Prefab)
    goldCoinPrefab: Prefab = null;

    @property(Prefab)
    silverCoinPrefab: Prefab = null;




    @property(AudioClip)
    jumpSoundSFX: AudioClip = null;

    @property(AudioClip)
    pickCoinSoundSFX: AudioClip = null;


    start() {
        // 显示碰撞区域
        // PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;

        this.playerColider = this.player.getComponent(BoxCollider2D);
        this.playBody = this.player.getComponent(RigidBody2D);

        this.playerColider.on(Contact2DType.BEGIN_CONTACT, this.onTheFloor, this)
        this.playerColider.on(Contact2DType.END_CONTACT, this.pickCoin, this)

        this.node.parent.on(Input.EventType.TOUCH_START, this.doJump, this);


        this.curBg = this.backgrounds[0];

        this.schedule(this.backgoundMove);
        this.schedule(this.generateGoldCoin, 3);
        this.schedule(this.generateSliverCoin, 5);


    }

    update(deltaTime: number) {


    }

    onTheFloor(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name = "Floor") {
            this.maxJumpCount = 2; //重置跳跃次数
        }
    }



    pickCoin(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        if (otherCollider.tag == 1) {
            this.scheduleOnce(() => {
                if (otherCollider.node) {
                    otherCollider.node.active = false;
                }
            }, 0.05);

            this.goldCnt++;
            this.score = this.score + this.goldPerScore;
            this.scoreLabel.string = "分数：" + this.score.toString();
            this.goldLabel.string = `${this.goldCnt}`;
            this.node.getComponent(AudioSource).playOneShot(this.pickCoinSoundSFX, 5);

            setTimeout(() => {
                otherCollider.node.destroy();
            }, 3);


        }

        if (otherCollider.tag == 2) {
            this.scheduleOnce(() => {
                if (otherCollider.node) {
                    otherCollider.node.active = false;
                }

            }, 0.05);
            this.silverCnt++;
            this.score = this.score + this.silverPerScore;
            this.scoreLabel.string = "分数：" + `${this.score}`;
            this.sliverLabel.string = `${this.silverCnt}`;
            this.node.getComponent(AudioSource).playOneShot(this.pickCoinSoundSFX, 5);

            setTimeout(() => {
                otherCollider.node.destroy();
            }, 3);

        }
    }

    doJump(event: EventTouch) {
        if (this.maxJumpCount > 0) {
            this.playBody.applyLinearImpulse(v2(0, this.jumpForce), v2(this.playBody.node.worldPosition.x, this.playBody.node.worldPosition.y), true);
            this.maxJumpCount--; //连跳次数减1
            this.node.getComponent(AudioSource).playOneShot(this.jumpSoundSFX, 5);
        }
    }



    backgoundMove() {
        let dt: number = 0.02;
        var distance = this.bgSpeed * dt;
        this.backgrounds[0].setPosition(this.backgrounds[0].position.x - distance, 0);
        this.backgrounds[1].setPosition(this.backgrounds[1].position.x - distance, 0);
        if (this.curBg.position.x <= -1280) {
            if (this.curBg == this.backgrounds[0]) {
                this.backgrounds[0].setPosition(this.backgrounds[1].position.x + 1280, 0);
                this.curBg = this.backgrounds[1];
            } else {
                this.backgrounds[1].setPosition(this.backgrounds[0].position.x + 1280, 0);
                this.curBg = this.backgrounds[0];
            }
        }
    }

    generateGoldCoin() {
        if (this.goldCnt >= GameState.getInstance().currentLevel.goldCount) {
            this.unschedule(this.generateGoldCoin);// 取消定时器
        }
        for (let i = 0; i < 3; i++) {
            let temp = instantiate(this.goldCoinPrefab);
            this.curBg.addChild(temp);
            temp.setPosition(100 * i, -10)
            if (this.curBg.position.x <= -1280) {
                temp.destroy();
            }
        }
    }

    generateSliverCoin() {
        if (this.silverCnt >= GameState.getInstance().currentLevel.silverCount) {
            this.unschedule(this.generateSliverCoin); // 取消定时器
        }
        for (let i = 0; i < 6; i++) {
            let temp = instantiate(this.silverCoinPrefab);
            this.curBg.addChild(temp);
            temp.setPosition(80 + 60 * i, -10);
            if (this.curBg.position.x <= -1280) {
                temp.destroy();
            }
        }
    }


}


