import React, { useMemo } from 'react';
import { getUiExtension } from './getUiExtension';
import _ from 'lodash';
export const UiExtension = React.memo((props) => {
    const uiId = useMemo(() => {
        const _uiId = props.uiId || props.extensionDataConfig?.uiId;
        if (!_.isString(_uiId)) {
            throw new Error('UiExtension must have `uiId` property');
        }
        return _uiId;
    }, [props]);
    // logger.render('UiExtension: ' + uiId);
    // const Component = useMemo(() => {
    //   const C = getUiExtension(uiId);
    //
    //   return <C {...props} />;
    // }, [uiId]);
    //
    // return <>{Component}</>;
    const Component = getUiExtension(uiId);
    return React.createElement(Component, { ...props });
});
UiExtension.displayName = 'UiExtension';
//# sourceMappingURL=UiExtension.js.map