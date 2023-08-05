/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 20:15:22
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-04 10:22:02
 * @FilePath: /demo02/include/SpriteComponent.h
 * @Description: 注释信息
 */
#ifndef __SPRITE_COMPONENET_H__
#define __SPRITE_COMPONENET_H__

#include "Component.h"
#include "SDL2/SDL.h"

class SpriteComponent : public Component
{
private:
    /* data */
    SDL_Texture *m_texture;
    int m_draw_order;
    int m_tex_width;
    int m_tex_height;

public:
    SpriteComponent(class Actor *owner, int drawOrder = 100);
    ~SpriteComponent();

    virtual void Draw(SDL_Renderer *renderer);
    virtual void SetTexture(SDL_Texture *texture);

    int GetDrawOrder() const { return m_draw_order; }
    int GetTexWidth() const { return m_tex_width; }
    int GetTexHeight() const { return m_tex_height; }
};

#endif