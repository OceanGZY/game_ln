using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraFollow : MonoBehaviour
{

    private Transform target; //玩家目标

    private Vector3 offset; //偏移量

    private Vector2 velocity; // 速度

    private void Update()
    {
        if (target == null && GameObject.FindGameObjectWithTag("Player") != null)
        {
            target = GameObject.FindGameObjectWithTag("Player").transform;  //玩家的位置

            offset = target.position - transform.position;
        }
    }

    private void FixedUpdate()
    {
        if (target != null)
        {
            float posX = Mathf.SmoothDamp(transform.position.x, target.position.x - offset.x, ref velocity.x, 0.05f); // 摄像机要平滑移动的X距离
            float posY = Mathf.SmoothDamp(transform.position.y, target.position.x - offset.y, ref velocity.y, 0.05f); // 摄像机要平滑移动的Y距离
            if (posY > transform.position.y)
            {
                transform.position = new Vector3(posX, posY, transform.position.z);
            }
        }
    }
}
