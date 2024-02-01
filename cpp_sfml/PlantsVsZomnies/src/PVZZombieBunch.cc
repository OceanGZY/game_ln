/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-31 23:01:59
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-02-01 19:32:20
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZZombieBunch.cc
 * @Description: 注释信息
 */
#include "PVZZombieBunch.h"
#include "PVZLogger.h"

PVZZombieBunch::PVZZombieBunch(int wave)
{
    // srand(time(0));

    for (int i = 0; i < amout_of_zombies_during_wave + wave * 2; i++)
    {
        int random_row = rand() % 5;
        zombies[random_row].push_back(new PVZZombie(random_row, zombies[random_row].size()));
    }
}

PVZZombieBunch::~PVZZombieBunch()
{
}

bool PVZZombieBunch::display_and_check_if_alldied(sf::RenderWindow *window)
{

    bool all_died = true;
    for (int i = 0; i < 5; i++)
    {
        if (zombies[i].size() > 0)
        {
            for (auto zombie_it = zombies[i].begin(); zombie_it != zombies[i].end();)
            {
                (*zombie_it)->display(window);
                zombie_it++;
            }
            all_died = false;
        }
    }
    return all_died;
}

void PVZZombieBunch::move()
{
    // LOG_INFO("PVZZombieBunch::move()");
    // LOG_INFO("zombies->size() : %zu", zombies->size());
    for (int i = 0; i < zombies->size(); i++)
    {
        // LOG_INFO("zombies[%d].size() : %zu", i, zombies[i].size());
        for (auto zombie_it = zombies[i].begin(); zombie_it != zombies[i].end();)
        {
            (*zombie_it)->move();
            zombie_it++;
        }
    }
}

std::vector<PVZZombie *> PVZZombieBunch::return_row_of_zombie(int index)
{
    return zombies[index];
}

void PVZZombieBunch::update_zombie_row(std::vector<PVZZombie *> zombies_row, int index)
{
    zombies[index] = zombies_row;
}
