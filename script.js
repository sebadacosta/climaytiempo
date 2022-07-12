document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); //Retira los efectos padrones// cancela el evento.

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfo();
        showWarning('Cargando...');

        // la funcion ecouri sirve para transfomar el texto en texto propio para url
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=2a97a56a0e21e43e5a5dd5a1c478b6de&units=metric&lang=pt_br`;

        //revisando lo que va à la APi
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else {
            clearInfo();
            showWarning('Lugar no encontrado.');
        }
    }else{
        clearInfo();
    }
});

function showInfo(json){
showWarning('');
document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>Km/h</span>`;
document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
document.querySelector('.resultado').style.display = 'block';
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

//Funçi{on que eite alrtas
const showWarning = (msg)=>{
    document.querySelector('.aviso').innerHTML = msg;
}