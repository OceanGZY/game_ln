using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Random = UnityEngine.Random;

/// <summary>
///  关卡生成器
/// </summary>
public class Main : MonoBehaviour
{

    public GameObject platformPrefab;
    public int numOfPlatforms;
    public GameObject winPointPrefab;
    public float levelWidth = 3f;
    public float minY = .2f;
    public float maxY = 1.8f;

    private float lastx;

    // Use this for initialization
    // Start is called before the first frame update
    void Start()
    {
        Vector3 spawnPos = new Vector3();
        for (int i = 0; i < numOfPlatforms; i++)
        {
            float tempx = Random.Range(-levelWidth, levelWidth);
            spawnPos.y += Random.Range(minY, maxY);
            while (Math.Abs(tempx - lastx) > 4f)
            {
                tempx = Random.Range(-levelWidth, levelWidth);
            }


            lastx = tempx;

            spawnPos.x = tempx;

            if (i == numOfPlatforms - 1)
            {
                // 生成 胜利点
                Instantiate(winPointPrefab, spawnPos, Quaternion.identity);
            }
            else
            {
                Instantiate(platformPrefab, spawnPos, Quaternion.identity);
            }
        }

    }
}
