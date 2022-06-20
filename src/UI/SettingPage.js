
import { Page, pm } from "./Page.js";
import { World } from "../World/World.js";

// TODO: 使用单个设置单例来同步设置以及持久化

class SettingPage extends Page {
    static get shortPageID() { return "setting"; };
    static get templateUrl() { return "src/UI/SettingPage.html"; };
    constructor() {
        super();
        this.worldTerrainBtns = this.shadowRoot.querySelectorAll(".world-terrain");
        for (let btn of this.worldTerrainBtns) {
            if (btn.innerHTML == World.config.terrain)
                btn.setAttribute("disabled", "true");
            btn.onclick = (e) => {
                btn.setAttribute("disabled", "");
                for (let b of this.worldTerrainBtns)
                    if (b !== btn) b.removeAttribute("disabled");
                World.config.terrain = btn.innerHTML;
            };
        }
        this.homepageBlur = this.shadowRoot.getElementById("homepage-blur");
        let blurLevel = (window.getComputedStyle(
            pm.getPageByID("welcome").bgCanvas).filter.replace(/[^\d.]+/g, "") * window.devicePixelRatio).toFixed(1);
        this.homepageBlur.setAttribute("value", blurLevel);
        this.homepageBlur.setAttribute("progress", blurLevel);
        this.homepageBlur.addEventListener("valueChange", ({ detail }) => {
            pm.getPageByID("welcome").bgCanvas.style.filter = `blur(calc(${detail}px / var(--device-pixel-ratio)))`;
            this.homepageBlur.setAttribute("progress", (+detail).toFixed(1));
        });
    };
    onHistoryBack() { this.close(); };
};

SettingPage.asyncLoadAndDefine();


export {
    SettingPage,
};
