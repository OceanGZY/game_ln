import { Vec3, v3 } from "cc";


let tempvec: Vec3 = v3();
let tempvec1: Vec3 = v3();
let tempvec2: Vec3 = v3();
let tempVec4: Vec3 = v3();

export class MathUtil {
    // 带符号向量的夹角
    static signAngle(from: Vec3, to: Vec3, axis: Vec3): number {
        const angle = Vec3.angle(from, to);

        let cross = v3();
        Vec3.cross(cross, from, to); //向量叉乘

        const sign = Math.sign(cross.x * axis.x + cross.y * axis.y + cross.z * axis.z);
        return angle * sign;
    }

    // 按照某个轴旋转向量
    static rotateAround(out: Vec3, forward: Vec3, axis: Vec3, maxAngle: number) {
        const cos = Math.cos(maxAngle);
        const sin = Math.sin(maxAngle);

        Vec3.multiplyScalar(tempvec, forward, cos);
        Vec3.cross(tempvec1, axis, forward);
        Vec3.scaleAndAdd(tempvec2, tempvec, tempvec1, sin);

        const dot = Vec3.dot(axis, forward);
        Vec3.scaleAndAdd(out, tempvec2, axis, dot * (1.0 - cos));
    }


    static rotateToward(out: Vec3, from: Vec3, to: Vec3, maxAngle: number) {
        Vec3.cross(tempVec4, from, to);

        this.rotateAround(out, from, tempVec4, maxAngle);
    }


}