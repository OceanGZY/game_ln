using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public enum PlatformGroupType
{
    Grass,
    Winter
}


public class PlatformSpawner : MonoBehaviour
{
    public Vector3 startSpawnPos;  // 初始生成位置

    private ManagerVars vars;

    private Vector3 platformSpawnPos; // 下一个平台生成的位置

    private bool isLeftSpawn = false; // 是否向左边生成

    private Sprite selectPlatformSprite; // 选中的platform值

    private PlatformGroupType groupType; // 组合平台的类型

    /// <summary>
    ///  生成平台的数量
    /// </summary>
    private int spawnPlatformCount;

    private void Awake()
    {
        EventCenter.AddListener(EventDefine.DecidePath, DecidePath);
        // 获取参数变量[在开始之前]
        vars = ManagerVars.GetManagerVars();
    }

    private void Start()
    {

        RandomPlatformTheme();

        // 第一个platform的位置
        platformSpawnPos = startSpawnPos;

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
        if (spawnPlatformCount >= 1) // 生成单个平台
        {
            SpawnNormalPlatform();
        }
        else if (spawnPlatformCount == 0) //生成组合平台
        {
            int ran = Random.Range(0, 3);
            if (ran == 0)
            { //生成通用组合平台
                SpawnCommonPlatformGroup();
            }
            else if (ran == 1)
            { //生成主题组合平台
                switch (groupType)
                {
                    case PlatformGroupType.Grass:
                        SpawnGrassPlatformGroup();
                        break;
                    case PlatformGroupType.Winter:
                        SpawnWinterPlatformGroup();
                        break;
                    default:
                        break;
                }
            }
            else
            { // 生成钉子组合平台
                int value = -1;
                if (isLeftSpawn)
                {
                    value = 0; // 生成右边方向的 钉子
                }
                else
                {
                    value = 1; // 生成左边方向的 钉子
                }
                SpawnSpikePlatformGroup(value);
            }
        }

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
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite);

    }

    private void SpawnCommonPlatformGroup() //生成通用组合
    {
        int ran = Random.Range(0, vars.commonPlatformGroup.Count);
        GameObject go = Instantiate(vars.commonPlatformGroup[ran], transform);
        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite);
    }


    private void SpawnGrassPlatformGroup() // 生成草地组合
    {
        int ran = Random.Range(0, vars.grassPlatformGroup.Count);
        GameObject go = Instantiate(vars.grassPlatformGroup[ran], transform);
        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite);
    }

    private void SpawnWinterPlatformGroup() //生成冬季组合
    {
        int ran = Random.Range(0, vars.winterPlatformGroup.Count);
        GameObject go = Instantiate(vars.winterPlatformGroup[ran], transform);
        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite);
    }

    private void SpawnSpikePlatformGroup(int direction) //生成钉子组合
    {
        GameObject go = null;
        if (direction == 0)
        {
            go = Instantiate(vars.spikePlatformGroupLeftPre, transform);
        }
        else if (direction == 1)
        {
            go = Instantiate(vars.spikePlatformGroupRightPre, transform);
        }

        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite);

    }





    //  随机平台主题
    private void RandomPlatformTheme()
    {
        int ran = Random.Range(0, vars.platformThemeSpriteList.Count);
        selectPlatformSprite = vars.platformThemeSpriteList[ran];

        if (ran == 2)
        {
            groupType = PlatformGroupType.Grass;
        }
        else
        {
            groupType = PlatformGroupType.Winter;
        }

    }

    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.DecidePath, DecidePath);
    }
}
