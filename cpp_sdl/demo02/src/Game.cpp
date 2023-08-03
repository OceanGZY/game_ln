/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 19:45:31
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-03 22:43:25
 * @FilePath: /demo02/src/Game.cpp
 * @Description: 注释信息
 */
#include "../include/Game.h"
#include "SDL2/SDL_image.h"
#include "../include/Actor.h"
#include "../include/Ship.h"
#include "../include/SpriteComponent.h"
#include "../include/BGSpriteComponent.h"
#include <algorithm>

Game::Game(/* args */) : m_window(nullptr), m_renderer(nullptr), m_is_running(true), m_update_actors(false)
{
}

Game::~Game()
{
}

bool Game::Init()
{
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO) != 0)
    {
        SDL_Log("Failed to init SDL: %s", SDL_GetError());
        return false;
    }

    m_window = SDL_CreateWindow("SDL2", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 1024, 768, SDL_WINDOW_SHOWN);

    if (!m_window)
    {
        SDL_Log("Failed to create window: %s", SDL_GetError());
        return false;
    }
    m_renderer = SDL_CreateRenderer(m_window, -1, SDL_RENDERER_ACCELERATED | SDL_RENDERER_PRESENTVSYNC);
    if (!m_renderer)
    {
        SDL_Log("Failed to create renderer: %s", SDL_GetError());
        return false;
    }

    if (IMG_Init(IMG_INIT_PNG) == 0)
    {
        SDL_Log("Failed to init SDL_image: %s", IMG_GetError());
        return false;
    }

    LoadData();

    m_ticks_cout = SDL_GetTicks();

    return true;
}

void Game::Run()
{
    while (m_is_running)
    {
        ProcessInput();
        UpdateGame();
        GenerateOutput();
    }
}

void Game::ProcessInput()
{
    SDL_Event event;
    while (SDL_PollEvent(&event))
    {
        /* code */
        switch (event.type)
        {
        case SDL_QUIT:
            /* code */
            m_is_running = false;
            break;

        default:
            break;
        }
    }

    const Uint8 *state = SDL_GetKeyboardState(NULL);
    if (state[SDL_SCANCODE_ESCAPE])
    {
        m_is_running = false;
    }

    // m_ship->process_keyboard(state);
}

void Game::UpdateGame()
{
}

void Game::GenerateOutput()
{
}

void Game::LoadData()
{
}

void Game::UnloadData()
{
}

SDL_Texture *Game::LoadTexture(const std::string &file_name)
{
}

void Game::AddActor(Actor *actor)
{
}

void Game::RemoveActor(Actor *actor)
{
}

void Game::AddSprite(SpriteComponent *sprite)
{
}

void Game::RemoveSprite(SpriteComponent *sprite)
{
}

void Game::Shutdown()
{
    UnloadData();
    IMG_Quit();
    SDL_DestroyRenderer(m_renderer);
    SDL_DestroyWindow(m_window);
    SDL_Quit();
}