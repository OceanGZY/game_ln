import { _decorator, Component, Node, EventKeyboard, KeyCode, input, Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    @property player: Node;
    @property chickenRoot: Node;



    start() {
        this.handleInput();
    }

    update(deltaTime: number) {

    }

    handleInput() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                break;
            case KeyCode.ARROW_RIGHT:
                break;
        }
    }
}


