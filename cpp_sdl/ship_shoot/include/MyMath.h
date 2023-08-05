/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 23:39:13
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 21:59:11
 * @FilePath: /demo02/include/MyMath.h
 * @Description: 注释信息
 */
#ifndef __MY_MATH_H__
#define __MY_MATH_H__

#include <cmath>
#include <memory.h>
#include <limits>

namespace Math
{
    const float Pi = 3.1415926535f;
    const float TwoPi = Pi * 2.0f;
    const float HalfPi = Pi / 2.0f;
    const float Infinity = std::numeric_limits<float>::infinity();
    const float NegInfinity = -Infinity;

    inline float ToRadians(float degrees)
    {
        return degrees * Pi / 180.0f;
    }

    inline float ToDegrees(float radians)
    {
        return radians * 180.0f / Pi;
    }

    inline bool NearZero(float val, float epsilon = 0.001f)
    {
        if (fabs(val) <= epsilon)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    template <typename T>
    T Min(const T &a, const T &b)
    {
        retun(a < b ? a : b);
    }

    template <typename T>
    T Max(const T &a, const T &b)
    {
        retun(a < b ? b : a);
    }

    template <typename T>
    T Clamp(const T &val, const T &min, const T &max)
    {
        return Min(max, Max(min, val));
    }

    inline float Abs(float val)
    {
        return fabs(val);
    }

    inline float Cos(float angle)
    {
        return cos(angle);
    }

    inline float Sin(float angle)
    {
        return sin(angle);
    }

    inline float Tan(float angle)
    {
        return tan(angle);
    }

    inline float ACos(float val)
    {
        return acos(val);
    }

    inline float ASin(float val)
    {
        return asin(val);
    }

    inline float ATan(float val)
    {
        return atan(val);
    }

    inline float ATan2(float y, float x)
    {
        return atan2(y, x);
    }

    inline float Log(float val)
    {
        return log(val);
    }
    inline float Cot(float angle)
    {
        return 1.0f / Tan(angle);
    }

    inline float Exp(float val)
    {
        return exp(val);
    }

    inline float Lerp(float a, float b, float t)
    {
        return a + (b - a) * t;
    }

    inline float Sqrt(float val)
    {
        return sqrt(val);
    }

    inline float Fmod(float number, float denom)
    {
        return fmod(number, denom);
    }

} // namespace Math

// 2d vector
class Vector2
{
public:
    float x, y;

    Vector2()
    {
        x = 0.0f;
        y = 0.0f;
    }

    explicit Vector2(float inX, float inY)
    {
        x = inX;
        y = inY;
    }

    Vector2(const Vector2 &v)
    {
        this->x = v.x;
        this->y = v.y;
    }

    // 设置 组件在一行
    void Set(float inX, float inY)
    {
        x = inX;
        y = inY;
    }

    //  vector a+b
    friend Vector2 operator+(const Vector2 &a, const Vector2 &b)
    {
        return Vector2(a.x + b.x, a.y + b.y);
    }

    // vector a-b
    friend Vector2 operator-(const Vector2 &a, const Vector2 &b)
    {
        return Vector2(a.x - b.x, a.y - b.y);
    }

    // vector a*b
    friend Vector2 operator*(const Vector2 &a, const Vector2 &b)
    {
        return Vector2(a.x * b.x, a.y * b.y);
    }

    // vector a 乘 标量b
    friend Vector2 operator*(const Vector2 &a, float b)
    {
        return Vector2(a.x * b, a.y * b);
    }

    // 标量a 乘 vector b
    friend Vector2 operator*(float a, const Vector2 &b)
    {
        return Vector2(a * b.x, a * b.y);
    }

    // *= 标量
    Vector2 &operator*=(float b)
    {
        x *= b;
        y *= b;
        return *this;
    }

    // += vector
    Vector2 &operator+=(const Vector2 &right)
    {
        x += right.x;
        y += right.y;
        return *this;
    }

    // -= vector
    Vector2 &operator-=(const Vector2 &right)
    {
        x -= right.x;
        y -= right.y;
        return *this;
    }

    // vector 向量长度的平方
    float LengthSquared()
    {
        return x * x + y * y;
    }

    // vector 向量长度
    float Length() const
    {
        return Math::Sqrt(x * x + y * y);
    }

    // 当前 vector 标准化【归一化】
    void Normalize()
    {
        float length = Length();
        x /= length;
        y /= length;
    }

    // 指定vector 标准化【归一化】
    static Vector2 Normalized(const Vector2 &vec)
    {
        Vector2 normalized = vec;
        normalized.Normalize();
        return normalized;
    }

    // vector 点乘
    static float Dot(const Vector2 &a, const Vector2 &b)
    {
        return a.x * b.x + a.y * b.y;
    }

    // lerp from a to b by f
    static Vector2 Lerp(const Vector2 &a, const Vector2 &b, float f)
    {
        return a + f * (b - a);
    }

    // Reflect V about (normalized) N
    static Vector2 Reflect(const Vector2 &V, const Vector2 &N)
    {
        return V - 2 * Dot(V, N) * N;
    }

    // 将vector转换为 matrix
    static Vector2 Transform(const Vector2 &vec, const class Matrix3 &mat, float w = 1.0f);

    static const Vector2 ZERO;
    static const Vector2 UNIT_X;
    static const Vector2 UNIT_Y;
    static const Vector2 NegUnitX;
    static const Vector2 NegUnitY;
};

// 3d vector
class Vector3
{
public:
    float x, y, z;

    Vector3()
        : x(0.0f), y(0.0f), z(0.0f)
    {
    }

    explicit Vector3(float inX, float inY, float inZ)
        : x(inX), y(inY), z(inZ)
    {
    }

    // 转换为一个const float 指针
    const float *GetAsFloatPtr() const
    {
        return reinterpret_cast<const float *>(&x);
    }

    //  将三个组件放在一行
    void Set(float inX, float inY, float inZ)
    {
        x = inX;
        y = inY;
        z = inZ;
    }

    // vector a + b
    friend Vector3 operator+(const Vector3 &a, const Vector3 &b)
    {
        return Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    // vector a - b
    friend Vector3 operator-(const Vector3 &a, const Vector3 &b)
    {
        return Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    // vector a * b
    friend Vector3 operator*(const Vector3 &a, const Vector3 &b)
    {
        return Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    }

    // 标量 a  * vector b
    friend Vector3 operator*(float a, const Vector3 &b)
    {
        return Vector3(a * b.x, a * b.y, a * b.z);
    }

    // vector a * 标量 b
    friend Vector3 operator*(const Vector3 &a, float b)
    {
        return Vector3(a.x * b, a.y * b, a.z * b);
    }

    // *= 标量a
    Vector3 &operator*=(float a)
    {
        x *= a;
        y *= a;
        z *= a;
        return *this;
    }

    // += vector a
    Vector3 &operator+=(const Vector3 &right)
    {
        x += right.x;
        y += right.y;
        z += right.z;
        return *this;
    }

    // -= vector a
    Vector3 &operator-=(const Vector3 &right)
    {
        x -= right.x;
        y -= right.y;
        z -= right.z;
        return *this;
    }

    // vector 长度的平方
    float LengthSquared() const
    {
        return x * x + y * y + z * z;
    }

    // vector 长度
    float Length() const
    {
        return Math::Sqrt(LengthSquared());
    }

    // 归一化
    void Normalize()
    {
        float length = Length();
        if (length > 0.0f)
        {
            x /= length;
            y /= length;
            z /= length;
        }
    }

    // 归一化
    static Vector3 Normalize(const Vector3 &vec)
    {
        Vector3 result = vec;
        result.Normalize();
        return result;
    }

    // 点乘
    static float Dot(const Vector3 &left, const Vector3 &right)
    {
        return left.x * right.x + left.y * right.y + left.z * right.z;
    }

    // 差乘
    static Vector3 Cross(const Vector3 &left, const Vector3 &right)
    {
        return Vector3(
            left.y * right.z - left.z * right.y,
            left.z * right.x - left.x * right.z,
            left.x * right.y - left.y * right.x);
    }

    // lerp from a to b by f
    static Vector3 Lerp(const Vector3 &a, const Vector3 &b, float f)
    {
        return a + (b - a) * f;
    }

    // reflect v about (normalized ) n
    static Vector3 Reflect(const Vector3 &v, const Vector3 &n)
    {
        return v - 2.0f * Dot(v, n) * n;
    }

    static Vector3 Transform(const Vector3 &vec, const class Matrix4 &mat, float w = 1.0f);

    // 转换vector 并归一化 w分量
    static Vector3 TransformWithPerspDiv(const Vector3 &vec, const class Matrix4 &mat, float w = 1.0f);

    // 用四元组 转换vector3
    static Vector3 Transform(const Vector3 &vec, const class Quaternion &q);

    static const Vector3 ZERO;
    static const Vector3 UNIT_X;
    static const Vector3 UNIT_Y;
    static const Vector3 UNIT_Z;
    static const Vector3 NegUnitX;
    static const Vector3 NegUnitY;
    static const Vector3 NegUnitZ;
    static const Vector3 Infinity;
    static const Vector3 NegInfinity;
};

// 3*3 Matrix
class Matrix3
{
public:
    float mat[3][3];
    static const Matrix3 Identity;

    Matrix3()
    {
        *this = Matrix3::Identity;
    }

    explicit Matrix3(float inMat[3][3])
    {
        memcpy(mat, inMat, sizeof(float) * 9);
    }

    // 转换为 float 指针
    const float *GetAsFloatPtr() const
    {
        return reinterpret_cast<const float *>(&mat[0][0]);
    }

    // 矩阵乘法
    friend Matrix3 operator*(const Matrix3 &matA, const Matrix3 &matB)
    {
        Matrix3 matC;
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                matC.mat[i][j] = 0.0f;
                for (int k = 0; k < 3; k++)
                {
                    matC.mat[i][j] += matA.mat[i][k] * matB.mat[k][j];
                }
            }
        }

        /***
         *  算法二
         *
        // row 0
        retVal.mat[0][0] =
            left.mat[0][0] * right.mat[0][0] +
            left.mat[0][1] * right.mat[1][0] +
            left.mat[0][2] * right.mat[2][0];

        retVal.mat[0][1] =
            left.mat[0][0] * right.mat[0][1] +
            left.mat[0][1] * right.mat[1][1] +
            left.mat[0][2] * right.mat[2][1];

        retVal.mat[0][2] =
            left.mat[0][0] * right.mat[0][2] +
            left.mat[0][1] * right.mat[1][2] +
            left.mat[0][2] * right.mat[2][2];

        // row 1
        retVal.mat[1][0] =
            left.mat[1][0] * right.mat[0][0] +
            left.mat[1][1] * right.mat[1][0] +
            left.mat[1][2] * right.mat[2][0];

        retVal.mat[1][1] =
            left.mat[1][0] * right.mat[0][1] +
            left.mat[1][1] * right.mat[1][1] +
            left.mat[1][2] * right.mat[2][1];

        retVal.mat[1][2] =
            left.mat[1][0] * right.mat[0][2] +
            left.mat[1][1] * right.mat[1][2] +
            left.mat[1][2] * right.mat[2][2];

        // row 2
        retVal.mat[2][0] =
            left.mat[2][0] * right.mat[0][0] +
            left.mat[2][1] * right.mat[1][0] +
            left.mat[2][2] * right.mat[2][0];

        retVal.mat[2][1] =
            left.mat[2][0] * right.mat[0][1] +
            left.mat[2][1] * right.mat[1][1] +
            left.mat[2][2] * right.mat[2][1];

        retVal.mat[2][2] =
            left.mat[2][0] * right.mat[0][2] +
            left.mat[2][1] * right.mat[1][2] +
            left.mat[2][2] * right.mat[2][2];
        */
        return matC;
    }

    // *= matrix3
    Matrix3 &operator*=(const Matrix3 &right)
    {
        *this = *this * right;
        return *this;
    }

    //  创建一个x,y的缩放矩阵
    static Matrix3 CreateScale(float xScale, float yScale)
    {
        float temp[3][3] = {
            {xScale, 0.0f, 0.0f},
            {0.0f, yScale, 0.0f},
            {0.0f, 0.0f, 1.0f}};
        return Matrix3(temp);
    }

    static Matrix3 CreateScale(const Vector2 &scaleVector)
    {
        return CreateScale(scaleVector.x, scaleVector.y);
    }

    // 使用 uniform factor 创一个缩放矩阵
    static Matrix3 CreateScale(float scale)
    {
        return CreateScale(scale, scale);
    }

    // 创建一个旋转矩阵 , 绕Z轴旋转
    static Matrix3 CreateRotation(float radians)
    {
        float temp[3][3] = {
            {Math::Cos(radians), Math::Sin(radians), 0.0f},
            {-Math::Sin(radians), Math::Cos(radians), 0.0f},
            {0.0f, 0.0f, 1.0f}};
        return Matrix3(temp);
    };

    // 创建一个 转化矩阵（在 xy平面）
    static Matrix3 CreateTranslation(const Vector2 &translationVector)
    {
        float temp[3][3] = {
            {1.0f, 0.0f, 0.0f},
            {0.0f, 1.0f, 0.0f},
            {translationVector.x, translationVector.y, 1.0f}};
        return Matrix3(temp);
    }
};

// 4*4 Matrix

class Matrix4
{
public:
    float mat[4][4];

    static const Matrix4 Identity;

    Matrix4()
    {
        *this = Matrix4::Identity;
    }

    explicit Matrix4(float inMat[4][4])
    {
        memcpy(mat, inMat, sizeof(float) * 16);
    }

    // 转换为float 指针
    const float *GetAsFloatPtr() const
    {
        return reinterpret_cast<const float *>(&mat[0][0]);
    }

    // matrix 乘法 a * b
    friend Matrix4 operator*(const Matrix4 &a, const Matrix4 &b)
    {
        Matrix4 temp;
        for (int i = 0; i < 4; i++)
        {
            for (int j = 0; j < 4; j++)
            {
                temp.mat[i][j] = 0.0f;
                for (int k = 0; k < 4; k++)
                {
                    temp.mat[i][j] += a.mat[i][k] * b.mat[k][j];
                }
            }
        }
        return temp;

        /**
         * 算法二
         *
        Matrix4 retVal;
        // row 0
        retVal.mat[0][0] =
            a.mat[0][0] * b.mat[0][0] +
            a.mat[0][1] * b.mat[1][0] +
            a.mat[0][2] * b.mat[2][0] +
            a.mat[0][3] * b.mat[3][0];

        retVal.mat[0][1] =
            a.mat[0][0] * b.mat[0][1] +
            a.mat[0][1] * b.mat[1][1] +
            a.mat[0][2] * b.mat[2][1] +
            a.mat[0][3] * b.mat[3][1];

        retVal.mat[0][2] =
            a.mat[0][0] * b.mat[0][2] +
            a.mat[0][1] * b.mat[1][2] +
            a.mat[0][2] * b.mat[2][2] +
            a.mat[0][3] * b.mat[3][2];

        retVal.mat[0][3] =
            a.mat[0][0] * b.mat[0][3] +
            a.mat[0][1] * b.mat[1][3] +
            a.mat[0][2] * b.mat[2][3] +
            a.mat[0][3] * b.mat[3][3];

        // row 1
        retVal.mat[1][0] =
            a.mat[1][0] * b.mat[0][0] +
            a.mat[1][1] * b.mat[1][0] +
            a.mat[1][2] * b.mat[2][0] +
            a.mat[1][3] * b.mat[3][0];

        retVal.mat[1][1] =
            a.mat[1][0] * b.mat[0][1] +
            a.mat[1][1] * b.mat[1][1] +
            a.mat[1][2] * b.mat[2][1] +
            a.mat[1][3] * b.mat[3][1];

        retVal.mat[1][2] =
            a.mat[1][0] * b.mat[0][2] +
            a.mat[1][1] * b.mat[1][2] +
            a.mat[1][2] * b.mat[2][2] +
            a.mat[1][3] * b.mat[3][2];

        retVal.mat[1][3] =
            a.mat[1][0] * b.mat[0][3] +
            a.mat[1][1] * b.mat[1][3] +
            a.mat[1][2] * b.mat[2][3] +
            a.mat[1][3] * b.mat[3][3];

        // row 2
        retVal.mat[2][0] =
            a.mat[2][0] * b.mat[0][0] +
            a.mat[2][1] * b.mat[1][0] +
            a.mat[2][2] * b.mat[2][0] +
            a.mat[2][3] * b.mat[3][0];

        retVal.mat[2][1] =
            a.mat[2][0] * b.mat[0][1] +
            a.mat[2][1] * b.mat[1][1] +
            a.mat[2][2] * b.mat[2][1] +
            a.mat[2][3] * b.mat[3][1];

        retVal.mat[2][2] =
            a.mat[2][0] * b.mat[0][2] +
            a.mat[2][1] * b.mat[1][2] +
            a.mat[2][2] * b.mat[2][2] +
            a.mat[2][3] * b.mat[3][2];

        retVal.mat[2][3] =
            a.mat[2][0] * b.mat[0][3] +
            a.mat[2][1] * b.mat[1][3] +
            a.mat[2][2] * b.mat[2][3] +
            a.mat[2][3] * b.mat[3][3];

        // row 3
        retVal.mat[3][0] =
            a.mat[3][0] * b.mat[0][0] +
            a.mat[3][1] * b.mat[1][0] +
            a.mat[3][2] * b.mat[2][0] +
            a.mat[3][3] * b.mat[3][0];

        retVal.mat[3][1] =
            a.mat[3][0] * b.mat[0][1] +
            a.mat[3][1] * b.mat[1][1] +
            a.mat[3][2] * b.mat[2][1] +
            a.mat[3][3] * b.mat[3][1];

        retVal.mat[3][2] =
            a.mat[3][0] * b.mat[0][2] +
            a.mat[3][1] * b.mat[1][2] +
            a.mat[3][2] * b.mat[2][2] +
            a.mat[3][3] * b.mat[3][2];

        retVal.mat[3][3] =
            a.mat[3][0] * b.mat[0][3] +
            a.mat[3][1] * b.mat[1][3] +
            a.mat[3][2] * b.mat[2][3] +
            a.mat[3][3] * b.mat[3][3];

        return retVal;
         *
         */
    }

    // Martrix4  *= Martrix4 a
    Matrix4 &operator*=(const Matrix4 &right)
    {
        *this = *this * right;
        return *this;
    }

    //  Invert the matrix  求矩阵的逆
    void Invert();

    // 获取矩阵的平移分量
    Vector3 GetTranslation() const
    {
        return Vector3(mat[3][0], mat[3][1], mat[3][2]);
    }

    // 获取矩阵的X轴
    Vector3 GetXAxis() const
    {
        return Vector3(mat[0][0], mat[0][1], mat[0][2]);
    }

    // 获取矩阵的Y轴
    Vector3 GetYAxis() const
    {
        return Vector3(mat[1][0], mat[1][1], mat[1][2]);
    }

    // 获取矩阵的Z轴
    Vector3 GetZAxis() const
    {
        return Vector3(mat[2][0], mat[2][1], mat[2][2]);
    }

    // 从矩阵中提取缩放分量
    Vector3 GetScale() const
    {
        return Vector3(GetXAxis().Length(), GetYAxis().Length(), GetZAxis().Length());
    }

    // 创建缩放矩阵（x ,y ,x）
    static Matrix4 CreateScale(float xScale, float yScale, float zScale)
    {
        float temp[4][4] =
            {{xScale, 0.0f, 0.0f, 0.0f},
             {0.0f, yScale, 0.0f, 0.0f},
             {0.0f, 0.0f, zScale, 0.0f},
             {0.0f, 0.0f, 0.0f, 1.0f}};
        return Matrix4(temp);
    }

    static Matrix4 CreateScale(const Vector3 &scaleVector)
    {
        return CreateScale(scaleVector.x, scaleVector.y, scaleVector.z);
    }

    // 创建旋转矩阵
    static Matrix4 CreateRotationX(float angle)
    {
        float temp[4][4] =
            {{1.0f, 0.0f, 0.0f, 0.0f},
             {0.0f, Math::Cos(angle), Math::Sin(angle), 0.0f},
             {0.0f, sin(angle), cos(angle), 0.0f},
             {0.0f, 0.0f, 0.0f, 1.0f}};
        return Matrix4(temp);
    }

    static Matrix4 CreateRotationY(float angle)
    {
        float temp[4][4] =
            {{Math::Cos(angle), 0.0f, -Math::Sin(angle), 0.0f},
             {0.0f, 1.0f, 0.0f, 0.0f},
             {Math::Sin(angle), 0.0f, Math::Cos(angle), 0.0f},
             {0.0f, 0.0f, 0.0f, 1.0f}};
        return Matrix4(temp);
    }

    static Matrix4 CreateRotationZ(float angle)
    {
        float temp[4][4] =
            {{Math::Cos(angle), Math::Sin(angle), 0.0f, 0.0f},
             {-Math::Sin(angle), Math::Cos(angle), 0.0f, 0.0f},
             {0.0f, 0.0f, 1.0f, 0.0f},
             {0.0f, 0.0f, 0.0f, 1.0f}};
        return Matrix4(temp);
    }

    // 使用 四元组 创建一个旋转矩阵
    static Matrix4 CreateFromQuaternion(const Quaternion &quaternion);

    static Matrix4 CreateTranslation(const Vector3 &trans)
    {
        float temp[4][4] = {
            {1.0f, 0.0f, 0.0f, 0.0f},
            {0.0f, 1.0f, 0.0f, 0.0f},
            {0.0f, 0.0f, 1.0f, 0.0f},
            {trans.x, trans.y, trans.z, 1}};
        return Matrix4(temp);
    }

    static Matrix4 CreateLookAt(const Vector3 &eye, const Vector3 &target, const Vector3 &up)
    {
        Vector3 zaxis = Vector3::Normalize(eye - target);
        Vector3 xaxis = Vector3::Normalize(Vector3::Cross(up, zaxis));
        Vector3 yaxis = Vector3::Cross(zaxis, xaxis);
        Vector3 trans;

        trans.x = -Vector3::Dot(xaxis, eye);
        trans.y = -Vector3::Dot(yaxis, eye);
        trans.z = -Vector3::Dot(zaxis, eye);

        float temp[4][4] = {
            {xaxis.x, yaxis.x, zaxis.x, 0.0f},
            {xaxis.y, yaxis.y, zaxis.y, 0.0f},
            {xaxis.z, yaxis.z, zaxis.z, 0.0f},
            {trans.x, trans.y, trans.z, 1.0f}};

        return Matrix4(temp);
    }

    static Matrix4 CreateOrtho(float width, float height, float near, float far)
    {
        float temp[4][4] = {
            {2.0f / width, 0.0f, 0.0f, 0.0f},
            {0.0f, 2.0f / height, 0.0f, 0.0f},
            {0.0f, 0.0f, 1.0f / (far - near), 0.0f},
            {0.0f, 0.0f, near / (near - far), 1.0f}};
        return Matrix4(temp);
    }

    static Matrix4 CreatePerspectiveFOV(float fovy, float width, float height, float near, float far)
    {
        float yScale = Math::Cot(fovy / 2.0f);
        float xScale = yScale * height / width;
        float temp[4][4] = {
            {xScale, 0.0f, 0.0f, 0.0f},
            {0.0f, yScale, 0.0f, 0.0f},
            {0.0f, 0.0f, far / (near - far), 1.0f},
            {0.0f, 0.0f, -near * far / (near - far), 0.0f}};

        return Matrix4(temp);
    }

    //  创建 simple view

    static Matrix4 CreateSimpleViewPrj(float width, float height)
    {
        float temp[4][4] = {
            {2.0f / width, 0.0f, 0.0f, 0.0f},
            {0.0f, 2.0f / height, 0.0f, 0.0f},
            {0.0f, 0.0f, 1.0f, 0.0f},
            {0.0f, 0.0f, 1.0f, 1.0f}};
        return Matrix4(temp);
    }
};

// 四元组 Quaternion
class Quaternion
{
public:
    float x, y, z, w;
    static const Quaternion Identity;

    Quaternion()
    {
        *this = Quaternion::Identity;
    }

    explicit Quaternion(float inX, float inY, float inZ, float inW)
    {
        Set(inX, inY, inZ, inW);
    }

    void Set(float inX, float inY, float inZ, float inW)
    {
        x = inX;
        y = inY;
        z = inZ;
        w = inW;
    }

    void Conjugate()
    {
        x = -x;
        y = -y;
        z = -z;
    }

    Quaternion ConjugateQuaternion() const
    {
        return Quaternion(-x, -y, -z, w);
    }

    float LengthSquared() const
    {
        return x * x + y * y + z * z + w * w;
    }

    float Length() const
    {
        return Math::Sqrt(LengthSquared());
    }

    void Normalize()
    {
        float mag = Length();
        x /= mag;
        y /= mag;
        z /= mag;
        w /= mag;
    }

    static Quaternion Normalize(const Quaternion &q)
    {
        Quaternion result = q;
        result.Normalize();
        return result;
    }

    // 线性插值
    static Quaternion Lerp(const Quaternion &q1, const Quaternion &q2, float t)
    {
        Quaternion retVal;
        retVal.x = Math::Lerp(q1.x, q2.x, t);
        retVal.y = Math::Lerp(q1.y, q2.y, t);
        retVal.z = Math::Lerp(q1.z, q2.z, t);
        retVal.w = Math::Lerp(q1.w, q2.w, t);
        retVal.Normalize();
        return retVal;
    }

    // 点乘
    static float Dot(const Quaternion &q1, const Quaternion &q2)
    {
        return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
    }

    // Spherical Linear Interpolation 球面线性插值
    static Quaternion SLerp(const Quaternion &q1, const Quaternion &q2, float t)
    {

        float rawCosm = Quaternion::Dot(q1, q2);
        float cosom = -rawCosm;
        if (rawCosm >= 0.0f)
        {
            cosom = rawCosm;
        }

        float scale0, scale1;
        if (cosom < 0.9999999f)
        {
            const float omega = Math::Cos(cosom);
            const float invSin = 1.0f / Math::Sin(omega);
            scale0 = Math::Sin((1.0f - t) * omega) / invSin;
            scale1 = Math::Sin(t * omega) / invSin;
        }
        else
        {
            // 如果四元数共线 使用线性插值
            scale0 = 1.0f - t;
            scale1 = t;
        }

        if (rawCosm < 0.0f)
        {
            scale1 = -scale1;
        }

        Quaternion q3;
        q3.x = scale0 * q1.x + scale1 * q2.x;
        q3.y = scale0 * q1.y + scale1 * q2.y;
        q3.z = scale0 * q1.z + scale1 * q2.z;
        q3.w = scale0 * q1.w + scale1 * q2.w;
        q3.Normalize();
        return q3;
    }

    // 依次旋转 q 和p
    static Quaternion Concatenate(const Quaternion &q, const Quaternion &p)
    {
        Quaternion temp;
        Vector3 qv(q.x, q.y, q.z);
        Vector3 pv(p.x, p.y, p.z);

        Vector3 vec = p.w * qv + q.w * pv + Vector3::Cross(pv, qv);
        temp.x = vec.x;
        temp.y = vec.y;
        temp.z = vec.z;

        temp.w = q.w * p.w - Vector3::Dot(pv, qv);
        return temp;
    }
};

namespace Color
{
    static const Vector3 Black(0.0f, 0.0f, 0.0f);
    static const Vector3 White(1.0f, 1.0f, 1.0f);
    static const Vector3 Red(1.0f, 0.0f, 0.0f);
    static const Vector3 Green(0.0f, 1.0f, 0.0f);
    static const Vector3 Blue(0.0f, 0.0f, 1.0f);
    static const Vector3 Yellow(1.0f, 1.0f, 0.0f);
    static const Vector3 LightYellow(1.0f, 1.0f, 0.4f);
    static const Vector3 LightBlue(0.4f, 0.4f, 1.0f);
    static const Vector3 LightGreen(0.4f, 1.0f, 0.4f);
    static const Vector3 LightRed(1.0f, 0.4f, 0.4f);
    static const Vector3 LightPink(1.0f, 0.4f, 0.4f);
    static const Vector3 LightOrange(1.0f, 0.6f, 0.4f);
    static const Vector3 LightPurple(1.0f, 0.4f, 1.0f);
    static const Vector3 LightGrey(0.7f, 0.7f, 0.7f);
    static const Vector3 Grey(0.5f, 0.5f, 0.5f);
    static const Vector3 DarkGrey(0.2f, 0.2f, 0.2f);
    static const Vector3 DarkBlue(0.0f, 0.0f, 0.5f);
    static const Vector3 DarkGreen(0.0f, 0.5f, 0.0f);

} // namespace Color

#endif
