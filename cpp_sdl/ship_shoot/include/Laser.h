#ifndef __LASER_H__
#define __LASER_H__

#include "Actor.h"
class Laser : public Actor
{
private:
    /* data */
    class CircleComponent *circle_component;
    float m_death_timer;

public:
    Laser(class Game *game);

    void UpdateActor(float delta_time) override;
};

#endif