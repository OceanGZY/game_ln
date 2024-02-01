/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 19:52:06
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 23:23:38
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZBattlefield.h
 * @Description: 注释信息
 */
#pragma once

// #include "PVZDimensions.h"
#include "PVZCollisionDetector.h"
#include "PVZArena.h"
#include "PVZChooseCharacter.h"
#include "PVZSun.h"
#include "PVZZombieBunch.h"

class PVZBattlefield
{
private:
    PVZArena *arena;
    PVZChooseCharacter *choose_character;
    PVZSun *sun;
    PVZZombieBunch *zombies_bunch;

    PVZArena::PVZPlantType plant_type;

    sf::Vector2i pos;
    int wave = 0;
    const int MAX_WAVE = 5;

    void display(sf::RenderWindow *window);

    void move_zombies();
    void collisions();

public:
    PVZBattlefield(/* args */);
    ~PVZBattlefield();

    void next_frame(sf::RenderWindow *window);

    void mouse_button_pressed(sf::RenderWindow *window);

    void mouse_button_released(sf::RenderWindow *window);
};
