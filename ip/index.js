//axios import buraya gelecek
import axios from "axios";
var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

const locationData = {
  as: "AS8386 Vodafone Net Iletisim Hizmetler AS",
  boylam: 29.0659,
  bölge: "16",
  bölgeAdı: "Bursa Province",
  durum: "OK",
  enlem: 40.1621,
  isp: "Vodafone Net DSL Bursa6",
  kıta: "Asia",
  organizasyon: "Vodafone NET Iletisim Hizmetleri Anonim Sirketi",
  parabirimi: "TRY",
  saatdilimi: "Europe/Istanbul",
  sorgu: "31.206.203.45",
  zip: "16360",
  ülke: "Turkey",
  ülkeKodu: "TR",
  ülkebayrağı: "https://apis.ergineer.com/ulkebayraklari/TR",
  şehir: "Bursa",
};

const cardContainer = (data) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = "https://flagcdn.com/w640/tr.png";
  card.appendChild(image);

  const cardClass = document.createElement("div");
  cardClass.classList.add("card-info");
  card.appendChild(cardClass);

  const h3 = document.createElement("h3");
  h3.classList.add("ip");
  h3.textContent = data.sorgu;
  cardClass.appendChild(h3);

  const p = document.createElement("p");
  p.classList.add = "ulke";
  p.textContent = data.ülke + " " + "(" + data.ülkeKodu + ")";
  cardClass.appendChild(p);

  const enlemBoylam = document.createElement("p");
  enlemBoylam.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`;
  cardClass.appendChild(enlemBoylam);

  const sehir = document.createElement("p");
  sehir.textContent = `Şehir: ${data.şehir}`;
  cardClass.appendChild(sehir);

  const saat = document.createElement("p");
  saat.textContent = `Saat Dilimi: ${data.saatdilimi}`;
  cardClass.appendChild(saat);

  const parabirimi = document.createElement("p");
  parabirimi.textContent = `Para birimi: ${data.parabirimi}`;
  cardClass.appendChild(parabirimi);

  const isp = document.createElement("p");
  isp.textContent = `ISP: ${data.isp}`;
  cardClass.appendChild(isp);

  return card;
};

const cards = document.querySelector(".cards");

const createIP = async () => {
  await ipAdresimiAl();

  axios
    .get("https://apis.ergineer.com/ipgeoapi/" + benimIP)
    .then((res) => {
      console.log("axios", res.data);
      return res.data;
    })
    .then((ip) => {
      cards.appendChild(cardContainer(ip));
    });
};
createIP();
