using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MainPanel : MonoBehaviour
{

    private Button btn_start;

    private Button btn_shop;

    private Button btn_rank;

    private Button btn_volume;

    private Button btn_reset;

    private ManagerVars vars;

    private void Awake()
    {
        vars = ManagerVars.GetManagerVars();
        EventCenter.AddListener(EventDefine.ShowMainPanel, Show);
        EventCenter.AddListener<int>(EventDefine.ChangeSkin, ChangeSkin);
        Init();
    }

    private void Start()
    {
        if (GameData.IsAgiainGame)
        {
            EventCenter.Broadcast(EventDefine.ShowGamePanel);
            gameObject.SetActive(false);
        }
        SoundCheck();
        ChangeSkin(GameManager.Instance.SelectedSkin);

    }

    private void Init()
    {
        btn_start = transform.Find("BtnStart").GetComponent<Button>();
        btn_start.onClick.AddListener(OnStartBtnClick);

        btn_shop = transform.Find("ControllBtns/BtnShop").GetComponent<Button>();
        btn_shop.onClick.AddListener(OnShopBtnClick);

        btn_rank = transform.Find("ControllBtns/BtnRank").GetComponent<Button>();
        btn_rank.onClick.AddListener(OnRankBtnClick);

        btn_volume = transform.Find("ControllBtns/BtnVolume").GetComponent<Button>();
        btn_volume.onClick.AddListener(OnVolumeBtnClick);


        btn_reset = transform.Find("ControllBtns/BtnReset").GetComponent<Button>();
        btn_reset.onClick.AddListener(OnResetBtnClick);
    }


    /*
     * 开始按钮点击 调用
    */
    private void OnStartBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        GameManager.Instance.IsGameStarted = true;
        // GameManager.Instance.IsGameOver = false ;
        EventCenter.Broadcast(EventDefine.ShowGamePanel);
        gameObject.SetActive(false);
    }

    /*
     * 商店按钮点击 调用
    */
    private void OnShopBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        EventCenter.Broadcast(EventDefine.ShowShopPanel);
    }

    /*
     * 排行按钮点击 调用
    */
    private void OnRankBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        EventCenter.Broadcast(EventDefine.ShowRankPanel);
    }

    /*
     * 声音按钮点击 调用
    */
    private void OnVolumeBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        GameManager.Instance.SetIsMusicOn(!GameManager.Instance.GetIsMusicOn());
        SoundCheck();

    }


    private void SoundCheck()
    {
        if (GameManager.Instance.GetIsMusicOn())
        {
            btn_volume.transform.GetChild(0).GetComponent<Image>().sprite = vars.musicOn;
        }
        else
        {
            btn_volume.transform.GetChild(0).GetComponent<Image>().sprite = vars.musicOff;
        }
        EventCenter.Broadcast(EventDefine.MusicIsOn, GameManager.Instance.GetIsMusicOn());

    }


    /// <summary>
    /// 重置按钮被点击
    /// </summary>
    private void OnResetBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        Debug.Log("重置按钮被点击");
        EventCenter.Broadcast(EventDefine.ShowResetPanel);
    }

    /// <summary>
    /// 更换皮肤
    /// </summary>
    /// <param name="index"></param>
    private void ChangeSkin(int index)
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        btn_shop.transform.GetChild(0).GetComponent<Image>().sprite = vars.skinSpriteList[index];
    }

    private void Show()
    {
        gameObject.SetActive(true);
    }

    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.ShowMainPanel, Show);
        EventCenter.RemoveListener<int>(EventDefine.ChangeSkin, ChangeSkin);
    }

}
