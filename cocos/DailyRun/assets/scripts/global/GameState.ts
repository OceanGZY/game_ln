/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-06 16:16:46
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-06-27 17:44:15
 * @FilePath: /DailyRun/assets/scripts/global/GameState.ts
 * @Description: 注释信息
 */

import { NodePool, v2 } from "cc";
import { LevelDetailModel, LevelModel } from "../model/LevelModel";
import { CSVLoader } from "../utils/CSVLoader";

export class GameState {
    private static _instance: GameState;
    public static getInstance(): GameState {
        if (this._instance == null) {
            this._instance = new GameState();
        }
        return this._instance;
    }

    goldCoinPool: NodePool = new NodePool("GoldCoin");
    sliverCoinPool: NodePool = new NodePool("SliverCoin");

    allLevels: Array<LevelModel> = [];
    curLevelId: number = 1;
    currentLevel: LevelModel = {
        id: 0,
        levelType: "",
        levelTable: "",
        levelName: "",
        enemyCount: 0,
        goldCount: 0,
        silverCount: 0,
        maxTime: 0
    };


    curLevelData: Array<LevelDetailModel> = [];


    async parseData(path: string) {
        let data = await CSVLoader.getInstance().loadCSV(path);
        let dataHead = data[1];
        let parsedata = [];
        for (let i = 3; i < data.length; i++) {
            let temp = {};
            for (let j = 0; j < data[i].length; j++) {
                temp[dataHead[j]] = data[i][j];
            }
            parsedata.push(temp);
        }
        return parsedata;
    }

    async parseLevels(path: string) {
        let data = await this.parseData(path);
        data.forEach(element => {
            let temp: LevelModel = {
                id: element.id as number,
                levelType: element.levelType,
                levelTable: element.levelTable,
                levelName: element.levelName,
                enemyCount: element.enemyCount as number,
                goldCount: element.goldCount as number,
                silverCount: element.silverCount as number,
                maxTime: element.maxTime as number
            }
            this.allLevels.push(temp);
        });
        console.log("this.allLevels", this.allLevels);
    }

    /**
     * 
     * @param id 读取对应的子表， 暂时不用了
     */
    async parseCurLevelData(id: number) {
        this.curLevelId = id;
        let levelPath = this.allLevels[this.curLevelId - 1].levelTable;
        let data = await this.parseData(levelPath);
        data.forEach(element => {
            let temp: LevelDetailModel = {
                id: element.id as number,
                dtype: element.dtype,
                name: element.name,
                pfPath: element.pfPath,
                pos: v2(element.pos.split("|")[0] as number, element.pos.split("|")[1] as number),
                scale: element.scale ? v2(element.scale.split("|")[0] as number, element.scale.split("|")[1] as number) : v2(1, 1),
                speed: v2(0, 0),
                damage: element.damage as number,
                life: element.life as number,
                pscore: element.pscore as number
            }
            this.curLevelData.push(temp);
        });
        console.log("this.curLevelData", this.curLevelData);
    }


    async parseCurLevel(id: number) {
        this.curLevelId = id;
        this.currentLevel = this.allLevels[this.curLevelId];
    }

};