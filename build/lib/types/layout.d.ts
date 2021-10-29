import { UiComponent } from './ui';
import { LazyExoticComponent } from 'react';
export declare enum ExtensionType {
    ROOT = 0,
    HEAD = 1,
    HEAD_COMPONENT = 2,
    COMPONENT = 3
}
export declare enum ExtensionCustomizeType {
    FIX = 0,
    HOOK = 1,
    CAN_PUSH = 2,
    CAN_REMOVE = 3,
    CAN_PUSH_REMOVE = 4
}
export interface ExtensionConfig {
    uiId: string;
    uiTags?: string[];
    title?: string;
    type?: ExtensionType;
    component: UiComponent<any> | {
        defer: () => UiComponent<any>;
    } | {
        lazy: LazyExoticComponent<any>;
    };
    customizeType?: ExtensionCustomizeType;
    childrenType?: ExtensionType | ExtensionType[];
    initProps?: any;
    structure?: ExtensionStructureItem[];
    hoc?: (string | HOCConfig)[];
    config?: any;
    configData?: any;
    priority?: number | (() => number);
    priorityFn?: number | (() => number);
    isDisabled?: boolean;
}
export interface ExtensionStructureItem {
    title?: string;
    hookId?: string;
    uiId: string;
    customizeType: ExtensionCustomizeType;
    childrenType?: ExtensionType | ExtensionType[];
    structure?: ExtensionStructureItem[];
}
export interface ExtensionDataConfig {
    forHookId?: string;
    uiId?: string;
    extensionDataConfigs?: ExtensionDataConfig[];
    additionalData?: any;
    [propName: string]: any;
}
export interface HOCConfig {
    action: 'add' | 'remove';
    name: string;
    before?: string;
    after?: string;
    priority?: number;
}
