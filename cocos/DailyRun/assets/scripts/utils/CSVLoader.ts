/*
 * @Author: OCEAN.GZY
 * @Date: 2024-05-05 23:56:06
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-05-06 17:20:54
 * @FilePath: /DailyRun/assets/scripts/utils/CSVLoader.ts
 * @Description: 注释信息
 */

import { TextAsset, resources } from "cc";


export class CSVLoader {

    private static _instance: CSVLoader;

    static getInstance(): CSVLoader {
        if (this._instance == null) {
            this._instance = new CSVLoader();
        }
        return this._instance;
    }


    loadCSV(file: string): Promise<Array<any>> {
        return new Promise<Array<any>>((resolve, reject) => {
            resources.load("data/" + file, TextAsset, (err: Error, data: TextAsset) => {
                let temp = data["text"]
                console.log(temp);
                let res = temp.split("\n").map((v) => {
                    let temp1 = v.split(",").map((newv) => {
                        return newv.replace("\"", "\'") 
                    })

                    return temp1;
                })
                // console.log(res);
                resolve(res);
            })
        })
    }
}

