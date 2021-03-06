"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionManager = void 0;
const immutable_1 = require("immutable");
const lodash_1 = __importDefault(require("lodash"));
const hoc_1 = require("../hoc");
class ExtensionManager {
    static getInstance() {
        if (typeof ExtensionManager.INSTANCE === 'undefined') {
            console.info('______________________________________ Create ExtensionManager ______________________________________');
            ExtensionManager.INSTANCE = new ExtensionManager();
        }
        return ExtensionManager.INSTANCE;
    }
    config(configs) {
        if (!Array.isArray(configs)) {
            configs = [configs];
        }
        lodash_1.default.forEach(configs, (c) => {
            // merge data if have more than one config
            if (ExtensionManager.COMPONENTS.has(c.uiId)) {
                const sortedToMerge = lodash_1.default.chain([
                    c,
                    ExtensionManager.COMPONENTS.get(c.uiId),
                ])
                    .sortBy((c) => {
                    if (c.hasOwnProperty('priority')) {
                        if (typeof c.priority === 'number') {
                            return c.priority;
                        }
                        else if (typeof c.priority === 'function') {
                            return c.priority();
                        }
                    }
                    if (c.hasOwnProperty('priorityFn')) {
                        if (typeof c.priorityFn === 'number') {
                            return c.priorityFn;
                        }
                        else if (typeof c.priorityFn === 'function') {
                            return c.priorityFn();
                        }
                    }
                    return 0;
                })
                    .reverse()
                    .value();
                /*
                 * TODO:
                 * Idea ??? ????y l?? c?? th??? khai b??o nhi???u n??i sau ???? merge t???t c??? c??c khai b??o l???i
                 * v???i tr?????ng h???p hoc th?? ???? ngh?? t???i vi???c c?? th??? l?? 1 object {ten_hoc: false} th?? s??? remove hoc
                 * Tuy nhi??n cho ?????n th???i ??i???m hi???n t???i ch??a s??? d???ng ki???u merge n??y.
                 * Thay v??o ???? l?? override lu??n component d???a v??o priority
                 * */
                /* ????Y L?? C??CH S??? D???NG MERGE,
                 *  Sau n??y c?? th??? s??? ph???i s??? d???ng c??ch n??y ????? implement c?? ch??? override kh??c
                 * */
                // const hocs: any[] = [
                //   ...(c.hoc ?? []),
                //   // ...(ExtensionManager.COMPONENTS.get(c.uiId)!.hoc ?? []),
                // ];
                // // @ts-ignore
                // c = _.merge(...sortedToMerge);
                // c.hoc = hocs;
                /* CHUY???N QUA L???Y LU??N THEO PRIORITY*/
                c = lodash_1.default.last(sortedToMerge);
            }
            /*
             * resolve HOC data
             */
            c.hoc = hoc_1.HOCManager.getInstance().resolveExtensionHOCs(c.hoc);
            ExtensionManager.COMPONENTS = ExtensionManager.COMPONENTS.set(c.uiId, c);
        });
        return this;
    }
    cptCfg(uiId) {
        return ExtensionManager.COMPONENTS.get(uiId);
    }
    getHoc(hocId) {
        return null;
    }
}
exports.ExtensionManager = ExtensionManager;
ExtensionManager.COMPONENTS = immutable_1.Map();
ExtensionManager.RESOLVED_COMPONENTS = immutable_1.Map();
//# sourceMappingURL=ExtensionManager.js.map