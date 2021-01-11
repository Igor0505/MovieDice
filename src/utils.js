var apikey = "fce8c64665370700a455613619633eea"
var themoviedburl = "https://api.themoviedb.org/3/"
// https://api.themoviedb.org/3/movie/76341?language=ru-RU&api_key=fce8c64665370700a455613619633eea

const movieUrls = [
    { title: "Идет сейчас", url: "movie/now_playing", name: "now_playing" },
    { title: "Скоро", url: "movie/upcoming", name: "upcoming" },
    { title: "Популярный", url: "movie/popular", name: "popular" },
    { title: "Рейтинговый", url: "movie/top_rated", name: "rated" },
    { title: "В тренде", url: "trending/movie/week", name: "trending" },
    { title: "Выбранный жанр", url: "discover/movie", name: "sel_genre" },
    { title: "Выбранный актер", url: "discover/movie", name: "sel_actor" },
    { title: "Релиз сегодня", url: "movie/top_rated", name: "now_release" },
];


function getFromStorageSync(key) {
    return new Promise(function (resolve) {
        chrome.storage.sync.get(key, function (result) {
            resolve(result);
        });
    });
}

function getFromStorage(key) {
    return localStorage.getItem(key)
}

function setToStorage(key, value) {
    localStorage.setItem(key, value)
}



function buildUrl(url, page = 1, addition = "") {
    return themoviedburl + url + "?page=" + page + "&" + addition + "&language=ru-RU&api_key=" + apikey
}

async function getData(url, page = 1, addition = "") {
    let response = await fetch(buildUrl(url, page, addition))
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа
        let answer = await response.json() // читаем ответ в формате JSON
        //console.log('answer', answer);
        return answer
    }

    return { result: "Ошибка HTTP: " + response.status }
}


var session_id;
// getFromStorageSync("session_id").then(function (sync_session) { session_id = sync_session.session_id; });

export {
    apikey,
    themoviedburl,
    movieUrls,
    // session_id,
    // getFromStorageSync,
    getData,
    buildUrl,
    getFromStorage,
    setToStorage
}