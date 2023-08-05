/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-05 11:41:34
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-05 11:46:07
 * @FilePath: /ship_move_02/include/MyRandom.h
 * @Description: 注释信息
 */
#ifndef __MY_RANDOM_H__
#define __MY_RANDOM_H__

#include <random>
#include "MyMath.h"

class MyRandom
{
private:
    /* data */
    static std::mt19937 s_generator;

public:
    static void Init();

    static void Seed(unsigned int seed);

    static float GetFloat();

    static float GetFloatRange(float min, float max);

    static int GetIntRange(int min, int max);

    // 随机rector
    static Vector2 GetVector(const Vector2 &min, const Vector2 &max);

    // 随机rector
    static Vector3 GetVector(const Vector3 &min, const Vector3 &max);
};

#endif