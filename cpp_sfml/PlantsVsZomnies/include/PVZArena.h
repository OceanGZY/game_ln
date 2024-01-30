#pragma once

#include "SFML/Graphics.hpp"
#include "PVZField.h"
#include "PVZTextures.h"
#include "PVZCollisionDetector.h"
#include "PVZSun.h"
#include "PVZNut.h"
#include "PVZPea.h"
#include "PVZPotato.h"
#include "PVZSunFlower.h"

extern PVZTextures *all;

class PVZArena
{
private:
    PVZField *field;
    void set_plant_field_tonull();
    void display_plant_and_attack();

public:
    PVZArena(/* args */);
    ~PVZArena();

    void next_frame(sf::RenderWindow *window);
};
