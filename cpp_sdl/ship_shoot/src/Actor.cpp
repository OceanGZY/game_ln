/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-04 11:11:12
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 19:59:15
 * @FilePath: /ship_move_02/src/Actor.cpp
 * @Description: 注释信息
 */
#include "Actor.h"
#include "Game.h"
#include "Component.h"
#include <algorithm>
#include <iostream>

Actor::Actor(Game *game) : m_state(EActive),
                           m_position(Vector2::ZERO),
                           m_scale(1.0f),
                           m_rotation(0.0f),
                           m_game(game)
{
    m_game->AddActor(this);
}

Actor::~Actor()
{
    m_game->RemoveActor(this);

    while (!m_components.empty())
    {
        delete m_components.back();
    }
}

void Actor::Update(float deltaTime)
{
    if (m_state == EActive)
    {
        UpdateComponents(deltaTime);
        UpdateActor(deltaTime);
    }
}

void Actor::UpdateComponents(float deltaTime)
{
    for (auto component : m_components)
    {
        component->Update(deltaTime);
    }
}

void Actor::UpdateActor(float deltaTime)
{
}

void Actor::ActorInput(const uint8_t *key_state)
{
}

void Actor::ProcessInput(const uint8_t *key_state)
{
    // std::cout << "Actor::ProcessInput" << *key_state << std::endl;
    if (m_state == EActive)
    {
        for (auto cpm : m_components)
        {
            cpm->ProcessInput(key_state);
        }
        ActorInput(key_state);
    }
}

void Actor::AddComponent(Component *component)
{
    int _m_order = component->GetUpdateOrder();
    auto iter = m_components.begin();
    for (; iter != m_components.end(); ++iter)
    {
        if (_m_order < (*iter)->GetUpdateOrder())
        {
            break;
        }
    }
    // 在迭代器位置前面插入元素
    m_components.insert(iter, component);
}

void Actor::RemoveComponent(Component *component)
{

    auto iter = std::find(m_components.begin(), m_components.end(), component);
    if (iter != m_components.end())
    {
        m_components.erase(iter);
    }
}
