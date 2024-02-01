/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-31 22:39:31
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-01 19:32:46
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZZombie.cc
 * @Description: 注释信息
 */
#include "PVZZombie.h"
#include "PVZTextures.h"
#include "PVZLogger.h"

extern PVZTextures *all;

namespace OCEANPVZ
{
    extern sf::Vector2f size;
    extern sf::Vector2f beginning_space;
} // namespace OCEANPVZ

PVZZombie::PVZZombie(int i, int amount) : CharacterBase(1500, -26, sf::Vector2i())
{
    health = 100;

    character_rect.setSize(OCEANPVZ::size);
    character_rect.setTexture(all->get_texture(PVZTextures::ZOMBIE));

    sf::Vector2i pos_on_arena(9, i);

    int range_of_distance_behind_previous_zombie = rand() % 15 + 5;
    sf::Vector2f pos_in_game = OCEANPVZ::beginning_space + sf::Vector2f(pos_on_arena.x * OCEANPVZ::size.x, pos_on_arena.y * OCEANPVZ::size.y);
    pos_in_game.x += amount * range_of_distance_behind_previous_zombie;

    character_rect.setPosition(pos_in_game);
}

PVZZombie::~PVZZombie()
{
}

bool PVZZombie::operator<(const PVZZombie &other_zombie) const
{
    return character_rect.getPosition().x < other_zombie.character_rect.getPosition().x;
}

void PVZZombie::move()
{
    // LOG_INFO("PVZZombie::move()");
    if (!on_plant)
    {
        character_rect.move(-0.1, 0);
    }
}

bool PVZZombie::was_hit_and_check_ifdied(int damage, bool stepped_on_plant)
{
    set_on_plant(stepped_on_plant);

    health += damage;
    if (health < 0)
    {
        return true;
    }

    return false;
}

void PVZZombie::set_on_plant(bool is_on)
{
    on_plant = is_on;
}

bool PVZZombie::is_on_plant()
{
    return on_plant;
}
