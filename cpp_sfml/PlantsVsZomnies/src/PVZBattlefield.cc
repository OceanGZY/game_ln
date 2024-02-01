/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-31 16:32:17
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-01 19:34:16
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZBattlefield.cc
 * @Description: 注释信息
 */
#include "PVZBattlefield.h"
#include "PVZLogger.h"

void PVZBattlefield::display(sf::RenderWindow *window)
{
    arena->next_frame(window);

    if (zombies_bunch->display_and_check_if_alldied(window) && wave < MAX_WAVE)
    {

        delete zombies_bunch;
        // wave++;
        zombies_bunch = new PVZZombieBunch(wave);
        zombies_bunch->display_and_check_if_alldied(window);
    }

    choose_character->display(window);
}

void PVZBattlefield::collisions()
{
}

void PVZBattlefield::move_zombies()
{
    // LOG_INFO("PVZBattlefield::move_zombies()");
    zombies_bunch->move();
}

PVZBattlefield::PVZBattlefield()
{
    sun = new PVZSun();
    arena = new PVZArena(sun);
    choose_character = new PVZChooseCharacter(sun);
    zombies_bunch = new PVZZombieBunch(wave);
    // LOG_INFO("PVZBattlefield::PVZBattlefield() ->zombies_bunch初始化啦");
    

    plant_type = PVZArena::NONE;
    pos = sf::Vector2i(-1, -1);
}

PVZBattlefield::~PVZBattlefield()
{
}

void PVZBattlefield::next_frame(sf::RenderWindow *window)
{
    move_zombies();
    display(window);
}

void PVZBattlefield::mouse_button_pressed(sf::RenderWindow *window)
{
    pos = PVZCollisionDetector::check_if_mouse_inside_choose(window);
    sf::Vector2i on_area_pos = PVZCollisionDetector::check_if_mouse_inside_field(window);

    plant_type = on_area_pos == sf::Vector2i(-1, -1) ? choose_character->return_plant_type_ifpossible(pos) : plant_type;

    if (plant_type == PVZArena::PVZPlantType::NONE && on_area_pos == sf::Vector2i(-1, -1))
    {
        choose_character->clear_selection();
        pos = sf::Vector2i(-1, -1);
    }
}

void PVZBattlefield::mouse_button_released(sf::RenderWindow *window)
{
    sf::Vector2i on_area_pos = PVZCollisionDetector::check_if_mouse_inside_field(window);

    if (plant_type != PVZArena::PVZPlantType::NONE && on_area_pos != sf::Vector2i(-1, -1))
    {
        if (arena->create_character(plant_type, on_area_pos))
        {
            int cost_of_plant = choose_character->return_cost(plant_type);
            sun->reduce_sun(cost_of_plant);

            plant_type = PVZArena::PVZPlantType::NONE;
            pos = sf::Vector2i(-1, -1);
        }
    }
}
