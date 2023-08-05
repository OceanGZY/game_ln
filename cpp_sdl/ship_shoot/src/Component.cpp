/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-04 10:11:14
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 19:56:29
 * @FilePath: /ship_move_02/src/Component.cpp
 * @Description: 注释信息
 */
#include "Component.h"
#include "Actor.h"

Component::Component(Actor *owner, int updateOrder) : m_owner(owner), m_updateOrder(updateOrder)
{
    m_owner->AddComponent(this);
}

Component::~Component()
{
    m_owner->RemoveComponent(this);
}

void Component::Update(float deltaTime)
{
    // Do nothing
}