#pragma once

#include "CharacterBase.h"
#include "PVZSun.h"

class PVZSunFlower : public CharacterBase
{
private:
    PVZSun *sun;

public:
    PVZSunFlower(sf::Vector2i arena_pos, PVZSun *sun);
    ~PVZSunFlower();

    int attack();
};
