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
exports.withUiHOC = void 0;
const react_1 = __importStar(require("react"));
const lodash_1 = __importDefault(require("lodash"));
const hoc_1 = require("../hoc");
const withUiHOC = (OrgComponent, hoc) => {
    return react_1.default.memo((props) => {
        const ComponentWithHoc = react_1.useMemo(() => {
            // hoc lúc này đã được config thành 1 array chỉ việc reducer theo thứ tự. Bước config hoc sẽ nằm lúc config data
            return lodash_1.default.reduce(lodash_1.default.reverse(hoc), (result, value) => {
                const hocFN = hoc_1.HOCManager.getInstance().getByName(value);
                if (typeof hocFN !== 'function') {
                    console.error('We could not found hoc with name: ' + value);
                    return result;
                }
                else {
                    return hocFN(result, props);
                }
            }, OrgComponent);
        }, [hoc]);
        return react_1.default.createElement(ComponentWithHoc, Object.assign({}, props));
    });
};
exports.withUiHOC = withUiHOC;
//# sourceMappingURL=withUiHOC.js.map