/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-22 15:37:46
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-22 16:34:22
 * @FilePath: /cpp_sfml/snake/main.cpp
 * @Description: 贪吃蛇
 */
#include <SFML/Graphics.hpp>
#include <time.h>

int N = 30, M = 20;
int size = 16;
int w = size * N, h = size * M;

// 定义蛇🐍
int direction;
int num = 4;

struct Snake
{
    int x;
    int y;
};

Snake s[100];

Snake f;

void Tick()
{
    for (int i = num; i > 0; --i)
    {
        s[i].x = s[i - 1].x;
        s[i].y = s[i - 1].y;
    }

    if (direction == 0)
    {
        s[0].y += 1;
    }

    if (direction == 1)
    {
        s[0].x -= 1;
    }

    if (direction == 2)
    {
        s[0].x += 1;
    }
    if (direction == 3)
    {
        s[0].y -= 1;
    }

    if ((s[0].x == f.x) && (s[0].y == f.y))
    {
        num++;
        f.x = rand() % N;
        f.y = rand() % M;
    }

    // 设置边界循环 和边界截断

    if (s[0].x > N)
    {
        s[0].x = 0;
    }
    if (s[0].x < 0)
    {
        s[0].x = N;
    }
    if (s[0].y > M)
    {
        s[0].y = 0;
    }
    if (s[0].y < 0)
    {
        s[0].y = M;
    }

    for (int i = 1; i < num; i++)
    {
        if (s[0].x == s[i].x && s[0].y == s[i].y)
        {
            num = i;
        }
    }
}

// 主函数
int main()
{

    srand(time(0));

    sf::RenderWindow window(sf::VideoMode(w, h), "snake");

    sf::Texture t1, t2;
    t1.loadFromFile("images/white.png");
    t2.loadFromFile("images/red.png");

    sf::Sprite sprite1(t1), sprite2(t2);

    sf::Clock clock;
    float timer = 0;
    float delay = 0.5;

    f.x = 10;
    f.y = 10;

    while (window.isOpen())
    {

        float time = clock.getElapsedTime().asSeconds();
        clock.restart();
        timer += time;

        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
            {
                window.close();
            }
        }

        if (timer > delay)
        {
            timer = 0;
            Tick();
        }

        if (event.type == sf::Event::KeyPressed)
        {
            switch (event.key.code)
            {
            case sf::Keyboard::Left:
                /* code */
                direction = 1;
                break;
            case sf::Keyboard::Right:
                /* code */
                direction = 2;
                break;

            case sf::Keyboard::Up:
                /* code */
                direction = 3;
                break;
            case sf::Keyboard::Down:
                /* code */
                direction = 0;
                break;

            default:
                break;
            }
        }

        window.clear();

        for (int i = 0; i < N; i++)
        {
            for (int j = 0; j < M; j++)
            {
                sprite1.setPosition(i * size, j * size);
                window.draw(sprite1);
            }
        }

        for (int i = 0; i < num; i++)
        {
            sprite2.setPosition(s[i].x * size, s[i].y * size);
            window.draw(sprite2);
        }

        sprite2.setPosition(f.x * size, f.y * size);
        window.draw(sprite2);

        window.display();
    }

    return 0;
}