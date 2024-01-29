/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 19:52:06
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-29 23:46:58
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZBattlefield.h
 * @Description: 注释信息
 */
#pragma once

// #include "PVZDimensions.h"
#include "PVZCollisionDetector.h"

class PVZBattlefield
{
private:
    /* data */
public:
    PVZBattlefield(/* args */);
    ~PVZBattlefield();

    void next_frame(sf::RenderWindow *window);

    void mouse_button_pressed(sf::RenderWindow *window);

    void mouse_button_released(sf::RenderWindow *window);
};
