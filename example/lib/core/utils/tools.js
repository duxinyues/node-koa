import lodash from "lodash";

const path = require('path');
function customizer(objValue, srcValue) {
    if (lodash.isObject(objValue)) {
        return srcValue
    }
}

export const deepMerge = (target, source) => {
    const assgin = Object.assign({}, lodash.mergeWith(target, source, customizer));

    return assgin;
}


export const getHooks = async (hooks) => {
    const len = hooks.length;
    const result = [];
    for (let i = 0; i < len; i++) {
        const hook = await import(path.join(__dirname,"../hooks",hooks[i]));
        result.push(hook);
    }
}
