#pragma once

#include "PVZZombie.h"
#include <ctime>
#include <vector>

class PVZZombieBunch
{
private:
    std::vector<PVZZombie *> zombies[5];
    const int amout_of_zombies_during_wave = 5;

public:
    PVZZombieBunch(int wave);
    ~PVZZombieBunch();

    bool display_and_check_if_alldied(sf::RenderWindow *window);

    void move();
    std::vector<PVZZombie *> return_row_of_zombie(int index);

    void update_zombie_row(std::vector<PVZZombie *> zombies_row, int index);
};
