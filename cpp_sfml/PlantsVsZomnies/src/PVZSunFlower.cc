/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:38:49
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 19:43:13
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZSunFlower.cc
 * @Description: 注释信息
 */
#include "PVZSunFlower.h"
#include "PVZTextures.h"

extern PVZTextures *all;

PVZSunFlower::PVZSunFlower(sf::Vector2i arena_pos, PVZSun *sun) : CharacterBase(3000, 0, arena_pos)
{
    this->sun = sun;
    health = 70;
    character_rect.setTexture(all->get_texture(PVZTextures::SUNFLOWER));
    tag = 2;
    last_time_used = clock();
    attack();
}

PVZSunFlower::~PVZSunFlower()
{
}

int PVZSunFlower::attack()
{
    if (can_attack())
    {
        last_time_used = clock();
        sun->add_sun(25);
    }
    return 0;
}
