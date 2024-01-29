/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 16:20:45
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-29 20:02:43
 * @FilePath: /cpp_sfml/PlantsVsZomnies/main.cc
 * @Description: 注释信息
 */

#include "./include/GameLoop.h"

int main()
{
    GameLoop *game = new GameLoop();
    game->run();
    return 0;
}