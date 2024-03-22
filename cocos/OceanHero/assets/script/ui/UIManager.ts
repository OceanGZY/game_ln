/*
 * @Author: OCEAN.GZY
 * @Date: 2024-03-22 13:32:20
 * @LastEditors: OCEAN.GZY
 * @LastEditTime: 2024-03-22 15:51:39
 * @FilePath: /OceanHero/assets/script/ui/UIManager.ts
 * @Description: 注释信息
 */

import { Node, Prefab, find, instantiate, resources } from "cc";

export enum PanelType {
    UIGame = "UIGame",
    UIStartUp = "UIStartUp",
    UISound = "UISound",
    UISkillUpgrade = "UISkillUpgrade"
}


export class UIManager {
    // 单例
    private static _instance: UIManager = null;

    static get instance(): UIManager {
        if (this._instance == null) {
            this._instance = new UIManager();
        }
        return this._instance;
    }

    uiRoot: Node;
    panels: Map<string, Node> = new Map(); // 存储已经实例化的面板

    openPanel(name: string, bringToTop: boolean = true) {
        if (this.uiRoot == null) {
            this.uiRoot = find("UIRoot");
        }
        if (this.panels.has(name)) { // 如果panels里存放的有该name-panel
            let panel = this.panels.get(name);
            panel.active = true;
            if (bringToTop) { // 添加到最上层
                let _index = panel.parent.children.length - 1;
                panel.setSiblingIndex(_index);
            }
            return;
        }

        resources.load("ui/prefab/" + name, Prefab, (err: Error, data: Prefab) => {
            let panel = instantiate(data);
            this.panels.set(name, panel);
            this.uiRoot.addChild(panel);
            if (bringToTop) { // 添加到最上层
                let _index = panel.parent.children.length - 1;
                panel.setSiblingIndex(_index);
            }
        })
    }

    closePanel(name: string, needDestory: boolean = false) {
        if (!this.panels.has(name)) {
            return;
        }
        let panel = this.panels.get(name);

        if (needDestory) {
            this.panels.delete(name);
            panel.removeFromParent();
            return;
        }
        panel.active = false;
    }

    openDialog(name: string) {
        for (let panelType in PanelType) {
            if (panelType == name) {
                this.openPanel(name);
            } else {
                this.closePanel(panelType);
            }
        }
    }

    closeDialog(needDestory: boolean = false) {
        for (let panelType in PanelType) {
            this.closePanel(panelType, needDestory);
        }
    }

}

