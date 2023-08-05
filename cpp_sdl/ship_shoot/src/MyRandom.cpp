#include "MyRandom.h"

void MyRandom::Init()
{
    std::random_device rd;
    MyRandom::Seed(rd());
}

void MyRandom::Seed(unsigned int seed)
{
    s_generator.seed(seed);
}

float MyRandom::GetFloat()
{
    return GetFloatRange(0.0f, 1.0f);
}

int MyRandom::GetIntRange(int min, int max)
{
    std::uniform_int_distribution<int> dist(min, max);
    return dist(s_generator);
}

float MyRandom::GetFloatRange(float min, float max)
{
    std::uniform_real_distribution<float> dist(min, max);
    return dist(s_generator);
}

Vector2 MyRandom::GetVector(const Vector2 &min, const Vector2 &max)
{
    Vector2 result = Vector2(GetFloat(), GetFloat());
    return min + (max - min) * result;
}

Vector3 MyRandom::GetVector(const Vector3 &min, const Vector3 &max)
{
    Vector3 result = Vector3(GetFloat(), GetFloat(), GetFloat());
    return min + (max - min) * result;
}

std::mt19937 MyRandom::s_generator;