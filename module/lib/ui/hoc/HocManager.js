import { Map } from 'immutable';
import _ from 'lodash';
export class HOCManager {
    static INSTANCE;
    static hocs = Map();
    static getInstance() {
        if (typeof HOCManager.INSTANCE === 'undefined') {
            console.info('______________________________________ Create HOCManager ______________________________________');
            HOCManager.INSTANCE = new HOCManager();
        }
        return HOCManager.INSTANCE;
    }
    addHOC(hocName, uiHOC) {
        HOCManager.hocs = HOCManager.hocs.set(hocName, uiHOC);
        return this;
    }
    getByName(hocName) {
        return HOCManager.hocs.get(hocName);
    }
    configHOCs(uiHOCs) { }
    /**
     * @param hoc
     * @returns {any[]}
     */
    resolveExtensionHOCs(hoc) {
        let finalHOCs = [];
        if (Array.isArray(hoc)) {
            hoc = _.chain(hoc)
                .sortBy((h) => {
                if (typeof h === 'object' && h['priority']) {
                    return h.priority;
                }
                return 0;
            })
                .uniq()
                .value();
            _.forEach(hoc, (h) => {
                if (_.isString(h)) {
                    finalHOCs.push(h);
                }
                else if (typeof h === 'object') {
                    if (h['type']) {
                        if (h.type === 'remove' && h['name']) {
                            finalHOCs = _.filter(finalHOCs, (fH) => fH !== h.name);
                        }
                        if (h.type === 'add' && !h['before'] && !h['after'] && h['name']) {
                            finalHOCs.push(h['name']);
                        }
                    }
                }
            });
            _.forEach(hoc, (h) => {
                if (h['type'] && h.type === 'add' && h['name']) {
                    if (h['before']) {
                        const index = _.findIndex(finalHOCs, (fH) => fH === h['before']);
                        if (index > -1) {
                            finalHOCs.splice(index, 0, h['name']);
                        }
                    }
                    else if (h['after']) {
                        const index = _.findIndex(finalHOCs, (fH) => fH === h['after']);
                        if (index > -1) {
                            finalHOCs.splice(index + 1, 0, h['name']);
                        }
                    }
                }
            });
        }
        return finalHOCs;
    }
}
//# sourceMappingURL=HocManager.js.map