/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:52:57
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 20:49:19
 * @FilePath: \cpp_sfml\PlantsVsZomnies\include\PVZPotato.h
 * @Description: 注释信息
 */
#pragma once

#include "CharacterBase.h"

class PVZPotato : public CharacterBase
{
private:
    /* data */
public:
    PVZPotato(sf::Vector2i arena_pos);
    ~PVZPotato();

    int attack();
};
