import { ExtensionConfig, UiHOC } from '../types';
export declare class UiManager {
    static config(uiData: {
        extensionConfigs: ExtensionConfig[];
        uiHOCs: UiHOC[];
    }): void;
}
