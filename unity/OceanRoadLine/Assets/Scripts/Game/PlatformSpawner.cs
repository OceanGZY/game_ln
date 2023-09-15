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

    public int mileStoneCount = 10;   // 里程碑数

    public float fallTime;  // 掉落时间

    public float minFallTime; // 最小掉落时间

    public float mutiple; // 掉落系数

    private ManagerVars vars;

    private Vector3 platformSpawnPos; // 下一个平台生成的位置

    private bool isLeftSpawn = false; // 是否向左边生成

    private Sprite selectPlatformSprite; // 选中的platform值

    private PlatformGroupType groupType; // 组合平台的类型

    /// <summary>
    ///  生成平台的数量
    /// </summary>
    private int spawnPlatformCount;

    private bool spikeSpawnLeft = false;  //钉子是否生成在左边 ，反之右边

    private Vector3 spikeDirPlatformPos; // 钉子方向平台的位置


    private int affterSpwanSpikePlatformCount; // 生成钉子之后，钉子方向platform的数量

    private bool isSpawnSpike; //是否触发到钉子相关平台方法

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
        if (isSpawnSpike) // 如果触发钉子平台方法， 则执行钉子之后 生成钉子后面的其他平台
        {
            AfterSpwanSpike();
            return;
        }

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
        int ranObstacleDir = Random.Range(0, 2);

        if (spawnPlatformCount >= 1) // 生成单个平台
        {
            SpawnNormalPlatform(ranObstacleDir);
        }
        else if (spawnPlatformCount == 0) //生成组合平台
        {
            int ran = Random.Range(0, 3);
            if (ran == 0)
            { //生成通用组合平台
                SpawnCommonPlatformGroup(ranObstacleDir);
            }
            else if (ran == 1)
            { //生成主题组合平台
                switch (groupType)
                {
                    case PlatformGroupType.Grass:
                        SpawnGrassPlatformGroup(ranObstacleDir);
                        break;
                    case PlatformGroupType.Winter:
                        SpawnWinterPlatformGroup(ranObstacleDir);
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
                SpawnSpikePlatformGroup(value, ranObstacleDir);

                isSpawnSpike = true;
                affterSpwanSpikePlatformCount = 4;

                if (spikeSpawnLeft)
                { //钉子在左边
                    spikeDirPlatformPos = new Vector3(platformSpawnPos.x - 1.65f, platformSpawnPos.y - vars.nextYPos, 0);
                }
                else
                {//钉子在右边
                    spikeDirPlatformPos = new Vector3(platformSpawnPos.x + 1.65f, platformSpawnPos.y - vars.nextYPos, 0);
                }
            }
        }

        // 随机在平台上显示金币
        int ranSpawnDiamond = Random.Range(0, 8);
        if (ranSpawnDiamond >= 6 && GameManager.Instance.PlayerIsMove)
        {
            GameObject go = ObjectPool.Instance.GetDiamond();
            go.transform.position = new Vector3(platformSpawnPos.x, platformSpawnPos.y + 0.5f, 0);
            go.SetActive(true);
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
    private void SpawnNormalPlatform(int ranObstacleDir)
    {
        GameObject go = ObjectPool.Instance.GetNormalPlatform();
        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite, fallTime, ranObstacleDir);
        go.SetActive(true);
    }

    private void SpawnCommonPlatformGroup(int ranObstacleDir) //生成通用组合
    {

        GameObject go = ObjectPool.Instance.GetCommonPlatformGroup();
        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite, fallTime, ranObstacleDir);
        go.SetActive(true);
    }


    private void SpawnGrassPlatformGroup(int ranObstacleDir) // 生成草地组合
    {

        GameObject go = ObjectPool.Instance.GetGrassPlatformGroup();
        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite, fallTime, ranObstacleDir);
        go.SetActive(true);
    }

    private void SpawnWinterPlatformGroup(int ranObstacleDir) //生成冬季组合
    {
        GameObject go = ObjectPool.Instance.GetWinterPlatformGroup();
        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite, fallTime, ranObstacleDir);
        go.SetActive(true);
    }

    private void SpawnSpikePlatformGroup(int direction, int ranObstacleDir) //生成钉子组合
    {
        GameObject go = null;
        if (direction == 0)
        {
            spikeSpawnLeft = false;
            go = ObjectPool.Instance.GetSpikeRightPlatform();
        }
        else if (direction == 1)
        {
            spikeSpawnLeft = true;
            go = ObjectPool.Instance.GetSpikeLeftPlatform();
        }

        go.transform.position = platformSpawnPos;
        go.GetComponent<PlatformScript>().Init(selectPlatformSprite, fallTime, ranObstacleDir);
        go.SetActive(true);

    }


    //生成钉子后,需要生成的平台； 包括钉子方向 也包括原来的方向
    private void AfterSpwanSpike()
    {
        if (affterSpwanSpikePlatformCount > 0)
        {
            affterSpwanSpikePlatformCount--;
            for (int i = 0; i < 2; i++)
            {
                GameObject temp = Instantiate(vars.normalPlatformPre, transform);
                if (i == 0)
                { //生成原来方向的平台
                    temp.transform.position = platformSpawnPos;
                    if (spikeSpawnLeft)
                    { //如果钉子在左边， 原 路径就在右边

                        platformSpawnPos = new Vector3(platformSpawnPos.x + vars.nextXPos, platformSpawnPos.y + vars.nextYPos, 0);
                    }
                    else
                    {
                        platformSpawnPos = new Vector3(platformSpawnPos.x - vars.nextXPos, platformSpawnPos.y + vars.nextYPos, 0);
                    }
                }
                else
                { // 生成钉子方向的 平台
                    temp.transform.position = spikeDirPlatformPos;
                    if (spikeSpawnLeft)
                    { //如果钉子在左边
                        spikeDirPlatformPos = new Vector3(spikeDirPlatformPos.x - vars.nextXPos, spikeDirPlatformPos.y + vars.nextYPos, 0);
                    }
                    else
                    {
                        spikeDirPlatformPos = new Vector3(spikeDirPlatformPos.x + vars.nextXPos, spikeDirPlatformPos.y + vars.nextYPos, 0);
                    }
                }
                temp.GetComponent<PlatformScript>().Init(selectPlatformSprite, fallTime, 1);
                temp.SetActive(true);
            }
        }
        else
        {
            isSpawnSpike = false;
            DecidePath();
        }
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


    private void Update()
    {// 游戏在运行状态时，平台才可以往下掉
        if (GameManager.Instance.IsGameStarted && !GameManager.Instance.IsGameOver && !GameManager.Instance.IsGamePaused)
        {
            UpdateFallTime();
        }

    }


    private void UpdateFallTime()
    {
        if (GameManager.Instance.GetGameScore() > mileStoneCount) //如果分数超过里程碑 则更新
        {
            mileStoneCount *= 2;
            fallTime *= mutiple;
            if (fallTime < minFallTime)
            {
                fallTime = minFallTime;
            }

        }

    }
}
