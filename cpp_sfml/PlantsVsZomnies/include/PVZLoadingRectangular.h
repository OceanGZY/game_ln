#pragma once

#include "SFML/Graphics.hpp"
#include "PVZDimensions.h"
#include "PVZTextures.h"

class PVZLoadingRectangular
{
private:
    sf::RectangleShape plant;
    sf::RectangleShape loading_bar;

    bool is_chosen = false;

public:
    PVZLoadingRectangular(const sf::Texture *texture, sf::Vector2f pos);
    ~PVZLoadingRectangular();

    void set_percent(double percent);

    void display(sf::RenderWindow *window);

    void set_chosen(bool choose);
};
