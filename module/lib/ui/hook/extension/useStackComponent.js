import React, { useMemo } from 'react';
import { UiExtension } from '../../extensions';
export const useStackComponent = (props) => {
    const Structures = useMemo(() => {
        if (!Array.isArray(props.extensionDataConfig.extensionDataConfigs)) {
            return null;
        }
        return props.extensionDataConfig.extensionDataConfigs?.map((s, index) => {
            if (s['uiId']) {
                return (React.createElement(UiExtension, { key: s.uiId + '' + index, uiId: s.uiId, extensionDataConfig: s }));
            }
            return null;
        });
    }, [props?.extensionDataConfig?.extensionDataConfigs]);
    return {
        Structures,
    };
};
//# sourceMappingURL=useStackComponent.js.map