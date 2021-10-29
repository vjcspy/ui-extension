import { HOCManager } from './hoc';
import { ExtensionManager } from './extensions';
export class UiManager {
    static config(uiData) {
        HOCManager.getInstance().configHOCs(uiData.uiHOCs);
        ExtensionManager.getInstance().config(uiData.extensionConfigs);
    }
}
//# sourceMappingURL=UiManager.js.map