let page = 1;
id = 0;
let summonerId = [];
let antigo = [];
let k = 0;
antigo[0] = 0;


var baseURL =
  "https://br1.api.riotgames.com/lol/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/II?page=";
var apiKEY = "&api_key=RGAPI-4c2ba5b7-4aeb-484d-a3dc-1b89e3b2a402";
var apiKEY2 = "?api_key=RGAPI-4c2ba5b7-4aeb-484d-a3dc-1b89e3b2a402";
let apiURL = `${baseURL}${page}${apiKEY}`;
let playerURL =
  "https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/";

const Table = document.getElementById("Table");
const tHead = document.getElementById("header_table");

const Tablet = document.getElementById("Tablet");
const tHeadt = document.getElementById("header_tablet");

const voltar = document.querySelector(".btn-voltar");
const proximo = document.querySelector(".btn-proximo");
const time = document.querySelector(".btn-times");
const info = document.getElementsByClassName("btn-info");

const fetchApi = async (apiURL) => {
  const ApiResponse = await fetch(apiURL);
  if (ApiResponse.status == 200) {
    const data = await ApiResponse.json();
    return data;
  }
};

const worker = () => {
  const final = 200;

  const flag = new SharedArrayBuffer(4);
  const vetor = new SharedArrayBuffer(20 * 4);

  const flagView = new Int8Array(flag);
  const vetorView = new Int32Array(vetor);

  vetorView.set(final);
  flagView[0] = 1;

  let workers = [];

  for (let i = 0; i < 8; i++) {
    workers.push(new Worker("worker.js"));
    workers[i].postMessage({ flag, vetor });
  }
};

const renderList = async (apiURL) => {
  const data = await fetchApi(apiURL);
  if (data) {
    Table.innerHTML = "";
    data.forEach((e) => {
      const player = `
        <tr>
          <td>${e.summonerName}</td>
          <td><button data-info=${id} type="submit" class="btn btn-info">Informações</button></td>
        </tr>
        `;
      id = id + 1;
      Table.innerHTML += player;

      for (let j = 0; j < info.length; j++) {
        info[j].addEventListener("click", () => {
          summonerId[k] = data[j].summonerId;

          for (let j = 0; j < info.length; j++) {
            if (summonerId[k] == antigo[j]) {
              sim = 0;
              break;
            } else {
              sim = 1;
            }
          }

          if (sim == 1) {
            playerInfo = `${playerURL}${summonerId[k]}${apiKEY2}`;

            // Tablet.innerHTML = "";
            infoData = fetchApi(playerInfo).then((data) => {
              summonerName = data[0].summonerName;
              wins = data[0].wins;
              losses = data[0].losses;
              const info = `
              <tr>
              <th>${summonerName}</th>
              <th> ${wins}</th>
              <th> ${losses}</th>
              </tr>`;
              Tablet.innerHTML += info;
            });
          } else {
            console.error("Informação ja carregada");
          }
          antigo[k] = data[j].summonerId;
          k++;
        });
      }
    });
  }
};
renderList(apiURL);

voltar.addEventListener("click", () => {
  if (page != 1) {
    page = page - 1;
    apiURL = `${baseURL}${page}${apiKEY}`;

    renderList(apiURL);
  }
});

proximo.addEventListener("click", () => {
  page = page + 1;
  apiURL = `${baseURL}${page}${apiKEY}`;
  renderList(apiURL);
});
