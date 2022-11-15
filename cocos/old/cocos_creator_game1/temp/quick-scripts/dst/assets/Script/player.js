
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvcGxheWVyLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwianVtcEhlaWdodCIsImp1bXBEdXJhdGlvbiIsIm1heE1vdmVTcGVlZCIsImFjY2VsIiwianVtcEF1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsImp1bXBBY3Rpb24iLCJydW5KdW1wQWN0aW9uIiwidHdlZW4iLCJub2RlIiwidGhlbiIsInN0YXJ0IiwiYWNjTGVmdCIsImFjY1JpZ2h0IiwieFNwZWVkIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5c3RlbUV2ZW50IiwiRXZlbnRUeXBlIiwiS0VZX0RPV04iLCJvbktleURvd24iLCJLRVlfVVAiLCJvbktleVVwIiwib25EZXN0cm95Iiwib2ZmIiwidXBkYXRlIiwiZHQiLCJNYXRoIiwiYWJzIiwieCIsImp1bXBVcCIsImJ5IiwieSIsImVhc2luZyIsImp1bXBEb3duIiwianVtcFR3ZWVuIiwic2VxdWVuY2UiLCJjYWxsIiwicGxheUp1bXBTb3VuZCIsInJlcGVhdEZvcmV2ZXIiLCJhdWRpb0VuZ2luZSIsInBsYXlFZmZlY3QiLCJldmVudCIsImtleUNvZGUiLCJtYWNybyIsIktFWSIsImxlZnQiLCJjb25zb2xlIiwibG9nIiwicmlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxVQUFVLEVBQUUsQ0FoQko7QUFpQlJDLElBQUFBLFlBQVksRUFBRSxDQWpCTjtBQWtCUkMsSUFBQUEsWUFBWSxFQUFFLENBbEJOO0FBbUJSQyxJQUFBQSxLQUFLLEVBQUUsQ0FuQkM7QUFvQlJDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUEMsTUFBQUEsSUFBSSxFQUFFVCxFQUFFLENBQUNVO0FBRkY7QUFwQkgsR0FIUDtBQTZCTDtBQUVBQyxFQUFBQSxNQS9CSyxvQkErQkk7QUFDTCxRQUFJQyxVQUFVLEdBQUcsS0FBS0MsYUFBTCxFQUFqQjtBQUNBYixJQUFBQSxFQUFFLENBQUNjLEtBQUgsQ0FBUyxLQUFLQyxJQUFkLEVBQW9CQyxJQUFwQixDQUF5QkosVUFBekIsRUFBcUNLLEtBQXJDO0FBRUEsU0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBRUEsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFFQXBCLElBQUFBLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUMsRUFBZixDQUFrQnRCLEVBQUUsQ0FBQ3VCLFdBQUgsQ0FBZUMsU0FBZixDQUF5QkMsUUFBM0MsRUFBcUQsS0FBS0MsU0FBMUQsRUFBcUUsSUFBckU7QUFDQTFCLElBQUFBLEVBQUUsQ0FBQ3FCLFdBQUgsQ0FBZUMsRUFBZixDQUFrQnRCLEVBQUUsQ0FBQ3VCLFdBQUgsQ0FBZUMsU0FBZixDQUF5QkcsTUFBM0MsRUFBbUQsS0FBS0MsT0FBeEQsRUFBaUUsSUFBakU7QUFDSCxHQTFDSTtBQTRDTEMsRUFBQUEsU0E1Q0ssdUJBNENPO0FBQ1I3QixJQUFBQSxFQUFFLENBQUNxQixXQUFILENBQWVTLEdBQWYsQ0FBbUI5QixFQUFFLENBQUN1QixXQUFILENBQWVDLFNBQWYsQ0FBeUJDLFFBQTVDLEVBQXNELEtBQUtBLFFBQTNELEVBQXFFLElBQXJFO0FBQ0F6QixJQUFBQSxFQUFFLENBQUNxQixXQUFILENBQWVTLEdBQWYsQ0FBbUI5QixFQUFFLENBQUN1QixXQUFILENBQWVDLFNBQWYsQ0FBeUJHLE1BQTVDLEVBQW9ELEtBQUtDLE9BQXpELEVBQWtFLElBQWxFO0FBQ0gsR0EvQ0k7QUFpRExYLEVBQUFBLEtBakRLLG1CQWlERyxDQUVQLENBbkRJO0FBcURMYyxFQUFBQSxNQXJESyxrQkFxREVDLEVBckRGLEVBcURNO0FBQ1AsUUFBSSxLQUFLZCxPQUFULEVBQWtCO0FBQ2QsV0FBS0UsTUFBTCxJQUFlLEtBQUtiLEtBQUwsR0FBYXlCLEVBQTVCO0FBQ0gsS0FGRCxNQUVPLElBQUksS0FBS2IsUUFBVCxFQUFtQjtBQUN0QixXQUFLQyxNQUFMLElBQWUsS0FBS2IsS0FBTCxHQUFheUIsRUFBNUI7QUFDSDs7QUFFRCxRQUFJQyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLZCxNQUFkLElBQXdCLEtBQUtkLFlBQWpDLEVBQStDO0FBQzNDLFdBQUtjLE1BQUwsR0FBYyxLQUFLZCxZQUFMLEdBQW9CLEtBQUtjLE1BQXpCLEdBQWtDYSxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLZCxNQUFkLENBQWhEO0FBQ0g7O0FBRUQsU0FBS0wsSUFBTCxDQUFVb0IsQ0FBVixJQUFlLEtBQUtmLE1BQUwsR0FBY1ksRUFBN0I7QUFDSCxHQWpFSTtBQW1FTG5CLEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUN2QixRQUFJdUIsTUFBTSxHQUFHcEMsRUFBRSxDQUFDYyxLQUFILEdBQVd1QixFQUFYLENBQWMsS0FBS2hDLFlBQW5CLEVBQWlDO0FBQUVpQyxNQUFBQSxDQUFDLEVBQUUsS0FBS2xDO0FBQVYsS0FBakMsRUFBeUQ7QUFBRW1DLE1BQUFBLE1BQU0sRUFBRTtBQUFWLEtBQXpELENBQWI7QUFFQSxRQUFJQyxRQUFRLEdBQUd4QyxFQUFFLENBQUNjLEtBQUgsR0FBV3VCLEVBQVgsQ0FBYyxLQUFLaEMsWUFBbkIsRUFBaUM7QUFBRWlDLE1BQUFBLENBQUMsRUFBRSxDQUFDLEtBQUtsQztBQUFYLEtBQWpDLEVBQTBEO0FBQUVtQyxNQUFBQSxNQUFNLEVBQUU7QUFBVixLQUExRCxDQUFmO0FBRUEsUUFBSUUsU0FBUyxHQUFHekMsRUFBRSxDQUFDYyxLQUFILEdBQ1g0QixRQURXLENBQ0ZOLE1BREUsRUFDTUksUUFETixFQUVYRyxJQUZXLENBRU4sS0FBS0MsYUFGQyxFQUVjLElBRmQsQ0FBaEI7QUFJQSxXQUFPNUMsRUFBRSxDQUFDYyxLQUFILEdBQVcrQixhQUFYLENBQXlCSixTQUF6QixDQUFQO0FBQ0gsR0E3RUk7QUFnRkxHLEVBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUN2QjVDLElBQUFBLEVBQUUsQ0FBQzhDLFdBQUgsQ0FBZUMsVUFBZixDQUEwQixLQUFLdkMsU0FBL0IsRUFBMEMsS0FBMUM7QUFDSCxHQWxGSTtBQW9GTGtCLEVBQUFBLFNBcEZLLHFCQW9GS3NCLEtBcEZMLEVBb0ZZO0FBQ2IsWUFBUUEsS0FBSyxDQUFDQyxPQUFkO0FBQ0ksV0FBS2pELEVBQUUsQ0FBQ2tELEtBQUgsQ0FBU0MsR0FBVCxDQUFhQyxJQUFsQjtBQUNJLGFBQUtsQyxPQUFMLEdBQWUsSUFBZjtBQUNBbUMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWjtBQUNBOztBQUNKLFdBQUt0RCxFQUFFLENBQUNrRCxLQUFILENBQVNDLEdBQVQsQ0FBYUksS0FBbEI7QUFDSSxhQUFLcEMsUUFBTCxHQUFnQixJQUFoQjtBQUNBa0MsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksT0FBWjtBQUNBO0FBUlI7QUFVSCxHQS9GSTtBQWlHTDFCLEVBQUFBLE9BakdLLG1CQWlHR29CLEtBakdILEVBaUdVO0FBQ1gsWUFBUUEsS0FBSyxDQUFDQyxPQUFkO0FBQ0ksV0FBS2pELEVBQUUsQ0FBQ2tELEtBQUgsQ0FBU0MsR0FBVCxDQUFhQyxJQUFsQjtBQUNJLGFBQUtsQyxPQUFMLEdBQWUsS0FBZjtBQUNBOztBQUNKLFdBQUtsQixFQUFFLENBQUNrRCxLQUFILENBQVNDLEdBQVQsQ0FBYUksS0FBbEI7QUFDSSxhQUFLcEMsUUFBTCxHQUFnQixLQUFoQjtBQUNBO0FBTlI7QUFRSDtBQTFHSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICBqdW1wSGVpZ2h0OiAwLFxuICAgICAgICBqdW1wRHVyYXRpb246IDAsXG4gICAgICAgIG1heE1vdmVTcGVlZDogMCxcbiAgICAgICAgYWNjZWw6IDAsXG4gICAgICAgIGp1bXBBdWRpbzoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkF1ZGlvQ2xpcCxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBqdW1wQWN0aW9uID0gdGhpcy5ydW5KdW1wQWN0aW9uKCk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudGhlbihqdW1wQWN0aW9uKS5zdGFydCgpO1xuXG4gICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy54U3BlZWQgPSAwO1xuXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfRE9XTiwgdGhpcy5vbktleURvd24sIHRoaXMpO1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX0RPV04sIHRoaXMuS0VZX0RPV04sIHRoaXMpO1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9VUCwgdGhpcy5vbktleVVwLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLmFjY0xlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkIC09IHRoaXMuYWNjZWwgKiBkdDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54U3BlZWQpID4gdGhpcy5tYXhNb3ZlU3BlZWQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gdGhpcy5tYXhNb3ZlU3BlZWQgKiB0aGlzLnhTcGVlZCAvIE1hdGguYWJzKHRoaXMueFNwZWVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMueFNwZWVkICogZHQ7XG4gICAgfSxcblxuICAgIHJ1bkp1bXBBY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGp1bXBVcCA9IGNjLnR3ZWVuKCkuYnkodGhpcy5qdW1wRHVyYXRpb24sIHsgeTogdGhpcy5qdW1wSGVpZ2h0IH0sIHsgZWFzaW5nOiAnc2luZU91dCcgfSk7XG5cbiAgICAgICAgdmFyIGp1bXBEb3duID0gY2MudHdlZW4oKS5ieSh0aGlzLmp1bXBEdXJhdGlvbiwgeyB5OiAtdGhpcy5qdW1wSGVpZ2h0IH0sIHsgZWFzaW5nOiAnc2luZUluJyB9KTtcblxuICAgICAgICB2YXIganVtcFR3ZWVuID0gY2MudHdlZW4oKVxuICAgICAgICAgICAgLnNlcXVlbmNlKGp1bXBVcCwganVtcERvd24pXG4gICAgICAgICAgICAuY2FsbCh0aGlzLnBsYXlKdW1wU291bmQsIHRoaXMpO1xuXG4gICAgICAgIHJldHVybiBjYy50d2VlbigpLnJlcGVhdEZvcmV2ZXIoanVtcFR3ZWVuKTtcbiAgICB9LFxuXG5cbiAgICBwbGF5SnVtcFNvdW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5qdW1wQXVkaW8sIGZhbHNlKTtcbiAgICB9LFxuXG4gICAgb25LZXlEb3duKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkubGVmdDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjY0xlZnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibGVmdFwiKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnJpZ2h0OlxuICAgICAgICAgICAgICAgIHRoaXMuYWNjUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmlnaHRcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25LZXlVcChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmxlZnQ6XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5yaWdodDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cblxufSk7XG4iXX0=