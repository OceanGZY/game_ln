/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 10:39:56
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 10:44:54
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZField.h
 * @Description: 注释信息
 */
#pragma once

#include "SFML/Graphics.hpp"

class PVZField
{
private:
    sf::RectangleShape **rect;

    sf::RectangleShape battle_field;

    sf::Vector2i field_size;

    void create_frame();

    void create_fields(int x, int y);

    sf::RectangleShape create_field(const sf::Texture *texture, sf::Vector2i pos_on_arena, bool choose_character = false) const;

public:
    PVZField(int x, int y);
    ~PVZField();

    void display(sf::RenderWindow *window);

    void set_alpha(double percent, sf::Vector2i pos);
};
