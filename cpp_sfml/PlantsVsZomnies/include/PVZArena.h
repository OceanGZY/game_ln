#pragma once

#include "SFML/Graphics.hpp"
#include "PVZField.h"
#include "PVZTextures.h"
#include "PVZCollisionDetector.h"

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

    void next_frame(sf::RenderWindow * window);
};
