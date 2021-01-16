var apikey = "fce8c64665370700a455613619633eea"
var themoviedburl = "https://api.themoviedb.org/3/"

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

function deleteFromStorage(key) {
    localStorage.removeItem(key)
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

async function createRequestToken() {
    let response = await fetch(themoviedburl + "authentication/token/new?api_key=" + apikey)
    if (response.ok) {
        let answer = await response.json()
        // console.log('createRequestToken', answer);
        return answer
    }

    return { result: "Ошибка HTTP: " + response.status }
}

async function createSession(req_token) {
    const data = {
        request_token: req_token
    }
    console.log('data', data)
    let response = await fetch(themoviedburl + "authentication/session/new?api_key=" + apikey, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data)
    })
    if (response.ok) {
        let answer = await response.json()
        // console.log('createSession', answer);
        return answer
    }

    // console.log('response', response)
    return { result: "Ошибка HTTP: " + response.status }
}

async function getAccount(session_id) {
    let response = await fetch(themoviedburl + "account?api_key=" + apikey + "&session_id=" + session_id)
    if (response.ok) {
        let answer = await response.json()
        console.log('getAccount', answer);
        return answer
    }

    return { result: "Ошибка HTTP: " + response.status }
}

async function addToFavoriteOrWatchlist(session_id, list_type, movie_id, is_add = true) {
    const data = {
        media_type: "movie",
        media_id: movie_id
    }
    data[list_type] = is_add

    let response = await fetch(themoviedburl + "account/{account_id}/" + list_type + "?api_key=" + apikey + "&session_id=" + session_id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        let answer = await response.json()
        return answer
    }

    return { result: "Ошибка HTTP: " + response.status }
}


export {
    apikey,
    themoviedburl,
    movieUrls,
    getData,
    createRequestToken,
    createSession,
    getAccount,
    addToFavoriteOrWatchlist,
    buildUrl,
    getFromStorage,
    setToStorage,
    deleteFromStorage
}