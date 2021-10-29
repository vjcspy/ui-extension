import React from 'react';
import _ from 'lodash';
import { HOCManager } from '../ui';
const getPropsName = (displayName) => {
    const regexPropsName = new RegExp(/^(With)(.*)(Props)$/);
    if (regexPropsName.exec(displayName)?.length === 4) {
        return true;
    }
    else {
        const regexWithoutPropsName = new RegExp(/^(with)(.*)/);
        const withoutPropsName = regexWithoutPropsName.exec(displayName);
        if (withoutPropsName && withoutPropsName.length === 3) {
            return 'With' + withoutPropsName[2] + 'Props';
        }
    }
    return false;
};
export const createUiHOC = (hookFn, displayName) => {
    /*
     * props1 được Extension truyền vào
     * */
    const hoc = (Component, props1) => {
        const UiHOC = React.memo((props2) => {
            const hookData = hookFn({ ...props1, ...props2 });
            return React.createElement(Component, { ...hookData, ..._.merge(hookData, props2) });
        });
        const oriDisplayName = Component.displayName || Component.name || 'Component';
        UiHOC.displayName = `${displayName}(${oriDisplayName})`;
        return UiHOC;
    };
    if (_.isString(displayName)) {
        HOCManager.getInstance().addHOC(displayName, hoc);
        const propsDisplayName = getPropsName(displayName);
        if (typeof propsDisplayName === 'string') {
            HOCManager.getInstance().addHOC(propsDisplayName, hoc);
        }
    }
    else if (_.isArray(displayName)) {
        _.forEach(displayName, (name) => {
            HOCManager.getInstance().addHOC(name, hoc);
            const propsDisplayName = getPropsName(name);
            if (typeof propsDisplayName === 'string') {
                HOCManager.getInstance().addHOC(propsDisplayName, hoc);
            }
        });
    }
    return hoc;
};
//# sourceMappingURL=createUiHOC.js.map