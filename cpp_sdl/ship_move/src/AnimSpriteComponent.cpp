/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-04 10:28:31
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 11:34:33
 * @FilePath: /demo02/src/AnimSpriteComponent.cpp
 * @Description: 注释信息
 */
#include "AnimSpriteComponent.h"
#include "MyMath.h"

AnimSpriteComponent::AnimSpriteComponent(Actor *owner, int drawOrder) : SpriteComponent(owner, drawOrder),
                                                                        m_curr_frame(0),
                                                                        m_anim_fps(24.0f)
{
}

void AnimSpriteComponent::Update(float deltaTime)
{
    SpriteComponent::Update(deltaTime);

    if (m_anim_textures.size() > 0)
    {
        m_curr_frame += 1.0f / m_anim_fps * deltaTime;

        // wrap current frame
        while (m_curr_frame >= m_anim_textures.size())
        {
            m_curr_frame -= m_anim_textures.size();
        }

        // 设置当前texture
        SetTexture(m_anim_textures[static_cast<int>(m_curr_frame)]);
    }
}

void AnimSpriteComponent::SetAnimTextures(const std::vector<SDL_Texture *> &textures)
{

    m_anim_textures = textures;

    if (m_anim_textures.size() > 0)
    {
        // 设置激活的texture到第一帧
        m_curr_frame = 0;
        SetTexture(m_anim_textures[0]);
    }
}
