/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:52:44
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 19:55:57
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZNut.h
 * @Description: 注释信息
 */
#pragma once

#include "CharacterBase.h"

class PVZNut : public CharacterBase
{
private:
    /* data */
public:
    PVZNut(sf::Vector2i arena_pos);
    ~PVZNut();
};
