using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{

    /// <summary>
    /// 单例模式
    /// </summary>
    public static GameManager Instance;

    /// <summary>
    /// 游戏是否开始
    /// </summary>
    /// <param name=""></param>
    /// <returns></returns>
    public bool IsGameStarted{get;set;}


/// <summary>
/// 游戏是否结束
/// </summary>
/// <param name=""></param>
/// <returns></returns>
    public bool IsGameOver{get;set;}

    private void Awake()
    {
        Instance = this;
    }

}
