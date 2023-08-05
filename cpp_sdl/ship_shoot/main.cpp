/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 19:44:07
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 22:06:52
 * @FilePath: /demo02/main.cpp
 * @Description: 注释信息
 */
#include "Game.h"

int main(int argc, char **argv)
{
    Game game;
    bool success = game.Init();
    if (success)
        game.Run();
    game.Shutdown();
    return 0;
}