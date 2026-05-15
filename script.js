const client = mqtt.connect("wss://hfb72712.ala.eu-central-1.emqxsl.com:8084/mqtt", {
  username: "esp32",
  password: "123456"
});

// tópicos
const tempTopic = "industria4/temperatura";
const vibTopic = "industria4/vibracao";

client.on("connect", () => {
  document.getElementById("status").innerHTML = "🟢 Conectado ao MQTT";

  client.subscribe(tempTopic);
  client.subscribe(vibTopic);
});

client.on("message", (topic, message) => {

  const value = parseFloat(message.toString());

  // ================= TEMPERATURA =================
  if (topic === tempTopic) {

    document.getElementById("temp").innerHTML = value + " °C";

    const card = document.getElementById("tempCard");

    if (value > 40 || value < 20) {
      card.classList.add("alert");
    } else {
      card.classList.remove("alert");
    }
  }

  // ================= VIBRAÇÃO =================
  if (topic === vibTopic) {

    document.getElementById("vib").innerHTML = value + " g";

    const card = document.getElementById("vibCard");

    if (value > 2.5) {
      card.classList.add("alert");
    } else {
      card.classList.remove("alert");
    }
  }
});