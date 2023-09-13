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
    public bool IsGameStarted { get; set; }


    /// <summary>
    /// 游戏是否结束
    /// </summary>
    /// <param name=""></param>
    /// <returns></returns>
    public bool IsGameOver { get; set; }


    /// <summary>
    ///    游戏是否暂停
    /// </summary>
    public bool IsGamePaused { get; set; }


    private int gameScore;

    private void Awake()
    {
        Instance = this;
        EventCenter.AddListener(EventDefine.AddScore, AddGameSocre);
    }



    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.AddScore, AddGameSocre);
    }


    private void AddGameSocre()
    {
        if (IsGameOver || !IsGameStarted || !IsGamePaused)
        {
            gameScore++;
            EventCenter.Broadcast(EventDefine.UpdateShowScore, gameScore);
        }

    }

}
