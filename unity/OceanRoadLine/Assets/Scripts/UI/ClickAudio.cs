using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ClickAudio : MonoBehaviour
{
    private AudioSource audioSource;
    private ManagerVars vars;

    private void Awake()
    {
        EventCenter.AddListener(EventDefine.PlayClickAudio, PlayAudio);
        EventCenter.AddListener<bool>(EventDefine.MusicIsOn, MusicIsOn);
        Init();
    }

    private void OnDestroy()
    {
        EventCenter.RemoveListener(EventDefine.PlayClickAudio, PlayAudio);
        EventCenter.RemoveListener<bool>(EventDefine.MusicIsOn, MusicIsOn);

    }

    private void Init()
    {
        audioSource = GetComponent<AudioSource>();
        vars = ManagerVars.GetManagerVars();
    }

    private void PlayAudio()
    {
        audioSource.PlayOneShot(vars.buttonClip);
    }

    // 音效是否开启
    private void MusicIsOn(bool isOn)
    {
        audioSource.mute = !isOn;
    }
}
