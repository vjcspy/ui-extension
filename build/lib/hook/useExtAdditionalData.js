"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExtAdditionalData = void 0;
const react_1 = require("react");
const useExtAdditionalData = (props, key) => {
    var _a;
    const data = react_1.useMemo(() => {
        var _a, _b;
        const cfg = (_b = (_a = props.extensionDataConfig) === null || _a === void 0 ? void 0 : _a.additionalData) === null || _b === void 0 ? void 0 : _b.find((c) => c['key'] === key);
        return cfg === null || cfg === void 0 ? void 0 : cfg.value;
    }, [(_a = props === null || props === void 0 ? void 0 : props.extensionDataConfig) === null || _a === void 0 ? void 0 : _a.additionalData]);
    return { data };
};
exports.useExtAdditionalData = useExtAdditionalData;
//# sourceMappingURL=useExtAdditionalData.js.map