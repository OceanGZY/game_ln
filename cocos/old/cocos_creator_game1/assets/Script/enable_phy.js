// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        gravity: {
            default: cc.v2(),
        },
        is_debug: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = this.gravity;
        if (this.is_debug) {
            cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
                cc.PhysicsManager.DrawBits.e_pairBit |
                cc.PhysicsManager.DrawBits.e_centerOfMassBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit;
        } else {
            cc.director.getPhysicsManager().debugDrawFlags == 0;
        }

    },

    start() {

    },

    // update (dt) {},
});
