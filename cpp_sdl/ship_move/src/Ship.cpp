/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-04 11:21:32
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 11:31:38
 * @FilePath: /demo02/src/Ship.cpp
 * @Description: 注释信息
 */
#include "Ship.h"
#include "AnimSpriteComponent.h"
#include "Game.h"

Ship::Ship(Game *game) : Actor(game),
                         m_right_speed(0.0f),
                         m_down_speed(0.0f)
{
    // 创建一个运动精灵
    AnimSpriteComponent *animSpriteComponent = new AnimSpriteComponent(this);

    std::vector<SDL_Texture *> textures = {
        game->LoadTexture("Assets/Ship01.png"),
        game->LoadTexture("Assets/Ship02.png"),
        game->LoadTexture("Assets/Ship03.png"),
        game->LoadTexture("Assets/Ship04.png"),
    };
    animSpriteComponent->SetAnimTextures(textures);
}

void Ship::UpdateActor(float deltaTime)
{
    Actor ::UpdateActor(deltaTime);

    // 基于速度和时间 更新位置
    Vector2 pos = GetPosition();
    pos.x += m_right_speed * deltaTime;
    pos.y += m_down_speed * deltaTime;

    if (pos.x < 25.0f)
    {
        pos.x = 25.0f;
    }
    else if (pos.x > 500.0f)
    {
        pos.x = 500.0f;
    }

    if (pos.y < 25.0f)
    {
        pos.y = 25.0f;
    }

    else if (pos.y > 743.0f)
    {
        pos.y = 743.0f;
    }

    SetPosition(pos);
}

void Ship::ProcessKeyBoard(const uint8_t *state)
{
    m_right_speed = 0.0f;
    m_down_speed = 0.0f;

    if (state[SDL_SCANCODE_D])
    {
        m_right_speed += 250.0f;
    }
    if (state[SDL_SCANCODE_A])
    {
        m_right_speed -= 250.0f;
    }
    if (state[SDL_SCANCODE_S])
    {
        m_down_speed += 300.0f;
    }
    if (state[SDL_SCANCODE_W])
    {
        m_down_speed -= 300.0f;
    }
}