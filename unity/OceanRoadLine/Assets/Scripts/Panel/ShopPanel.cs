using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using DG.Tweening;

public class ShopPanel : MonoBehaviour
{
    private ManagerVars vars;
    private Button btn_back;

    private Button btn_selected;

    private Button btn_buy;

    private TextMeshProUGUI skin_name;

    private TextMeshProUGUI all_diamond;

    private TextMeshProUGUI price_diamond;

    private Transform skin_select_parent; //皮肤选择的容器

    private int currentSkinIndex;


    private void Awake()
    {
        EventCenter.AddListener(EventDefine.ShowShopPanel, Show);
        vars = ManagerVars.GetManagerVars();

    }
    private void Start()
    {
        Init();
        gameObject.SetActive(false);
    }
    private void Init()
    {
        skin_select_parent = transform.Find("ScrollRect/Parent");
        skin_select_parent.GetComponent<RectTransform>().sizeDelta = new Vector2((vars.skinSpriteList.Count + 2) * 160, 300);

        btn_back = transform.Find("BackBtn").GetComponent<Button>();
        btn_back.onClick.AddListener(OnBackBtnClick);

        btn_selected = transform.Find("SelectedBtn").GetComponent<Button>();
        btn_selected.onClick.AddListener(OnSelectedBtnClick);

        btn_buy = transform.Find("BuyBtn").GetComponent<Button>();
        btn_buy.onClick.AddListener(OnBuyBtnClick);

        skin_name = transform.Find("SelectedSkinName").GetComponent<TextMeshProUGUI>();

        all_diamond = transform.Find("Diamond/DiamondNum").GetComponent<TextMeshProUGUI>();

        price_diamond = transform.Find("BuyBtn/Price/PriceDiamond").GetComponent<TextMeshProUGUI>();

        SetAllDiamond(GameManager.Instance.GetAllDiamond());


        for (int i = 0; i < vars.skinSpriteList.Count; i++)
        {
            GameObject go = Instantiate(vars.skinChooseItemPre, skin_select_parent);
            if (!GameManager.Instance.GetSkinIsUnlock(i))// 判断是否被解锁
            {
                go.GetComponentInChildren<Image>().color = Color.gray;
            }
            else
            {
                go.GetComponentInChildren<Image>().color = Color.white;
            }

            go.GetComponentInChildren<Image>().sprite = vars.skinSpriteList[i];
            go.transform.localPosition = new Vector3((i + 1) * 160, 0, 0);
        }

        skin_select_parent.transform.localPosition = new Vector3(GameManager.Instance.SelectedSkin * -160, 0, 0);
    }


    private void Update()
    {
        // 根据皮肤选择的容器， 位置 X的值判断 现在是选择的哪个皮肤
        currentSkinIndex = (int)Mathf.Round(skin_select_parent.transform.localPosition.x / -160.0f);

        // 鼠标抬起的时候，将容器滚动到选中的那个skin上
        if (Input.GetMouseButtonUp(0))
        {
            skin_select_parent.transform.DOLocalMoveX(currentSkinIndex * -160, 0.2f); //动画移动
            // skin_select_parent.transform.localPosition = new Vector3(currentSkinIndex * -160, 0, 0); //常规移动
        }
        SetItemSize(currentSkinIndex); // 设置skin的大小

        if (GameManager.Instance.GetSkinIsUnlock(currentSkinIndex))
        {
            btn_selected.gameObject.SetActive(true);
            btn_buy.gameObject.SetActive(false);
        }
        else
        {
            btn_selected.gameObject.SetActive(false);
            btn_buy.gameObject.SetActive(true);
        }

        SetSkinName(vars.skinNameList[currentSkinIndex]);
        SetPrice(vars.skinPriceList[currentSkinIndex]);
    }


    private void SetItemSize(int index)
    {
        for (int i = 0; i < skin_select_parent.childCount; i++)
        {
            if (index == i)  // 选中的皮肤放大
            {
                skin_select_parent.GetChild(i).GetChild(0).GetComponent<RectTransform>().sizeDelta = new Vector2(160, 160);
            }
            else
            {
                skin_select_parent.GetChild(i).GetChild(0).GetComponent<RectTransform>().sizeDelta = new Vector2(80, 80);
            }
        }
    }


    /// <summary>
    ///     返回按钮点击
    /// </summary>
    private void OnBackBtnClick()
    {
        EventCenter.Broadcast(EventDefine.ShowMainPanel);
        Debug.Log("返回");
        gameObject.SetActive(false);
    }

    /// <summary>
    ///     选择皮肤按钮被点击
    /// </summary>
    private void OnSelectedBtnClick()
    {
        Debug.Log("选择");
        EventCenter.Broadcast(EventDefine.ChangeSkin, currentSkinIndex);
        EventCenter.Broadcast(EventDefine.Hint,"选择角色成功");
        GameManager.Instance.SelectedSkin = currentSkinIndex; // 设置选中的角色索引序号
    }

    /// <summary>
    /// 购买
    /// </summary>
    private void OnBuyBtnClick()
    {
        Debug.Log("购买");
        int price = vars.skinPriceList[currentSkinIndex];
        Debug.Log("当前价格");
        Debug.Log(price);
        if (GameManager.Instance.GetAllDiamond() >= price)
        {
            int tempLast = GameManager.Instance.GetAllDiamond() - price;
            Debug.Log("剩余钻石");
            Debug.Log(tempLast);
            GameManager.Instance.SetAllDiamond(tempLast); // 最新的钻石余额
            GameManager.Instance.SetSkinIsUnlock(currentSkinIndex); // 已经解锁
            skin_select_parent.GetChild(currentSkinIndex).GetChild(0).GetComponent<Image>().color = Color.white;
            EventCenter.Broadcast(EventDefine.Hint, "解锁成功");
        }
        else
        {
            Debug.Log("钻石不足，钻石量为");
            Debug.Log(GameManager.Instance.GetAllDiamond());
            EventCenter.Broadcast(EventDefine.Hint, "钻石不足");
            return;
        }
    }

    private void SetSkinName(string name)
    {
        skin_name.text = name;
    }

    private void SetPrice(int price)
    {
        price_diamond.text = price.ToString();
    }


    private void SetAllDiamond(int diamond)
    {
        all_diamond.text = diamond.ToString();
    }

    private void Show()
    {
        gameObject.SetActive(true);
    }

    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.ShowShopPanel, Show);
    }
}
