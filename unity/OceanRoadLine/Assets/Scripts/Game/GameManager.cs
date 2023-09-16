using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using UnityEngine;


public class GameManager : MonoBehaviour
{

    /// <summary>
    /// 单例模式
    /// </summary>
    public static GameManager Instance;

    private GameData data;

    private ManagerVars vars;

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

    public int GetGameScore() { return gameScore; }
    public void SetGameScore(int score) { gameScore = score; }

    public int GetGameDiamond() { return diamondCount; }

    public void SetGameDiamond(int count) { diamondCount = count; }

    public void SaveScoreArr(int score)
    {
        List<int> scoreList = bsetScoreArr.ToList();
        scoreList.Sort((x, y) => (-x.CompareTo(y))); // 从大到小排序
        bsetScoreArr = scoreList.ToArray();

        // 50 , 20 ,10
        int index = -1;

        for (int i = 0; i < bsetScoreArr.Length; i++)
        {
            if (score >= bsetScoreArr[i])
            {
                index = i;
            }
        }
        if (index == -1) return;

        for (int i = bsetScoreArr.Length - 1; i > index; i--)
        {
            bsetScoreArr[i] = bsetScoreArr[i - 1];
        }

        bsetScoreArr[index] = score;

        Save();

    }

    public int[] GetBestScoreArr()
    {
        List<int> scoreList = bsetScoreArr.ToList();
        scoreList.Sort((x, y) => (-x.CompareTo(y))); // 从大到小排序
        bsetScoreArr = scoreList.ToArray();

        return bsetScoreArr;
    }
    public int GameMaxScore()
    {
        return bsetScoreArr.Max();
    }

    public void SetIsMusicOn(bool isOn) { isMusicOn = isOn; Save(); } // 设置音乐开关

    public bool GetIsMusicOn() { return isMusicOn; }

    public bool GetSkinIsUnlock(int index) { return skinUnlock[index]; } // 查询当前皮肤是否解锁

    public void SetSkinIsUnlock(int index) { skinUnlock[index] = true; Save(); } //设置皮肤已经解锁

    public int GetAllDiamond() { return allDiamondCount; }

    public void SetAllDiamond(int all_diamond) { allDiamondCount = all_diamond; Save(); }

    public int SelectedSkin { get; set; }

    private int gameScore;

    private int diamondCount;



    private bool isFirstGame; // 是否第一次游戏

    private bool isMusicOn; //音乐是否打开

    private int[] bsetScoreArr; // 最高分纪录

    private int selectedSkin; // 选中的皮肤

    private bool[] skinUnlock; // 是否解锁

    private int allDiamondCount; //钻石数量





    private void Awake()
    {
        Instance = this;
        vars = ManagerVars.GetManagerVars();
        EventCenter.AddListener(EventDefine.AddScore, AddGameSocre);
        EventCenter.AddListener(EventDefine.PickupDiamond, AddDiamondCount);
        EventCenter.AddListener(EventDefine.PlayerMove, PlayerMove);
        if (GameData.IsAgiainGame)
        {
            IsGameStarted = true;
        }

        InitGameData();

    }
    /// <summary>
    /// 初始化游戏数据
    /// </summary>
    private void InitGameData()
    {
        Load();
        if (data != null)
        {
            isFirstGame = data.GetIsFirstGame();
        }
        else
        {
            isFirstGame = true;
        }

        if (isFirstGame)
        { //第一次开始默认值
            isFirstGame = false;
            isMusicOn = true;
            bsetScoreArr = new int[3];
            selectedSkin = 0;
            skinUnlock = new bool[vars.skinSpriteList.Count];
            skinUnlock[0] = true;
            allDiamondCount = 10;
            data = new GameData();
            Save();
        }
        else
        {
            isMusicOn = data.GetIsMusicOn();
            bsetScoreArr = data.GetBestScoreArr();
            selectedSkin = data.GetSelectedSkin();
            skinUnlock = data.GetSkinUnlock();
            allDiamondCount = data.GetDiamondCount();
        }
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


    /// <summary>
    /// 储存数据
    /// </summary>
    private void Save()
    {
        try
        {
            BinaryFormatter bf = new BinaryFormatter();
            using (FileStream fs = File.Create(Application.persistentDataPath + "/GameData.dat"))
            { // 存储游戏文件，文件流会自动释放
                data.SetBestScoreArr(bsetScoreArr);
                data.SetDiamondCount(allDiamondCount);
                data.SetIsFirstGame(isFirstGame);
                data.SetIsMusicOn(isMusicOn);
                data.SetSelectedSkin(selectedSkin);
                data.SetSkinUnlock(skinUnlock);
                bf.Serialize(fs, data);
            }
        }
        catch (System.Exception e)
        {
            Debug.Log("保存数据失败");
            Debug.Log(e.Message);
        }
    }


    /// <summary>
    /// 读取
    /// </summary>
    private void Load()
    {
        try
        {
            BinaryFormatter bf = new BinaryFormatter();
            using (FileStream fs = File.Open(Application.persistentDataPath + "/GameData.dat", FileMode.Open))
            {
                data = (GameData)bf.Deserialize(fs);  // 将数据读取出来
            }
        }
        catch (System.Exception e)
        {
            Debug.Log("读取数据失败");
            Debug.Log(e.Message);
        }
    }

    public void ResetGame()
    {
        isFirstGame = false;
        isMusicOn = true;
        bsetScoreArr = new int[3];
        selectedSkin = 0;
        skinUnlock = new bool[vars.skinSpriteList.Count];
        skinUnlock[0] = true;
        allDiamondCount = 10;
        Save();
    }
}
