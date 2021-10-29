import { ExtensionCustomizeType } from '../../types';
import { ExtensionManager } from './ExtensionManager';
import { withUiHOC } from './withUiHOC';
import _ from 'lodash';
import { withExtensionHook } from './withExtensionHook';
import ExtensionBlank from '../../components/ExtensionBlank/extension-blank';
import React, { Suspense, useMemo } from 'react';
const EXCLUDE_CACHE_COMPONENTS = ['DEFAULT_ROOT', 'STACK', 'TWO_COLUMNS'];
/**
 * Phải trả về luôn component function cái mà đã được config.
 * Nếu wrap lại thì các nextPage sẽ không work do không expose ra `getInitialProps`
 *
 * @param uiId
 * @returns {React.NamedExoticComponent<object>}
 */
export const getUiExtension = (uiId) => {
    if (!_.isString(uiId)) {
        console.error('uiId must be string');
    }
    if (!_.includes(EXCLUDE_CACHE_COMPONENTS, uiId) &&
        ExtensionManager.RESOLVED_COMPONENTS.has(uiId)) {
        return ExtensionManager.RESOLVED_COMPONENTS.get(uiId);
    }
    const extCfg = ExtensionManager.getInstance().cptCfg(uiId);
    if (!extCfg) {
        console.warn('Not found cfg for extension id: ' + uiId);
        return ExtensionBlank;
    }
    let CptConfig = extCfg.component;
    let OriginComponent;
    if (typeof CptConfig === 'object' &&
        typeof CptConfig['defer'] === 'function') {
        /*
         * Do cần phải config extension trước khi chạy nên nếu không để là function thì tất cả các page đều sẽ load drivers
         * Để tối ưu performance thì lúc nào cần load page nào mới thực hiện inject driver cho page đó
         * */
        OriginComponent = CptConfig.defer();
    }
    else if (typeof CptConfig === 'object' &&
        CptConfig.hasOwnProperty('lazy')) {
        CptConfig = CptConfig.lazy;
        OriginComponent = React.memo((props) => {
            return (React.createElement(React.Fragment, null,
                React.createElement(Suspense, { fallback: null },
                    React.createElement(CptConfig, { ...props }))));
        });
    }
    else {
        OriginComponent = CptConfig;
    }
    if (extCfg.customizeType === ExtensionCustomizeType.HOOK) {
        OriginComponent = withExtensionHook(OriginComponent, extCfg);
    }
    if (Array.isArray(extCfg.hoc) && extCfg.hoc.length > 0) {
        OriginComponent = withUiHOC(OriginComponent, extCfg.hoc);
    }
    const GetUiExtension = React.memo((props) => {
        const initProps = useMemo(() => {
            return extCfg.initProps ?? {};
        }, []);
        return React.createElement(OriginComponent, { ...initProps, ...props });
    });
    if (OriginComponent.hasOwnProperty('getInitialProps')) {
        // @ts-ignore
        GetUiExtension['getInitialProps'] = OriginComponent.getInitialProps;
    }
    GetUiExtension.displayName = 'getUiExtension: ' + uiId;
    ExtensionManager.RESOLVED_COMPONENTS =
        ExtensionManager.RESOLVED_COMPONENTS.set(uiId, GetUiExtension);
    return GetUiExtension;
};
//# sourceMappingURL=getUiExtension.js.map