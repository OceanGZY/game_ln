using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class GamePanel : MonoBehaviour
{
    private Button btn_pause;

    private Button btn_resume;

    private TextMeshProUGUI score_text;

    private TextMeshProUGUI diamond_num;

    private void Init()
    {
        btn_pause = transform.Find("PauseBtn").GetComponent<Button>();
        btn_pause.onClick.AddListener(OnPauseBtnClick);

        btn_resume = transform.Find("ResumeBtn").GetComponent<Button>();
        btn_resume.onClick.AddListener(OnResumeBtnClick);


        score_text = transform.Find("TextScore").GetComponent<TextMeshProUGUI>();

        diamond_num = transform.Find("Diamond/DiamondNum").GetComponent<TextMeshProUGUI>();

        btn_resume.gameObject.SetActive(false); // 游戏GamePanel中ResumeBtn隐藏

        gameObject.SetActive(false); // 游戏GamePanel隐藏

    }


    private void Awake()
    {
        EventCenter.AddListener(EventDefine.ShowGamePanel, Show);
        EventCenter.AddListener<int>(EventDefine.UpdateShowScore, UpdateScoreText); // 监听 分数变化的消息，然后更新分数文本
        EventCenter.AddListener<int>(EventDefine.UpdateDiamonCount, UpdateDiamonCount); // 监听 钻石数量变化的消息，然后更新钻石数文本

        Init();
    }


    private void OnPauseBtnClick()
    {
        btn_pause.gameObject.SetActive(false);
        btn_resume.gameObject.SetActive(true); // 游戏GamePanel中ResumeBtn显示


        Time.timeScale = 0; // 游戏暂停
    }


    private void OnResumeBtnClick()
    {
        btn_resume.gameObject.SetActive(false);
        btn_pause.gameObject.SetActive(true); // 游戏GamePanel中PauseBtn显示

        Time.timeScale = 1;// 游戏继续
    }


    private void Show()
    {
        gameObject.SetActive(true);
    }


    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.ShowGamePanel, Show);
        EventCenter.RemoveListener<int>(EventDefine.UpdateShowScore, UpdateScoreText);
        EventCenter.RemoveListener<int>(EventDefine.UpdateDiamonCount, UpdateDiamonCount); // 监听 钻石数量变化的消息，然后更新钻石数文本

    }


    /// <summary>
    /// 更新成绩显示
    /// </summary>
    /// <param name="socre"></param>
    private void UpdateScoreText(int socre)
    {
        score_text.text = socre.ToString();
    }


    private void UpdateDiamonCount(int count)
    {
        diamond_num.text = count.ToString();
    }
}
