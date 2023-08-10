using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEngine.SceneManagement;

/// <summary>
///  操作player
/// </summary>

public class Player : MonoBehaviour
{

    public Rigidbody2D rb;

    public float sensitive = 10f;

    public AudioSource jumpPlayer;


<<<<<<< HEAD
    // Start is called before the first frame update
    void Start()
    {
        jumpPlayer = GetComponent<AudioSource>();
    }

=======
>>>>>>> 2231f1c6434c6597ed41acfa7d8b1f91b9fb6b36
    // Update is called once per frame
    void Update()
    {
        PlayerController();

        checkOverEdge();

    }


    /// <summary>
    ///    判断越界
    /// </summary>
    private void checkOverEdge()
    {
        if (transform.position.x < -6f)
        {
            transform.position = new Vector2(6f, transform.position.y);
        }
        if (transform.position.x > 6f)
        {
            transform.position = new Vector2(-6f, transform.position.y);
        }
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        Debug.Log("开始下落了");
        // 下落时计算碰撞， 避免角色碰到东西就飞
        if (rb.velocity.y <= 0)
        {
            if (other.CompareTag("Brand"))
            {
                rb.velocity = new Vector2(0f, 10f);
                jumpPlayer.Play();
            }
            else
            {
                jumpPlayer.Stop();
            }
        }

        if (other.CompareTag("Win"))
        {
            SceneManager.LoadScene("Win");
        }

    }

    private void PlayerController()
    {

        float horizontalAxis = 0;
        horizontalAxis = Input.GetAxis("Horizontal");
        if (Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow))
        {
            transform.rotation = Quaternion.Euler(new Vector3(0, 0, 0));
        }
        if (Input.GetKeyDown(KeyCode.D) || Input.GetKeyDown(KeyCode.RightArrow))
        {
            transform.rotation = Quaternion.Euler(new Vector3(0, 180, 0));
        }

        // Debug.Log("transform.rotation");
        // Debug.Log(transform.rotation);
        // Debug.Log("rb.velocity.x");
        // Debug.Log(rb.velocity.x);
        // Debug.Log("rb.velocity.y");
        // Debug.Log(rb.velocity.y);
        rb.velocity = new Vector2(horizontalAxis * sensitive, rb.velocity.y);
    }
}
