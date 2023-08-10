using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEngine.SceneManagement;

/// <summary>
/// 相机跟随
/// </summary>
public class PlayerFollow: MonoBehaviour
{

    public Transform PlayerTransform;
    private Vector3 currentVelocity;
    public Rigidbody2D playerRigidbody2D;


    private void LateUpdate()
    {
        if (PlayerTransform.position.y >= transform.position.y)
        {
            Vector3 tempV = new Vector3(transform.position.x, PlayerTransform.position.y, transform.position.z);
            transform.position = Vector3.SmoothDamp(transform.position, tempV, ref currentVelocity, .3f * Time.deltaTime);
        }

        // 掉入谷底 回到原点
        if (PlayerTransform.position.y < transform.position.y - 3f)
        {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
    }
}
