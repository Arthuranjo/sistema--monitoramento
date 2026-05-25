const client = mqtt.connect(
  "wss://hfb72712.ala.eu-central-1.emqxsl.com:8084/mqtt",
  {
    username: "esp32",
    password: "123456"
  }
);

// ================= TÓPICOS =================
const tempTopic = "industria4/temperatura";
const vibTopic = "industria4/vibracao";

const controlTempTopic = "industria4/control/temp";
const controlVibTopic = "industria4/control/vib";

// ================= AUDIO =================
const alarmSound = document.getElementById("alarmSound");
let alarmActive = false;

// ================= LIMITES =================
const TEMP_MIN = 20;
const TEMP_MAX = 40;
const VIB_LIMIT = 2.5;

// ================= ELEMENTOS =================
const tempBtn = document.getElementById("tempBtn");
const vibBtn = document.getElementById("vibBtn");

const tempMsg = document.getElementById("tempMsg");
const vibMsg = document.getElementById("vibMsg");

const tempCard = document.getElementById("tempCard");
const vibCard = document.getElementById("vibCard");

// ================= GRÁFICOS =================
const tempData = [];
const vibData = [];
const labels = [];

const tempChart = new Chart(document.getElementById("chartTemp"), {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Temperatura",
      data: tempData,
      borderWidth: 2,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

const vibChart = new Chart(document.getElementById("chartVib"), {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Vibração",
      data: vibData,
      borderWidth: 2,
      tension: 0.3
    }]
  },
   options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// ================= CONEXÃO =================
client.on("connect", () => {
  document.getElementById("status").innerHTML =
    "🟢 Conectado ao MQTT";

  client.subscribe(tempTopic);
  client.subscribe(vibTopic);
});

// ================= CONTROLE GLOBAL DE ALARME =================
function checkAlarm(tempAlert, vibAlert) {
  if (tempAlert || vibAlert) {
    if (!alarmActive) {
      alarmSound.play();
      alarmActive = true;
    }
  } else {
    alarmActive = false;
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }
}

// ================= MENSAGENS MQTT =================
client.on("message", (topic, message) => {

  const value = parseFloat(message.toString());
  if (isNaN(value)) return;

  let tempAlert = false;
  let vibAlert = false;

  // ================= TEMPERATURA =================
  if (topic === tempTopic) {

    document.getElementById("temp").innerHTML =
      value.toFixed(1) + " °C";

    // gráfico
    tempData.push(value);
    labels.push(new Date().toLocaleTimeString());

    if (tempData.length > 20) {
      tempData.shift();
      labels.shift();
    }

    tempChart.update();

    if (value > TEMP_MAX || value < TEMP_MIN) {

      tempCard.classList.remove("ok");
      tempCard.classList.add("alert");

      tempBtn.style.display = "inline-block";

      tempMsg.innerHTML = "⚠️ Temperatura fora do ideal";
      tempAlert = true;

    } else {

      tempCard.classList.remove("alert");
      tempCard.classList.add("ok");

      tempBtn.style.display = "none";

      tempMsg.innerHTML = "✅ Temperatura controlada";
    }
  }

  // ================= VIBRAÇÃO =================
  if (topic === vibTopic) {

    document.getElementById("vib").innerHTML =
      value.toFixed(2) + " g";

    // gráfico
    vibData.push(value);

    if (vibData.length > 20) {
      vibData.shift();
    }

    vibChart.update();

    if (value > VIB_LIMIT) {

      vibCard.classList.remove("ok");
      vibCard.classList.add("alert");

      vibBtn.style.display = "inline-block";

      vibMsg.innerHTML = "⚠️ Vibração acima do limite";
      vibAlert = true;

    } else {

      vibCard.classList.remove("alert");
      vibCard.classList.add("ok");

      vibBtn.style.display = "none";

      vibMsg.innerHTML = "✅ Vibração controlada";
    }
  }

  // ativa/desativa som corretamente
  checkAlarm(tempAlert, vibAlert);
});

// ================= CONTROLE TEMPERATURA =================
tempBtn.addEventListener("click", () => {

  tempMsg.innerHTML = "⏳ Controlando temperatura...";
  client.publish(controlTempTopic, "on");

  setTimeout(() => {
    tempMsg.innerHTML = "✅ Temperatura estabilizada";
  }, 3000);
});

// ================= CONTROLE VIBRAÇÃO =================
vibBtn.addEventListener("click", () => {

  vibMsg.innerHTML = "⏳ Reduzindo vibração...";
  client.publish(controlVibTopic, "on");

  setTimeout(() => {
    vibMsg.innerHTML = "✅ Vibração estabilizada";
  }, 3000);
});