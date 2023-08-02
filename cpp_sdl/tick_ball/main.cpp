/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 16:02:30
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-02 18:04:22
 * @FilePath: /cpp_sdl/tick_ball/main.cpp
 * @Description: 注释信息
 */
#include <iostream>
#include "src/Game.h"
int main()
{
    std::cout << "Hello World!" << std::endl;
    Game game;
    bool succes = game.init();
    if (succes)
    {
        std::cout << "游戏开始" << std::endl;
        game.run();
    }
    game.shutdown();
    std::cout << "游戏结束" << std::endl;
    return 0;
}