function parse(str) {
    if (!str || str.includes(`'`)) {
        console.log(str)
        throw new Error();
    }

    if (str === 'null') {
        return null
    }

    if (str === 'true') {
        return true
    }

    if (str === 'false') {
        return false
    }

    const num = Number(str);
    if (!Number.isNaN(num)) {
        return num;
    }

    const isArray = str[0] === '[';
    if (!isArray && str[0] !== '{') {
        return str.replace(/"/g, "");
    }

    const l = str.slice(1, str.length - 1);
    const list = l.length ? l.split(',') : [];

    if (isArray) {
        return list.map(s => {
            return parse(s);
        });
    }

    return list.reduce((acc, l) => {
        const [key, ...value] = l.split(/:/);
        return { ...acc, [key.replace(/"/g, "")]: parse(value.join(':')) }
    }, {});
}


// -------------------------------------------------------------------------

let a =JSON.stringify({a: 'a', b:'b'});

// '{"a":"a","b":"b"}'

parse(a)
// {a: 'a', b: 'b'}