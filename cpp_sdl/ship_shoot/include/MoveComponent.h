#ifndef __MOVE_COMPONENT_H__
#define __MOVE_COMPONENT_H__

#include "Component.h"

class MoveComponent : public Component
{
private:
    /* data */
    float m_angular_speed; // 控制旋转  radians / scends
    float m_forward_speed; // 控制前进 units / scends
public:
    MoveComponent(class Actor *owner, int update_order = 10);

    void Update(float delta_time) override;

    void SetForwardSpeed(float speed) { m_forward_speed = speed; }
    void SetAngularSpeed(float speed) { m_angular_speed = speed; }

    float GetAngularSpeed() { return m_angular_speed; }
    float GetForwardSpeed() { return m_forward_speed; }
};

#endif