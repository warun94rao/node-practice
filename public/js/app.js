console.log("from public directory");




const weatherForm = document.querySelector('form');
const search = document.querySelector('#location');
const msg1 = document.querySelector('.card-title');
const msg2 = document.querySelector('.card-text');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;
    console.log(location); 
    msg1.textContent = location;
    msg2.textContent = "loading...."
    fetch(`http://localhost:3000/weather?address=${location}`).then(res=>{
    res.json().then(data=>{
        if (data.error) {
            msg1.textContent = 'error';
            msg2.textContent = data.error;
        }else{
            msg1.textContent = data.location;
            msg2.textContent = data.forecast_Data
            console.log(data.location);
            console.log(data.forecast_Data);
        }
    })
})
})