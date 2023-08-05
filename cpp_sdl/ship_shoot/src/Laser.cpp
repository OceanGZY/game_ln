/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 12:53:58
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 13:02:33
 * @FilePath: /ship_move_02/src/Laser.cpp
 * @Description: 注释信息
 */
#include "Laser.h"
#include "SpriteComponent.h"
#include "MoveComponent.h"
#include "Game.h"
#include "CircleComponent.h"
#include "Asteroid.h"

Laser::Laser(Game *game) : Actor(game), m_death_timer(1.0f)
{

    SpriteComponent *m_sprite = new SpriteComponent(this);
    m_sprite->SetTexture(game->LoadTexture("Assets/Laser.png"));

    MoveComponent *m_move = new MoveComponent(this);
    m_move->SetForwardSpeed(800.0f);

    circle_component = new CircleComponent(this);
    circle_component->SetRadius(10.0f);
}

void Laser::UpdateActor(float delta_time)
{
    m_death_timer -= delta_time;

    if (m_death_timer <= 0.0f)
    {
        SetState(Edead);
    }
    else
    {
        for (auto ast : GetGame()->GetAsteroids())
        {
            if (Intersect(*circle_component, *(ast->GetCircle())))
            {
                SetState(Edead);
                ast->SetState(Edead);
                break;
            }
        }
    }
}