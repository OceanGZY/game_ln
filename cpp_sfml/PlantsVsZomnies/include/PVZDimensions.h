/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 16:57:43
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-29 20:05:33
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZDimensions.h
 * @Description: 注释信息
 */
#pragma once

// 尺寸

#include "SFML/Graphics.hpp"

namespace OCEANPVZ
{
    sf::Vector2i default_size = sf::Vector2i(1700, 800);
    float scale = 1;
    sf::Vector2i current_size = sf::Vector2i(default_size.x * scale, default_size.y *scale);

    sf::Vector2f size = sf::Vector2f(60, 80) * scale;
    sf::Vector2f beginning_space = sf::Vector2f(80, 160) * scale;
    sf::Vector2f choose_character_pos = sf::Vector2f(80, 40);

    static sf::Vector2f percentage_size(int percent)
    {
        double percentage_height = (percent * size.y) * scale;
        return sf::Vector2f(size.x, percentage_height);
    }
} // namespace name