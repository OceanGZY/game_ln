/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 16:40:56
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-29 16:52:57
 * @FilePath: /cpp_sfml/PlantsVsZomnies/src/PVZTextures.cc
 * @Description: 注释信息
 */
#include "PVZTextures.h"

PVZTextures::PVZTextures()
{
    try
    {
        pea_texture = new sf::Texture();
        nut_texture = new sf::Texture();
        sunflower_texture = new sf::Texture();
        potato_no_activate_texture = new sf::Texture();
        potato_activate_texture = new sf::Texture();
        grass_light_texture = new sf::Texture();
        grass_dark_texture = new sf::Texture();
        zombie_texture = new sf::Texture();
        bullet_texture = new sf::Texture();
    }
    catch (const std::exception &e)
    {
        std::cerr << e.what() << '\n';
    }

    try
    {
        bool state;
        state = pea_texture->loadFromFile("./resources/textures/pea.png");
        state = nut_texture->loadFromFile("./resources/textures/nut.png");
        state = sunflower_texture->loadFromFile("./resources/textures/sunflower.png");
        state = potato_no_activate_texture->loadFromFile("./resources/textures/NotPotato.png");
        state = potato_activate_texture->loadFromFile("./resources/textures/potato.png");
        state = grass_light_texture->loadFromFile("./resources/textures/grassLight.PNG");
        state = grass_dark_texture->loadFromFile("./resources/textures/grassDark.PNG");
        state = zombie_texture->loadFromFile("./resources/textures/zombie.png");
        state = bullet_texture->loadFromFile("./resources/textures/bullet.PNG");
        if (!state)
        {
            throw "load game texture failed!";
        }
    }
    catch (const std::exception &e)
    {
        std::cerr << e.what() << '\n';
    }
}

PVZTextures::~PVZTextures()
{
}

sf::Texture *PVZTextures::get_texture(GameTextureType t)
{
    switch (t)
    {
    case PEA:
        return pea_texture;
    case NUT:
        return nut_texture;
    case SUNFLOWER:
        return sunflower_texture;
    case POTATO_NO_ACT:
        return potato_no_activate_texture;
    case POTATO_ACT:
        return potato_activate_texture;
    case GRASS_LIGHT:
        return grass_light_texture;
    case GRASS_DARK:
        return grass_dark_texture;
    case ZOMBIE:
        return zombie_texture;
    case BULLET:
        return bullet_texture;
    default:
        return nullptr;
    }
}
