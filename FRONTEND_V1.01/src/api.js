/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (path, options) => {
    return new Promise((resolve, reject) => {
        fetch(path, options)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json());
                } else {
                    res.json().then(decode => {
                        console.log('decode Data ', decode);
                        reject(decode['message']);
                    }).catch(error);
                }
            })
    });
}


/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export default class API {

    /** @param {String} url */
    constructor(url) {
        this.url = url;
    }
    // posts
    post(path, options) {
        return getJSON(`${this.url}/${path}`, {
            ...options,
            method: 'POST',
        });
    }
    // put
    put(path, options) {
        return getJSON(`${this.url}/${path}`, {
            ...options,
            method: 'PUT',
        });
    }
    // delete
    delete(path, options) {
        return getJSON(`${this.url}/${path}`, {
            ...options,
            method: 'DELETE',
        });
    }
    // get
    get(path, options) {
        return getJSON(`${this.url}/${path}`, {
            ...options,
            method: 'GET',
        });
    }
}