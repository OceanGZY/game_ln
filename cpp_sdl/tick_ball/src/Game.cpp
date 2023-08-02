/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 16:02:40
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-02 17:58:44
 * @FilePath: /cpp_sdl/01/src/Game.cpp
 * @Description: 注释信息
 */

#include "Game.h"
#include <iostream>

const int thickness = 15;
const float paddl_h = 100.0f;

Game::Game(/* args */) : m_window(nullptr), m_renderer(nullptr), m_ticks_count(0), m_is_running(true), m_paddle_dir(0)
{
}

Game::~Game()
{
}

bool Game::init()
{
    int sdl_res = SDL_Init(SDL_INIT_VIDEO);

    if (sdl_res != 0)
    {
        SDL_Log("SDL_Init Error: %s", SDL_GetError());
        return false;
    }

    // 创建SDL window
    m_window = SDL_CreateWindow("SDL2 Pong",
                                100,  // left x 位置
                                100,  // left y 位置
                                1024, // 宽
                                768,  // 高
                                0);

    if (!m_window)
    {
        SDL_Log("SDL_CreateWindow Error: %s", SDL_GetError());
        return false;
    }

    // 创建SDL renderer
    m_renderer = SDL_CreateRenderer(m_window, // 在创建的window内创建 renderer
                                    -1,
                                    SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);

    if (!m_renderer)
    {
        SDL_Log("SDL_CreateRenderer Error: %s", SDL_GetError());
        return false;
    }

    m_paddle_pos.x = 10.0f;
    m_paddle_pos.y = 768.0f / 2.0f;

    m_ball_pos.x = 1024.0f / 2.0f;
    m_ball_pos.y = 768.0f / 2.0f;

    m_ball_vel.x = -200.0f;
    m_ball_vel.y = 235.0f;
    return true;
}

void Game::run()
{
    while (m_is_running)
    {
        /* code */
        process_input();
        update_game();
        generate_output();
    }
}

void Game::process_input()
{
    SDL_Event event;
    while (SDL_PollEvent(&event))
    {
        switch (event.type)
        {
        case SDL_QUIT:
            m_is_running = false;
            break;
        }
    }

    // 获取键盘状态
    const Uint8 *state = SDL_GetKeyboardState(NULL);

    // 如果按了esc 则中断loop
    if (state[SDL_SCANCODE_ESCAPE])
    {
        m_is_running = false;
    }
    // 更新paddle位置 W / S
    m_paddle_dir = 0;
    if (state[SDL_SCANCODE_W])
    {
        m_paddle_dir -= 1;
    }
    if (state[SDL_SCANCODE_S])
    {
        m_paddle_dir += 1;
    }
}

void Game::update_game()
{

    // 等待上一帧16ms
    while (!SDL_TICKS_PASSED(SDL_GetTicks(), m_ticks_count + 16))
        ;

    // 间隔delta 时间， 是跟上一帧的时间差, 转换为s
    float delta_time = (SDL_GetTicks() - m_ticks_count) / 1000.0f;

    // 控制最大间隔时间
    if (delta_time > 0.05f)
    {
        delta_time = 0.05f;
    }

    // 更新tick cout
    m_ticks_count = SDL_GetTicks();

    // 更新paddle的位置
    if (m_paddle_dir != 0)
    {
        m_paddle_pos.y += m_paddle_dir * 300.0f * delta_time;
        //  控制paddle 不能移动到window屏幕外
        if (m_paddle_pos.y < (paddl_h / 2.0f + thickness))
        {
            m_paddle_pos.y = paddl_h / 2.0f + thickness;
        }
        else if (m_paddle_pos.y > (768.0f - paddl_h / 2.0f - thickness))
        {
            m_paddle_pos.y = 768.0f - paddl_h / 2.0f - thickness;
        }
    }

    // 更新ball的位置
    m_ball_pos.x += m_ball_vel.x * delta_time;
    m_ball_pos.y += m_ball_vel.y * delta_time;

    //
    float diff = m_paddle_pos.y - m_ball_pos.y;

    diff = (diff > 0.0f) ? diff : -diff;

    if (
        diff <= paddl_h / 2.0f &&                         // y的变化足够小
        m_ball_pos.x <= 25.0f && m_ball_pos.x >= 20.0f && // ball在正确的位置
        m_ball_vel.x < 0.0f                               // ball移动向左边
    )
    {
        m_ball_vel.x *= -1.0f;
    }

    else if (
        m_ball_pos.x <= 0 // 是否ball 从屏幕上消失
    )
    {
        m_is_running = false;
    }
    else if (
        m_ball_pos.x >= (1024.0f - thickness) && m_ball_vel.x > 0.0f // ball 是否撞到右边
    )
    {
        m_ball_vel.x *= -1.0f;
    }

    else if (
        m_ball_pos.y <= thickness && m_ball_vel.y < 0.0f // ball 是否撞到上边
    )
    {
        m_ball_vel.y *= -1.0f;
    }

    else if (
        m_ball_pos.y >= (768.0f - thickness) && m_ball_vel.y > 0.0f // ball 是否撞到下边
    )
    {
        m_ball_vel.y *= -1.0f;
    }
}

void Game::generate_output()
{

    // 绘制颜色
    SDL_SetRenderDrawColor(
        m_renderer, 0, 0, 255, 255);

    // 清空后缓冲区
    SDL_RenderClear(m_renderer);

    // 绘制 walls
    SDL_SetRenderDrawColor(
        m_renderer, 255, 255, 255, 255);

    // top wall
    SDL_Rect wall{
        0,        // left x
        0,        // left y
        1024,     // width
        thickness // height
    };
    SDL_RenderFillRect(m_renderer, &wall);

    // bottom wall
    wall.y = 768 - thickness;
    SDL_RenderFillRect(m_renderer, &wall);

    // right wall
    wall.x = 1024 - thickness;
    wall.y = 0;
    wall.w = thickness;
    wall.h = 1024;
    SDL_RenderFillRect(m_renderer, &wall);

    // 绘制paddle
    SDL_Rect paddle{
        static_cast<int>(m_paddle_pos.x),
        static_cast<int>(m_paddle_pos.y - paddl_h / 2),
        thickness,
        static_cast<int>(paddl_h)};
    SDL_RenderFillRect(m_renderer, &paddle);

    // 绘制ball
    SDL_Rect ball{
        static_cast<int>(m_ball_pos.x - thickness / 2),
        static_cast<int>(m_ball_pos.y - thickness / 2),
        thickness,
        thickness};

    SDL_RenderFillRect(m_renderer, &ball);

    // 交换前缓冲区和后缓冲区
    SDL_RenderPresent(m_renderer);
}

void Game::shutdown()
{
    SDL_DestroyRenderer(m_renderer);
    SDL_DestroyWindow(m_window);
    SDL_Quit();
}