/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-31 16:32:17
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 17:41:46
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZBattlefield.cc
 * @Description: 注释信息
 */
#include "PVZBattlefield.h"

void PVZBattlefield::display(sf::RenderWindow *window)
{
    arena->next_frame(window);

    choose_character->display(window);
}

void PVZBattlefield::collisions()
{
}

void PVZBattlefield::move_zombies()
{
}

PVZBattlefield::PVZBattlefield()
{
    sun = new PVZSun();
    arena = new PVZArena(sun);
    choose_character = new PVZChooseCharacter(sun);
    plant_type = PVZArena::NONE;
    pos = sf::Vector2i(-1, -1);
}

PVZBattlefield::~PVZBattlefield()
{
}

void PVZBattlefield::next_frame(sf::RenderWindow *window)
{
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

    if (plant_type == PVZArena::PVZPlantType::NONE && on_area_pos == sf::Vector2i(-1, -1))
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
