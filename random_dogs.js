console.log('funciona o no ?');
const URL = 'https://api.thecatapi.com/v1/images/search/?limit=3&api_key=live_AATMBR2arznfnEzhdp1VBp0Er97KOdkBqOJY0d97kboVEQRrKEcqWBiqd0RYlrFD';


async function myCat () {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}

const catbutton = document.querySelector("button");
    catbutton.onclick = myCat;



   