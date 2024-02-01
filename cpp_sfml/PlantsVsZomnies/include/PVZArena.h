/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-31 16:32:17
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 23:23:01
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZArena.h
 * @Description: 注释信息
 */
#pragma once

#include "SFML/Graphics.hpp"
#include "PVZField.h"
#include "PVZCollisionDetector.h"
#include "PVZSun.h"
#include "PVZNut.h"
#include "PVZPea.h"
#include "PVZPotato.h"
#include "PVZSunFlower.h"

#include <vector>

class PVZArena
{
private:
    PVZField *field;

    CharacterBase *plants[5][9];
    PVZSun *sun;

    void set_plant_field_tonull();
    void display_plant_and_attack(sf::RenderWindow *window);

    void delete_character(sf::Vector2i pos);

public:
    enum PVZPlantType
    {
        PEA,
        SUNFLOWER,
        NUT,
        POTATO,
        NONE
    };

    PVZArena(PVZSun *sun);
    ~PVZArena();

    void next_frame(sf::RenderWindow *window);

    bool create_character(PVZPlantType type, sf::Vector2i pos);

    std::vector<CharacterBase *> return_row_of_plants(int row);

    void update_plants_row(std::vector<CharacterBase *> plants_row, int row);

    sf::FloatRect get_bounds_of_character(sf::Vector2i pos);

    bool is_there_character(sf::Vector2i pos);
};
