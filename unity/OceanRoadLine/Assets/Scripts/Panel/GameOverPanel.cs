using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using TMPro;

public class GameOverPanel : MonoBehaviour
{
    private Button btn_rank;

    private Button btn_home;

    private Button btn_restart;


    private TextMeshProUGUI diamond_num;

    private TextMeshProUGUI score_text;

    private TextMeshProUGUI max_score_text;



    private void Awake()
    {
        EventCenter.AddListener(EventDefine.ShowGameOverPanel, Show);
        Init();
    }

    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.ShowGameOverPanel, Show);
    }

    private void Init()
    {
        btn_restart = transform.Find("RestartBtn").GetComponent<Button>();
        btn_restart.onClick.AddListener(OnRestartBtnClick);

        btn_home = transform.Find("ControllBtns/BtnHome").GetComponent<Button>();
        btn_home.onClick.AddListener(OnHomeBtnClick);

        btn_rank = transform.Find("ControllBtns/BtnRank").GetComponent<Button>();
        btn_rank.onClick.AddListener(OnRankBtnClick);

        score_text = transform.Find("FinalScore").GetComponent<TextMeshProUGUI>();

        max_score_text = transform.Find("MaxScore").GetComponent<TextMeshProUGUI>();

        diamond_num = transform.Find("Diamond/DiamondNum").GetComponent<TextMeshProUGUI>();

        gameObject.SetActive(false);


    }

    /// <summary>
    /// 排行榜按钮被点击
    /// </summary>
    private void OnRankBtnClick()
    {
        Debug.Log("OnRankBtnClick");
    }

    /// <summary>
    /// 重新开始按钮被点击
    /// </summary>
    private void OnRestartBtnClick()
    {
        Debug.Log("OnRestartBtnClick");
        SceneManager.LoadScene(SceneManager.GetActiveScene().name); // 重新加载当前激活的场景
        GameData.IsAgiainGame = true; // 重新开始游戏 
    }


    /// <summary>
    /// 主页按钮被点击
    /// </summary>
    private void OnHomeBtnClick()
    {
        Debug.Log("OnHomeBtnClick");
        SceneManager.LoadScene(SceneManager.GetActiveScene().name); // 重新加载当前激活的场景
        GameData.IsAgiainGame = false;
    }


    /// <summary>
    /// 显示panel
    /// </summary>
    private void Show()
    {
        score_text.text = GameManager.Instance.GameScore.ToString();
        diamond_num.text = "+" + GameManager.Instance.GameDiamond.ToString();
        gameObject.SetActive(true);
    }

}
