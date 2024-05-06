import { ProgressBar, SceneAsset, director } from "cc";

export class ChangeScene {

    private _loadComplete: boolean = false;
    private _loadSProgress: number = 0.0;
    private _nextScene: string = "";

    private static _instance: ChangeScene;

    public static getInstance(): ChangeScene {
        if (this._instance == null) {
            this._instance = new ChangeScene();
        }
        return this._instance;
    }

    public changeScene(nextName: string) {
        this._nextScene = nextName;
        this._loadSProgress = 0.0;
        this._loadComplete = false;
        director.preloadScene(nextName, this.getLoadProgress, this.loadComplete)
        director.loadScene("loading");
    }

    public getCurrentProgress(): number {
        return this._loadSProgress;
    }


    private getLoadProgress(completedCount: number, totalCount: number, item: any) {
        ChangeScene.getInstance()._loadSProgress = completedCount / totalCount;
    }


    private loadComplete(error: null | Error, sceneAsset?: SceneAsset) {
        if (error == null) {
            ChangeScene.getInstance()._loadComplete = true;
            director.loadScene(ChangeScene.getInstance()._nextScene);
        }
    }
}

