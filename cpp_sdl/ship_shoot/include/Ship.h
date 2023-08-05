/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 20:15:28
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 19:24:25
 * @FilePath: /ship_move_02/include/Ship.h
 * @Description: 注释信息
 */
#ifndef __SHIP_H__
#define __SHIP_H__

#include "Actor.h"

class Ship : public Actor
{
private:
    /* data */
    float m_laser_cooldown;

public:
    Ship(class Game *game);
    void UpdateActor(float deltaTime) override;
    void ActorInput(const uint8_t *key_state) override;
};

#endif