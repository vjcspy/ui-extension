"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UiExtension = void 0;
const react_1 = __importStar(require("react"));
const getUiExtension_1 = require("./getUiExtension");
const lodash_1 = __importDefault(require("lodash"));
exports.UiExtension = react_1.default.memo((props) => {
    const uiId = react_1.useMemo(() => {
        var _a;
        const _uiId = props.uiId || ((_a = props.extensionDataConfig) === null || _a === void 0 ? void 0 : _a.uiId);
        if (!lodash_1.default.isString(_uiId)) {
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
    const Component = getUiExtension_1.getUiExtension(uiId);
    return react_1.default.createElement(Component, Object.assign({}, props));
});
exports.UiExtension.displayName = 'UiExtension';
//# sourceMappingURL=UiExtension.js.map