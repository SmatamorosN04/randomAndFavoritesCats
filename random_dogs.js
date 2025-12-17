const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search/?limit=2&api_key=live_AATMBR2arznfnEzhdp1VBp0Er97KOdkBqOJY0d97kboVEQRrKEcqWBiqd0RYlrFD';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites';

const API_URL_DETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?`;

const spanError = document.getElementById('ErrorCats');


async function loadRandomCats () {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('random')
    console.log(data);
    if(res.status !== 200){
        spanError.innerHTML = 'Hubo un detallito' + res.status;
    }
    else
    {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1= document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');


    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () =>saveFavouritesCat(data[0].id);
    btn2.onclick = () => saveFavouritesCat(data[1].id);
    }
}
async function favoritesCats () {
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: { 
            'X-API-KEY': 'live_AATMBR2arznfnEzhdp1VBp0Er97KOdkBqOJY0d97kboVEQRrKEcqWBiqd0RYlrFD'
        }
    });
    const data = await res.json();
    console.log('favourites')
    console.log(data);
    if(res.status !== 200){
        spanError.innerText = 'Hubo un detallito' + res.status + data.message;    
    }else{ 
        
            const section = document.getElementById('favoritesCats')
            section.innerHTML= '';
data.forEach(cat =>{
            const article = document.createElement('element');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al gatito de favoritos');

            btn.appendChild(btnText);
            img.src =  cat.image.url
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
            btn.onclick = () => deleteFavouritesCats(cat.id);
         });
    }
}

async function saveFavouritesCat(id) {
    const res = await fetch(API_URL_FAVOURITES, {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_AATMBR2arznfnEzhdp1VBp0Er97KOdkBqOJY0d97kboVEQRrKEcqWBiqd0RYlrFD'
        },
        body: 
            JSON.stringify({
                image_id: id

            }),
        
    }); 
    const data = await res.json();
    console.log('save');
    console.log(res);

    if (res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else{
        console.log('se agrego');
         favoritesCats();
    }
}


async function deleteFavouritesCats(id) {
    const res = await fetch(API_URL_DETE(id), {
        method: 'DELETE',
        headers:{
            'X-API-KEY': 'live_AATMBR2arznfnEzhdp1VBp0Er97KOdkBqOJY0d97kboVEQRrKEcqWBiqd0RYlrFD'
        }
        
    });
    const data = await res.text();
    
    if (res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else{ 
        console.log('se elimino');
        favoritesCats();
    }
    
}
loadRandomCats();
favoritesCats();

/* const catbutton = document.querySelector("button");
    catbutton.onclick = loadRandomCats;
 */


   