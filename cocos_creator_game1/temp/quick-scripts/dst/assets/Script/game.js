
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd3bcbDPHVNIxZBWHNDimmvK', 'game');
// Script/game.js

"use strict";

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
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
    starPrefab: {
      "default": null,
      type: cc.Prefab
    },
    maxStarDuration: 0,
    minStarDuration: 0,
    ground: {
      "default": null,
      type: cc.Node
    },
    player: {
      "default": null,
      type: cc.Node
    },
    msg: {
      "default": null,
      type: cc.RichText
    },
    scoreDisplay: {
      "default": null,
      type: cc.Label
    },
    scoreAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.groundY = this.ground.y + this.ground.height / 2;
    this.timer = 0;
    this.starDuration = 0;
    this.spawnNewStar();
    this.score = 0;
    this.msg.node.runAction(cc.fadeOut(3));
  },
  start: function start() {},
  update: function update(dt) {
    this.timer += dt;
  },
  spawnNewStar: function spawnNewStar() {
    var newStar = cc.instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(this.getNewStarPosition());
    newStar.getComponent('star').game = this;
    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
    this.timer = 0;
  },
  getNewStarPosition: function getNewStarPosition() {
    var randX = 0;
    var randY = this.groudY + Math.random() * this.player.getComponent('player').jumpHeight + 80;
    var maxX = this.node.width / 2;
    randX = (Math.random() - 0.5) * 2 * maxX;
    return cc.v2(randX, randY);
  },
  gainScore: function gainScore() {
    this.score += 1;
    this.scoreDisplay.string = 'Score: ' + this.score;
    cc.audioEngine.playEffect(this.scoreAudio, false);
  }
});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwic3RhclByZWZhYiIsInR5cGUiLCJQcmVmYWIiLCJtYXhTdGFyRHVyYXRpb24iLCJtaW5TdGFyRHVyYXRpb24iLCJncm91bmQiLCJOb2RlIiwicGxheWVyIiwibXNnIiwiUmljaFRleHQiLCJzY29yZURpc3BsYXkiLCJMYWJlbCIsInNjb3JlQXVkaW8iLCJBdWRpb0NsaXAiLCJvbkxvYWQiLCJncm91bmRZIiwieSIsImhlaWdodCIsInRpbWVyIiwic3RhckR1cmF0aW9uIiwic3Bhd25OZXdTdGFyIiwic2NvcmUiLCJub2RlIiwicnVuQWN0aW9uIiwiZmFkZU91dCIsInN0YXJ0IiwidXBkYXRlIiwiZHQiLCJuZXdTdGFyIiwiaW5zdGFudGlhdGUiLCJhZGRDaGlsZCIsInNldFBvc2l0aW9uIiwiZ2V0TmV3U3RhclBvc2l0aW9uIiwiZ2V0Q29tcG9uZW50IiwiZ2FtZSIsIk1hdGgiLCJyYW5kb20iLCJyYW5kWCIsInJhbmRZIiwiZ3JvdWRZIiwianVtcEhlaWdodCIsIm1heFgiLCJ3aWR0aCIsInYyIiwiZ2FpblNjb3JlIiwic3RyaW5nIiwiYXVkaW9FbmdpbmUiLCJwbGF5RWZmZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSQyxNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRCxLQWhCSjtBQW9CUkMsSUFB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Q0FBZUMsVUFBZixDQUEwQixLQUFLbkMsVUFBL0IsRUFBMkMsS0FBM0M7QUFDSDtBQXhGSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6IG51bGwsICAgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgICBzZXJpYWxpemFibGU6IHRydWUsICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gYmFyOiB7XHJcbiAgICAgICAgLy8gICAgIGdldCAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gdGhpcy5fYmFyO1xyXG4gICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgIC8vICAgICBzZXQgKHZhbHVlKSB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLl9iYXIgPSB2YWx1ZTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgc3RhclByZWZhYjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXhTdGFyRHVyYXRpb246IDAsXHJcbiAgICAgICAgbWluU3RhckR1cmF0aW9uOiAwLFxyXG4gICAgICAgIGdyb3VuZDoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxheWVyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtc2c6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuUmljaFRleHQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZURpc3BsYXk6IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29yZUF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLmdyb3VuZFkgPSB0aGlzLmdyb3VuZC55ICsgdGhpcy5ncm91bmQuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLnRpbWVyID0gMDtcclxuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5zcGF3bk5ld1N0YXIoKTtcclxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICB0aGlzLm1zZy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDMpKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlKGR0KSB7XHJcbiAgICAgICAgdGhpcy50aW1lciArPSBkdDtcclxuICAgIH0sXHJcbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xyXG4gICAgICAgIG5ld1N0YXIuc2V0UG9zaXRpb24odGhpcy5nZXROZXdTdGFyUG9zaXRpb24oKSk7XHJcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ3N0YXInKS5nYW1lID0gdGhpcztcclxuICAgICAgICB0aGlzLnN0YXJEdXJhdGlvbiA9IHRoaXMubWluU3RhckR1cmF0aW9uICsgTWF0aC5yYW5kb20oKSAqICh0aGlzLm1heFN0YXJEdXJhdGlvbiAtIHRoaXMubWluU3RhckR1cmF0aW9uKTtcclxuICAgICAgICB0aGlzLnRpbWVyID0gMDtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0TmV3U3RhclBvc2l0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJhbmRYID0gMDtcclxuICAgICAgICB2YXIgcmFuZFkgPSB0aGlzLmdyb3VkWSArIE1hdGgucmFuZG9tKCkgKiB0aGlzLnBsYXllci5nZXRDb21wb25lbnQoJ3BsYXllcicpLmp1bXBIZWlnaHQgKyA4MDtcclxuICAgICAgICB2YXIgbWF4WCA9IHRoaXMubm9kZS53aWR0aCAvIDI7XHJcbiAgICAgICAgcmFuZFggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAyICogbWF4WDtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNjLnYyKHJhbmRYLCByYW5kWSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdhaW5TY29yZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuc2NvcmUgKz0gMTtcclxuICAgICAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmcgPSAnU2NvcmU6ICcgKyB0aGlzLnNjb3JlO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5zY29yZUF1ZGlvLCBmYWxzZSk7XHJcbiAgICB9LFxyXG59KTtcclxuIl19