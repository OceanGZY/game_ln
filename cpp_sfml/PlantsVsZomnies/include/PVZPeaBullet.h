/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 20:53:42
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 21:15:37
 * @FilePath: \cpp_sfml\PlantsVsZomnies\include\PVZPeaBullet.h
 * @Description: 注释信息
 */
#pragma once

#include "SFML/Graphics.hpp"
#include <iostream>

class PVZPeaBullet
{
private:
    sf::CircleShape bullet;
    sf::Vector2f start_pos;

    void restart_ifistofar();
    void set_start_pos();

public:
    PVZPeaBullet(sf::Vector2i arena_pos);
    ~PVZPeaBullet();

    void display(sf::RenderWindow *window);
    void move();
    sf::FloatRect return_float_rect();
};