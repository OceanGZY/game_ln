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
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        Debug.Log("OnRankBtnClick");
        EventCenter.Broadcast(EventDefine.ShowRankPanel);
    }

    /// <summary>
    /// 重新开始按钮被点击
    /// </summary>
    private void OnRestartBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        Debug.Log("OnRestartBtnClick");
        SceneManager.LoadScene(SceneManager.GetActiveScene().name); // 重新加载当前激活的场景
        GameData.IsAgiainGame = true; // 重新开始游戏 
    }


    /// <summary>
    /// 主页按钮被点击
    /// </summary>
    private void OnHomeBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio);
        Debug.Log("OnHomeBtnClick");
        SceneManager.LoadScene(SceneManager.GetActiveScene().name); // 重新加载当前激活的场景
        GameData.IsAgiainGame = false;
    }


    /// <summary>
    /// 显示panel
    /// </summary>
    private void Show()
    {
        if (GameManager.Instance.GetGameScore() > GameManager.Instance.GameMaxScore())
        {
            max_score_text.text = "新纪录!  " + GameManager.Instance.GetGameScore().ToString();
        }
        else
        {
            max_score_text.text = "最高分:" + GameManager.Instance.GameMaxScore().ToString();
        }
        GameManager.Instance.SaveScoreArr(GameManager.Instance.GetGameScore());
        score_text.text = GameManager.Instance.GetGameScore().ToString();
        diamond_num.text = "+" + GameManager.Instance.GetGameDiamond().ToString();

        int newtemp = GameManager.Instance.GetAllDiamond() + GameManager.Instance.GetGameDiamond();
        GameManager.Instance.SetAllDiamond(newtemp); // 更新总钻石数量
        gameObject.SetActive(true);
    }

}
