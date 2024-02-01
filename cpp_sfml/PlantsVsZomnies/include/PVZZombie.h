/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-31 22:02:11
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 22:38:32
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZZombie.h
 * @Description: 注释信息
 */
#pragma once

#include "SFML/Graphics.hpp"
#include "CharacterBase.h"

class PVZZombie : public CharacterBase
{
private:
    bool on_plant = false;

public:
    PVZZombie(int i, int amount);
    ~PVZZombie();

    bool operator<(const PVZZombie &other_zombie) const;
    void move();

    bool was_hit_and_check_ifdied(int damage, bool stepped_on_plant);

    void set_on_plant(bool is_on);
    bool is_on_plant();
};
