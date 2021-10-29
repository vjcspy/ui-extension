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
exports.getUiExtension = void 0;
const types_1 = require("../../types");
const ExtensionManager_1 = require("./ExtensionManager");
const withUiHOC_1 = require("./withUiHOC");
const lodash_1 = __importDefault(require("lodash"));
const withExtensionHook_1 = require("./withExtensionHook");
const extension_blank_1 = __importDefault(require("../../components/ExtensionBlank/extension-blank"));
const react_1 = __importStar(require("react"));
const EXCLUDE_CACHE_COMPONENTS = ['DEFAULT_ROOT', 'STACK', 'TWO_COLUMNS'];
/**
 * Phải trả về luôn component function cái mà đã được config.
 * Nếu wrap lại thì các nextPage sẽ không work do không expose ra `getInitialProps`
 *
 * @param uiId
 * @returns {React.NamedExoticComponent<object>}
 */
const getUiExtension = (uiId) => {
    if (!lodash_1.default.isString(uiId)) {
        console.error('uiId must be string');
    }
    if (!lodash_1.default.includes(EXCLUDE_CACHE_COMPONENTS, uiId) &&
        ExtensionManager_1.ExtensionManager.RESOLVED_COMPONENTS.has(uiId)) {
        return ExtensionManager_1.ExtensionManager.RESOLVED_COMPONENTS.get(uiId);
    }
    const extCfg = ExtensionManager_1.ExtensionManager.getInstance().cptCfg(uiId);
    if (!extCfg) {
        console.warn('Not found cfg for extension id: ' + uiId);
        return extension_blank_1.default;
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
        OriginComponent = react_1.default.memo((props) => {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_1.Suspense, { fallback: null },
                    react_1.default.createElement(CptConfig, Object.assign({}, props)))));
        });
    }
    else {
        OriginComponent = CptConfig;
    }
    if (extCfg.customizeType === types_1.ExtensionCustomizeType.HOOK) {
        OriginComponent = withExtensionHook_1.withExtensionHook(OriginComponent, extCfg);
    }
    if (Array.isArray(extCfg.hoc) && extCfg.hoc.length > 0) {
        OriginComponent = withUiHOC_1.withUiHOC(OriginComponent, extCfg.hoc);
    }
    const GetUiExtension = react_1.default.memo((props) => {
        const initProps = react_1.useMemo(() => {
            var _a;
            return (_a = extCfg.initProps) !== null && _a !== void 0 ? _a : {};
        }, []);
        return react_1.default.createElement(OriginComponent, Object.assign({}, initProps, props));
    });
    if (OriginComponent.hasOwnProperty('getInitialProps')) {
        // @ts-ignore
        GetUiExtension['getInitialProps'] = OriginComponent.getInitialProps;
    }
    GetUiExtension.displayName = 'getUiExtension: ' + uiId;
    ExtensionManager_1.ExtensionManager.RESOLVED_COMPONENTS =
        ExtensionManager_1.ExtensionManager.RESOLVED_COMPONENTS.set(uiId, GetUiExtension);
    return GetUiExtension;
};
exports.getUiExtension = getUiExtension;
//# sourceMappingURL=getUiExtension.js.map