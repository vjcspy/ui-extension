import { useMemo } from 'react';
export const useExtAdditionalData = (props, key) => {
    const data = useMemo(() => {
        const cfg = props.extensionDataConfig?.additionalData?.find((c) => c['key'] === key);
        return cfg?.value;
    }, [props?.extensionDataConfig?.additionalData]);
    return { data };
};
//# sourceMappingURL=useExtAdditionalData.js.map