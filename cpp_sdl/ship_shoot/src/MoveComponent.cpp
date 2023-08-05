/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 11:09:20
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 11:38:44
 * @FilePath: /ship_move_02/src/MoveComponent.cpp
 * @Description: 注释信息
 */
#include "MoveComponent.h"
#include "Actor.h"

MoveComponent::MoveComponent(Actor *owner, int update_order) : Component(owner, update_order),
                                                               m_angular_speed(0.0f),
                                                               m_forward_speed(0.0f)
{
}

void MoveComponent::Update(float delta_time)
{
    if (!Math::NearZero(m_angular_speed))
    {
        float rot = m_owner->GetRotation();
        rot += m_angular_speed * delta_time;
        m_owner->SetRotation(rot);
    }

    if (!Math::NearZero(m_forward_speed))
    {
        Vector2 pos = m_owner->GetPosition();
        pos += m_forward_speed * delta_time * m_owner->GetForward();

        // (Screen wrapping code only for asteroids)
        if (pos.x < 0.0f)
        {
            pos.x = 1022.0f;
        }
        else if (pos.x > 1024.0f)
        {
            pos.x = 2.0f;
        }

        if (pos.y < 0.0f)
        {
            pos.y = 766.0f;
        }
        else if (pos.y > 768.0f)
        {
            pos.y = 2.0f;
        }

        m_owner->SetPosition(pos);
    }
}
