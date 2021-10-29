"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOCManager = void 0;
const immutable_1 = require("immutable");
const lodash_1 = __importDefault(require("lodash"));
class HOCManager {
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
            hoc = lodash_1.default.chain(hoc)
                .sortBy((h) => {
                if (typeof h === 'object' && h['priority']) {
                    return h.priority;
                }
                return 0;
            })
                .uniq()
                .value();
            lodash_1.default.forEach(hoc, (h) => {
                if (lodash_1.default.isString(h)) {
                    finalHOCs.push(h);
                }
                else if (typeof h === 'object') {
                    if (h['type']) {
                        if (h.type === 'remove' && h['name']) {
                            finalHOCs = lodash_1.default.filter(finalHOCs, (fH) => fH !== h.name);
                        }
                        if (h.type === 'add' && !h['before'] && !h['after'] && h['name']) {
                            finalHOCs.push(h['name']);
                        }
                    }
                }
            });
            lodash_1.default.forEach(hoc, (h) => {
                if (h['type'] && h.type === 'add' && h['name']) {
                    if (h['before']) {
                        const index = lodash_1.default.findIndex(finalHOCs, (fH) => fH === h['before']);
                        if (index > -1) {
                            finalHOCs.splice(index, 0, h['name']);
                        }
                    }
                    else if (h['after']) {
                        const index = lodash_1.default.findIndex(finalHOCs, (fH) => fH === h['after']);
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
exports.HOCManager = HOCManager;
HOCManager.hocs = immutable_1.Map();
//# sourceMappingURL=HocManager.js.map