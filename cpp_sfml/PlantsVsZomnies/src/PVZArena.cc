/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 11:19:43
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 17:42:08
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZArena.cc
 * @Description: 注释信息
 */
#include "PVZArena.h"
#include "PVZLogger.h"

void PVZArena::set_plant_field_tonull()
{
}

void PVZArena::display_plant_and_attack()
{
}

PVZArena::PVZArena()
{
    field = new PVZField(9, 5);
    LOG_INFO("PVZArena::PVZArena()");
}

PVZArena::~PVZArena()
{
}

void PVZArena::next_frame(sf::RenderWindow *window)
{
    // LOG_INFO("PVZArena::next_frame(sf::RenderWindow *window)");
    field->display(window);
}
