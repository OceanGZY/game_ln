using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class GameData
{
    public static bool IsAgiainGame = false; // 是否再来一次


    private bool isFirstGame; // 是否第一次游戏

    private bool isMusicOn; //音乐是否打开

    private int[] bsetScoreArr; // 最高分纪录

    private int selectedSkin; // 选中的皮肤

    private bool[] skinUnlock; // 是否解锁

    private int allDiamondCount; //钻石数量

    public void SetIsFirstGame(bool isFirstGame)
    {
        this.isFirstGame = isFirstGame;
    }

    public void SetIsMusicOn(bool isMusicOn)
    {
        this.isMusicOn = isMusicOn;
    }


    public void SetBestScoreArr(int[] bsetScoreArr)
    {
        this.bsetScoreArr = bsetScoreArr;
    }

    public void SetSelectedSkin(int selectedSkin)
    {
        this.selectedSkin = selectedSkin;
    }

    public void SetSkinUnlock(bool[] skinUnlock)
    {
        this.skinUnlock = skinUnlock;
    }

    public void SetDiamondCount(int allDiamondCount)
    {
        this.allDiamondCount = allDiamondCount;
    }

    public bool GetIsFirstGame()
    {
        return isFirstGame;
    }

    public bool GetIsMusicOn()
    {
        return isMusicOn;
    }


    public int[] GetBestScoreArr()
    {
        return bsetScoreArr;
    }

    public int GetSelectedSkin()
    {
        return selectedSkin;
    }

    public bool[] GetSkinUnlock()
    {
        return skinUnlock;
    }

    public int GetDiamondCount()
    {
        return allDiamondCount;
    }

}
