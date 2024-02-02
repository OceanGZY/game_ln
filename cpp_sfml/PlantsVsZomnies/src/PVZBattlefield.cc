/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-31 16:32:17
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-02 11:11:47
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
    std::vector<CharacterBase *> plants;
    std::vector<PVZZombie *> zombies;

    for (int i = 0; i < 5; i++)
    {
        plants = arena->return_row_of_plants(i);
        zombies = zombies_bunch->return_row_of_zombie(i);
        auto zombie_it = zombies.begin();
        auto plant_it = plants.begin();
        while (zombie_it != zombies.end())
        {
            (*zombie_it)->set_on_plant(false);
            zombie_it++;
        }

        while (plant_it != plants.end() && zombies.size() > 0)
        {
            zombie_it = zombies.begin();
            while (zombie_it != zombies.end() && plants.size() > 0)
            {
                if (typeid(*(*plant_it)) == typeid(PVZPea))
                {
                    PVZPea *pea = dynamic_cast<PVZPea *>(*plant_it);
                    if (PVZCollisionDetector::test_collision(pea->return_float_rect(), (*zombie_it)->return_float_rect()))
                    {
                        (*zombie_it)->set_on_plant(true);
                        int tmp_damage = (*zombie_it)->attack();
                        if (pea->was_hit_and_check_ifdied(tmp_damage))
                        {
                            plant_it = plants.erase(plant_it);
                            if ((*zombie_it) != nullptr)
                            {
                                (*zombie_it)->set_on_plant(false);
                            }
                        }
                    }

                    if (PVZCollisionDetector::test_collision(pea->return_bullet_flaot_rect(), (*zombie_it)->return_float_rect()))
                    {
                        int tmp_damage = pea->attack();
                        if ((*zombie_it)->was_hit_and_check_ifdied(tmp_damage, false))
                        {
                            zombie_it = zombies.erase(zombie_it);
                        }
                        pea->remove_bullet();
                    }
                    (*plant_it) = pea;
                }
                else if (PVZCollisionDetector::test_collision((*plant_it)->return_float_rect(), (*zombie_it)->return_float_rect()))
                {
                    int plant_damage = (*plant_it)->attack();
                    int zombie_damage = (*zombie_it)->attack();
                    if ((*zombie_it)->was_hit_and_check_ifdied(plant_damage))
                    {
                        zombie_it = zombies.erase(zombie_it);
                    }
                    else
                    {
                        zombie_damage = (*zombie_it)->attack();
                    }

                    if (typeid(*(*plant_it)) == typeid(PVZPotato))
                    {
                        zombie_damage = -101;
                    }
                    if ((*plant_it)->was_hit_and_check_ifdied(zombie_damage))
                    {
                        plant_it = plants.erase(plant_it);
                        if ((*zombie_it) != nullptr)
                        {
                            (*zombie_it)->set_on_plant(false);
                        }
                    }
                }
                if (zombies.size() <= 1)
                {
                    break;
                }
                plant_it++;
            }

            arena->update_plants_row(plants, i);
            zombies_bunch->update_zombie_row(zombies, i);
        }
    }
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
    collisions();
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
