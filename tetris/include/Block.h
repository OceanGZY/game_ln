/*
 * @Author: OCEAN.GZY
 * @Date: 2023-07-27 00:00:13
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-07-27 11:04:57
 * @FilePath: /tetris/include/Block.h
 * @Description: 注释信息
 */
#ifndef __BLOCK_H__
#define __BLOCK_H__

class Block
{
private:
    /* data */

public:
    Block(/* args */);
    ~Block();
    int blocks[7][4] = {
        {1, 3, 5, 7},  // I
        {2, 4, 5, 7},  // 左竖Z
        {3, 5, 4, 6},  // 右竖Z
        {3, 5, 4, 7},  // 左T
        {2, 3, 5, 7},  // L
        {3, 5, 6, 7},  // J
        {2, 3, 4, 5}}; // 田
};

#endif
