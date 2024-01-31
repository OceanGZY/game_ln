/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:45:28
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 17:04:19
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZChooseCharacter.cc
 * @Description: 注释信息
 */
#include "PVZChooseCharacter.h"

namespace OCEANPVZ
{
    extern sf::Vector2f choose_character_pos;
    extern sf::Vector2f size;
} // namespace OCEANPVZ

bool PVZChooseCharacter::time_condition(int index)
{
    return clock() - last_time_used[index] >= wait_time[index];
}

bool PVZChooseCharacter::sun_condition(int index)
{
    return sun->get_quantity() >= cost[index];
}

PVZChooseCharacter::PVZChooseCharacter(PVZSun *sun)
{
    this->sun = sun;

    int time = clock();
    choose_frame = new PVZField(4, 1);
    for (int i = 0; i < 4; i++)
    {
        sf::Vector2f position = OCEANPVZ::choose_character_pos;
        position.x += i * OCEANPVZ::size.x;

        choose_rect[i] = new PVZLoadingRectangular(character_textures[i], position);

        last_time_used[i] = time;
    }
}

PVZChooseCharacter::~PVZChooseCharacter()
{
}

void PVZChooseCharacter::display(sf::RenderWindow *window)
{
    double actual_time = clock();
    choose_frame->display(window);
    for (int i = 0; i < 4; i++)
    {
        double percent = actual_time - last_time_used[i] > wait_time[i] ? 100 : (actual_time - last_time_used[i]) / wait_time[i] * 100;
        if (percent < 101)
        {
            choose_rect[i]->set_percent(percent);
        }
        choose_rect[i]->display(window);
    }
}

PVZArena::PVZPlantType PVZChooseCharacter::return_plant_type_ifpossible(sf::Vector2i pos)
{
    if (pos != sf::Vector2i(-1, -1) && time_condition(pos.y) && sun_condition(pos.y))
    {
        switch (pos.y)
        {
        case 0:
            choose_rect[pos.y]->set_chosen(true);
            return PVZArena::PVZPlantType::PEA;
        case 1:
            choose_rect[pos.y]->set_chosen(true);
            return PVZArena::PVZPlantType::SUNFLOWER;
        case 2:
            choose_rect[pos.y]->set_chosen(true);
            return PVZArena::PVZPlantType::NUT;
        case 3:
            choose_rect[pos.y]->set_chosen(true);
            return PVZArena::PVZPlantType::POTATO;
        }
    }
    return PVZArena::PVZPlantType::NONE;
}

int PVZChooseCharacter::return_cost(PVZArena::PVZPlantType type)
{
    choose_rect[type]->set_chosen(false);
    return cost[type];
}

void PVZChooseCharacter::clear_selection()
{
    for (int i = 0; i < 4; i++)
    {
        choose_rect[i]->set_chosen(false);
    }
}
