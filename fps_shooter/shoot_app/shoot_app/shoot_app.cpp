// shoot_app.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>
#include <string>
#include <Windows.h>

int mScreenWidth = 120;
int mScreenHeight = 40;
bool mIsRuning = true;

float fPlayerX = 8.0f;
float fPlayerY = 8.0f;
float fPlayerA = 0.0f;

float fFov = 3.14159 / 4.0f;
float fDEpth = 16.0f;

int nMapWidth = 16;
int nMapHeight = 16;

int main()
{


    // 创建 screen buffer
    wchar_t* screen = new wchar_t[mScreenWidth*mScreenHeight];
    HANDLE hConsole = CreateConsoleScreenBuffer(GENERIC_READ | GENERIC_WRITE,
        0,
        NULL,
        CONSOLE_TEXTMODE_BUFFER,
        NULL);

    SetConsoleActiveScreenBuffer(hConsole);
    DWORD dwBytesWritten = 0;


    std::wstring map;

    map += L"################";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"#                            #";
    map += L"################";

    // Game loop
    while (mIsRuning) {
        for (int x = 0; x < mScreenWidth; x++) {
            float fRayAngle = (fPlayerA - fFov / 2.0f) + ((float)x / (float)mScreenWidth) * fFov;

            float fDistanceToWall = 0;

            bool bHitWall = false;

            float fEyeX= sinf(fRayAngle);
            float fEyeY = cosf(fRayAngle);

            while (!bHitWall && fDistanceToWall < fDEpth) {
                fDistanceToWall += 0.1f;

                int nTestX = (int)(fPlayerX + fEyeX * fDistanceToWall);
                int nTestY = (int)(fPlayerY + fEyeY * fDistanceToWall);

                if (nTestX < 0 || nTestX >= nMapWidth || nTestY < 0 || nTestY >= nMapHeight) {
                    bHitWall = true;
                    fDistanceToWall = fDEpth;
                }
                else {
                    if (map[nTestY * nMapWidth + nTestX] == '#') {
                        bHitWall = true;
                    }
                }
            }

            int nCeiling = (float)(mScreenHeight / 2.0) - mScreenHeight / ((float)fDistanceToWall);
            int nFloor = mScreenHeight - nCeiling;

            for (int y = 0; y < mScreenHeight; y++)
            {
                if (y < nCeiling)
                {
                    screen[y * mScreenWidth + x] = ' ';
                }
                else if(y > nCeiling && y <=nFloor){
                    screen[y * mScreenWidth + x] = '#';
                }
                else {
                    screen[y * mScreenWidth + x] = ' ';
                }

            }


        }
    }


    std::cout << "Hello World!\n";
}

// 运行程序: Ctrl + F5 或调试 >“开始执行(不调试)”菜单
// 调试程序: F5 或调试 >“开始调试”菜单

// 入门使用技巧: 
//   1. 使用解决方案资源管理器窗口添加/管理文件
//   2. 使用团队资源管理器窗口连接到源代码管理
//   3. 使用输出窗口查看生成输出和其他消息
//   4. 使用错误列表窗口查看错误
//   5. 转到“项目”>“添加新项”以创建新的代码文件，或转到“项目”>“添加现有项”以将现有代码文件添加到项目
//   6. 将来，若要再次打开此项目，请转到“文件”>“打开”>“项目”并选择 .sln 文件
