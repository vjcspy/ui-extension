"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUiHOC = void 0;
const react_1 = __importDefault(require("react"));
const lodash_1 = __importDefault(require("lodash"));
const ui_1 = require("../ui");
const getPropsName = (displayName) => {
    var _a;
    const regexPropsName = new RegExp(/^(With)(.*)(Props)$/);
    if (((_a = regexPropsName.exec(displayName)) === null || _a === void 0 ? void 0 : _a.length) === 4) {
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
const createUiHOC = (hookFn, displayName) => {
    /*
     * props1 được Extension truyền vào
     * */
    const hoc = (Component, props1) => {
        const UiHOC = react_1.default.memo((props2) => {
            const hookData = hookFn(Object.assign(Object.assign({}, props1), props2));
            return react_1.default.createElement(Component, Object.assign({}, hookData, lodash_1.default.merge(hookData, props2)));
        });
        const oriDisplayName = Component.displayName || Component.name || 'Component';
        UiHOC.displayName = `${displayName}(${oriDisplayName})`;
        return UiHOC;
    };
    if (lodash_1.default.isString(displayName)) {
        ui_1.HOCManager.getInstance().addHOC(displayName, hoc);
        const propsDisplayName = getPropsName(displayName);
        if (typeof propsDisplayName === 'string') {
            ui_1.HOCManager.getInstance().addHOC(propsDisplayName, hoc);
        }
    }
    else if (lodash_1.default.isArray(displayName)) {
        lodash_1.default.forEach(displayName, (name) => {
            ui_1.HOCManager.getInstance().addHOC(name, hoc);
            const propsDisplayName = getPropsName(name);
            if (typeof propsDisplayName === 'string') {
                ui_1.HOCManager.getInstance().addHOC(propsDisplayName, hoc);
            }
        });
    }
    return hoc;
};
exports.createUiHOC = createUiHOC;
//# sourceMappingURL=createUiHOC.js.map