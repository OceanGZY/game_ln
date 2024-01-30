/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:54:22
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 19:57:51
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZNut.cc
 * @Description: 注释信息
 */
#include "PVZNut.h"
#include "PVZTextures.h"
extern PVZTextures *all;

PVZNut::PVZNut(sf::Vector2i arena_pos) : CharacterBase(0, 0, arena_pos)
{
    health = 1500;
    character_rect.setTexture(all->get_texture(PVZTextures::NUT));
    tag = 3;
    last_time_used = clock();
}

PVZNut::~PVZNut()
{
}
