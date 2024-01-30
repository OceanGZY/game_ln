/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-30 19:53:40
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-30 22:12:46
 * @FilePath: \cpp_sfml\PlantsVsZomnies\src\PVZPea.cc
 * @Description: 注释信息
 */
#include "PVZPea.h"
#include "PVZTextures.h"

extern PVZTextures *all;

PVZPea::PVZPea(sf::Vector2i arena_pos) : CharacterBase(2500, -26, arena_pos)
{
    health = 100;
    character_rect.setTexture(all->get_texture(PVZTextures::PEA));
    tag = 1;
    bullet = nullptr;

    last_time_used = clock();

    attack();
}

PVZPea::~PVZPea()
{
    if (bullet != nullptr)
    {
        delete bullet;
        bullet = nullptr;
    }
}

void PVZPea::display(sf::RenderWindow *window)
{
    window->draw(character_rect);
    if (bullet != nullptr)
    {
        bullet->display(window);
    }
}

int PVZPea::attack()
{
    if (bullet == nullptr && can_attack())
    {
        bullet = new PVZPeaBullet(arena_pos);
        last_time_used = clock();
        return damage;
    }
    else if (bullet != nullptr)
    {
        bullet->move();
        return damage;
    }
    return 0;
}

sf::FloatRect PVZPea::return_bullet_flaot_rect()
{
    if (bullet != nullptr)
    {
        return bullet->return_float_rect();
    }
    return sf::FloatRect();
}

void PVZPea::remove_bullet()
{
    if (bullet != nullptr)
    {
        delete bullet;
        bullet = nullptr;
    }
}
