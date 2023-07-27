/*
 * @Author: OCEAN.GZY
 * @Date: 2023-07-26 23:58:00
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-07-27 23:01:03
 * @FilePath: /tetris/main.cpp
 * @Description: 注释信息
 */
#include "Game.h"
#include <time.h> //处理时间文件

int main()
{

    // 游戏背景音
    sf::Music music;
    if (!music.openFromFile("assets/bg2.wav"))
    {
        return -1;
    }
    music.setLoop(true); // 循环播放
    music.play();

    sf::SoundBuffer xiaochu;
    if (!xiaochu.loadFromFile("assets/bg.wav"))
    {
        return -1;
    }

    srand(time(0));                                               // 用当前时间生成随机种子
    sf::RenderWindow window(sf::VideoMode(320, 416), "SQTetris"); // 创建窗口

    sf::Texture bg; // 加载背景图片
    bg.loadFromFile("assets/bg.jpeg");
    sf::Sprite spriteBg(bg); // 根据图片创造对象

    sf::Texture tile; // 加小方块图片
    tile.loadFromFile("assets/tiles.png");
    sf::Sprite spriteBlock(tile); // 根据图片创造对象

    sf::Texture bk; // 加小方块图片
    bk.loadFromFile("assets/bk.png");
    sf::Sprite spriteFrame(bk); // 根据图片创造对象
    // window.draw(spriteBg);
    // window.display();//

    Game *game = new Game();
    game->initScore();

    // 生成方块
    game->newBlock();
    // 设置计时器
    sf::Clock clock;
    float timer = 0;

    // 进入游戏循环
    // 进入游戏
    while (window.isOpen())
    { // 如果窗口没有被关闭

        // 启动到现在的时间
        float time = clock.getElapsedTime().asSeconds();
        clock.restart();
        timer += time;

        // 等待用户按键
        game->keyEvent(&window); // 左右移动和旋转

        if (timer > game->delay)
        {
            // 降落
            game->drop(); // 下降一个位置
            timer = 0;
        }
        for (int i = 0; i < 10; i++)
        {
            if (game->table[0][i] || game->table[1][0] || game->table[1][1] || game->table[2][0] || game->table[2][1] || game->table[3][0] || game->table[3][1])
            {
                printf("游戏结束，最终得分为%d\n", game->score);
                system("pause");
                return -1;
            }
        }
        // 消分处理
        game->clearLine();
        game->delay = game->SPEED_NORMAL; // 速度还原
        window.draw(spriteBg);
        window.draw(spriteFrame);
        // 绘制方块，绘制游戏
        game->drawBlocks(&window, &spriteBlock);
        // 渲染方块
        window.draw(game->textScore); // 显示分数
        window.display();             //
    }
    system("pause");
    return 0;
}