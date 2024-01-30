#include "PVZBattlefield.h"

void PVZBattlefield::display(sf::RenderWindow *window)
{
    arena->next_frame(window);
}

PVZBattlefield::PVZBattlefield()
{
    arena = new PVZArena();
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
