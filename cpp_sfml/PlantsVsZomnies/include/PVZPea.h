/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 20:35:50
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 21:46:02
 * @FilePath: \cpp_sfml\PlantsVsZomnies\include\PVZPea.h
 * @Description: 注释信息
 */
#pragma once

#include "CharacterBase.h"
#include "PVZPeaBullet.h"

class PVZPea : public CharacterBase
{
private:
    PVZPeaBullet *bullet;

public:
    PVZPea(sf::Vector2i arena_pos);
    ~PVZPea();

    void display(sf::RenderWindow *window);
    int attack();

    sf::FloatRect return_bullet_flaot_rect();
    void remove_bullet();
};
