/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 19:45:35
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 12:34:09
 * @FilePath: /ship_move_02/include/Game.h
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

    bool Init();

    void Run();
    void Shutdown();

    void AddActor(class Actor *actor);
    void RemoveActor(class Actor *actor);

    void AddSprite(class SpriteComponent *sprite);
    void RemoveSprite(class SpriteComponent *sprite);

    SDL_Texture *LoadTexture(const std::string &file_name);

    void AddAsteroid(class Asteroid *asteroid);
    void RemoveAsteroid(class Asteroid *asteroid);
    std::vector<class Asteroid *> &GetAsteroids() { return m_asteroids; }

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

    std::vector<class Asteroid *> m_asteroids;

    void ProcessInput();
    void UpdateGame();
    void GenerateOutput();
    void LoadData();
    void UnloadData();
};

#endif