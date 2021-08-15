// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  text: string = "hello";

  @property(cc.Label)
  label1: cc.Label = null;

  @property
  text1: string = "asda";
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.label.string = this.text;
    this.label1.string = this.text1;
  }

  start() {}

  // update (dt) {}
}
