import { ExtensionCustomizeType, } from '../../types';
import React, { useMemo } from 'react';
import _ from 'lodash';
import { UiExtension } from './UiExtension';
export const withExtensionHook = (OrgComponent, extensionConfig) => {
    return React.memo((props) => {
        const extensionData = useMemo(() => {
            const _extensionData = props.extensionData || {};
            if (
            // extensionDataConfig được pass vào từ url-rewrite, chính là data của extension
            !props.hasOwnProperty('extensionDataConfig') ||
                !Array.isArray(extensionConfig.structure) ||
                extensionConfig.customizeType !== ExtensionCustomizeType.HOOK) {
                return _extensionData;
            }
            _extensionData['hookCpt'] = {};
            _.forEach(extensionConfig.structure, (s) => {
                const mayBeExtensionDataConfig = _.find(props.extensionDataConfig.extensionDataConfigs, (c) => c && s && c['forHookId'] === s['hookId']);
                if (mayBeExtensionDataConfig) {
                    _extensionData['hookCpt'][s['hookId']] = (React.createElement(UiExtension, { uiId: s.uiId, extensionDataConfig: mayBeExtensionDataConfig }));
                }
                else {
                    // logger.warn('Could not found hook config for id ' + s['hookId']);
                }
            });
            return _extensionData;
        }, [extensionConfig.uiId]);
        return React.createElement(OrgComponent, { ...props, extensionData: extensionData });
    });
};
//# sourceMappingURL=withExtensionHook.js.map