using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using UnityEngine.SceneManagement;

/// <summary>
/// 相机跟随
/// </summary>
public class PlayerFollow : MonoBehaviour
{

    public Transform PlaerTransform;
    private Vector3 currentVelocity;
    public Rigidbody2D playerRigidbody2D;


    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    private void LateUpdate()
    {
        if (PlaerTransform.position.y >= transform.position.y)
        {
            Vector3 tempV = new Vector3(transform.position.x, PlaerTransform.position.y, transform.position.z);
            transform.position = Vector3.SmoothDamp(transform.position, tempV, ref currentVelocity, 0.3f * Time.deltaTime);
        }

        // 掉入谷底 回到原点
        if (PlaerTransform.position.y <= transform.position.y - 3f)
        {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }
    }
}
