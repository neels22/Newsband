const API_KEY =  "47ce72639d634439914895bac54942ad"

const url ="https://newsapi.org/v2/everything?q="


window.addEventListener("load",()=> fetchNews("India"));




function reload() {
    window.location.reload();
}
/////////// is function me jo bhi app quesry daloge
/////////// usko news leke ajayega
/////////// news ko lane ke liye fetch library use karte
////////// fetch libraby returns promise jiske liye 
////////// await karna padta

////// fetch is asyncrhronous operation 
////// we don get news like instant 
///// so we await on that promise


async function fetchNews(query) {

    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {

    const cardContainer = document.getElementById('cards-container')
    const newsCardTemplate = document.getElementById('template-news-card')

    cardContainer.innerHTML = '';//// whenver binddata is called then we empty conatiner and then added

    articles.forEach(article => {

        if (!article.urlToImage) {
            return;
        }

        const cardClone = newsCardTemplate.content.cloneNode(true);
        
        filldataincard(cardClone,article);

        cardContainer.appendChild(cardClone);

        
    });
    
}

function filldataincard(cardClone,article) {
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSrc = cardClone.querySelector('#news-src')
    const newsDesc = cardClone.querySelector('#news-desc')

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    newsSrc.innerHTML = `${article.source.name} . ${date}`

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let currselectednav = null;


function onnavitemclick(id) {
        fetchNews(id)

        const navitem = document.getElementById(id);
        currselectednav?.classList.remove('active');
        currselectednav = navitem;
        currselectednav.classList.add('active')
}

const searchbtn = document.getElementById('search-button');

const searchtext = document.getElementById('search-text');

searchbtn.addEventListener('click',()=>
{
    const query = searchtext.value;
    if (!query) {
        return;
    }
    fetchNews(query);
    currselectednav?.classList.remove('active');
    currselectednav = null;

})