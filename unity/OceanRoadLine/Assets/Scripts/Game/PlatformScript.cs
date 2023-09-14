using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlatformScript : MonoBehaviour
{
    public SpriteRenderer[] spriteRenderers;

    public GameObject obstacle; //障碍物



    private bool startTimer;

    private float fallTime;

    private Rigidbody2D my_body;

    private void Awake()
    {
        my_body = GetComponent<Rigidbody2D>();
    }

    public void Init(Sprite sprite, float fallTime, int obstacleDir)
    {
        this.fallTime = fallTime;
        startTimer = true;
        my_body.bodyType = RigidbodyType2D.Static;
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
    private void Update()
    {
        if (!GameManager.Instance.IsGameStarted || GameManager.Instance.IsGameOver || GameManager.Instance.IsGamePaused || !GameManager.Instance.PlayerIsMove) return;

        if (startTimer)
        {
            fallTime -= Time.deltaTime;
            if (fallTime < 0) // 倒计时结束
            {//触发掉落
                startTimer = false;
                if (my_body.bodyType != RigidbodyType2D.Dynamic)
                {
                    my_body.bodyType = RigidbodyType2D.Dynamic;
                    StartCoroutine(DelayHide()); // 开启协程
                }
            }
        }

        if (transform.position.y - Camera.main.transform.position.y < -6) // 物体远离摄像机的时候 也隐藏
        {
            StartCoroutine(DelayHide()); // 开启协程
        }
    }


    /// <summary>
    /// 协程，等待一秒之后隐藏
    /// </summary>
    /// <returns></returns>
    private IEnumerator DelayHide()
    {
        yield return new WaitForSeconds(1f);
        gameObject.SetActive(false);
    }

}
