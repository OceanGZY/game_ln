#pragma once

#include "SFML/Graphics.hpp"

class PVZSun
{
private:
    sf::Text amount_of_sun;
    sf::Font font;

    int quantity = 100;

public:
    PVZSun(/* args */);
    ~PVZSun();

    void display(sf::RenderWindow *window);
    void add_sun(int quantity);

    int get_quantity();

    void reduce_sun(int quantity);
};