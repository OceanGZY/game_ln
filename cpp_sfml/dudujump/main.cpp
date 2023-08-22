/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-22 10:24:21
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-22 15:34:09
 * @FilePath: /cpp_sfml/dudujump/main.cpp
 * @Description: dudujump小游戏
 */
#include <SFML/Graphics.hpp>
#include <time.h>
#include <iostream>

struct point
{
    int x;
    int y;
};

int main()
{
    srand(time(0));

    sf::RenderWindow window(sf::VideoMode(400, 533), "dudujump");
    window.setFramerateLimit(60);

    sf::Texture t1, t2, t3;
    t1.loadFromFile("images/background.png"); // 背景
    t2.loadFromFile("images/platform.png");   // 跳板
    t3.loadFromFile("images/doodle.png");     // 角色

    sf::Sprite sBackground(t1), sPlatorm(t2), sPlayer(t3);

    point platform[20];

    for (int i = 0; i < 10; i++)
    {
        platform[i].x = rand() % 400;
        platform[i].y = rand() % 533;
    }

    int x = 100, y = 100, h = 200;
    float dx = 0, dy = 0;

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
        }

        if (event.type == sf::Event::KeyPressed)
        {
            switch (event.key.code)
            {
            case sf::Keyboard::Left:
                std::cout << "left" << std::endl;
                x -= 10;
                break;
            case sf::Keyboard::Right:
                std::cout << "right" << std::endl;
                x += 10;
            default:
                break;
            }
        }

        dy += 0.1;
        y += dy;

        if (y > 500)
            dy -= 10;

        if (y < h)
        {

            for (int i = 0; i < 10; i++)
            {
                y = h;
                platform[i].y = platform[i].y - dy;
                if (platform[i].y > 533)
                {
                    platform[i].y = 0;
                    platform[i].x = rand() % 400;
                }
            }
        }
        for (int i = 0; i < 10; i++)
        {
            if ((x + 50 > platform[i].x) && (x + 20 < platform[i].x + 68) && (y + 70 > platform[i].y) && (y + 70 < platform[i].y + 14) && (dy > 0))
            {
                dy -= 10;
            }
        }

        sPlayer.setPosition(x, y);
        window.draw(sBackground);
        window.draw(sPlayer);

        for (int i = 0; i < 10; i++)
        {
            sPlatorm.setPosition(platform[i].x, platform[i].y);
            window.draw(sPlatorm);
        }

        window.display();
    }

    return 0;
}
