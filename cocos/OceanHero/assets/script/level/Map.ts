import { _decorator, BoxCollider, Component, macro, Node, randomRange, RigidBody, v3, Vec3 } from 'cc';
import { CharacterManager } from './CharacterManager';
import { Character } from '../character/Character';
const { ccclass, property } = _decorator;

@ccclass('Map')
export class Map extends Component {

    @property(BoxCollider)
    spawnArea: BoxCollider = null;

    spawnPos: Vec3 = v3();

    baseLife: number = 5;

    maxAliveEnemy: number = 50;
    enemycnt: number = 10;

    start() {
        CharacterManager.instance.init(() => {
            // 每10s生成一个敌人
            this.schedule(
                () => {
                    for (let i = 0; i < this.enemycnt; i++) {
                        this.randomSpawn();
                    }

                }, 10, macro.REPEAT_FOREVER, 1.0
            );

            // 每20S敌人加强一次
            this.schedule(
                () => {
                    this.baseLife *= 1.2;
                }, 20, macro.REPEAT_FOREVER, 1.0
            );
        });
    }

    randomSpawn() {
        console.log("CharacterManager.instance.enemies",CharacterManager.instance.enemies)
        if (CharacterManager.instance.enemies.length > this.maxAliveEnemy) {
            return;
        }

        if (CharacterManager.instance.playerCharacter.dead) {
            return;
        }
        this.spawnPos = v3(randomRange(-this.spawnArea.size.x, this.spawnArea.size.x),
            0,
            randomRange(-this.spawnArea.size.z, this.spawnArea.size.z));
        this.doSpawm(this.spawnPos);
    }

    doSpawm(spawnPoint: Vec3) {
        let enemyNode = CharacterManager.instance.createEnemy();
        enemyNode.worldPosition = spawnPoint;

        let _char = enemyNode.getComponent(Character);
        _char.cProperty.maxLife = this.baseLife;
        _char.cProperty.life = this.baseLife;

        let _scale = randomRange(1.0, 2.0);
        enemyNode.setWorldScale(_scale, _scale, _scale);

        let _rigidBody = enemyNode.getComponent(RigidBody);
        _rigidBody.mass = _scale;

    }

    update(deltaTime: number) {

    }
}

