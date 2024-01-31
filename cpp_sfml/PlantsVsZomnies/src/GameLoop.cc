/*
 * @Author: OCEAN.GZY
 * @Date: 2024-01-29 19:45:47
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-01-31 21:56:11
 * @FilePath: \cpp_sfml\PlantsVsZomnies\src\GameLoop.cc
 * @Description: 注释信息
 */
#include "GameLoop.h"

#include "PVZLogger.h"

namespace OCEANPVZ
{
    extern sf::Vector2i current_size;

} // namespace name

GameLoop::GameLoop()
{
    window = new sf::RenderWindow(sf::VideoMode(OCEANPVZ::current_size.x, OCEANPVZ::current_size.y), "Plants Vs Zombies");
    window->setFramerateLimit(60);
}

GameLoop::~GameLoop()
{
}

void GameLoop::run()
{
    PVZBattlefield *battlefield = new PVZBattlefield();
    while (window->isOpen())
    {
        sf::Event event;
        while (window->pollEvent(event))
        {
            switch (event.type)
            {
            case sf::Event::EventType::Closed:
                window->close();
            case sf::Event::EventType::MouseButtonPressed:
                if (event.mouseButton.button == sf::Mouse::Right)
                {
                    // LOG_INFO("sf::Mouse::Right点击");
                    battlefield->mouse_button_pressed(window);
                }
            case sf::Event::EventType::MouseButtonReleased:
                if (event.mouseButton.button == sf::Mouse::Right)
                {
                    // LOG_INFO("sf::Mouse::Right释放");
                    battlefield->mouse_button_released(window);
                }
            default:
                break;
            }
        }

        window->clear();
        battlefield->next_frame(window);
        window->display();
    }
}
