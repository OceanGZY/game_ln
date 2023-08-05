/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-03 23:48:56
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 10:36:01
 * @FilePath: /demo02/include/AnimSpriteComponent.h
 * @Description: 注释信息
 */
#ifndef __ANIM_SPRITE_COMPONENT_H__
#define __ANIM_SPRITE_COMPONENT_H__

#include "SpriteComponent.h"
#include <vector>

class AnimSpriteComponent : public SpriteComponent
{
private:
    /* data */
    // 所有的动画的材质
    std::vector<SDL_Texture *> m_anim_textures;

    // 当前帧
    float m_curr_frame;

    // 帧速度
    float m_anim_fps;

public:
    AnimSpriteComponent(class Actor *owner, int drawOrder = 100);

    // 更新动画
    void Update(float deltaTime) override;

    // 设置动画贴图
    void SetAnimTextures(const std::vector<SDL_Texture *> &textures);

    float GetAnimFps() const { return m_anim_fps; }

    void SetAnimFps(float fps) { m_anim_fps = fps; }
};

#endif