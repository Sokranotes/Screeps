"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h;
exports.__esModule = true;
exports.calcBodyPart = void 0;
var number_list = [[300, 1, 2, 1],
    [350, 2, 2, 1],
    [400, 3, 2, 1],
    [450, 2, 3, 1],
    [500, 4, 3, 1],
    [550, 4, 3, 1],
    [600, 5, 3, 1],
    [650, 6, 3, 1],
    [700, 5, 4, 1],
    [750, 6, 4, 1],
    [800, 7, 4, 1],
];
var a = 60;
console.log(60 / 50); //1.2
console.log(Math.ceil(60 / 50)); // 2
console.log(Math.floor(60 / 50)); // 1
function calcBodyPart(bodySet) {
    // 把身体配置项拓展成如下形式的二维数组
    // [ [ TOUGH ], [ WORK, WORK ], [ MOVE, MOVE, MOVE ] ]
    var bodys = Object.keys(bodySet).map(function (type) { return Array(bodySet[type]).fill(type); });
    // 把二维数组展平
    return [].concat.apply([], bodys);
}
exports.calcBodyPart = calcBodyPart;
var getBodyConfig = function () {
    var bodySets = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        bodySets[_i] = arguments[_i];
    }
    var config = { 300: [], 550: [], 800: [], 1300: [], 1800: [], 2300: [], 5600: [], 10000: [] };
    // 遍历空配置项，用传入的 XXXSet 依次生成配置项
    Object.keys(config).map(function (level, index) {
        config[level] = calcBodyPart(bodySets[index]);
    });
    return config;
};
getBodyConfig((_a = {}, _a[XTH] = 2, _a[ZWX] = 1, _a[ZYQ] = 1, _a), (_b = {}, _b[XTH] = 4, _b[ZWX] = 1, _b[ZYQ] = 2, _b), (_c = {}, _c[XTH] = 6, _c[ZWX] = 1, _c[ZYQ] = 3, _c), (_d = {}, _d[XTH] = 8, _d[ZWX] = 1, _d[ZYQ] = 4, _d), (_e = {}, _e[XTH] = 10, _e[ZWX] = 1, _e[ZYQ] = 5, _e), (_f = {}, _f[XTH] = 12, _f[ZWX] = 1, _f[ZYQ] = 6, _f), (_g = {}, _g[XTH] = 12, _g[ZWX] = 1, _g[ZYQ] = 6, _g), (_h = {}, _h[XTH] = 12, _h[ZWX] = 1, _h[ZYQ] = 6, _h));
