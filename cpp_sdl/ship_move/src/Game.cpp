/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 19:45:31
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 22:10:37
 * @FilePath: /demo02/src/Game.cpp
 * @Description: 注释信息
 */
#include "Game.h"
#include "SDL2/SDL_image.h"
#include "Actor.h"
#include "Ship.h"
#include "SpriteComponent.h"
#include "BGSpriteComponent.h"
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

    m_window = SDL_CreateWindow("ship_move", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 1024, 768, SDL_WINDOW_SHOWN);

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

    m_ship->ProcessKeyBoard(state);
}

void Game::UpdateGame()
{
    while (!SDL_TICKS_PASSED(SDL_GetTicks(), m_ticks_cout + 16))
        ;
    float delta_time = (SDL_GetTicks() - m_ticks_cout) / 1000.0f;

    if (delta_time > 0.05f)
    {
        delta_time = 0.05f;
    }
    m_ticks_cout = SDL_GetTicks();

    // 更新actors
    m_update_actors = true;
    for (auto actor : m_actors)
    {
        actor->Update(delta_time);
    }
    m_update_actors = false;

    // 将pending的actors 移入m_actors
    for (auto pending : m_pending_actors)
    {
        m_actors.emplace_back(pending);
    }
    m_pending_actors.clear();

    // 将dead 的actor 移入一个临时vector中
    std::vector<Actor *> dead_actors;
    for (auto actor : m_actors)
    {
        if (actor->GetState() == Actor::Edead)
        {
            dead_actors.emplace_back(actor);
        }
    }

    // 删除dead actors
    for (auto actor : dead_actors)
    {
        delete actor;
        actor = nullptr;
    }
}

void Game::GenerateOutput()
{

    SDL_SetRenderDrawColor(m_renderer, 0, 0, 0, 255);
    SDL_RenderClear(m_renderer);

    // 绘制所有sprite
    for (auto sprite : m_sprites)
    {
        sprite->Draw(m_renderer);
    }

    SDL_RenderPresent(m_renderer);
}

void Game::LoadData()
{
    //  创建玩家的shp
    m_ship = new Ship(this);
    m_ship->SetPosition(Vector2(100.0f, 384.0f));
    m_ship->SetScale(1.5f);

    // 为背景创建actor
    Actor *temp = new Actor(this);
    temp->SetPosition(Vector2(512.0f, 384.0f));

    // Create the "far back" background
    BGSpriteComponent *bg_sprite = new BGSpriteComponent(temp);

    bg_sprite->SetScreenSize(Vector2(1024.0f, 768.0f));
    std::vector<SDL_Texture *>
        backgrounds = {
            LoadTexture("Assets/Farback01.png"),
            LoadTexture("Assets/Farback02.png"),
        };
    bg_sprite->SetBGTextures(backgrounds);
    bg_sprite->SetScrollSpeed(-100.0f);

    // 创建 close background

    // Create the "close" background
    bg_sprite = new BGSpriteComponent(temp);
    std::vector<SDL_Texture *>
        close_backgrounds = {
            LoadTexture("Assets/Stars.png"),
            LoadTexture("Assets/Stars.png"),
        };
    bg_sprite->SetBGTextures(close_backgrounds);
    bg_sprite->SetScrollSpeed(-200.0f);
}

void Game::UnloadData()
{
    // 删除actors
    while (!m_actors.empty())
    {
        delete m_actors.back();
    }
    // 删除textures
    for (auto texture : m_textures)
    {
        SDL_DestroyTexture(texture.second);
    }
    m_textures.clear();
}

SDL_Texture *Game::LoadTexture(const std::string &file_name)
{
    SDL_Texture *tex = nullptr;

    auto iter = m_textures.find(file_name);
    if (iter != m_textures.end())
    {
        tex = iter->second;
    }
    else
    {
        // 从文件加载
        SDL_Surface *surf = IMG_Load(file_name.c_str());
        if (!surf)
        {
            SDL_Log("Failed to load texture file %s", file_name.c_str());
            return nullptr;
        }

        // 从surface常见texture
        tex = SDL_CreateTextureFromSurface(m_renderer, surf);
        SDL_FreeSurface(surf);
        if (!tex)
        {
            SDL_Log("Failed to create texture from %s", file_name.c_str());
            return nullptr;
        }

        m_textures.emplace(std::make_pair(file_name, tex));
    }
    return tex;
}

void Game::AddActor(Actor *actor)
{
    if (m_update_actors)
    {
        m_pending_actors.emplace_back(actor);
    }
    else
    {
        m_actors.emplace_back(actor);
    }
}

void Game::RemoveActor(Actor *actor)
{
    // 判断是否是在 pending actors
    auto iter = std::find(m_pending_actors.begin(), m_pending_actors.end(), actor);
    if (iter != m_pending_actors.end())
    {
        // 交换到vector末端，并pop 移出
        std::iter_swap(iter, m_pending_actors.end() - 1);
        m_pending_actors.pop_back();
    }
    // 判断是否在 actors
    iter = std::find(m_actors.begin(), m_actors.end(), actor);
    if (iter != m_actors.end())
    {
        std::iter_swap(iter, m_actors.end() - 1);
        m_actors.pop_back();
    }
}

void Game::AddSprite(SpriteComponent *sprite)
{
    int _m_drawOrder = sprite->GetDrawOrder();
    auto iter = m_sprites.begin();
    for (; iter != m_sprites.end(); ++iter)
    {
        if (_m_drawOrder < (*iter)->GetDrawOrder())
        {
            break;
        }
    }
    m_sprites.insert(iter, sprite);
}

void Game::RemoveSprite(SpriteComponent *sprite)
{
    auto iter = std::find(m_sprites.begin(), m_sprites.end(), sprite);
    m_sprites.erase(iter);
}

void Game::Shutdown()
{
    UnloadData();
    IMG_Quit();
    SDL_DestroyRenderer(m_renderer);
    SDL_DestroyWindow(m_window);
    SDL_Quit();
}