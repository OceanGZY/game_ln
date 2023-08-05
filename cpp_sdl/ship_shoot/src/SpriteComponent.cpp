/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-04 10:14:30
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 10:27:42
 * @FilePath: /demo02/src/SpriteComponent.cpp
 * @Description: 注释信息
 */
#include "SpriteComponent.h"
#include "Actor.h"
#include "Game.h"

SpriteComponent::SpriteComponent(Actor *owner, int drawOrder)
    : Component(owner),
      m_draw_order(drawOrder),
      m_tex_width(0),
      m_tex_height(0),
      m_texture(nullptr)
{
    m_owner->GetGame()->AddSprite(this);
}

SpriteComponent::~SpriteComponent()
{
    m_owner->GetGame()->RemoveSprite(this);
}

void SpriteComponent::SetTexture(SDL_Texture *texture)
{
    m_texture = texture;
    SDL_QueryTexture(m_texture, NULL, NULL, &m_tex_width, &m_tex_height);
}

void SpriteComponent::Draw(SDL_Renderer *renderer)
{
    if (m_texture)
    {
        SDL_Rect r;

        r.w = static_cast<int>(m_tex_width * m_owner->GetScale());
        r.h = static_cast<int>(m_tex_height * m_owner->GetScale());

        r.x = static_cast<int>(m_owner->GetPosition().x - r.w / 2);
        r.y = static_cast<int>(m_owner->GetPosition().y - r.h / 2);

        // 绘制(必须将角度从弧度转换为度，顺时针转换为反时针)
        SDL_RenderCopyEx(
            renderer,
            m_texture,
            NULL,
            &r,
            -Math::ToDegrees(m_owner->GetRotation()),
            NULL,
            SDL_FLIP_NONE);
    }
}