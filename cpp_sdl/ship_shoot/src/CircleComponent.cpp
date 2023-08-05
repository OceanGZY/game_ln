/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 10:37:40
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 10:49:15
 * @FilePath: /ship_move_02/src/CircleComponent.cpp
 * @Description: 注释信息
 */
#include "CircleComponent.h"
#include "Actor.h"

CircleComponent::CircleComponent(Actor *owner) : Component(owner),
                                                 m_radius(0.0f)
{
}

const Vector2 &CircleComponent::GetCenter() const
{
    return m_owner->GetPosition();
}

float CircleComponent::GetRadius() const
{
    return m_radius;
}

bool Intersect(const CircleComponent &a, const CircleComponent &b)
{
    Vector2 diff = a.GetCenter() - b.GetCenter();
    float distanceSq = diff.LengthSquared();

    // 计算半径和的平方

    float radiusSq = a.GetRadius() + b.GetRadius();
    radiusSq *= radiusSq;

    return distanceSq <= radiusSq;
}