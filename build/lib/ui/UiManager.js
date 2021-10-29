"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiManager = void 0;
const hoc_1 = require("./hoc");
const extensions_1 = require("./extensions");
class UiManager {
    static config(uiData) {
        hoc_1.HOCManager.getInstance().configHOCs(uiData.uiHOCs);
        extensions_1.ExtensionManager.getInstance().config(uiData.extensionConfigs);
    }
}
exports.UiManager = UiManager;
//# sourceMappingURL=UiManager.js.map