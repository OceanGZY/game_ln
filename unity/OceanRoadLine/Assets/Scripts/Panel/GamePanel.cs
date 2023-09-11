using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GamePanel : MonoBehaviour
{
    private Button btn_pause;

    private Button btn_resume;

    private Text score_text;

    private Text diamond_num;

    private void Init()
    {
        btn_pause = transform.Find("PauseBtn").GetComponent<Button>();
        btn_pause.onClick.AddListener(OnPauseBtnClick);

        btn_resume = transform.Find("ResumeBtn").GetComponent<Button>();
        btn_resume.onClick.AddListener(OnResumeBtnClick);


        score_text = transform.Find("TextScore").GetComponent<Text>();

        diamond_num = transform.Find("Diamond/DiamondNum").GetComponent<Text>();

        btn_resume.gameObject.SetActive(false); // 游戏GamePanel中ResumeBtn隐藏

        gameObject.SetActive(false); // 游戏GamePanel隐藏

    }


    private void Awake()
    {
        EventCenter.AddListener(EventDefine.ShowGamePanel, Show);
        Init();
    }


    private void OnPauseBtnClick()
    {
        btn_pause.gameObject.SetActive(false);
        btn_resume.gameObject.SetActive(true); // 游戏GamePanel中ResumeBtn显示
    }


    private void OnResumeBtnClick()
    {
        btn_resume.gameObject.SetActive(false);
        btn_pause.gameObject.SetActive(true); // 游戏GamePanel中PauseBtn显示
    }


    private void Show()
    {
        gameObject.SetActive(true);
    }


    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.ShowGamePanel, Show);
    }

}
