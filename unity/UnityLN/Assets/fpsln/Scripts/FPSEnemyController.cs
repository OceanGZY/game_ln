using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FPSEnemyController : MonoBehaviour
{

    public GameObject m_enemy;

    private Animator m_animator;


    // Start is called before the first frame update
    void Start()
    {
        m_animator = GameObject.Find("Barbarian").GetComponent<Animator>();
        m_animator.SetFloat("MoveSpeed", 10);
    }

    // Update is called once per frame
    void Update()
    {

    }
}
