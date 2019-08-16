
const request = require('request');

const geocode = (address,callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibW9ua3ZlZGljIiwiYSI6ImNqeXlwYmV2ajFoMjIzbm55cWg3M3cxb24ifQ.ZnvBaiwa7u4tJBmpi8KSYg&limit=1`

    request({url:geoUrl,json:true},(error,{body})=>{
        if (error) {
            callback("Not able to reach location service",undefined);
        } else if (body.features.length === 0) {
            callback("Invalid Search! Try Again",undefined);
        } else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}



module.exports = geocode;
