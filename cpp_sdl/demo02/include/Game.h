/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 19:45:35
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-02 20:14:08
 * @FilePath: /demo02/include/Game.h
 * @Description: 注释信息
 */
#ifndef __GAME_H__
#define __GAME_H__

#include <SDL2/SDL.h>
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>

class Game
{
private:
    /* data */
public:
    Game(/* args */);
    ~Game();

    bool init();

    void run();
    void shutdown();

    void add_actor(class Actor *actor);
    void remove_actor(class Actor *actor);

    void add_sprite(class SpriteComponent *sprite);
    void remove_sprite(class SpriteComponent *sprite);

    SDL_Texture *load_texture(const std::string &file_name);

private:
    SDL_Window *m_window;
    SDL_Renderer *m_renderer;
    Uint32 m_ticks_cout;

    bool m_is_running;

    bool m_update_actors;

    std::unordered_map<std::string, SDL_Texture *> m_textures; // 贴图

    std::vector<class SpriteComponent *> m_sprites; // 精灵

    std::vector<class Actor *> m_actors; // all actors

    std::vector<class Actor *> m_pending_actors; // pending_actors

    class Ship *m_ship; // 玩家的ship

    void process_input();
    void update_game();
    void generate_output();
    void load_data();
    void unload_data();
};

#endif