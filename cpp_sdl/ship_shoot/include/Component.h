/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-03 23:19:36
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 11:33:33
 * @FilePath: /ship_move_02/include/Component.h
 * @Description: 注释信息
 */
#ifndef __MY_COMPONENT_H__
#define __MY_COMPONENT_H__

#include <cstdint>

class Component
{
protected:
    /* data */
    // owner actor
    class Actor *m_owner;

    // 更新order
    int m_updateOrder;

public:
    Component(class Actor *owner, int updaeOrder = 100);
    virtual ~Component();

    virtual void Update(float deltaTime);

    virtual void ProcessInput(const uint8_t *key_state) {}

    int GetUpdateOrder() const
    {
        return m_updateOrder;
    }
};

#endif