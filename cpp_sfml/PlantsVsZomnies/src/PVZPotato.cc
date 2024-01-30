/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:54:52
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 22:21:08
 * @FilePath: \cpp_sfml\PlantsVsZomnies\src\PVZPotato.cc
 * @Description: 注释信息
 */
#include "PVZPotato.h"
#include "PVZTextures.h"

#include "PVZLogger.h"

extern PVZTextures *all;

PVZPotato::PVZPotato(sf::Vector2i arena_pos) : CharacterBase(5000, -90, arena_pos)
{
    health = 100;

    character_rect.setTexture(all->get_texture(PVZTextures::POTATO_NO_ACT));

    tag = 4;

    last_time_used = clock();

    attack();

    LOG_INFO("PVZPotato构造的时候，damage是：%d", damage);
}

PVZPotato::~PVZPotato()
{
}

int PVZPotato::attack()
{
    if (can_attack())
    {
        character_rect.setTexture(all->get_texture(PVZTextures::POTATO_ACT));
        last_time_used = clock();
        damage = -90;
    }
    return damage;
}