/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:45:28
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 16:41:32
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
}

PVZArena::PVZPlantType PVZChooseCharacter::return_plant_type_ifpossible(sf::Vector2i pos)
{
    return PVZArena::PVZPlantType();
}

int PVZChooseCharacter::return_cost(PVZArena::PVZPlantType type)
{
    return 0;
}

void PVZChooseCharacter::clear_selection()
{
}
