/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-04 23:12:26
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-05 10:11:51
 * @FilePath: /CocosLN/assets/案例-卡片配对/main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EventTouch, Node, Sprite, SpriteFrame, tween, UITransform, v3 } from 'cc';
import { image, TCardId } from './image'
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

    @property(image) imageManager: image;
    @property(Node) pointRoot: Node;

    // 初始化牌堆
    cards: TCardId[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

    currentOpenCrad = {
        node: null,
        id: -1
    };

    start() {
        this.orderAllCards();
        this.createAllCards();
        this.moveAllCards();
    }

    update(deltaTime: number) {

    }

    createAllCards() {
        console.log('createAllCards', this.cards);
        this.cards.forEach(cardId => {
            this.createOneCard(cardId);
        })
    }

    createOneCard(id: TCardId) {
        const card = new Node('card');
        this.node.addChild(card);
        const trans = card.addComponent(UITransform);
        const sprite = card.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        trans.setContentSize(140, 188);

        const sf = this.imageManager.getCardSFById(id);
        sprite.spriteFrame = sf;
    }

    orderAllCards() {
        this.cards.sort(() => 0.5 - Math.random());
        this.cards.sort(() => 0.5 - Math.random());
        this.cards.sort(() => 0.5 - Math.random());
    }

    moveAllCards() {
        this.node.children.forEach((node, index) => { // 铺牌，并发到各个位置
            const posX = this.pointRoot.children[index].position.x;
            const posY = this.pointRoot.children[index].position.y;
            // node.setPosition(posX, posY);
            tween(node).delay(index * 0.1).to(0.5, { position: v3(posX, posY, 1) }).start();
        });
        this.scheduleOnce(() => { // 模拟翻牌效果
            this.node.children.forEach((node, index) => {
                tween(node)
                    .to(0.5, { scale: v3(0, 1, 1) })
                    .call(() => {
                        const sprite = node.getComponent(Sprite)
                        sprite.spriteFrame = this.imageManager.getCardBackSF();
                    })
                    .to(0.5, { scale: v3(1, 1, 1) })
                    .start()
            });
            this.scheduleOnce(() => {
                this.addCardsEvent();
            });
        }, 2);
    }

    addCardsEvent() {
        this.node.children.forEach((node, index) => {
            node.on(Node.EventType.TOUCH_END, (event: EventTouch) => {

                if (node === this.currentOpenCrad.node) { // 卡牌已经被打开了
                    return;
                }

                const id: TCardId = this.cards[index];
                if (!this.currentOpenCrad.node) {
                    // 让被点击的卡牌反过来
                    tween(node)
                        .to(0.5, { scale: v3(0, 1, 1) })
                        .call(() => {
                            const sprite = node.getComponent(Sprite);
                            sprite.spriteFrame = this.imageManager.getCardSFById(id);
                        })
                        .to(0.5, { scale: v3(1, 1, 1) })
                        .start();
                    this.currentOpenCrad.id = id;
                    this.currentOpenCrad.node = node;
                    console.log(this.currentOpenCrad);
                } else {
                    // 判断翻开的卡牌数值是否一样
                    if (id === this.currentOpenCrad.id) {
                        console.log("配对成功！ID是", id);
                        tween(node)
                            .to(0.5, { scale: v3(0, 1, 1) })
                            .call(() => {
                                const sprite = node.getComponent(Sprite);
                                sprite.spriteFrame = this.imageManager.getCardSFById(id);
                            })
                            .to(0.5, { scale: v3(1, 1, 1) })
                            .call(() => {
                                // 配对成功后则两张卡牌消失
                                this.currentOpenCrad.node.active = false;
                                this.currentOpenCrad.node = null;
                                this.currentOpenCrad.id = -1;
                                node.active = false;
                            })
                            .start();
                    } else {
                        console.log("配对失败！");
                        tween(node)
                            .to(0.5, { scale: v3(0, 1, 1) })
                            .call(() => {
                                const sprite = node.getComponent(Sprite);
                                sprite.spriteFrame = this.imageManager.getCardSFById(id);
                            })
                            .to(0.5, { scale: v3(1, 1, 1) })
                            .call(() => {
                                tween(this.currentOpenCrad.node)
                                    .to(0.5, { scale: v3(0, 1, 1) })
                                    .call(() => {
                                        const sprite = this.currentOpenCrad.node.getComponent(Sprite);
                                        sprite.spriteFrame = this.imageManager.getCardBackSF();
                                    })
                                    .to(0.5, { scale: v3(1, 1, 1) })
                                    .call(() => {
                                        this.currentOpenCrad.node = null;
                                        this.currentOpenCrad.id = -1;
                                    })
                                    .start();
                                tween(node)
                                    .to(0.5, { scale: v3(0, 1, 1) })
                                    .call(() => {
                                        const sprite = node.getComponent(Sprite);
                                        sprite.spriteFrame = this.imageManager.getCardBackSF();
                                    })
                                    .to(0.5, { scale: v3(1, 1, 1) })
                                    .start();

                            }).start();
                    }
                }
            }, this)
        })
    }
}


