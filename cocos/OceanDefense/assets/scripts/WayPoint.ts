import { _decorator, Component, Node, TransformBit } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WayPoint')
export class WayPoint extends Component {

    wayPoints: Array<Node> = [];
    wayLength: number = 0;


    start() {
        this.wayPoints = this.node.children;
        this.wayLength = this.wayPoints.length;
    }

    update(deltaTime: number) {

    }

    getWayPoint(index: number) {
        return this.wayPoints[index].position;
    }
}


