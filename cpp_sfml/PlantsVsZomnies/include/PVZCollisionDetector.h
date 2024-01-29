#pragma once

// 碰撞检测

#include "SFML/Graphics.hpp"
// #include "PVZDimensions.h"

class PVZCollisionDetector
{
private:
    /* data */
public:
    PVZCollisionDetector(/* args */);
    ~PVZCollisionDetector();

    // 地面 与 僵尸的碰撞
    static bool test_collision(sf::FloatRect field, sf::FloatRect zombie);

    // pos点在 竞技场上的位置
    static sf::Vector2i return_position_on_arena(sf::Vector2f pos);

    // 鼠标是否在选择区域
    static sf::Vector2i check_if_mouse_inside_choose(sf::RenderWindow *window);

    // 鼠标是否在地面上
    static sf::Vector2i check_if_mouse_inside_field(sf::RenderWindow *window);
};
