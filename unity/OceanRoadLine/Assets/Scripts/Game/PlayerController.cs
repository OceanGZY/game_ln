using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using DG.Tweening;
using UnityEngine.EventSystems;

public class PlayerController : MonoBehaviour
{
    public Transform rayDown, rayLeft, rayRight; //射线检测用

    public LayerMask platfromLayer, obstacleLayer; //平台层，障碍物层

    private bool isMoveLeft = false; // 是否向左移动，反之向右

    private Vector3 nextPlatformLeft, nextPlatformRight; // 下一个平台的位置

    private ManagerVars vars;

    private bool isJumping = false; //是否正在跳跃


    private Rigidbody2D my_body;
    private SpriteRenderer spriteRenderer;

    private GameObject lastHitGo = null;

    private bool isMove = false;




    private void Awake()
    {
        vars = ManagerVars.GetManagerVars();

        spriteRenderer = GetComponent<SpriteRenderer>();
        my_body = GetComponent<Rigidbody2D>();
    }

    private void Update()
    {
        //绘制射线
        Debug.DrawRay(rayDown.position, Vector2.down * 1, Color.red);
        Debug.DrawRay(rayLeft.position, Vector2.left * 0.2f, Color.red);
        Debug.DrawRay(rayRight.position, Vector2.right * 0.2f, Color.red);

        if (EventSystem.current.IsPointerOverGameObject())
        { // 如果碰到的是UI 则返回掉
            return;
        }

        if (!GameManager.Instance.IsGameStarted || GameManager.Instance.IsGameOver
            || GameManager.Instance.IsGamePaused)
        { // 如果游戏未开始、或者暂停则返回掉 
            return;
        }


        // 游戏开始可以操作
        if (GameManager.Instance.IsGameStarted)
        {

            if (Input.GetMouseButtonDown(0) && isJumping == false)
            {
                if (!isMove)
                {
                    EventCenter.Broadcast(EventDefine.PlayerMove);
                    isMove = true;
                }

                isJumping = true;
                Vector3 mousePos = Input.mousePosition; //获取鼠标位置
                                                        // 如果X <= 屏幕的一半 则在左边,否则右边
                if (mousePos.x <= Screen.width / 2)
                {
                    isMoveLeft = true;
                }
                else if (mousePos.x > Screen.width / 2)
                {
                    isMoveLeft = false;
                }
                Jump();
            }
        }

        // 游戏结束--掉下平台
        if (my_body.velocity.y < 0 && !GameManager.Instance.IsGameOver && !IsRayPlatform())
        {
            spriteRenderer.sortingLayerName = "Default";
            GetComponent<BoxCollider2D>().enabled = false;
            GameManager.Instance.IsGameOver = true;
            Debug.Log("掉下平台，游戏结束！");
            // 调用结束面板
        }

        // 游戏结束--碰到障碍物
        if (isJumping && !GameManager.Instance.IsGameOver && IsRayObstacle())
        {
            // 死亡特效
            GameObject go = Instantiate(ObjectPool.Instance.GetDeathEffect());
            go.transform.position = transform.position;
            go.SetActive(true);
            GameManager.Instance.IsGameOver = true;
            Destroy(gameObject);
            Debug.Log("碰到障碍物，游戏结束！");
        }

        // 游戏结束--平台掉落，人也掉落的时候,掉出去画面了
        if (transform.position.y - Camera.main.transform.position.y < -6 && !GameManager.Instance.IsGameOver && !GameManager.Instance.IsGamePaused)
        {
            GameManager.Instance.IsGameOver = true;
            gameObject.SetActive(false);
            Debug.Log("人物掉出画面，游戏结束！");
        }

    }

    /// <summary>
    /// 射线检测,是否检测到平台
    /// </summary>
    private bool IsRayPlatform()
    {
        RaycastHit2D hit = Physics2D.Raycast(rayDown.position, Vector2.down, 1f, platfromLayer);
        if (hit.collider != null)
        {
            // Debug.Log("射线hit了");
            // Debug.Log(hit.collider.tag);
            if (hit.collider.tag == "Platfrom") //碰撞到平台了
            {
                // Debug.Log("射线碰到platform");
                if (lastHitGo != hit.collider.gameObject) // 如果当前碰撞的不是最后一次碰撞的平台，避免重复加分
                {
                    if (lastHitGo == null)
                    {
                        lastHitGo = hit.collider.gameObject;
                        return true;
                    }
                    else
                    {
                        // 广播一个加分数的消息
                        EventCenter.Broadcast(EventDefine.AddScore);
                        lastHitGo = hit.collider.gameObject;
                    }

                }
                return true;
            }
            // Debug.Log("射线没有hit平台");
        }
        // Debug.Log("射线碰撞失败");
        return false;

    }

    /// <summary>
    /// 射线检测。是否检测到碰撞障碍物
    /// </summary>
    /// <returns></returns>
    private bool IsRayObstacle()
    {
        RaycastHit2D hitLeft = Physics2D.Raycast(rayLeft.position, Vector2.left, 0.2f, obstacleLayer);
        RaycastHit2D hitRight = Physics2D.Raycast(rayRight.position, Vector2.right, 0.2f, obstacleLayer);

        if (hitLeft.collider != null)
        {
            Debug.Log("碰到左边障碍物");
            Debug.Log(hitLeft.collider.tag);
            if (hitLeft.collider.tag == "Obstacle")
            {
                return true;
            }
        }
        if (hitRight.collider != null)
        {
            Debug.Log("碰到右边障碍物");
            Debug.Log(hitRight.collider.tag);
            if (hitRight.collider.tag == "Obstacle")
            {
                return true;
            }
        }
        Debug.Log("没有碰到障碍物");
        return false;
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

            transform.DOMoveX(nextPlatformLeft.x, 0.2f);
            transform.DOMoveY(nextPlatformLeft.y + 0.8f, 0.15f);
        }
        else
        {

            transform.DOMoveX(nextPlatformRight.x, 0.2f);
            transform.DOMoveY(nextPlatformRight.y + 0.8f, 0.15f);
            transform.localScale = Vector3.one;
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


    /// <summary>
    ///     重叠检测
    /// </summary>
    /// <param name="other"></param>
    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Pickup"))
        {
            // 吃到钻石了
            Debug.Log("吃到钻石了");
            EventCenter.Broadcast(EventDefine.PickupDiamond);
            other.gameObject.SetActive(false);

        }
    }


}
