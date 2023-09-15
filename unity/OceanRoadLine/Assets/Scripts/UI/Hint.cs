using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using DG.Tweening;

public class Hint : MonoBehaviour
{
    private Image img_bg;

    private TextMeshProUGUI text_hint;


    private void Awake()
    {
        Init();
        EventCenter.AddListener<string>(EventDefine.Hint, ShowHint);
    }

    private void OnDestroy()
    {
        EventCenter.RemoveListener<string>(EventDefine.Hint, ShowHint);
    }

    private void Init()
    {
        img_bg = GetComponent<Image>();
        text_hint = GetComponentInChildren<TextMeshProUGUI>();

        img_bg.color = new Color(img_bg.color.r, img_bg.color.g, img_bg.color.b, 0);
        text_hint.color = new Color(text_hint.color.r, text_hint.color.g, text_hint.color.b, 0);

    }


    private void ShowHint(string text)
    { // 显示
        StopCoroutine("DelayShowHint"); // 关闭协程

        transform.localPosition  = new Vector3(0, -70, 0);
        text_hint.text = text;
        transform.DOLocalMoveY(0, 0.3f).OnComplete(() =>
        { // 移动到0位置
            StartCoroutine("DelayShowHint"); // 等待1S后再移动到70并消失
        });
        img_bg.DOColor(new Color(img_bg.color.r, img_bg.color.g, img_bg.color.b, 0.4f), 0.1f);
        text_hint.DOColor(new Color(text_hint.color.r, text_hint.color.g, text_hint.color.b, 1), 0.1f);

    }


    private IEnumerator DelayShowHint() //协程
    {
        yield return new WaitForSeconds(1f);
        transform.DOLocalMoveY(70, 0.3f).SetEase(Ease.OutQuad);
        img_bg.DOColor(new Color(img_bg.color.r, img_bg.color.g, img_bg.color.b, 0), 0.1f);
        text_hint.DOColor(new Color(text_hint.color.r, text_hint.color.g, text_hint.color.b, 0), 0.1f);
    }
}
