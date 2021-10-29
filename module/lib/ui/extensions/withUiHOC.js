import React, { useMemo } from 'react';
import _ from 'lodash';
import { HOCManager } from '../hoc';
export const withUiHOC = (OrgComponent, hoc) => {
    return React.memo((props) => {
        const ComponentWithHoc = useMemo(() => {
            // hoc lúc này đã được config thành 1 array chỉ việc reducer theo thứ tự. Bước config hoc sẽ nằm lúc config data
            return _.reduce(_.reverse(hoc), (result, value) => {
                const hocFN = HOCManager.getInstance().getByName(value);
                if (typeof hocFN !== 'function') {
                    console.error('We could not found hoc with name: ' + value);
                    return result;
                }
                else {
                    return hocFN(result, props);
                }
            }, OrgComponent);
        }, [hoc]);
        return React.createElement(ComponentWithHoc, { ...props });
    });
};
//# sourceMappingURL=withUiHOC.js.map