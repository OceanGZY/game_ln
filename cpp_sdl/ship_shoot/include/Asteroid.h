/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 12:28:01
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 15:15:40
 * @FilePath: /ship_move_02/include/Asteroid.h
 * @Description: 注释信息
 */
#ifndef __ASTEROID_H__
#define __ASTEROID_H__

#include "Actor.h"
class Asteroid : public Actor
{
public:
    Asteroid(class Game *game);
    ~Asteroid();

    class CircleComponent *GetCircle() { return m_circle; }

private:
    class CircleComponent *m_circle;
};
#endif