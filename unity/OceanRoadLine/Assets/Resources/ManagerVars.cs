using System.Collections;
using System.Collections.Generic;
using UnityEngine;


// [CreateAssetMenu(menuName = "CreateManagerVarsContainer")]
public class ManagerVars : ScriptableObject
{
    public static ManagerVars GetManagerVars()
    {
        return Resources.Load<ManagerVars>("ManagerVarsContainer");
    }


    public List<Sprite> bgThemeSpriteList = new List<Sprite>();

    public List<Sprite> platformThemeSpriteList = new List<Sprite>();



    public float nextXPos = 0.554f, nextYPos = 0.645f;

    public GameObject normalPlatformPre;

    public List<GameObject> commonPlatformGroup = new List<GameObject>();

    public List<GameObject> grassPlatformGroup = new List<GameObject>();

    public List<GameObject> winterPlatformGroup = new List<GameObject>();



    public List<Sprite> skinSpriteList = new List<Sprite>(); //所有的皮肤

    public List<string> skinNameList = new List<string>(); //所有皮肤的名字

     public List<int> skinPriceList = new List<int>(); // 所有皮肤的价格


     public List<Sprite> skinBackSpriteList = new List<Sprite>(); //所有的皮肤背后

    public GameObject skinChooseItemPre;  // 被选中的skin


    public GameObject characterPre;

    public GameObject spikePlatformGroupLeftPre;

    public GameObject spikePlatformGroupRightPre;

    public GameObject deathEffectPre;

    public GameObject diamondtPre;

}
