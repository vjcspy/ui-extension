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
exports.withExtensionHook = void 0;
const types_1 = require("../../types");
const react_1 = __importStar(require("react"));
const lodash_1 = __importDefault(require("lodash"));
const UiExtension_1 = require("./UiExtension");
const withExtensionHook = (OrgComponent, extensionConfig) => {
    return react_1.default.memo((props) => {
        const extensionData = react_1.useMemo(() => {
            const _extensionData = props.extensionData || {};
            if (
            // extensionDataConfig được pass vào từ url-rewrite, chính là data của extension
            !props.hasOwnProperty('extensionDataConfig') ||
                !Array.isArray(extensionConfig.structure) ||
                extensionConfig.customizeType !== types_1.ExtensionCustomizeType.HOOK) {
                return _extensionData;
            }
            _extensionData['hookCpt'] = {};
            lodash_1.default.forEach(extensionConfig.structure, (s) => {
                const mayBeExtensionDataConfig = lodash_1.default.find(props.extensionDataConfig.extensionDataConfigs, (c) => c && s && c['forHookId'] === s['hookId']);
                if (mayBeExtensionDataConfig) {
                    _extensionData['hookCpt'][s['hookId']] = (react_1.default.createElement(UiExtension_1.UiExtension, { uiId: s.uiId, extensionDataConfig: mayBeExtensionDataConfig }));
                }
                else {
                    // logger.warn('Could not found hook config for id ' + s['hookId']);
                }
            });
            return _extensionData;
        }, [extensionConfig.uiId]);
        return react_1.default.createElement(OrgComponent, Object.assign({}, props, { extensionData: extensionData }));
    });
};
exports.withExtensionHook = withExtensionHook;
//# sourceMappingURL=withExtensionHook.js.map