using System;
using System.Collections;
using System.Collections.Generic;
using System.Xml.Serialization;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameResetPanel : MonoBehaviour
{

    private Button btn_yes;

    private Button btn_no;

    private Image img_bg;

    private GameObject dialog;


    private void Awake()
    {
        EventCenter.AddListener(EventDefine.ShowResetPanel, ShowDialog);
        Init();
    }


    private void Init()
    {
        gameObject.SetActive(false);
        img_bg = transform.Find("Bg").GetComponent<Image>();

        dialog = transform.Find("Dialog").gameObject;

        btn_yes = transform.Find("Dialog/BtnYes").GetComponent<Button>();
        btn_yes.onClick.AddListener(OnYesBtnClick);

        btn_no = transform.Find("Dialog/BtnNo").GetComponent<Button>();
        btn_no.onClick.AddListener(OnNoBtnClick);

        img_bg.color = new Color(img_bg.color.r, img_bg.color.g, img_bg.color.b, 0f);

        dialog.transform.localScale = Vector3.zero;
    }



    private void OnNoBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio); 
        img_bg.DOColor(new Color(img_bg.color.r, img_bg.color.g, img_bg.color.b, 0), 0.3f);
        dialog.transform.DOScale(Vector3.zero, 0.3f).SetEase(Ease.OutBack).OnComplete(() =>
        {
            gameObject.SetActive(false);
        });

    }


    private void OnYesBtnClick()
    {
        EventCenter.Broadcast(EventDefine.PlayClickAudio); 
        GameManager.Instance.ResetGame();
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);

    }


    private void ShowDialog()
    {
        Debug.Log("触发了重置");
        gameObject.SetActive(true);
        img_bg.DOColor(new Color(img_bg.color.r, img_bg.color.g, img_bg.color.b, 0.3f), 0.3f);
        dialog.transform.DOScale(Vector3.one, 0.3f).SetEase(Ease.OutBack);
    }

    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.ShowResetPanel, ShowDialog);
    }
}
