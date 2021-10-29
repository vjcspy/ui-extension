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
                 * Idea ở đây là có thể khai báo nhiều nơi sau đó merge tất cả các khai báo lại
                 * với trường hợp hoc thì đã nghĩ tới việc có thể là 1 object {ten_hoc: false} thì sẽ remove hoc
                 * Tuy nhiên cho đến thời điểm hiện tại chưa sử dụng kiểu merge này.
                 * Thay vào đó là override luôn component dựa vào priority
                 * */
                /* ĐÂY LÀ CÁCH SỬ DỤNG MERGE,
                 *  Sau này có thể sẽ phải sử dụng cách này để implement cơ chế override khác
                 * */
                // const hocs: any[] = [
                //   ...(c.hoc ?? []),
                //   // ...(ExtensionManager.COMPONENTS.get(c.uiId)!.hoc ?? []),
                // ];
                // // @ts-ignore
                // c = _.merge(...sortedToMerge);
                // c.hoc = hocs;
                /* CHUYỂN QUA LẤY LUÔN THEO PRIORITY*/
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