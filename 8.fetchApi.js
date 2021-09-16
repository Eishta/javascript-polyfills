// As the fetch is not defined in node environment but is browser specific feature, it was not there in hackerrank test.
// because of that got to know this.

const request = require('request');

function myFetch(url){
    return new Promise((resolve, reject)=>{
        request(url, function(error, response, body){
            if(error) reject(error);
            else resolve(body)
        })
    })
};

// #Usage

async function fetchURL(url){
    const resp = await myFetch(url);
    const respData = JSON.parse(resp);
}