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

    public float nextXPos= 0.55f,nextYPos = 0.65f;

    public GameObject normalPlatformPre;

    public GameObject characterPre;

}
