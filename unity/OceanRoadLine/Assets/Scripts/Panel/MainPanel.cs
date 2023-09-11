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

    private void Awake()
    {
        Init();
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
        btn_rank.onClick.AddListener(OnVolumeBtnClick);
    }


    /*
     * 开始按钮点击 调用
    */
    private void OnStartBtnClick()
    {
        GameManager.Instance.IsGameStarted = true ;
        GameManager.Instance.IsGameOver = false ;
        EventCenter.Broadcast(EventDefine.ShowGamePanel);
        gameObject.SetActive(false);
    }

    /*
     * 商店按钮点击 调用
    */
    private void OnShopBtnClick()
    {

    }

    /*
     * 排行按钮点击 调用
    */
    private void OnRankBtnClick()
    {

    }

    /*
     * 声音按钮点击 调用
    */
    private void OnVolumeBtnClick()
    {

    }

}
