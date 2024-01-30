/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:17:59
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 19:36:06
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/CharacterBase.cc
 * @Description: 注释信息
 */
#include "CharacterBase.h"

namespace OCEANPVZ
{
    extern sf::Vector2f size;
    extern sf::Vector2f beginning_space;
} // namespace OCEANPVZ

bool CharacterBase::can_attack()
{
    int current_time = clock();
    return current_time - last_time_used > activate_time;
}

CharacterBase::CharacterBase() : activate_time(0), damage(0)
{
    character_rect.setSize(OCEANPVZ::size);
}

CharacterBase::~CharacterBase()
{
}

CharacterBase::CharacterBase(int act_time, int damage, sf::Vector2i pos) : activate_time(act_time), damage(damage)
{
    character_rect.setSize(OCEANPVZ::size);
    sf::Vector2f pos_on_arena = OCEANPVZ::beginning_space + sf::Vector2f(pos.x * OCEANPVZ::size.x, pos.y * OCEANPVZ::size.y);
    arena_pos = pos;
    character_rect.setPosition(pos_on_arena);
}

int CharacterBase::attack()
{
    if (can_attack())
    {
        last_time_used = clock();
        return damage;
    }

    return 0;
}

bool CharacterBase::was_hit_and_check_ifdied(int damage)
{
    health -= damage;
    if (health < 0)
    {
        return true;
    }
    return false;
}

void CharacterBase::move()
{
}

void CharacterBase::display(sf::RenderWindow *window)
{
    window->draw(character_rect);
}

sf::FloatRect CharacterBase::return_float_rect()
{
    return character_rect.getGlobalBounds();
}

sf::Vector2f CharacterBase::return_position()
{
    return character_rect.getPosition();
}
