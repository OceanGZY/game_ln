/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 11:19:43
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 16:33:05
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZArena.cc
 * @Description: 注释信息
 */
#include "PVZArena.h"
#include "PVZLogger.h"
#include "PVZTextures.h"

extern PVZTextures *all;

void PVZArena::set_plant_field_tonull()
{
    for (int i = 0; i < 5; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            plants[i][j] = nullptr;
        }
    }
}

void PVZArena::display_plant_and_attack(sf::RenderWindow *window)
{
    for (int i = 0; i < 5; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (plants[i][j] != nullptr)
            {
                plants[i][j]->display(window);
                plants[i][j]->attack();
            }
        }
    }
}

void PVZArena::delete_character(sf::Vector2i pos)
{
    delete plants[pos.x][pos.y];
    plants[pos.x][pos.y] = nullptr;
}

PVZArena::PVZArena(PVZSun *sun)
{
    field = new PVZField(9, 5);
    LOG_INFO("PVZArena::PVZArena()");

    set_plant_field_tonull();
    this->sun = sun;
}

PVZArena::~PVZArena()
{
}

void PVZArena::next_frame(sf::RenderWindow *window)
{
    // LOG_INFO("PVZArena::next_frame(sf::RenderWindow *window)");
    field->display(window);
    sun->display(window);
    display_plant_and_attack(window);
}

bool PVZArena::create_character(PVZPlantType type, sf::Vector2i pos)
{
    if (!(plants[pos.y][pos.x] == nullptr))
    {
        return false;
    }

    switch (type)
    {
    case PEA:
        plants[pos.y][pos.x] = new PVZPea(pos);
        return true;
    case SUNFLOWER:
        plants[pos.y][pos.x] = new PVZSunFlower(pos, sun);
        return true;
    case NUT:
        plants[pos.y][pos.x] = new PVZNut(pos);
        return true;
    case POTATO:
        plants[pos.y][pos.x] = new PVZPotato(pos);
        return true;
    default:
        return false;
    }
}

std::vector<CharacterBase *> PVZArena::return_row_of_plants(int row)
{
    std::vector<CharacterBase *> taken_row;
    for (int i = 0; i < 9; i++)
    {
        if (plants[row][i] != nullptr)
        {
            taken_row.emplace_back(plants[row][i]);
        }
    }
    return taken_row;
}

void PVZArena::update_plants_row(std::vector<CharacterBase *> plants_row, int row)
{
    for (int i = 0; i < 9; i++)
    {
        plants[row][i] = nullptr;
    }
    for (auto i : plants_row)
    {
        sf::Vector2i position = PVZCollisionDetector::return_position_on_arena(i->return_position());
        plants[position.y][position.x] = i;
    }
}

sf::FloatRect PVZArena::get_bounds_of_character(sf::Vector2i pos)
{
    if (plants != nullptr && plants[pos.y][pos.x] != nullptr)
    {
        return plants[pos.y][pos.x]->return_float_rect();
    }
    return sf::FloatRect();
}

bool PVZArena::is_there_character(sf::Vector2i pos)
{
    return plants[pos.x][pos.y] == NULL ? false : true;
}
