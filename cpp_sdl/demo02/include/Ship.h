/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 20:15:28
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-03 23:17:30
 * @FilePath: /demo02/include/Ship.h
 * @Description: 注释信息
 */
#ifndef __SHIP_H__
#define __SHIP_H__

class Ship : public Actor
{
private:
    /* data */
    float m_right_speed;
    float m_down_speed;

public:
    Ship(class Game *game);
    void UpdateActor(float deltaTime);
    void ProcessKeyBoard(const uint8_t *state);

    float GetRightSpeed() const { return m_right_speed; }
    float GetDownSpeed() const { return m_down_speed; }
};

#endif