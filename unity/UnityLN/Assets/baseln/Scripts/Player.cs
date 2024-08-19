using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{

    public GameObject m_player;
    public float m_speed = 5;

    private Vector3 m_tempMousePos = Vector3.zero;

    private Animator m_animator;

    // Start is called before the first frame update
    void Start()
    {
        m_animator = GameObject.Find("Mutant").GetComponent<Animator>();

    }

    // Update is called once per frame
    void Update()
    {
        // PlayerMoveControll_ByKeyCharacterController();
        PlayerMoveControll_ByMouseClick();

        if (m_player.transform.localPosition == m_tempMousePos)
        {
            m_animator.SetFloat("MoveSpeed", 0);
        }
    }

    // WASD移动
    void PlayerMoveControll_ByKeyCharacterController()
    {
        float horizontal = Input.GetAxis("Horizontal"); //A D 左右
        float vertical = Input.GetAxis("Vertical"); //W S 上 下

        m_player.GetComponent<CharacterController>().SimpleMove(horizontal * m_speed * transform.right);
        m_player.GetComponent<CharacterController>().SimpleMove(m_speed * vertical * transform.forward);

    }

    // 跟随鼠标点击移动
    void PlayerMoveControll_ByMouseClick()
    {
        // 右键点击
        if (Input.GetMouseButtonDown(1))
        {
            Debug.Log("点击了右键");
            m_animator.SetFloat("MoveSpeed", m_speed);
            Debug.Log("m_animator" + m_animator.GetFloat("MoveSpeed").ToString());


            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            if (Physics.Raycast(ray, out RaycastHit hitInfo))
            {
                m_tempMousePos = hitInfo.point;
            }
        }


        float step = m_speed * Time.deltaTime;
        m_player.transform.localPosition = Vector3.MoveTowards(m_player.transform.localPosition, m_tempMousePos, step);
        m_player.transform.LookAt(m_tempMousePos);

    }
}
