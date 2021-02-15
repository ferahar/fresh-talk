export const util = {
    isUndefind(value) {
        return typeof (value) === 'undefined';
    },
    isString(value) {
        return typeof (value) === 'string';
    },
    isEmpty(value) {
        if (value.length && (value.length === 0)) {
            return false;
        }
        return true;
    }
};
//# sourceMappingURL=util.js.map