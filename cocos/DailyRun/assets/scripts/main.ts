/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-04 17:05:34
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-07-05 17:59:11
 * @FilePath: /DailyRun/assets/scripts/main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, Node, PhysicsSystem2D, EPhysics2DDrawFlags, BoxCollider2D, Contact2DType, IPhysics2DContact, EventTouch, Input, v2, RigidBody2D, Collider2D, Label, AudioClip, AudioSource, Prefab, instantiate, CircleCollider2D } from 'cc';
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

    @property(Node)
    floors: Array<Node> = []; // 地面


    coinNodes: Array<Node> = [];

    @property(Label)
    scoreLabel: Label = null;
    @property(Label)
    goldLabel: Label = null;
    @property(Label)
    sliverLabel: Label = null;


    curBg: Node = null;
    curFloor: Node = null;

    jumpForce: number = 120; // 跳跃力度  
    jumpDuration: number = 3; // 跳跃持续时间  

    bgSpeed: number = 256; // 背景运动速度
    floorSpeed: number = 128;

    score: number = 0;
    goldPerScore: number = 10;
    silverPerScore: number = 5;
    goldCnt: number = 0;
    silverCnt: number = 0;

    canJump: boolean = true;

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
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape;

        this.playerColider = this.player.getComponent(BoxCollider2D);
        this.playBody = this.player.getComponent(RigidBody2D);

        this.playerColider.on(Contact2DType.BEGIN_CONTACT, this.onHitOther, this)
        this.playerColider.on(Contact2DType.END_CONTACT, this.onEndHitOther, this)

        this.node.parent.on(Input.EventType.TOUCH_START, this.doJump, this);


        this.curBg = this.backgrounds[0];
        this.curFloor = this.floors[0];

        this.schedule(this.backgoundMove);
        this.schedule(this.floorMove);

    }

    update(deltaTime: number) {
    }

    onHitOther(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log("onHitOther otherCollider", otherCollider);

        if (otherCollider.node.name = "Floor") {
            // this.maxJumpCount = 2; //重置跳跃次数
            this.canJump = true;
        }

        if (otherCollider.node.name == "Back01" || otherCollider.node.name == "Back02") {
            console.log("碰到生产金币了");
            setTimeout(() => {
                this.generateCoin();
            }, 0.001);
        }
    }


    onEndHitOther(selfCollider: BoxCollider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        // console.log("onEndHitOther otherCollider", otherCollider);

        if (otherCollider.tag == 1) {
            this.scheduleOnce(() => {
                if (otherCollider.node) {
                    otherCollider.node.active = false;
                    otherCollider.node.getComponent(CircleCollider2D).apply();
                }
            }, 0.01);

            this.goldCnt++;
            this.score = this.score + this.goldPerScore;
            this.scoreLabel.string = "分数：" + this.score.toString();
            this.goldLabel.string = `${this.goldCnt}`;
            this.node.getComponent(AudioSource).playOneShot(this.pickCoinSoundSFX, 5);

            setTimeout(() => {
                if (otherCollider.node) {
                    otherCollider.node.destroy();
                }
            }, 5);


        }

        if (otherCollider.tag == 2) {
            this.scheduleOnce(() => {
                if (otherCollider.node) {
                    otherCollider.node.active = false;
                    otherCollider.node.getComponent(CircleCollider2D).apply();
                }
            }, 0.01);
            this.silverCnt++;
            this.score = this.score + this.silverPerScore;
            this.scoreLabel.string = "分数：" + `${this.score}`;
            this.sliverLabel.string = `${this.silverCnt}`;
            this.node.getComponent(AudioSource).playOneShot(this.pickCoinSoundSFX, 5);

            setTimeout(() => {
                if (otherCollider.node) {
                    otherCollider.node.destroy();
                }
            }, 5);

        }
    }

    doJump(event: EventTouch) {
        console.log("this.canJump", this.canJump);
        if (this.canJump) {
            this.canJump = false;
            this.playBody.applyLinearImpulse(v2(0, this.jumpForce), v2(this.playBody.node.worldPosition.x, this.playBody.node.worldPosition.y), true);
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

    floorMove() {
        let dt: number = 0.02;
        var distance = this.floorSpeed * dt;
        this.floors[0].setPosition(this.floors[0].position.x - distance, 0);
        this.floors[1].setPosition(this.floors[1].position.x - distance, 0);
        if (this.curFloor.position.x <= -1280) {
            if (this.curFloor == this.floors[0]) {
                this.floors[0].setPosition(this.floors[1].position.x + 1280, 0);
                this.curFloor = this.floors[1];
            } else {
                this.floors[1].setPosition(this.floors[0].position.x + 1280, 0);
                this.curFloor = this.floors[0];
            }
        }
    }
    generateCoin() {
        var temp = instantiate(this.goldCoinPrefab);
        // console.log("instantiate(this.goldCoinPrefab);", temp);
        // console.log(this.node.parent);
        this.node.parent.addChild(temp);
        temp.setPosition(300, -170);
        temp.on("hide", this.onCoinHide, temp);

        var temp1 = instantiate(this.silverCoinPrefab);
        this.node.parent.addChild(temp1);
        temp1.setPosition(600, -170);
        temp1.on("hide", this.onCoinHide, temp1);
    }

    onCoinHide(cnode: Node) {
        // console.log("收到hide信号", cnode);
        cnode.destroy();
    }
}


