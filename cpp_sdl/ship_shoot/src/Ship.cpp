/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-04 11:21:32
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 18:24:09
 * @FilePath: /ship_move_02/src/Ship.cpp
 * @Description: 注释信息
 */
#include "Ship.h"
#include "SpriteComponent.h"
#include "InputComponent.h"
#include "Game.h"
#include "Laser.h"

Ship::Ship(Game *game) : Actor(game),
                         m_laser_cooldown(0.0f)
{
    SpriteComponent *sc = new SpriteComponent(this,150);
    sc->SetTexture(game->LoadTexture("Assets/ship.png"));

    InputComponent *ic = new InputComponent(this);
    ic->SetForwardKey(SDL_SCANCODE_W);
    ic->SetBackwardKey(SDL_SCANCODE_S);
    ic->SetClockwiseKey(SDL_SCANCODE_A);
    ic->SetCounterClockwiseKey(SDL_SCANCODE_D);
    ic->SetMaxAngular(300.0f);
    ic->SetMaxForward(Math::TwoPi);
}

void Ship::UpdateActor(float deltaTime)
{
    m_laser_cooldown -= deltaTime;
}

void Ship::ActorInput(const uint8_t *key_state)
{
    if (key_state[SDL_SCANCODE_SPACE] && m_laser_cooldown <= 0.0f)
    {
        Laser *laser = new Laser(GetGame());
        laser->SetPosition(GetPosition());
        laser->SetRotation(GetRotation());

        // Add the laser to the game
        m_laser_cooldown = 0.5f;
    }
}
