/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:09:33
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 19:15:57
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZSun.cc
 * @Description: 注释信息
 */
#include "PVZSun.h"

namespace OCEANPVZ
{
    extern sf::Vector2f beginning_space;
} // namespace OCEANPVZ

PVZSun::PVZSun()
{
    if (font.loadFromFile("./resources/fonts/arial.ttf"))
    {
        exit(EXIT_FAILURE);
    }

    amount_of_sun.setFont(font);
    amount_of_sun.setPosition(sf::Vector2f(6 * OCEANPVZ::beginning_space.x, OCEANPVZ::beginning_space.y / 4));
    amount_of_sun.setString(std::to_string(quantity));
    amount_of_sun.setCharacterSize(50);
}

PVZSun::~PVZSun()
{
}

void PVZSun::display(sf::RenderWindow *window)
{
    amount_of_sun.setString(std::to_string(quantity));
    window->draw(amount_of_sun);
}

void PVZSun::add_sun(int quantity)
{
    this->quantity += quantity;
}

int PVZSun::get_quantity()
{
    return quantity;
}

void PVZSun::reduce_sun(int quantity)
{
    this->quantity -= quantity;
}
