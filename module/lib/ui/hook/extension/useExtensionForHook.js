import { useMemo } from 'react';
export const useExtensionForHook = (hookId, props) => {
    return useMemo(() => {
        return props &&
            props['extensionData'] &&
            props['extensionData']['hookCpt'] &&
            props['extensionData']['hookCpt'][hookId]
            ? props['extensionData']['hookCpt'][hookId]
            : null;
    }, [props?.extensionData]);
};
//# sourceMappingURL=useExtensionForHook.js.map