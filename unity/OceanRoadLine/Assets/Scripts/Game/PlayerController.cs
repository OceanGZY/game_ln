using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;

public class PlayerController : MonoBehaviour
{

    private bool isMoveLeft = false; // 是否向左移动，反之向右

    private Vector3 nextPlatformLeft, nextPlatformRight; // 下一个平台的位置

    private ManagerVars vars;

    private bool isJumping = false; //是否正在跳跃

    private void Awake()
    {
        vars = ManagerVars.GetManagerVars();
    }

    private void Update()
    {
        // 游戏开始，或游戏未结束，则不可以操作
        if (GameManager.Instance.IsGameOver == false || GameManager.Instance.IsGameStarted)
        {

            if (Input.GetMouseButtonDown(0) && isJumping == false)
            {
                isJumping = true;
                Vector3 mousePos = Input.mousePosition; //获取鼠标位置
                                                        // 如果X <= 屏幕的一半 则在左边,否则右边
                if (mousePos.x <= Screen.width / 2)
                {
                    isMoveLeft = true;
                }
                else
                {
                    isMoveLeft = false;
                }
                Jump();
            }

        }
    }


    /// <summary>
    /// 人物跳跃
    /// </summary>
    private void Jump()
    {
        Debug.Log("触发跳跃");
        if (isMoveLeft)
        {
            transform.localScale = new Vector3(-1, 1, 1);

            transform.DOMoveX(nextPlatformLeft.x, 0.2f).SetEase(Ease.InOutQuad);
            transform.DOMoveY(nextPlatformLeft.y + 0.8f, 0.15f).SetEase(Ease.InOutQuad);
        }
        else
        {
            transform.localScale = Vector3.one;
            transform.DOMoveX(nextPlatformRight.x, 0.2f).SetEase(Ease.InOutQuad);
            transform.DOMoveY(nextPlatformRight.y + 0.8f, 0.15f).SetEase(Ease.InOutQuad);
        }
    }


    /// <summary>
    ///     碰撞检测
    /// </summary>
    /// <param name="other"></param>
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Platfrom"))
        {
            EventCenter.Broadcast(EventDefine.DecidePath);
            isJumping = false;
            Vector3 currentPlatfromPos = other.gameObject.transform.position;
            nextPlatformLeft = new Vector3(currentPlatfromPos.x - vars.nextXPos, currentPlatfromPos.y + vars.nextYPos, 0);
            nextPlatformRight = new Vector3(currentPlatfromPos.x + vars.nextXPos, currentPlatfromPos.y + vars.nextYPos, 0);
        }

    }
}
