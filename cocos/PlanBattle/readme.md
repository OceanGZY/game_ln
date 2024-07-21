
【3D渲2D】-自制太空🚀飞机大战小游戏-基础Demo版-源码！

> ©️OceanCheese

## 开发环境
- 引擎版本：Cocos Creator 3.8.2
- 编程语言：TypeScript

## 已适配平台

| H5  | 微信小游戏 | Android原生 | iOS原生 |
| --- | ---------- | ----------- | ------- |
| ✔   | ✔          | ✔           | ✔       |

本资源仅支持测试通过平台，其他平台不做默认支持，请自行适配。


## 功能特点
- 【3D渲2D】-自制太空🚀飞机大战小游戏-基础Demo版-源码！
- **玩家Player**：自动开火，根据touch屏幕位置来进行上下左右移动；
  -  血量控制，被敌人击中掉血； 血条显示比例；血量低于0则玩家死亡，播放爆炸效果和音效
- **敌人Enemy**：自动开火，指定范围内随机生成，自动向玩家移动
  -  血量控制，被玩家击中掉血； 血量低于0则敌人死亡，播放爆炸效果和音效
- **得分机制**：击杀一个敌人+10分
- **音乐/音效**：增加背景音乐、开火音效、死亡爆炸
- **增加shader控制**：被子弹击中会快速闪白
- **全局游戏状态机制**：全局保存处理游戏的关卡信息、状态


## 使用教程

- 项目目录
  - assets/model:模型目录，包括背景、敌人、玩家、shader
  - assets/resources:
    - prefabs:预制体目录
      - bullet:子弹预制体，包括敌人子弹和玩家子弹
      - enemy:敌人预制体
      - player:玩家预制体
      - level:关卡预制体
      - explode:爆炸特效预制体
    - audio:背景音乐和音效目录
  - assets/scenes:场景目录
   - 游戏主场景Main.scene【入口】
  - assets/scripts:脚本目录
   - global:全局游戏状态
   - enemy:敌人相关脚本
   - player:玩家相关脚本
   - manager:游戏mananger、声音manager控制
   - ui:ui界面展示/操作/交互的逻辑代码

- 启动项目，试运行游戏
  - 双击assets/scenes目录下Main.scene
  - 再点击引擎顶部中间的 “播放按钮”



## 联系作者
- QQ/微信：1450136519
- 公众号：![qrcode_for_gh_a8348049d2f8_258.jpg](https://download.cocos.com/CocosStore/resource/c9e56b599c46450db262066207890829/c9e56b599c46450db262066207890829.jpg)

## 版权声明
自制2D无尽跑酷Demo

## 更新声明
- 1.0.0
  - 【3D渲2D】-自制太空🚀飞机大战小游戏-基础Demo版-源码！
  - **玩家Player**：自动开火，根据touch屏幕位置来进行上下左右移动；
    -  血量控制，被敌人击中掉血； 血条显示比例；血量低于0则玩家死亡，播放爆炸效果和音效
  - **敌人Enemy**：自动开火，指定范围内随机生成，自动向玩家移动
    -  血量控制，被玩家击中掉血； 血量低于0则敌人死亡，播放爆炸效果和音效
  - **得分机制**：击杀一个敌人+10分
  - **音乐/音效**：增加背景音乐、开火音效、死亡爆炸
  - **增加shader控制**：被子弹击中会快速闪白
  - **全局游戏状态机制**：全局保存处理游戏的关卡信息、状态

## 其他作品

##### [枪火](https://store.cocos.com/app/detail/6016)
![image.png](https://download.cocos.com/CocosStore/resource/b14c9566cd5b47e0a5628a76bc7f02be/b14c9566cd5b47e0a5628a76bc7f02be.png)

## 购买须知
本产品为付费虚拟商品，一经购买成功概不退款，请支付前谨慎确认购买内容。