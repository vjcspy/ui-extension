"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExtensionForHook = void 0;
const react_1 = require("react");
const useExtensionForHook = (hookId, props) => {
    return react_1.useMemo(() => {
        return props &&
            props['extensionData'] &&
            props['extensionData']['hookCpt'] &&
            props['extensionData']['hookCpt'][hookId]
            ? props['extensionData']['hookCpt'][hookId]
            : null;
    }, [props === null || props === void 0 ? void 0 : props.extensionData]);
};
exports.useExtensionForHook = useExtensionForHook;
//# sourceMappingURL=useExtensionForHook.js.map