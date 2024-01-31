/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-31 16:22:48
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 17:10:37
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZSun.h
 * @Description: 注释信息
 */
#pragma once

#include "SFML/Graphics.hpp"

class PVZSun
{
private:
    sf::Text amount_of_sun;
    sf::Font font;

    int quantity = 100;

    std::string sunstr;

public:
    PVZSun(/* args */);
    ~PVZSun();

    void display(sf::RenderWindow *window);
    void add_sun(int quantity);

    int get_quantity();

    void reduce_sun(int quantity);
};