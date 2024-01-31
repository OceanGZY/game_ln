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
}

void PVZBattlefield::mouse_button_released(sf::RenderWindow *window)
{
}
