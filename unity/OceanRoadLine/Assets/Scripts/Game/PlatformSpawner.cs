using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlatformSpawner : MonoBehaviour
{
    public Vector3 startSpawnPos;  // 初始生成位置

    private ManagerVars vars;

    private Vector3 platformSpawnPos; // 下一个平台生成的位置

    private bool isLeftSpawn = false; // 是否向左边生成

    /// <summary>
    ///  生成平台的数量
    /// </summary>
    private int spawnPlatformCount;

    private void Awake()
    {
        EventCenter.AddListener(EventDefine.DecidePath, DecidePath);
    }

    private void Start()
    {
        // 第一个platform的位置
        platformSpawnPos = startSpawnPos;

        // 获取参数变量
        vars = ManagerVars.GetManagerVars();

        for (int i = 0; i < 5; i++)
        {
            spawnPlatformCount = 5;
            DecidePath();
        }

        // 生成人物
        GameObject go = Instantiate(vars.characterPre);
        go.transform.position = new Vector3(0, -1.8f, 0);

    }

    // 确定路径
    private void DecidePath()
    {
        if (spawnPlatformCount > 0)
        {
            spawnPlatformCount--;
            SpawnPlatform();
        }
        else
        {
            isLeftSpawn = !isLeftSpawn;
            spawnPlatformCount = Random.Range(1, 4);
            SpawnPlatform();
        }
    }

    /// <summary>
    ///    生成平台
    /// </summary>
    private void SpawnPlatform()
    {
        SpawnNormalPlatform();

        if (isLeftSpawn)
        { //如果是向左生成
            platformSpawnPos = new Vector3(platformSpawnPos.x - vars.nextXPos,
                                         platformSpawnPos.y + vars.nextYPos,
                                         0);
        }
        else
        { //向右生成
            platformSpawnPos = new Vector3(platformSpawnPos.x + vars.nextXPos,
                                         platformSpawnPos.y + vars.nextYPos,
                                         0);
        }
    }


    /// <summary>
    /// 
    /// 生成单个的普通平台
    /// </summary>
    private void SpawnNormalPlatform()
    {
        GameObject go = Instantiate(vars.normalPlatformPre, transform);
        go.transform.position = platformSpawnPos;

    }


    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.DecidePath, DecidePath);
    }
}
