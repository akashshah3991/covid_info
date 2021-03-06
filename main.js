

function getData(url) {

  try {
    fetch(url)
      .then(response => response.json())
      .then(data => showData(data));
  } catch (e) {
    console.log(e);
  }
}

getTestData('https://api.rootnet.in/covid19-in/stats/testing/latest');
getData('https://api.rootnet.in/covid19-in/stats/latest');
getNotifications('https://api.rootnet.in/covid19-in/notifications');


function showData(res) {

  let regdata = res.data;


  for (let i = 0; i < regdata.regional.length; i++) {
   
    const htmlloc = document.querySelector('.states');
    const html = `<div class="statesinfo darkcard"><h3 class="cen">${regdata.regional[i].loc}</h3><p>Total Cases : ${regdata.regional[i].totalConfirmed}</p><p>Discharged :${regdata.regional[i].discharged} </p><p>Deaths :${regdata.regional[i].deaths} </p></div>`;
    htmlloc.insertAdjacentHTML('beforeend', html)
  }

  let ctdata = res.data.summary;

  const ctdataloc = document.querySelector('.country');

  const cthtml = `<div class="cases"><p>Total Cases : ${ctdata.total}</p><p>Total Discharged :${ctdata.discharged} </p><p>Total Deaths :${ctdata.deaths} </p><p class="cen smtxt">Last Updated : ${res.lastRefreshed}</p><p class="cen smtxt">source : <a href="https://www.mohfw.gov.in/">The Ministry of Health and Family Welfare </a>, India</p></div>`;
  ctdataloc.insertAdjacentHTML('beforeend', cthtml);

}

function getNotifications(url) {
  try {
    fetch(url)
      .then(response => response.json())
      .then(data => showNotifications(data));
  } catch (e) {
    console.log(e);
  }
}

function showNotifications(res) {
  let notif = res.data.notifications;

  for (let i = 0; i < notif.length; i++) {
    const notifhtml = `<p><a href="${notif[i].link}">${notif[i].title}</a></p>`;
    const notifloc = document.querySelector('.notifications');

    notifloc.insertAdjacentHTML('beforeend', notifhtml);
  }
}



function getTestData(url) {
  try {
    fetch(url)
      .then(response => response.json())
      .then(data => showTestData(data));
  } catch (e) {
    console.log(e);
  }
}

function showTestData(res) {
  let testdata = res.data;
  const testhtml = `<div><p>Day : ${testdata.day}</p><p>Total Sample Tested : ${testdata.totalSamplesTested}</p></div><p class="smtxt">Last Updated : ${res.lastRefreshed}</p>`;
  const testloc = document.querySelector('.testdata');
  testloc.insertAdjacentHTML('beforeend', testhtml);

}


darkmode.addEventListener("click",showMode);


function showMode() {

  const darkmode = document.querySelector("#darkmode");
  const body = document.querySelector("body");
  const card = document.querySelector('div.country');
  const statescards = document.querySelectorAll('div.statesinfo');
  const h3data = document.querySelectorAll('h3');
  const h2data = document.querySelectorAll('h2');
  const testdata = document.querySelector('div.ban');
  const slidercolor = document.querySelector('.slider');
  console.log(slidercolor);
  const adata = document.querySelectorAll("p>a");

 
  changemode();

  function changemode() {
    if (darkmode.checked) {
      document.querySelector('.slider').style.backgroundColor="var(--head-color)";
      body.classList.remove("lightbody");
      body.classList.add("darkbody");
      card.classList.remove("lightcard");
      card.style.removeProperty('color');
      card.classList.add("darkcard");
      for (let i = 0; i < h3data.length; i++) {

        h3data[i].style.color = "var(--text-color)";
      }
      for (let i = 0; i < h2data.length; i++) {

        h2data[i].style.color = "var(--text-color)";
      }

      statescards.forEach(function (val) {
        val.classList.remove("lightcard");
        val.classList.add("darkcard");
        val.style.color = "var(--text-color)";
      });
      for (let i = 0; i < adata.length; i++) {

        adata[i].style.color = "var(--txt-color)";
      }

    } else {
      document.querySelector('.slider').style.backgroundColor="var(--light-card)";
      body.classList.remove("darkbody");
      body.classList.add("lightbody");
      card.classList.remove("darkcard");
      card.classList.add("lightcard");
      card.style.color = "var(--txt-black)";
      testdata.style.color = "var(--txt-black)";


      statescards.forEach(function (val) {
        val.classList.remove("darkcard");
        val.classList.add("lightcard");
        val.style.color = "var(--txt-black)";
      });

      for (let i = 0; i < h3data.length; i++) {

        h3data[i].style.color = "var(--txt-black)";
      }
      for (let i = 0; i < h2data.length; i++) {

        h2data[i].style.color = "var(--txt-black)";
      }
      for (let i = 0; i < adata.length; i++) {

        adata[i].style.color = "var(--txt-black)";
      }

    }

  }
}

document.addEventListener('DOMContentLoaded', function () {
  showMode();
});


{/* <p>Today's New Cases :<span style="color: #ff7979;"> + ${ctdata.total - lastdaydata}</span></p><p>Recovered Today :<span style="color: #55debd;"> + ${ctdata.discharged - lastdatadischarged}</span></p> */}