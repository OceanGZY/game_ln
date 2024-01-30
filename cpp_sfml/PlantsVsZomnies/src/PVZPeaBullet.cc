#include "PVZPeaBullet.h"
#include "PVZTextures.h"

extern PVZTextures *all;

namespace OCEANPVZ
{
    extern sf::Vector2f size;
    extern sf::Vector2f beginning_space;
} // namespace OCEANPVZ

void PVZPeaBullet::restart_ifistofar()
{
    if (bullet.getPosition().x - start_pos.x >= 9 * OCEANPVZ::size.x)
    {
        set_start_pos();
    }
}

void PVZPeaBullet::set_start_pos()
{
    bullet.setPosition(start_pos);
}

PVZPeaBullet::PVZPeaBullet(sf::Vector2i arena_pos)
{
    bullet.setRadius(10);
    bullet.setTexture(all->get_texture(PVZTextures::BULLET));

    start_pos = OCEANPVZ::beginning_space + sf::Vector2f(arena_pos.x * OCEANPVZ::size.x, arena_pos.y * OCEANPVZ::size.y);

    start_pos.x += 0.5 * OCEANPVZ::size.x;
    start_pos.y += 0.25 * OCEANPVZ::size.y;

    set_start_pos();
}

PVZPeaBullet::~PVZPeaBullet()
{
}

void PVZPeaBullet::display(sf::RenderWindow *window)
{
    window->draw(bullet);
}

void PVZPeaBullet::move()
{
    bullet.move(5, 0);
}

sf::FloatRect PVZPeaBullet::return_float_rect()
{
    return bullet.getGlobalBounds();
}
