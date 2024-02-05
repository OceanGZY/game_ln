/*
 * @Author: OCEAN.GZY
 * @Date: 2024-02-05 19:28:32
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-05 20:09:25
 * @FilePath: /CocosLN/assets/制作一个操作按钮/main.ts
 * @Description: 注释信息
 */
import { _decorator, Component, EventTouch, Node, UITransform, v2, v3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {

    // 中心点， 每次操作动的都是中心点
    @property(Node) btnCenter: Node;

    private uiTrans: UITransform;
    private maxR: number = 135;
    private outDir: Vec2 = v2(0, 0); // 保存摇杆的方向

    start() {
        this.uiTrans = this.node.getComponent(UITransform);
        this.handleTouchEvent();
    }

    update(deltaTime: number) {

    }

    handleTouchEvent() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart(event: EventTouch) {
        const uipos = event.getUILocation();
        const cpos = this.uiTrans.convertToNodeSpaceAR(v3(uipos.x, uipos.y, 0));
        console.log(uipos, cpos);
        this.btnCenter.setPosition(cpos);
    }

    onTouchMove(event: EventTouch) {
        const uipos = event.getUILocation();
        const cpos = this.uiTrans.convertToNodeSpaceAR(v3(uipos.x, uipos.y, 0));
        console.log(uipos, cpos);

        // 需要增加按钮的可移动范围
        // const r = Math.sqrt(cpos.x * cpos.x + cpos.y * cpos.y); // 当前点具体0,0点的距离
        const tmpvec2 = v2(cpos.x, cpos.y); // 当前点向量化
        const length = tmpvec2.length(); // 向量长度
        const tempvec2_normal = tmpvec2.normalize(); // 向量归一化
        const scale = length > this.maxR ? this.maxR : length; // 放缩比例

        const outvec2 = tempvec2_normal.multiplyScalar(scale); // 实际的最后的按钮中心点移动后的位置
        this.outDir = outvec2;
        this.btnCenter.setPosition(outvec2.x, outvec2.y);
    }

    onTouchEnd(event: EventTouch) {
        this.btnCenter.setPosition(0, 0);
        this.outDir = v2(0, 0);
    }

    onTouchCancel(event: EventTouch) {
        this.btnCenter.setPosition(0, 0);
        this.outDir = v2(0, 0);
    }

    getJoyDir() {
        return this.outDir;
    }
}

