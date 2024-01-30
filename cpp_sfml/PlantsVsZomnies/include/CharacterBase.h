#pragma once

#include "SFML/Graphics.hpp"
#include <iostream>

class CharacterBase
{
private:
    /* data */
protected:
    int health;
    int tag;
    int last_time_used;
    const int activate_time;
    int damage;
    sf::RectangleShape character_rect;
    sf::Vector2i arena_pos;

    bool can_attack();

public:
    CharacterBase(/* args */);
    virtual ~CharacterBase();

    CharacterBase(int act_time, int damage, sf::Vector2i pos);

    virtual int attack();
    virtual bool was_hit_and_check_ifdied(int damage);
    virtual void move();
    virtual void display(sf::RenderWindow *window);
    virtual sf::FloatRect return_float_rect();
    virtual sf::Vector2f return_position();
};
