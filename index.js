'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    let website = event.website;
    var fullDomain = website;
    let httpString = "http://";
    let httpsString = "https://";
    var indexOfHttp = website.indexOf(httpString);
    var length = httpString.length;
    if (indexOfHttp == -1) {
        indexOfHttp = website.indexOf(httpsString);
        length = httpsString.length;
    }
    if (indexOfHttp != -1) {
        indexOfHttp += length;
        fullDomain = website.substring(indexOfHttp);
    }
    let indexOfLastSlash = fullDomain.indexOf("/");
    if (indexOfLastSlash != -1) {
        fullDomain = fullDomain.substring(0, indexOfLastSlash);

    }
    var domain = fullDomain;
    var subDomain = fullDomain;
    var tld = fullDomain;

    var indices = [];
    for(var i=0; i<subDomain.length;i++) {
        if (subDomain[i] === ".") indices.push(i);
    }
    if (indices.length > 1) {
        domain = domain.substring(indices[indices.length - 2] + 1, indices[indices.length - 1]);
        subDomain = subDomain.substring(0, indices[indices.length - 2]);
    } else {
        domain = domain.substring(0, indices[indices.length - 1]);
        subDomain = null;
    }
    tld = tld.substring(indices[indices.length - 1], tld.length);

    let result = {
        "fullDomain": fullDomain,
        "domain": domain,
        "subDomain": subDomain,
        "tld": tld
    };
    context.done(null, result);
};
