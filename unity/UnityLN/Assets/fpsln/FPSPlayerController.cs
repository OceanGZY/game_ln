using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FPSPlayerController : MonoBehaviour
{
    public float m_speed = 5;
    public float m_rotateSpeed = 5;

    private float m_angleX; // 上下看，绕X轴转
    private float m_angleY; // 左右看，绕Y轴转

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        MoveByKeboard();
        LookRotationByMouse();
    }

    private void MoveByKeboard()
    {
        float verticalIn = Input.GetAxis("Vertical"); // 垂直轴向 WS
        float horizontalIn = Input.GetAxis("Horizontal"); // 水平轴向 AD

        Vector3 movementV = transform.forward * verticalIn * m_speed * Time.deltaTime;
        Vector3 movementH = transform.right * horizontalIn * m_speed * Time.deltaTime;

        transform.position += movementV + movementH;
    }

    private void LookRotationByMouse()
    {

        // 左右看， 改变Y的旋转值
        float mouseX = Input.GetAxis("Mouse X"); // 垂直轴向输入
        float lookHAngleY = mouseX * m_rotateSpeed;
        m_angleY += lookHAngleY;

        // 上下看， 改变X的旋转值
        float mouseY = -Input.GetAxis("Mouse Y"); // 水平轴向输入  
        float lookVAngleX = mouseY * m_rotateSpeed;
        m_angleX = Mathf.Clamp(m_angleX + lookVAngleX, -60, 60);

        transform.eulerAngles = new Vector3(m_angleX, m_angleY, transform.eulerAngles.z);
    }
}
