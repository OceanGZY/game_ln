#pragma once

#include "SFML/Graphics.hpp"
#include <ctime>

#include "PVZField.h"
#include "PVZSun.h"
#include "CharacterBase.h"
#include "PVZLoadingRectangular.h"
#include "PVZArena.h"

#include "PVZTextures.h"
extern PVZTextures *all;

class PVZChooseCharacter
{
private:
    PVZField *field;
    PVZLoadingRectangular *choose_rect[4];
    PVZSun *sun;

    const sf::Texture *character_textures[4] = {
        all->get_texture(PVZTextures::PEA),
        all->get_texture(PVZTextures::SUNFLOWER),
        all->get_texture(PVZTextures::NUT),
        all->get_texture(PVZTextures::POTATO_ACT)};

    const int cost[4] = {100, 50, 150, 200};
    const int wait_time[4] = {2500, 1500, 6000, 3000};
    int last_time_used[4];

    bool time_condition(int index);
    bool sun_condition(int index);

public:
    PVZChooseCharacter(PVZSun *sun);
    ~PVZChooseCharacter();

    void display(sf::RenderWindow *window);

    PVZArena::PlantType return_plant_type_ifpossible(sf::Vector2i pos);
};
