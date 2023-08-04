/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-04 10:37:42
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 11:10:26
 * @FilePath: /demo02/src/BGSpriteComponent.cpp
 * @Description: 注释信息
 */
#include "BGSpriteComponent.h"
#include "Actor.h"

BGSpriteComponent::BGSpriteComponent(Actor *owner, int drawOrder) : SpriteComponent(owner, drawOrder),
                                                                    m_scroll_speed(0.0f) {}

void BGSpriteComponent::Update(float deltaTime)
{
    SpriteComponent::Update(deltaTime);

    for (auto &bg : m_bg_textures)
    {
        // 更新X 的offset 偏移量
        bg.m_offset.x += m_scroll_speed * deltaTime;

        // 如果移出到屏幕外部，重置偏移量到最后一个 bg txture右边
        if (bg.m_offset.x < -m_screen_size.x)
        {
            bg.m_offset.x = (m_bg_textures.size() - 1) * m_screen_size.x - 1;
        }
    }
}

void BGSpriteComponent::Draw(SDL_Renderer *renderer)
{
    for (auto &bg : m_bg_textures)
    {
        SDL_Rect r;

        r.w = static_cast<int>(m_screen_size.x);
        r.h = static_cast<int>(m_screen_size.y);

        r.x = static_cast<int>(m_owner->GetPosition().x - r.w / 2 + bg.m_offset.x);
        r.y = static_cast<int>(m_owner->GetPosition().y - r.h / 2 + bg.m_offset.y);

        //  绘制背景
        SDL_RenderCopy(renderer, bg.m_texture, NULL, &r);
    }
}

void BGSpriteComponent::SetBGTextures(const std::vector<SDL_Texture *> &textures)
{
    int cout = 0;
    for (auto tex : textures)
    {
        BGTexture bg;
        bg.m_texture = tex;
        bg.m_offset.x = cout * m_screen_size.x;
        m_bg_textures.emplace_back(bg);
        cout++;
    }
}