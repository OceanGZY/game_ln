/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 19:37:18
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-29 20:07:14
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZLoadingRectangular.cc
 * @Description: 注释信息
 */
#include "PVZLoadingRectangular.h"

PVZLoadingRectangular::PVZLoadingRectangular(const sf::Texture *texture, sf::Vector2f pos)
{
    plant.setSize(OCEANPVZ::size);
    loading_bar.setSize(OCEANPVZ::size);

    plant.setTexture(texture);
    loading_bar.setFillColor(sf::Color(0, 0, 0, 128));

    plant.setPosition(pos);
    loading_bar.setPosition(pos);
}

PVZLoadingRectangular::~PVZLoadingRectangular()
{
}

void PVZLoadingRectangular::set_percent(double percent)
{
    if (!is_chosen)
    {
        loading_bar.setSize(OCEANPVZ::percentage_size(100 - percent));
    }
}

void PVZLoadingRectangular::display(sf::RenderWindow *window)
{
    window->draw(plant);
    window->draw(loading_bar);
}

void PVZLoadingRectangular::set_chosen(bool choose)
{
    is_chosen = choose;
    switch (is_chosen)
    {
    case true:
        loading_bar.setSize(OCEANPVZ::size);
        loading_bar.setFillColor(sf::Color(242, 202, 70, 128));
        break;
    case false:
        loading_bar.setSize(sf::Vector2f());
        loading_bar.setFillColor(sf::Color(0, 0, 0, 128));
        break;
    default:
        break;
    }
}
