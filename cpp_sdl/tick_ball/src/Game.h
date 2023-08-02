/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 16:02:37
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-02 19:51:31
 * @FilePath: /cpp_sdl/tick_ball/src/Game.h
 * @Description: 注释信息
 */
#ifndef __GAME_H__
#define __GAME_H__

#include "SDL2/SDL.h"

struct Vector2
{
    float x;
    float y;
};

class Game
{
private:
    /* data */
    void process_input();
    void update_game();
    void generate_output();

    SDL_Window *m_window;
    SDL_Renderer *m_renderer;

    Uint32 m_ticks_count;

    bool m_is_running; 

    int m_paddle_dir;

    Vector2 m_paddle_pos; // paddle的位置

    Vector2 m_ball_pos; // ball的位置

    Vector2 m_ball_vel; // ball的速度 velocity

public:
    Game(/* args */);
    ~Game();

    // 初始化游戏
    bool init();

    // 运行游戏直到游戏结束
    void run();

    // 终止游戏
    void shutdown();
};

#endif
