/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 10:40:25
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 16:41:07
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZField.cc
 * @Description: 注释信息
 */
#include "PVZField.h"
#include "PVZTextures.h"

#include "PVZLogger.h"

extern PVZTextures *all;

namespace OCEANPVZ
{
    extern sf::Vector2f size;
    extern sf::Vector2f beginning_space;
    extern sf::Vector2f choose_character_pos;
} // namespace OCEANPVZ

void PVZField::create_frame()
{
    LOG_INFO("OCEANPVZ::size x %f  y %f", OCEANPVZ::size.x, OCEANPVZ::size.y);
    battle_field.setSize(sf::Vector2f(field_size.x * OCEANPVZ::size.x, field_size.y * OCEANPVZ::size.y));
    battle_field.setFillColor(sf::Color::Black);
    battle_field.setOutlineThickness(5);
    battle_field.setOutlineColor(sf::Color::White);
    if (field_size.y == 1)
    {
        battle_field.setPosition(OCEANPVZ::choose_character_pos);
    }
    else
    {
        battle_field.setPosition(OCEANPVZ::beginning_space);
    }
}

void PVZField::create_fields(int x, int y)
{
    bool field_color_type = true;
    sf::Texture *tex;

    rect = new sf::RectangleShape *[y];
    for (int i = 0; i < y; i++)
    {
        rect[i] = new sf::RectangleShape[x];
    }

    for (int j = 0; j < y; j++)
    {
        for (int k = 0; k < x; k++)
        {
            /* code */
            tex = field_color_type ? all->get_texture(PVZTextures::GRASS_LIGHT) : all->get_texture(PVZTextures::GRASS_DARK);
            sf::RectangleShape rectangle = create_field(tex, sf::Vector2i(k, j), field_size.y == 1);
            rect[j][k] = rectangle;
            field_color_type = !field_color_type;
        }
    }
}

sf::RectangleShape PVZField::create_field(const sf::Texture *texture, sf::Vector2i pos_on_arena, bool choose_character) const
{
    sf::RectangleShape rectangle = sf::RectangleShape();
    rectangle.setSize(OCEANPVZ::size);
    rectangle.setTexture(texture);

    sf::Vector2f pos_in_game = (choose_character ? OCEANPVZ::choose_character_pos : OCEANPVZ::beginning_space) + sf::Vector2f(pos_on_arena.x * OCEANPVZ::size.x, pos_on_arena.y * OCEANPVZ::size.y);
    rectangle.setPosition(pos_in_game);
    return rectangle;
}

PVZField::PVZField(int x, int y)
{
    field_size = sf::Vector2i(x, y);
    create_frame();
    create_fields(x, y);
}

PVZField::~PVZField()
{
}

void PVZField::display(sf::RenderWindow *window)
{
    // LOG_INFO("PVZField::display(sf::RenderWindow *window)");
    window->draw(battle_field);
    for (int y = 0; y < field_size.y; y++)
    {
        for (int x = 0; x < field_size.x; x++)
        {
            window->draw(rect[y][x]);
        }
    }
}

void PVZField::set_alpha(double percent, sf::Vector2i pos)
{
    rect[pos.y][pos.x].setScale(sf::Vector2f(percent, percent));
}
