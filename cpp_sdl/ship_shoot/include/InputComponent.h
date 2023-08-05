/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 12:12:31
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 12:21:41
 * @FilePath: /ship_move_02/include/InputComponent.h
 * @Description: 注释信息
 */
#ifndef __INPUT_COMPONENT_H__
#define __INPUT_COMPONENT_H__

#include "MoveComponent.h"
#include <cstdint>

class InputComponent : public MoveComponent
{
public:
    InputComponent(class Actor *owner);

    void ProcessInput(const uint8_t *key_state) override;

    float GetMaxForward() const { return m_max_forward_speed; }
    float GetMaxAngular() const { return m_max_angular_speed; }
    int GetForwardKey() const { return m_forward_key; }
    int GetBackwardKey() const { return m_backward_key; }
    int GetClockwiseKey() const { return m_clockwise_key; }
    int GetCounterClockwiseKey() const { return m_counter_clockwise_key; }

    void SetMaxForward(float max_forward_speed) { m_max_forward_speed = max_forward_speed; }
    void SetMaxAngular(float max_angular_speed) { m_max_angular_speed = max_angular_speed; }
    void SetForwardKey(int forward_key) { m_forward_key = forward_key; }
    void SetBackwardKey(int backward_key) { m_backward_key = backward_key; }
    void SetClockwiseKey(int clockwise_key) { m_clockwise_key = clockwise_key; }
    void SetCounterClockwiseKey(int counter_clockwise_key) { m_counter_clockwise_key = counter_clockwise_key; }

private:
    float m_max_forward_speed;
    float m_max_angular_speed;

    int m_forward_key;
    int m_backward_key;

    int m_clockwise_key;
    int m_counter_clockwise_key;
};
#endif