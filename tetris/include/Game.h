/*
 * @Author: OCEAN.GZY
 * @Date: 2023-07-27 10:43:37
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-07-27 22:57:37
 * @FilePath: /tetris/include/Game.h
 * @Description: 注释信息
 */

#ifndef __GAME_H__
#define __GAME_H__

#include <SFML/Graphics.hpp> //处理图像的头文件
#include <SFML/Audio.hpp>    //处理声音文件

struct Point
{ // 俄罗斯方块的表示（都是4小块的）位置不断发生变化

    int x;
    int y;
};
class Game
{
private:
    /* data */
public:
    Game(/* args */);
    ~Game();
    bool check();
    void moveLeftRight(int dx);
    void doRotate();
    void keyEvent(sf::RenderWindow *window);
    void newBlock();
    void drawBlocks(sf::RenderWindow *window, sf::Sprite *spriteBlock);
    void drop();
    void clearLine();
    void initScore();

public:
    // 旋转，消除，加分，音乐
    const int ROW_COUNT = 20;
    const int COL_COUNT = 10;
    // 下降速度
    const float SPEED_NORMAL = 0.3;
    const float SPEED_QUICK = 0.05;
    float delay = SPEED_NORMAL;

    int blockIndex; // 当前方块的种类

    int table[20][10] = {0}; // 游戏区域的表示
    // 若table[i][j]=0则下标为ij的空白，并用值表示颜色取值

    sf::Sound sou; // 消除声音显示
    // 得分显示
    sf::Font font;
    sf::Text textScore;
    int score = 0;

    Point curBlock[4];
    Point bakBlock[4]; // 设置一个备份block

    int blocks[7][4] = {
        // 定义七种方块的数组
        {1, 3, 5, 7}, // I
        {2, 4, 5, 7}, // Z
        {3, 5, 4, 6}, // Z
        {3, 5, 4, 7}, // T
        {2, 3, 5, 7}, // L
        {3, 5, 7, 6}, // J
        {2, 3, 4, 5}  // 田
    };
};

#endif