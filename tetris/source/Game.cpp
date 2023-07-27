/*
 * @Author: OCEAN.GZY
 * @Date: 2023-07-27 10:43:42
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-07-27 22:58:08
 * @FilePath: /tetris/source/Game.cpp
 * @Description: 注释信息
 */
#include "Game.h"
Game::Game(/* args */)
{
}

Game::~Game()
{
}

bool Game::check()
{ // 检查是不是编写
    for (int i = 0; i < 4; i++)
    {
        if (curBlock[i].x < 0 || curBlock[i].x >= COL_COUNT || curBlock[i].y >= ROW_COUNT || curBlock[i].y <= 0 || table[curBlock[i].y][curBlock[i].x]) // 超出边界//会不会重复位置
                                                                                                                                                        // 超出边界//会不会重复位置
        {
            return false;
        }
    }
    return true;
}

void Game::moveLeftRight(int dx)
{
    for (int i = 0; i < 4; i++)
    {
        bakBlock[i] = curBlock[i]; // 备份
        curBlock[i].x += dx;
    }
    if (!check())
    {
        for (int i = 0; i < 4; i++)
        {
            curBlock[i] = bakBlock[i]; // 备份
        }
    }
}
// 1.空间换时间，把所有形态存下来
// 速度快，占用内存大
// 2.算法进行旋转
void Game::doRotate()
{
    if (blockIndex == 7)
    { // 田字形，不需要旋转
        return;
    }
    // 备份当前方块，出问题再回退
    for (int i = 0; i < 4; i++)
    {
        bakBlock[i] = curBlock[i];
    }

    Point p = curBlock[1]; // 旋转中心
    // a[i].x=p.x-a[i].y+p.x
    // a[i].y=p.y+a[i].x-p.x;
    for (int i = 0; i < 4; i++)
    {
        struct Point tmp = curBlock[i];
        curBlock[i].x = p.x - tmp.y + p.y;
        curBlock[i].y = p.y + tmp.x - p.x;
    }
    if (!check())
    {
        for (int i = 0; i < 4; i++)
        {
            curBlock[i] = bakBlock[i];
        }
    }
}
// 序号转换
void Game::keyEvent(sf::RenderWindow *window)
{                        // 按键反应
    bool rotate = false; // 是否旋转
    int dx = 0;          // 偏移量
    sf::Event e;         // 事件变量
    // pollEvent 从队列里面返回一个事件
    // 无事件 false
    while (window->pollEvent(e))
    {
        if (e.type == sf::Event::Closed) // 事件是关闭窗口
        {
            window->close();
        }
        if (e.type == sf::Event::KeyPressed)
        {
            switch (e.key.code)
            {
            case sf::Keyboard::Up:
                rotate = true;
                break;
            case sf::Keyboard::Left:
                dx = -1;
                break;
            case sf::Keyboard::Right:
                dx = 1;
                break;
            default:
                break;
            }
        }
        // 一直下降
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Down))
        {
            delay = SPEED_QUICK; // 快速
        }

        if (dx != 0)
        {
            moveLeftRight(dx);
        }

        // 旋转操作
        if (rotate)
        {
            doRotate();
        }
    }
}

void Game::newBlock()
{ // 生成方块

    // 随机生成
    blockIndex = 1 + rand() % 7;
    int n = blockIndex - 1;
    for (int i = 0; i < 4; i++)
    {
        curBlock[i].x = blocks[n][i] % 2;
        curBlock[i].y = blocks[n][i] / 2;
    }
}

void Game::drawBlocks(sf::RenderWindow *window, sf::Sprite *spriteBlock)
{
    // 绘制已降落完毕的方块
    for (int i = 0; i < ROW_COUNT; i++)
        for (int j = 0; j < COL_COUNT; j++)
        {
            if (table[i][j] == 0)
                continue;
            spriteBlock->setTextureRect(sf::IntRect(table[i][j] * 18, 0, 18, 18));
            spriteBlock->setPosition(j * 18, i * 18);
            spriteBlock->move(28, 31); // 调整边框位置
            window->draw(*spriteBlock);
        }
    // 绘制当前方块
    for (int i = 0; i < 4; i++)
    {
        spriteBlock->setTextureRect(sf::IntRect(blockIndex * 18, 0, 18, 18));
        spriteBlock->setPosition(curBlock[i].x * 18, curBlock[i].y * 18); // 用其切割一个小方块
        spriteBlock->move(28, 31);                                        // 调整边框位置
        window->draw(*spriteBlock);
    }
}
void Game::drop()
{
    // y坐标加一就可以
    for (int i = 0; i < 4; i++)
    {
        bakBlock[i] = curBlock[i];
        curBlock[i].y += 1;
    }
    // 不能穿过地上
    if (check() == false)
    {
        // 固定处理
        for (int i = 0; i < 4; i++)
        {
            table[bakBlock[i].y][bakBlock[i].x] = blockIndex;
        }
        // 产生新方块
        newBlock();
    }
}
void Game::clearLine()
{
    int k = ROW_COUNT - 1; // 重新写方块
    for (int i = ROW_COUNT - 1; i > 0; i--)
    {
        int count = 0;
        for (int j = 0; j < COL_COUNT; j++)
        {
            if (table[i][j])
            {
                count++;
            }
            table[k][j] = table[i][j]; // 一遍统计一边写一编
        }
        if (count < COL_COUNT)
        {
            k--; // 拿去覆盖
        }
        else
        {
            score += 10;
            sou.play(); // 放消除音效
        }
    }
    // 显示分数
    char tmp[16];
    sprintf(tmp, "%d", score);
    textScore.setString(tmp);
}
void Game::initScore()
{
    if (!font.loadFromFile("assets/Sansation.ttf"))
    {
        exit(1);
    }

    textScore.setFont(font);                  // font is a sf::Font
    textScore.setCharacterSize(30);           // set the character size
    textScore.setFillColor(sf::Color::Black); // set the color
    textScore.setStyle(sf::Text::Bold);       // set the text style
    textScore.setPosition(255, 175);
    textScore.setString("0");
}