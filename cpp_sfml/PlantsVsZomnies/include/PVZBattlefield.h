/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 19:52:06
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 14:36:40
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZBattlefield.h
 * @Description: 注释信息
 */
#pragma once

// #include "PVZDimensions.h"
#include "PVZCollisionDetector.h"
#include "PVZArena.h"

class PVZBattlefield
{
private:
    PVZArena *arena;

    sf::Vector2i pos;
    int wave = 0;
    const int MAX_WAVE = 5;

    void display(sf::RenderWindow *window);

public:
    PVZBattlefield(/* args */);
    ~PVZBattlefield();

    void next_frame(sf::RenderWindow *window);

    void mouse_button_pressed(sf::RenderWindow *window);

    void mouse_button_released(sf::RenderWindow *window);
};
