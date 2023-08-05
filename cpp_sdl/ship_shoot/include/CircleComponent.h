/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 10:27:46
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 10:43:03
 * @FilePath: /ship_move_02/include/CircleComponent.h
 * @Description: 注释信息
 */
#ifndef __CIRCLE_COMPONENT_H__
#define __CIRCLE_COMPONENT_H__
#include "Component.h"
#include "MyMath.h"

class CircleComponent : public Component
{
public:
    CircleComponent(class Actor *owner);

    void SetRadius(float radius) { m_radius = radius; }

    float GetRadius() const;

    const Vector2 &GetCenter() const;

private:
    float m_radius;
};

bool Intersect(const CircleComponent &a, const CircleComponent &b);
#endif