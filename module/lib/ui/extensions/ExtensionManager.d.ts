import { Map } from 'immutable';
import { ExtensionConfig, UiComponent, UiHOC } from '../../types';
export declare class ExtensionManager {
    static COMPONENTS: Map<string, ExtensionConfig>;
    protected static INSTANCE: any;
    static RESOLVED_COMPONENTS: Map<string, UiComponent<any>>;
    static getInstance(): ExtensionManager;
    config(configs: ExtensionConfig | ExtensionConfig[]): ExtensionManager;
    cptCfg(uiId: string): ExtensionConfig | undefined;
    getHoc(hocId: string): UiHOC | any;
}
