/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 16:33:39
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-29 16:43:56
 * @FilePath: /cpp_sfml/PlantsVsZomnies/include/PVZTextures.h
 * @Description: 注释信息
 */
#pragma once

#include "SFML/Graphics.hpp"
#include <iostream>

class PVZTextures
{
private:
    sf::Texture *pea_texture;
    sf::Texture *nut_texture;
    sf::Texture *sunflower_texture;
    sf::Texture *potato_no_activate_texture;
    sf::Texture *potato_activate_texture;
    sf::Texture *grass_light_texture;
    sf::Texture *grass_dark_texture;
    sf::Texture *zombie_texture;
    sf::Texture *bullet_texture;

public:
    enum GameTextureType
    {
        PEA,
        NUT,
        SUNFLOWER,
        POTATO_NO_ACT,
        POTATO_ACT,
        GRASS_LIGHT,
        GRASS_DARK,
        ZOMBIE,
        BULLET
    };

    PVZTextures(/* args */);
    ~PVZTextures();

    sf::Texture *get_texture(GameTextureType t);
};
