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
        EventCenter.Broadcast(EventDefine.ShowShopPanel);
    }

    /*
     * 排行按钮点击 调用
    */
    private void OnRankBtnClick()
    {
        EventCenter.Broadcast(EventDefine.ShowRankPanel);
    }

    /*
     * 声音按钮点击 调用
    */
    private void OnVolumeBtnClick()
    {

    }


    /// <summary>
    /// 重置按钮被点击
    /// </summary>
    private void OnResetBtnClick()
    {
        Debug.Log("重置按钮被点击");
        EventCenter.Broadcast(EventDefine.ShowResetPanel);
    }

    /// <summary>
    /// 更换皮肤
    /// </summary>
    /// <param name="index"></param>
    private void ChangeSkin(int index)
    {
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
