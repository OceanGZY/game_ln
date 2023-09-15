using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using DG.Tweening;

public class GameRankPanel : MonoBehaviour
{
    private Button btn_back;

    private GameObject dialog;


    private TextMeshProUGUI no1_text;

    private TextMeshProUGUI no2_text;

    private TextMeshProUGUI no3_text;


    private void Awake()
    {
        EventCenter.AddListener(EventDefine.ShowRankPanel, ShowDialog);
        Init();
    }

    private void Init()
    {
        gameObject.SetActive(false);
        btn_back = transform.Find("BgBackBtn").GetComponent<Button>();
        btn_back.onClick.AddListener(OnBackBtnClick);

        dialog = transform.Find("Dialog").gameObject;

        no1_text = transform.Find("Dialog/No1/No1Score").GetComponent<TextMeshProUGUI>();

        no2_text = transform.Find("Dialog/No2/No2Score").GetComponent<TextMeshProUGUI>();

        no3_text = transform.Find("Dialog/No3/No3Score").GetComponent<TextMeshProUGUI>();

        btn_back.GetComponent<Image>().color = new Color(btn_back.GetComponent<Image>().color.r, btn_back.GetComponent<Image>().color.g, btn_back.GetComponent<Image>().color.b, 0f);

        dialog.transform.localScale = Vector3.zero;
    }


    private void ShowDialog()
    {
        Debug.Log("触发了重置");
        // no1_text.text = GameData.Instance.sco.ToString();

        gameObject.SetActive(true);
        btn_back.GetComponent<Image>().DOColor(new Color(btn_back.GetComponent<Image>().color.r, btn_back.GetComponent<Image>().color.g, btn_back.GetComponent<Image>().color.b, 0.3f), 0.3f);
        dialog.transform.DOScale(Vector3.one, 0.3f).SetEase(Ease.OutBack);
    }

    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.ShowResetPanel, ShowDialog);
    }

    private void OnBackBtnClick()
    {
        btn_back.GetComponent<Image>().DOColor(new Color(btn_back.GetComponent<Image>().color.r, btn_back.GetComponent<Image>().color.g, btn_back.GetComponent<Image>().color.b, 0), 0.3f);
        dialog.transform.DOScale(Vector3.zero, 0.3f).SetEase(Ease.OutBack).OnComplete(() =>
        {
            gameObject.SetActive(false);
        });

    }
}
