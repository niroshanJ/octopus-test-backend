const unique = (array) => {
    return array.sort().filter(function (item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

function thingsEqual(thing1, thing2, field) {
    return thing1[field] === thing2[field];
}

function removeDuplicateObjects(arr, field) {
    var originalArr = arr.slice(0);
    var i, len, val;
    arr.length = 0;

    for (i = 0, len = originalArr.length; i < len; ++i) {
        val = originalArr[i];
        if (!arr.some(function (item) { return thingsEqual(item, val, field); })) {
            arr.push(val);
        }
    }
}


module.exports = {
    unique: unique,
    removeDuplicateObjects: removeDuplicateObjects
}