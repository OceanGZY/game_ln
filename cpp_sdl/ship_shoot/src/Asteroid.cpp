/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 15:15:55
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 15:24:20
 * @FilePath: /ship_move_02/src/Asteroid.cpp
 * @Description: 注释信息
 */
#include "Asteroid.h"
#include "SpriteComponent.h"
#include "MoveComponent.h"
#include "Game.h"
#include "MyRandom.h"
#include "CircleComponent.h"

Asteroid::Asteroid(Game *game) : Actor(game),
                                 m_circle(nullptr)
{
    Vector2 randPos = MyRandom::GetVector(Vector2::ZERO, Vector2(1024.0f, 768.0f));
    SetPosition(randPos);

    SetRotation(MyRandom::GetFloatRange(0.0f, Math::TwoPi));

    SpriteComponent *spriteComponent = new SpriteComponent(this);
    spriteComponent->SetTexture(game->LoadTexture("Assets/Asteroid.png"));

    MoveComponent *moveComponent = new MoveComponent(this);
    moveComponent->SetForwardSpeed(150.0f);

    m_circle = new CircleComponent(this);
    m_circle->SetRadius(40.0f);

    game->AddAsteroid(this);
}

Asteroid::~Asteroid()
{
    GetGame()->RemoveAsteroid(this);
}
