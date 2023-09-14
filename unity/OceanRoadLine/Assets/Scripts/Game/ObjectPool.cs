using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// 对象池， 管理各个platform模块，避免大量创建
/// </summary>
public class ObjectPool : MonoBehaviour
{

    public static ObjectPool Instance;

    public int initSpawnCount = 5;
    private List<GameObject> normalPlatformList = new List<GameObject>();

    private List<GameObject> commonPlatformList = new List<GameObject>();

    private List<GameObject> grassPlatformList = new List<GameObject>();

    private List<GameObject> winterPlatformList = new List<GameObject>();

    private List<GameObject> spikePlatformLeftList = new List<GameObject>();

    private List<GameObject> spikePlatformRightList = new List<GameObject>();


    private List<GameObject> deathEffectList = new List<GameObject>();

    public List<GameObject> diamonList = new List<GameObject>();


    private ManagerVars vars;

    private void Awake()
    {
        Instance = this;
        vars = ManagerVars.GetManagerVars();
        Init();
    }


    private void Init()
    {
        for (int i = 0; i < initSpawnCount; i++)
        {// 普通
            InstantiateObject(vars.normalPlatformPre, ref normalPlatformList);
        }

        for (int i = 0; i < initSpawnCount; i++)
        { // 通用
            for (int j = 0; j < vars.commonPlatformGroup.Count; j++)
            {
                InstantiateObject(vars.commonPlatformGroup[j], ref commonPlatformList);
            }
        }


        for (int i = 0; i < initSpawnCount; i++)
        {// 草地
            for (int j = 0; j < vars.grassPlatformGroup.Count; j++)
            {
                InstantiateObject(vars.grassPlatformGroup[j], ref grassPlatformList);
            }
        }



        for (int i = 0; i < initSpawnCount; i++)
        {// 冬天
            for (int j = 0; j < vars.winterPlatformGroup.Count; j++)
            {
                InstantiateObject(vars.winterPlatformGroup[j], ref winterPlatformList);
            }
        }

        for (int i = 0; i < initSpawnCount; i++)
        {// 左边钉子
            InstantiateObject(vars.spikePlatformGroupLeftPre, ref spikePlatformLeftList);
        }

        for (int i = 0; i < initSpawnCount; i++)
        {// 右边钉子
            InstantiateObject(vars.spikePlatformGroupRightPre, ref spikePlatformRightList);
        }

        for (int i = 0; i < initSpawnCount; i++)
        {// 死亡特效
            InstantiateObject(vars.deathEffectPre, ref deathEffectList);
        }

        for (int i = 0; i < initSpawnCount; i++)
        {// 钻石
            InstantiateObject(vars.diamondtPre, ref diamonList);
        }

    }


    /// <summary>
    ///  初始化一个prefab平台， 并且加入平台list
    /// </summary>
    /// <param name="prefab"></param>
    /// <param name="addList"></param>
    /// <returns></returns>
    private GameObject InstantiateObject(GameObject prefab, ref List<GameObject> addList)
    {
        GameObject go = Instantiate(prefab, transform);
        go.SetActive(false);
        addList.Add(go);
        return go; // 返回初始化出来的平台
    }


    /// <summary>
    /// 获取单个普通平台
    /// </summary>
    /// <returns></returns>
    public GameObject GetNormalPlatform()
    {
        for (int i = 0; i < normalPlatformList.Count; i++)
        {
            if (!normalPlatformList[i].activeInHierarchy)
            { // 没有在场景中显示，则可以返回出去
                return normalPlatformList[i];
            }
        }
        return InstantiateObject(vars.normalPlatformPre, ref normalPlatformList);
    }


    /// <summary>
    /// 获取通用组合平台
    /// </summary>
    /// <returns></returns>
    public GameObject GetCommonPlatformGroup()
    {
        for (int i = 0; i < commonPlatformList.Count; i++)
        {
            if (!commonPlatformList[i].activeInHierarchy)
            { // 没有在场景中显示，则可以返回出去
                return commonPlatformList[i];
            }
        }
        int ran = Random.Range(0, vars.commonPlatformGroup.Count);
        return InstantiateObject(vars.commonPlatformGroup[ran], ref commonPlatformList);
    }


    /// <summary>
    ///     获取草地组合平台
    /// </summary>
    /// <returns></returns>
    public GameObject GetGrassPlatformGroup()
    {
        for (int i = 0; i < grassPlatformList.Count; i++)
        {
            if (!grassPlatformList[i].activeInHierarchy)
            { // 没有在场景中显示，则可以返回出去
                return grassPlatformList[i];
            }
        }
        int ran = Random.Range(0, vars.grassPlatformGroup.Count);
        return InstantiateObject(vars.grassPlatformGroup[ran], ref grassPlatformList);
    }

    /// <summary>
    ///     获取冬天组合平台
    /// </summary>
    /// <returns></returns>
    public GameObject GetWinterPlatformGroup()
    {
        for (int i = 0; i < winterPlatformList.Count; i++)
        {
            if (!winterPlatformList[i].activeInHierarchy)
            { // 没有在场景中显示，则可以返回出去
                return winterPlatformList[i];
            }
        }
        int ran = Random.Range(0, vars.winterPlatformGroup.Count);
        return InstantiateObject(vars.winterPlatformGroup[ran], ref winterPlatformList);
    }



    /// <summary>
    ///  获取左钉子
    /// </summary>
    /// <returns></returns>

    public GameObject GetSpikeLeftPlatform()
    {
        for (int i = 0; i < spikePlatformLeftList.Count; i++)
        {
            if (!spikePlatformLeftList[i].activeInHierarchy)
            { // 没有在场景中显示，则可以返回出去
                return spikePlatformLeftList[i];
            }
        }
        return InstantiateObject(vars.spikePlatformGroupLeftPre, ref spikePlatformLeftList);
    }


    /// <summary>
    /// 获取右钉子
    /// </summary>
    /// <returns></returns>
    public GameObject GetSpikeRightPlatform()
    {
        for (int i = 0; i < spikePlatformRightList.Count; i++)
        {
            if (!spikePlatformRightList[i].activeInHierarchy)
            { // 没有在场景中显示，则可以返回出去
                return spikePlatformRightList[i];
            }
        }
        return InstantiateObject(vars.spikePlatformGroupRightPre, ref spikePlatformRightList);
    }


    /// <summary>
    /// 获取死亡特效
    /// </summary>
    /// <returns></returns>
    public GameObject GetDeathEffect()
    {
        for (int i = 0; i < deathEffectList.Count; i++)
        {
            if (!deathEffectList[i].activeInHierarchy)
            { // 没有在场景中显示，则可以返回出去
                return deathEffectList[i];
            }
        }
        return InstantiateObject(vars.deathEffectPre, ref deathEffectList);
    }


    /// <summary>
    /// 获取daimaond
    /// </summary>
    /// <returns></returns>
    public GameObject GetDiamond()
    {
        for (int i = 0; i < diamonList.Count; i++)
        {
            if (!diamonList[i].activeInHierarchy)
            { // 没有在场景中显示，则可以返回出去
                return diamonList[i];
            }
        }
        return InstantiateObject(vars.diamondtPre, ref diamonList);
    }


}
