import { Map } from 'immutable';
import { HOCConfig, UiHOC } from '../../types';
export declare class HOCManager {
    protected static INSTANCE: HOCManager;
    protected static hocs: Map<string, UiHOC>;
    static getInstance(): HOCManager;
    addHOC(hocName: string, uiHOC: UiHOC): HOCManager;
    getByName(hocName: string): UiHOC | undefined;
    configHOCs(uiHOCs: UiHOC[]): void;
    /**
     * @param hoc
     * @returns {any[]}
     */
    resolveExtensionHOCs(hoc?: (HOCConfig | string)[]): string[];
}
