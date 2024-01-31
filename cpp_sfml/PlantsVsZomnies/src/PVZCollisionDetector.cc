/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 17:13:25
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-29 23:40:34
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZCollisionDetector.cc
 * @Description: 注释信息
 */
#include "PVZCollisionDetector.h"

namespace OCEANPVZ
{
    extern sf::Vector2f beginning_space;
    extern sf::Vector2f size;
    extern sf::Vector2f choose_character_pos;
} // namespace name

PVZCollisionDetector::PVZCollisionDetector()
{
}

PVZCollisionDetector::~PVZCollisionDetector()
{
}

bool PVZCollisionDetector::test_collision(sf::FloatRect field, sf::FloatRect zombie)
{
    // intersects相交
    if (field.intersects(zombie))
    {
        return true;
    }
    return false;
}

sf::Vector2i PVZCollisionDetector::return_position_on_arena(sf::Vector2f pos)
{
    sf::Vector2i postion_on_arena = (sf::Vector2i)(pos - OCEANPVZ::beginning_space);

    postion_on_arena = sf::Vector2i(postion_on_arena.x / OCEANPVZ::size.x, postion_on_arena.y / OCEANPVZ::size.y);
    return postion_on_arena;
}

sf::Vector2i PVZCollisionDetector::check_if_mouse_inside_choose(sf::RenderWindow *window)
{
    sf::Vector2f mouse = (sf::Vector2f)sf::Mouse::getPosition(*window) - OCEANPVZ::choose_character_pos;
    sf::Vector2f pos = sf::Vector2f(mouse.x / OCEANPVZ::size.x, mouse.y / OCEANPVZ::size.y);
    if ((pos.x < 4 && pos.y < 1) && (mouse.x >= 0 && mouse.y >= 0))
    {
        return sf::Vector2i(pos.x, pos.y);
    }
    return sf::Vector2i(-1, -1);
}

sf::Vector2i PVZCollisionDetector::check_if_mouse_inside_field(sf::RenderWindow *window)
{
    sf::Vector2f mouse = (sf::Vector2f)sf::Mouse::getPosition(*window) - OCEANPVZ::choose_character_pos;
    sf::Vector2f pos = sf::Vector2f(mouse.x / OCEANPVZ::size.x, mouse.y / OCEANPVZ::size.y);
    if ((pos.x < 9 && pos.y < 5) && (mouse.x >= 0 && mouse.y >= 0))
    {
        return sf::Vector2i(pos.x, pos.y);
    }
    return sf::Vector2i(-1, -1);
}
