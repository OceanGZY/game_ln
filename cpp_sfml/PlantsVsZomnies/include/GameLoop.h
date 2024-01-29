#pragma once

#include "SFML/Graphics.hpp"
#include "PVZTextures.h"
// #include "PVZDimensions.h"
#include "PVZBattlefield.h"

class GameLoop
{
private:
    sf::RenderWindow *window;

public:
    GameLoop(/* args */);
    ~GameLoop();

    void run();
};
