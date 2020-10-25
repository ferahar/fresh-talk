export const util = {
    isUndefind(value) {
        return typeof (value) === 'undefined';
    },
    isString(value) {
        return typeof (value) === 'string';
    },
    isEmpty(value) {
        return (value.length) ? true : (value.length === 0) ? true : false;
    }
};
//# sourceMappingURL=util.js.map