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

    public bool PlayerIsMove { get; set; } // 玩家是否开始移动

    public int GameScore { get { return gameScore; } }


    public int GameDiamondCount { get { return diamondCount; } }


    private int gameScore;

    private int diamondCount;

    private void Awake()
    {
        Instance = this;
        EventCenter.AddListener(EventDefine.AddScore, AddGameSocre);
        EventCenter.AddListener(EventDefine.PickupDiamond, AddDiamondCount);
        EventCenter.AddListener(EventDefine.PlayerMove, PlayerMove);
    }



    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.AddScore, AddGameSocre);
        EventCenter.RemoveListener(EventDefine.PickupDiamond, AddDiamondCount);
        EventCenter.RemoveListener(EventDefine.PlayerMove, PlayerMove);
    }


    private void AddGameSocre() // 加游戏分
    {
        if (IsGameOver || !IsGameStarted || IsGamePaused) return;
        gameScore++;
        EventCenter.Broadcast(EventDefine.UpdateShowScore, gameScore);

    }


    private void AddDiamondCount()
    { //加钻石
        diamondCount++;
        EventCenter.Broadcast(EventDefine.UpdateDiamonCount, diamondCount);
    }

    private void PlayerMove()
    { //玩家移动
        PlayerIsMove = true;
    }

}
