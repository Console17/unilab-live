const apiURL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&api_key=04c35731a5ee918f014970082a0088b1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const headerHeight = document.querySelector("header").offsetHeight;
const main = document.querySelector("main");
const filmsContainer = document.querySelector(".films-container");

main.style.height = `calc(100vh - ${headerHeight}px)`;

const showMovies = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    filmCounter = 0;
    data.results.forEach((element) => {
      if (filmCounter < 5) {
        const cardDiv = document.createElement("div");
        const infoDiv = document.createElement("div");
        const realiseSpan = document.createElement("span");

        cardDiv.classList.add("card-div");
        infoDiv.classList.add("info-div");
        realiseSpan.classList.add("realise-span");

        const image = document.createElement("img");
        const title = document.createElement("h4");

        title.innerHTML = element.title;
        image.src = IMGPATH + element.poster_path;

        const randomTime = Math.floor(Math.random() * 25 + 5);
        const timeText = document.createElement("p");
        const time = document.createElement("p");
        time.classList.add("realise-countdown");

        timeText.innerHTML = "Release date: ";
        time.innerHTML = `00:${randomTime}:00`;

        realiseSpan.appendChild(timeText);
        realiseSpan.appendChild(time);

        infoDiv.appendChild(title);
        infoDiv.appendChild(realiseSpan);

        cardDiv.appendChild(image);
        cardDiv.appendChild(infoDiv);

        filmsContainer.appendChild(cardDiv);

        const updateRealiseTime = () => {
          const timeValue = time.innerHTML.split(":");
          if (timeValue[1] > 0) {
            timeValue[1]--;
            if (timeValue[1] < 10) {
              timeValue[1] = "0" + timeValue[1];
            }
            time.innerHTML = `00:${timeValue[1]}:00`;
          } else {
            timeText.innerHTML = "";
            time.innerHTML = "Released";
            time.classList.add("realised");
          }
        };

        setInterval(updateRealiseTime, 1000);

        filmCounter++;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

showMovies(apiURL);
