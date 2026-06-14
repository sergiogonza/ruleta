console.clear();

const leftLeaves = document.querySelectorAll('[href="#leftLeave"]');
const rightLeaves = document.querySelectorAll('[href="#rightLeave"]');
const smallLeaves = document.querySelectorAll('[href="#smallLeaf"]');
const text = document.querySelector('.text');
const letters = document.querySelectorAll('.text path');
leftLeaves.forEach((leaf, i) => {
  const index = i / (leftLeaves.length - 1);
  gsap.set(leaf, {
    rotate: index * -45 + 10,
    transformOrigin: 'right bottom'
  });
  gsap.to(leaf, {
    scrollTrigger: {
      trigger: ".jungle-intro",
      scrub: 0.2,
      start: `${index * 40}% top`,
      end: `${index * 60 + 40}% bottom`,
    },
    x: 150,
    y: 300,
    rotate: 15 - (Math.sin(index * Math.PI / 2 - (Math.PI / 2)) * 10),
    scale: 1.3
  });
});
rightLeaves.forEach((leaf, i) => {
  const index = i / (rightLeaves.length - 1);
  gsap.set(leaf, {
    rotate: index * 45 - 10,
    transformOrigin: 'left bottom'
  });
  gsap.to(leaf, {
    scrollTrigger: {
      trigger: ".jungle-intro",
      scrub: 0.2,
      start: `${index * 40}% top`,
      end: `${index * 60 + 40}% bottom`,
    },
    x: -150,
    y: 300,
    rotate: -15 + (Math.sin(index * Math.PI / 2 - (Math.PI / 2)) * 10),
    scale: 1.3
  });
});

smallLeaves.forEach((leaf, i) => {
  gsap.set(leaf, {
    y: Math.random() * 900,
    x: Math.random() * 1000,
    scale: Math.random() * 0.5 + 0.2,
    transformOrigin: '50% 50%'
  });
  const start = Math.random() * 40 + 40;
  const end = Math.min(100, start + Math.random() * 50);
  gsap.to(leaf, {
    scrollTrigger: {
      trigger: ".jungle-intro",
      scrub: 0.2,
      start: `top top`,
      end: `bottom bottom`
    },
    scale: Math.random() * 0.5 + 0.2,
    x: Math.random() * 1600,
    y: Math.random() * 900,
    rotate: Math.random() * 1000 + 360
  });
});

letters.forEach((letter, i) => {
  gsap.from(letter, {
    scrollTrigger: {
      trigger: ".jungle-intro",
      scrub: 0.2,
      start: `${(i / (letters.length - 1)) * 50 + 30}% bottom`,
      end: `${(i / (letters.length - 1)) * 50 + 50}% bottom`
    },
    opacity: 0,
    y: '+=100',
    rotate: 180,
    scale: 2,
    transformOrigin: '50% 50%'
  });
});

// Hack to hide the render of the SVG
requestAnimationFrame(() => {
  document.querySelector('svg').style.opacity = 1;
});













// Ruleta_BS
/* ===================================
   BENDITA SELVA - RULETA
=================================== */

window.addEventListener("DOMContentLoaded", () => {

/* =========================
   POPUP POLÍTICA DE DATOS
========================= */

if(
  localStorage.getItem("benditaSelvaPolicy")
  !== "accepted"
){

  const popupHTML = `
  <div id="privacyPopup" class="privacy-popup">

    <div class="privacy-box">

      <h2>Protección de Datos Personales</h2>

      <p>
        Al participar en esta promoción autorizas a
        Bendita Selva a utilizar tus datos personales
        para contacto comercial, atención al cliente,
        promociones y gestión de tu participación.
      </p>

      <p>
        Tus datos no serán vendidos ni compartidos
        con terceros ajenos a la empresa salvo
        obligación legal.
      </p>

      <label class="privacy-check">

        <input
          type="checkbox"
          id="acceptPolicy"
        >

        <span>
          He leído y acepto la Política de
          Tratamiento de Datos Personales.
        </span>

      </label>

      <button
        id="acceptPolicyBtn"
        disabled
      >
        Aceptar y Continuar
      </button>

    </div>

  </div>
  `;

  document.body.insertAdjacentHTML(
    "beforeend",
    popupHTML
  );

  const check =
  document.getElementById(
    "acceptPolicy"
  );

  const btn =
  document.getElementById(
    "acceptPolicyBtn"
  );

  check.addEventListener(
    "change",
    () => {

      btn.disabled =
      !check.checked;

    }
  );

  btn.addEventListener(
    "click",
    () => {

      localStorage.setItem(
        "benditaSelvaPolicy",
        "accepted"
      );

      document
      .getElementById(
        "privacyPopup"
      )
      .remove();

    }
  );

}

const prizes = [
{
label:"5%",
coupon:"BS5"
},
{
label:"10%",
coupon:"BS10"
},
{
label:"5%",
coupon:"BS5A"
},
{
label:"AROMA",
coupon:"AROMA-BS"
},
{
label:"10%",
coupon:"BS10A"
},
{
label:"15%",
coupon:"BS15"
},
{
label:"5%",
coupon:"BS5B"
},
{
label:"10%",
coupon:"BS10B"
}
];

const colors = [
"#1D674B",
"#358554",
"#0b3f34",
"#A38D41",
"#1D674B",
"#D4B15A",
"#0f5646",
"#358554"
];

const wheel = document.getElementById("wheel");

if(!wheel) return;

const segmentAngle = 360 / prizes.length;

/* CREAR SEGMENTOS */

prizes.forEach((prize,index)=>{

const seg = document.createElement("div");

seg.className = "segment";

seg.style.background = colors[index];

seg.style.transform =
`rotate(${index * segmentAngle}deg)
 skewY(${90 - segmentAngle}deg)`;

const span = document.createElement("span");

span.innerHTML = prize.label;

seg.appendChild(span);

wheel.appendChild(seg);

});

/* FECHA DEL DIA */

function getTodayKey(){

return new Date()
.toISOString()
.split("T")[0];

}

/* CONTROL PREMIOS */

function initializeDailyPrizes(){

const today = getTodayKey();

if(localStorage.getItem("dailyDate") !== today){

localStorage.setItem("dailyDate",today);

localStorage.setItem("aromaGiven","0");

localStorage.setItem("off15Given","0");

}

updateStatus();

}

function updateStatus(){

const aroma =
document.getElementById("aromaStatus");

const off15 =
document.getElementById("off15Status");

if(aroma){

aroma.innerHTML =
localStorage.getItem("aromaGiven")==="1"
?
"🌿 Aroma entregado hoy"
:
"🌿 Aroma disponible";

}

if(off15){

off15.innerHTML =
localStorage.getItem("off15Given")==="1"
?
"🌿 15% entregado hoy"
:
"🌿 15% disponible";

}

}

initializeDailyPrizes();

let currentRotation = 0;

/* BOTON */

const spinBtn =
document.getElementById("spinBtn");

if(spinBtn){

spinBtn.addEventListener(
"click",
spinWheel
);

}

/* PREMIO */

function choosePrize(){

let available=[];

for(let i=0;i<prizes.length;i++){

if(
prizes[i].label==="AROMA" &&
localStorage.getItem("aromaGiven")==="1"
){
continue;
}

if(
prizes[i].label==="15%" &&
localStorage.getItem("off15Given")==="1"
){
continue;
}

available.push(i);

}

return available[
Math.floor(
Math.random()*available.length
)
];

}

/* GIRAR */
function spinWheel(){

  if(
    localStorage.getItem("benditaSelvaPolicy")
    !== "accepted"
  ){

    alert(
      "Debes aceptar la política de tratamiento de datos."
    );

    return;
  }

  const nombre =
  document.getElementById("nombre")?.value;

  const whatsapp =
  document.getElementById("whatsapp")?.value;

  if(!nombre || !whatsapp){

    alert(
      "Completa tu nombre y WhatsApp"
    );

    return;

  }

  

spinBtn.disabled = true;

const index = choosePrize();

const target =
(index * segmentAngle);

const spins =
360 * 8;

const finalRotation =
spins - target;

currentRotation += finalRotation;

wheel.style.transform =
`rotate(${currentRotation}deg)`;

setTimeout(()=>{

const prize = prizes[index];

if(prize.label==="AROMA"){

localStorage.setItem(
"aromaGiven",
"1"
);

}

if(prize.label==="15%"){

localStorage.setItem(
"off15Given",
"1"
);

}

updateStatus();

showPrize(
prize,
nombre,
whatsapp
);

spinBtn.disabled = false;

},6000);

}





  
/* MOSTRAR PREMIO */

function showPrize(
prize,
nombre,
whatsapp
){

const resultBox =
document.getElementById("resultBox");

const resultTitle =
document.getElementById("resultTitle");

const couponCode =
document.getElementById("couponCode");

if(resultBox){
  resultBox.style.display = "block";
}

if(resultTitle){
  resultTitle.innerHTML =
  `🎉 ¡Ganaste ${prize.label}!`;
}

if(couponCode){
  couponCode.innerHTML =
  prize.coupon;
}

/* MENSAJE WHATSAPP */

const mensaje = `🌿 Hola ${nombre},

¡Gracias por participar en la ruleta de Bendita Selva!

Te agradecemos por aceptar nuestra Política de Tratamiento de Datos Personales y por autorizar el uso de tus datos exclusivamente para fines de contacto, servicio al cliente, promociones y atención comercial.

Tus datos serán tratados de forma confidencial y no serán vendidos ni compartidos con terceros ajenos a la empresa, salvo obligación legal.

🎉 Premio obtenido:
${prize.label}

🎁 Cupón:
${prize.coupon}

Puedes utilizar tu beneficio en tu próxima compra.

📲 Síguenos en nuestras redes:

Instagram: @benditaselva
Facebook: Bendita Selva

🌿 Mantente al tanto de promociones, novedades y lanzamientos exclusivos.

🌐 https://benditaselva.com

💚 Gracias por confiar en Bendita Selva.`;
  

const numero =
whatsapp.replace(/\D/g,'');

window.open(
`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`,
'_blank'
);

}
  


/* COPIAR CUPON */

window.copyCoupon =
function(){

const code =
document.getElementById(
"couponCode"
)?.innerText;

if(!code) return;

navigator.clipboard.writeText(
code
);

alert(
"Cupón copiado"
);

}

});







// Mostrar la ruleta después de la intro

window.addEventListener("load", () => {

  setTimeout(() => {

    const app = document.getElementById("bendita-selva-app");

    if(app){
      app.classList.add("show");
    }

  }, 4500);

});













