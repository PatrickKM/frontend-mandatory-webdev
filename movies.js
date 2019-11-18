// OMDB API - base link with API key inserted - ready to be manipulated by JavaScript.
let url = 'https://www.omdbapi.com/?apikey=f6d15622&t=';

// Local user created JSON data.
let movieJson = {
    "movies": [{
            "title": "Cars",
            "youtubeID": "SbXIj2T-_uk",
        },
        {
            "title": "Up",
            "youtubeID": "ORFWdXl_zJ4",
        },
        {
            "title": "Inside Out",
            "youtubeID": "yRUAzGQ3nSY",
        },
        {
            "title": "Monsters, Inc.",
            "youtubeID": "8IBNZ6O2kMk",
        },
        {
            "title": "The Incredibles",
            "youtubeID": "-UaGUdNJdRQ",
        },
        {
            "title": "Toy Story",
            "youtubeID": "4KPTXpQehio",
        }
    ]
};

// YouTube API - inserting a script tag in the HTML through JavaScript.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Finding the element by it's id of "root" - this is our container where everything is nested.
let container = document.getElementById("moviesRoot");

// Using a For Loop to loop through all video titles and creating elements for each movie object.
for (let i = 0; i < movieJson.movies.length; i++) {

    // Combining the OMDB JSON data together with the user created JSON data.
    // Spaces are replaced with %20 to ensure data being sent back correctly.
    let fetchUrl = url + movieJson.movies[i].title.replace(/( )/g, "%20");
    fetch(fetchUrl)
        .then(response => {
            return response.json();
        })
        .then(movie => {
            // Using the Console to view the JSON Data inside of the console to find names of the specific parameters.
            console.log(movie);
            console.log(movieJson);

            // Creating a div element with the class name of "Card"
            const movieSection = document.createElement('section');
            movieSection.setAttribute('class', 'column');

            const h3 = document.createElement('h3');

            const poster = document.createElement("img");
            poster.setAttribute("src", movie.Poster);

            const video = document.createElement("div");
            video.setAttribute("id", "player" + i);
            video.setAttribute("class", "show");

            const media = document.createElement("div");
            media.setAttribute("class", "media");

            const plot = document.createElement('p');
            const imdbrating = document.createElement('p');
            const yearRelease = document.createElement('p');
            const age = document.createElement("p");

            h3.textContent = movie.Title;

            let date = new Date();
            let year = date.getFullYear();
            let ageInYears = year - movie.Year;
            // IF statement for at udregne hvor mange Ã¥r siden det var, fÃ¸r filmen udkom
            // hvis filmen udkom i det nuvÃ¦rende Ã¥r, indsÃ¦ttes en anden vÃ¦rdi.
            if (year != movie.Year) {
                age.textContent = "Released in " + movie.Year + " (" + ageInYears + " years ago)";
            } else {
                age.textContent = movie.Year + " (Released this year)";
            }
            // Inserting JSON Data to the paragraph element using the variables and parameters.

            plot.textContent = movie.Plot;
            imdbrating.textContent = "IMDB Rating: " + movie.imdbRating;
            year.textContent = "Year of release: " + movie.Year;

            // Appending the paragraph elements to the div element with class name of "Card".
            movieSection.appendChild(h3);
            movieSection.appendChild(poster);
            movieSection.appendChild(video);
            movieSection.appendChild(plot);
            movieSection.appendChild(imdbrating);
            movieSection.appendChild(age);
            container.appendChild(movieSection);
        })

        // This catch functions serves to display errors in JavaScript in the console for easy debugging.
        .catch(function (err) {
            console.log('error: ' + err);
        })
};

// The function inserts the correct video for each movie section.
// It uses the youtubeID from the user created JSON data to choose the correct movie.
var player;
function onYouTubeIframeAPIReady() {
    for (let i = 0; i < movieJson.movies.length; i++) {
        player = new YT.Player('player' + i, {
            height: '390',
            videoId: movieJson.movies[i].youtubeID,
            playerVars: {'autoplay': 0},
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

// This function is called when the video player's state is changed.
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}