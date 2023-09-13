using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlatformScript : MonoBehaviour
{
    public SpriteRenderer[] spriteRenderers;

    public GameObject obstacle; //障碍物

    public void Init(Sprite sprite, int obstacleDir)
    {
        for (int i = 0; i < spriteRenderers.Length; i++)
        {
            spriteRenderers[i].sprite = sprite;
        }

        if (obstacleDir == 0)
        { //障碍物方向，朝向右边
            if (obstacle != null)
            {
                obstacle.transform.position = new Vector3(-obstacle.transform.position.x, obstacle.transform.position.y, 0);
            }
        }
    }
}
