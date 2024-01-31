/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 23:44:47
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 16:53:27
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZDimensions.cc
 * @Description: 注释信息
 */

#include "SFML/Graphics.hpp"
#include "PVZTextures.h"

PVZTextures *all = new PVZTextures();

namespace OCEANPVZ
{
    sf::Vector2i default_size = sf::Vector2i(910, 555);
    float scale = 1;
    sf::Vector2i current_size = sf::Vector2i(default_size.x * scale, default_size.y *scale);

    sf::Vector2f size = sf::Vector2f(90, 90) * scale;
    sf::Vector2f beginning_space = sf::Vector2f(95, 100) * scale;
    sf::Vector2f choose_character_pos = sf::Vector2f(95, 5);

    sf::Vector2f percentage_size(int percent)
    {
        double percentage_height = (percent * size.y) * scale;
        return sf::Vector2f(size.x, percentage_height);
    }
} // namespace name