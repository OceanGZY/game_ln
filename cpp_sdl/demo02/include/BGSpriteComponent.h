/*
 * @Author: OCEAN.GZY
 * @Date: 2023-08-02 20:15:56
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2023-08-03 23:47:34
 * @FilePath: /demo02/include/BGSpriteComponent.h
 * @Description: 注释信息
 */
#ifndef __BG_SPRITE_COMPONENT_H__
#define __BG_SPRITE_COMPONENT_H__

#include "SpriteComponent.h"
#include "Math.h"
#include <vector>

class BGSpriteComponent : public SpriteComponent
{
private:
    /* data */
    struct BGTexture
    {
    };
    std::vector<BGTexture> m_bg_textures;
    Vector2 m_screen_size;
    float m_scroll_speed;

public:
    // Set draw order to default to lower (so it's in the background)
    BGSpriteComponent(class Actor *owner, int drawOrder = 10);
    ~BGSpriteComponent();

    void Update(float deltaTime) override;

    void Draw(SDL_Renderer *renderer) override;

    void SetBGTextures(const std::vector<SDL_Texture *> &textures);
    void SetScreenSize(const Vector2 &size) { m_screen_size = size; }
    void SetScrollSpeed(float speed) { m_scroll_speed = speed; }
    float GetScrollSpeed() const
    {
        return m_scroll_speed;
    }
};

#endif