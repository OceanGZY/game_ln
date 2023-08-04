/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-03 23:19:36
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 10:20:03
 * @FilePath: /demo02/include/Component.h
 * @Description: 注释信息
 */
#ifndef __MY_COMPONENT_H__
#define __MY_COMPONENT_H__

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

    int GetUpdateOrder() const
    {
        return m_updateOrder;
    }
};

#endif