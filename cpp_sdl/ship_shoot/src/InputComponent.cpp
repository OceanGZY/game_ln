/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 12:22:15
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 12:27:06
 * @FilePath: /ship_move_02/src/InputComponent.cpp
 * @Description: 注释信息
 */
#include "InputComponent.h"
#include "Actor.h"

InputComponent::InputComponent(Actor *owner) : MoveComponent(owner),
                                               m_forward_key(0),
                                               m_backward_key(0),
                                               m_clockwise_key(0),
                                               m_counter_clockwise_key(0)
{
}

void InputComponent::ProcessInput(const uint8_t *key_state)
{
    float forward_speed = 0.0f;
    if (key_state[m_forward_key])
    {
        forward_speed += m_max_forward_speed;
    }
    if (key_state[m_backward_key])
    {
        forward_speed -= m_max_forward_speed;
    }

    SetForwardSpeed(forward_speed);
    
    float clockwise_speed = 0.0f;
    if (key_state[m_clockwise_key])
    {
        clockwise_speed += m_max_angular_speed;
    }
    if (key_state[m_counter_clockwise_key])
    {
        clockwise_speed -= m_max_angular_speed;
    }

    // Set the new speeds

    SetAngularSpeed(clockwise_speed);
}