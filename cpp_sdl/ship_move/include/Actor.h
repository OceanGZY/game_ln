/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 20:15:09
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 11:34:28
 * @FilePath: /demo02/include/Actor.h
 * @Description: 注释信息
 */
#ifndef __ACTOR_H__
#define __ACTOR_H__

#include <vector>
#include "MyMath.h"

class Actor
{
public:
    enum State
    {
        EActive,
        EPaused,
        Edead
    };

    Actor(class Game *game);
    virtual ~Actor();

    // update game
    void Update(float deltaTime);

    // 更新所有components
    void UpdateComponents(float deltaTime);

    //  更新actor
    virtual void UpdateActor(float deltaTime);

    // 获取actor的position
    const Vector2 &GetPosition() const
    {
        return m_position;
    }

    // 设置actor的position
    void SetPosition(const Vector2 &position)
    {
        m_position = position;
    };

    // 设置actor的scale
    void SetScale(float scale)
    {
        m_scale = scale;
    }
    // 获取actor的scale
    float GetScale() const
    {
        return m_scale;
    }

    // 获取actor的rotation
    const float GetRotation() const
    {
        return m_rotation;
    }
    // 设置actor的rotation
    void SetRotation(float rotation)
    {
        m_rotation = rotation;
    }

    // 获取actor的state
    State GetState() const
    {
        return m_state;
    }
    // 设置actor的state
    void SetState(State state)
    {
        m_state = state;
    }

    class Game *GetGame() { return m_game; }

    void AddComponent(class Component *component);

    void RemoveComponent(class Component *component);

private:
    /* data */
    State m_state; // actor 状态

    // 变换
    float m_scale;
    float m_rotation;
    Vector2 m_position;

    std::vector<class Component *> m_components;
    class Game *m_game;
};

#endif