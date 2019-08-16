const request = require("request");

const forecast = ({latitude,longitude},callback)=>{
    const url = `https://api.darksky.net/forecast/0c6604d5dd60c032f5ed68489875bcdf/${latitude},${longitude}?units=si&lang=en`

    request({ url: url, json: true }, (error, {body}) => {
    if (error) {
        callback('Was not not able to reach to Weather Service',undefined);
    } else if (body.error) {
        callback("Not able to get data due to incorrect data inputs",undefined)
    }else{
        callback(undefined,`${body.daily.data[0].summary} And temperature is ${body.currently.temperature}`);   
    }
})
}


module.exports = forecast;