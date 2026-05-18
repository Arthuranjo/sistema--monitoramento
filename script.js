const client = mqtt.connect(
  "wss://hfb72712.ala.eu-central-1.emqxsl.com:8084/mqtt",
  {
    username: "esp32",
    password: "123456"
  }
);

// tópicos
const tempTopic = "industria4/temperatura";
const vibTopic = "industria4/vibracao";

// tópicos de controle
const controlTempTopic = "industria4/control/temp";
const controlVibTopic = "industria4/control/vib";

// limites
const TEMP_MIN = 20;
const TEMP_MAX = 40;
const VIB_LIMIT = 2.5;

// elementos
const tempBtn = document.getElementById("tempBtn");
const vibBtn = document.getElementById("vibBtn");

const tempMsg = document.getElementById("tempMsg");
const vibMsg = document.getElementById("vibMsg");

// conexão
client.on("connect", () => {

  document.getElementById("status").innerHTML =
    "🟢 Conectado ao MQTT";

  client.subscribe(tempTopic);
  client.subscribe(vibTopic);
});

// mensagens MQTT
client.on("message", (topic, message) => {

  const value = parseFloat(message.toString());

  // ================= TEMPERATURA =================
  if (topic === tempTopic) {

    document.getElementById("temp").innerHTML =
      value.toFixed(1) + " °C";

    const card = document.getElementById("tempCard");

    if (value > TEMP_MAX || value < TEMP_MIN) {

      card.classList.add("alert");

      tempBtn.style.display = "inline-block";

    } else {

      card.classList.remove("alert");

      tempBtn.style.display = "none";

      tempMsg.innerHTML = "";
    }
  }

  // ================= VIBRAÇÃO =================
  if (topic === vibTopic) {

    document.getElementById("vib").innerHTML =
      value.toFixed(2) + " g";

    const card = document.getElementById("vibCard");

    if (value > VIB_LIMIT) {

      card.classList.add("alert");

      vibBtn.style.display = "inline-block";

    } else {

      card.classList.remove("alert");

      vibBtn.style.display = "none";

      vibMsg.innerHTML = "";
    }
  }
});

// ================= CONTROLE TEMPERATURA =================
tempBtn.addEventListener("click", () => {

  tempMsg.innerHTML =
    "⏳ Aguarde... controlando temperatura";

  client.publish(controlTempTopic, "on");

  setTimeout(() => {

    tempMsg.innerHTML =
      "✅ Temperatura controlada com sucesso";

  }, 3000);
});

// ================= CONTROLE VIBRAÇÃO =================
vibBtn.addEventListener("click", () => {

  vibMsg.innerHTML =
    "⏳ Aguarde... reduzindo vibração";

  client.publish(controlVibTopic, "on");

  setTimeout(() => {

    vibMsg.innerHTML =
      "✅ Vibração controlada com sucesso";

  }, 3000);
});