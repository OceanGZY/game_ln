
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0d89empaARBhapP6UFIX5xL', 'player');
// Script/player.js

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
    jumpHeight: 0,
    jumpDuration: 0,
    maxMoveSpeed: 0,
    accel: 0,
    jumpAudio: {
      "default": null,
      type: cc.AudioClip
    }
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    var jumpAction = this.runJumpAction();
    cc.tween(this.node).then(jumpAction).start();
    this.accLeft = false;
    this.accRight = false;
    this.xSpeed = 0;
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  onDestroy: function onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.KEY_DOWN, this);
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  },
  start: function start() {},
  update: function update(dt) {
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt;
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt;
    }

    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
    }

    this.node.x += this.xSpeed * dt;
  },
  runJumpAction: function runJumpAction() {
    var jumpUp = cc.tween().by(this.jumpDuration, {
      y: this.jumpHeight
    }, {
      easing: 'sineOut'
    });
    var jumpDown = cc.tween().by(this.jumpDuration, {
      y: -this.jumpHeight
    }, {
      easing: 'sineIn'
    });
    var jumpTween = cc.tween().sequence(jumpUp, jumpDown).call(this.playJumpSound, this);
    return cc.tween().repeatForever(jumpTween);
  },
  playJumpSound: function playJumpSound() {
    cc.audioEngine.playEffect(this.jumpAudio, false);
  },
  onKeyDown: function onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.left:
        this.accLeft = true;
        console.log("left");
        break;

      case cc.macro.KEY.right:
        this.accRight = true;
        console.log("right");
        break;
    }
  },
  onKeyUp: function onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.left:
        this.accLeft = false;
        break;

      case cc.macro.KEY.right:
        this.accRight = false;
        break;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxwbGF5ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJqdW1wSGVpZ2h0IiwianVtcER1cmF0aW9uIiwibWF4TW92ZVNwZWVkIiwiYWNjZWwiLCJqdW1wQXVkaW8iLCJ0eXBlIiwiQXVkaW9DbGlwIiwib25Mb2FkIiwianVtcEFjdGlvbiIsInJ1bkp1bXBBY3Rpb24iLCJ0d2VlbiIsIm5vZGUiLCJ0aGVuIiwic3RhcnQiLCJhY2NMZWZ0IiwiYWNjUmlnaHQiLCJ4U3BlZWQiLCJzeXN0ZW1FdmVudCIsIm9uIiwiU3lzdGVtRXZlbnQiLCJFdmVudFR5cGUiLCJLRVlfRE9XTiIsIm9uS2V5RG93biIsIktFWV9VUCIsIm9uS2V5VXAiLCJvbkRlc3Ryb3kiLCJvZmYiLCJ1cGRhdGUiLCJkdCIsIk1hdGgiLCJhYnMiLCJ4IiwianVtcFVwIiwiYnkiLCJ5IiwiZWFzaW5nIiwianVtcERvd24iLCJqdW1wVHdlZW4iLCJzZXF1ZW5jZSIsImNhbGwiLCJwbGF5SnVtcFNvdW5kIiwicmVwZWF0Rm9yZXZlciIsImF1ZGlvRW5naW5lIiwicGxheUVmZmVjdCIsImV2ZW50Iiwia2V5Q29kZSIsIm1hY3JvIiwiS0VZIiwibGVmdCIsImNvbnNvbGUiLCJsb2ciLCJyaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLElBQUFBLFVBQVUsRUFBRSxDQWhCSjtBQWlCUkMsSUFBQUEsWUFBWSxFQUFFLENBakJOO0FBa0JSQyxJQUFBQSxZQUFZLEVBQUUsQ0Fs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TixLQUFLQyxhQUZDLEVBRWMsSUFGZCxDQUFoQjtBQUlBLFdBQU81QyxFQUFFLENBQUNjLEtBQUgsR0FBVytCLGFBQVgsQ0FBeUJKLFNBQXpCLENBQVA7QUFDSCxHQTdFSTtBQWdGTEcsRUFBQUEsYUFBYSxFQUFFLHlCQUFZO0FBQ3ZCNUMsSUFBQUEsRUFBRSxDQUFDOEMsV0FBSCxDQUFlQyxVQUFmLENBQTBCLEtBQUt2QyxTQUEvQixFQUEwQyxLQUExQztBQUNILEdBbEZJO0FBb0ZMa0IsRUFBQUEsU0FwRksscUJBb0ZLc0IsS0FwRkwsRUFvRlk7QUFDYixZQUFRQSxLQUFLLENBQUNDLE9BQWQ7QUFDSSxXQUFLakQsRUFBRSxDQUFDa0QsS0FBSCxDQUFTQyxHQUFULENBQWFDLElBQWxCO0FBQ0ksYUFBS2xDLE9BQUwsR0FBZSxJQUFmO0FBQ0FtQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxNQUFaO0FBQ0E7O0FBQ0osV0FBS3RELEVBQUUsQ0FBQ2tELEtBQUgsQ0FBU0MsR0FBVCxDQUFhSSxLQUFsQjtBQUNJLGFBQUtwQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0FrQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaO0FBQ0E7QUFSUjtBQVVILEdBL0ZJO0FBaUdMMUIsRUFBQUEsT0FqR0ssbUJBaUdHb0IsS0FqR0gsRUFpR1U7QUFDWCxZQUFRQSxLQUFLLENBQUNDLE9BQWQ7QUFDSSxXQUFLakQsRUFBRSxDQUFDa0QsS0FBSCxDQUFTQyxHQUFULENBQWFDLElBQWxCO0FBQ0ksYUFBS2xDLE9BQUwsR0FBZSxLQUFmO0FBQ0E7O0FBQ0osV0FBS2xCLEVBQUUsQ0FBQ2tELEtBQUgsQ0FBU0MsR0FBVCxDQUFhSSxLQUFsQjtBQUNJLGFBQUtwQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0E7QUFOUjtBQVFIO0FBMUdJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxyXG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICAgLy8gQVRUUklCVVRFUzpcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDogbnVsbCwgICAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBiYXI6IHtcclxuICAgICAgICAvLyAgICAgZ2V0ICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XHJcbiAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgLy8gICAgIHNldCAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICBqdW1wSGVpZ2h0OiAwLFxyXG4gICAgICAgIGp1bXBEdXJhdGlvbjogMCxcclxuICAgICAgICBtYXhNb3ZlU3BlZWQ6IDAsXHJcbiAgICAgICAgYWNjZWw6IDAsXHJcbiAgICAgICAganVtcEF1ZGlvOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdmFyIGp1bXBBY3Rpb24gPSB0aGlzLnJ1bkp1bXBBY3Rpb24oKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRoZW4oanVtcEFjdGlvbikuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XHJcblxyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbktleURvd24sIHRoaXMpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLktFWV9ET1dOLCB0aGlzKTtcclxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5hY2NMZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkIC09IHRoaXMuYWNjZWwgKiBkdDtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYWNjUmlnaHQpIHtcclxuICAgICAgICAgICAgdGhpcy54U3BlZWQgKz0gdGhpcy5hY2NlbCAqIGR0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueFNwZWVkKSA+IHRoaXMubWF4TW92ZVNwZWVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gdGhpcy5tYXhNb3ZlU3BlZWQgKiB0aGlzLnhTcGVlZCAvIE1hdGguYWJzKHRoaXMueFNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMueFNwZWVkICogZHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHJ1bkp1bXBBY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIganVtcFVwID0gY2MudHdlZW4oKS5ieSh0aGlzLmp1bXBEdXJhdGlvbiwgeyB5OiB0aGlzLmp1bXBIZWlnaHQgfSwgeyBlYXNpbmc6ICdzaW5lT3V0JyB9KTtcclxuXHJcbiAgICAgICAgdmFyIGp1bXBEb3duID0gY2MudHdlZW4oKS5ieSh0aGlzLmp1bXBEdXJhdGlvbiwgeyB5OiAtdGhpcy5qdW1wSGVpZ2h0IH0sIHsgZWFzaW5nOiAnc2luZUluJyB9KTtcclxuXHJcbiAgICAgICAgdmFyIGp1bXBUd2VlbiA9IGNjLnR3ZWVuKClcclxuICAgICAgICAgICAgLnNlcXVlbmNlKGp1bXBVcCwganVtcERvd24pXHJcbiAgICAgICAgICAgIC5jYWxsKHRoaXMucGxheUp1bXBTb3VuZCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjYy50d2VlbigpLnJlcGVhdEZvcmV2ZXIoanVtcFR3ZWVuKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHBsYXlKdW1wU291bmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuanVtcEF1ZGlvLCBmYWxzZSk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uS2V5RG93bihldmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5sZWZ0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGVmdFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5yaWdodDpcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyaWdodFwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25LZXlVcChldmVudCkge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5sZWZ0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkucmlnaHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuXHJcblxyXG59KTtcclxuIl19