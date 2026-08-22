# 🏭 Sistema Inteligente de Monitoramento de Máquinas com ESP32

Sistema de monitoramento industrial desenvolvido com **ESP32**, **MPU6050**, **display OLED SSD1306**, **buzzer** e comunicação **MQTT** utilizando **EMQX Cloud**.

O projeto monitora temperatura e vibração em tempo real, identifica situações fora dos limites definidos e permite o controle do sistema através de uma aplicação web.

---

## 🎯 Funcionalidades

* 🌡️ Monitoramento de temperatura
* 📳 Monitoramento de vibração
* 🔊 Alertas sonoros através de buzzer
* 🖥️ Exibição dos dados no display OLED
* 📡 Comunicação em tempo real via MQTT
* ☁️ Integração com EMQX Cloud
* 📊 Dashboard web com gráficos
* ⚙️ Controle remoto de temperatura e vibração
* 🧪 Simulação completa através do Wokwi

---

## 🛠️ Tecnologias

* **ESP32**
* **MPU6050**
* **OLED SSD1306**
* **MQTT**
* **EMQX Cloud**
* **C++ / Arduino**
* **PlatformIO**
* **Wokwi**
* **JavaScript**
* **Chart.js**

---

## 🏗️ Arquitetura

```text id="9jgj6n"
MPU6050
   │
   ▼
 ESP32
   │
   │ MQTT / TLS
   ▼
EMQX Cloud
   │
   │ MQTT / WSS
   ▼
Dashboard Web
```

O ESP32 coleta os dados do sensor e publica as informações no EMQX. A aplicação web recebe essas mensagens em tempo real e apresenta os dados através de indicadores e gráficos.

A aplicação também pode enviar comandos MQTT para o ESP32.

---

## 📡 Tópicos MQTT

### Dados enviados pelo ESP32

```text id="7khw8c"
industria4/temperatura
industria4/vibracao
```

### Comandos recebidos pelo ESP32

```text id="j0o9gf"
industria4/tempMax
industria4/tempMin
industria4/vibLimit
industria4/buzzer
industria4/control/temp
industria4/control/vib
```

Para visualizar todas as mensagens do projeto, utilize:

```text id="0x8j7w"
industria4/#
```

---

# ▶️ Como executar

## ⭐ Recomendado: Wokwi

A maneira mais fácil de testar o projeto é através do **Wokwi**, pois não é necessário possuir o ESP32 e os sensores fisicamente.

### 🔗 Simulação

[Abrir projeto no Wokwi](https://wokwi.com/projects/463460726560792577?utm_source=chatgpt.com)

Abra o projeto e execute a simulação.

O ESP32 utiliza a rede:

```text id="x8x7vy"
SSID: Wokwi-GUEST
Password: vazio
```

---

## ☁️ Configuração do EMQX Cloud

Para utilizar o MQTT, é necessário possuir um deployment ativo no EMQX Cloud.

No deployment:

**Access Control → Authentication**

Crie um usuário MQTT, por exemplo:

```text id="0lqgtr"
Username: esp32
Password: SUA_SENHA
```

Depois, no cliente MQTT utilizado para testes, conecte-se ao broker através de **MQTT over TLS** na porta:

```text id="v0n6x1"
8883
```

Na área de subscriptions, utilize:

```text id="g2k0fr"
industria4/#
```

Depois clique em **Subscribe**.

Ao executar o ESP32, as mensagens de temperatura e vibração deverão aparecer automaticamente.

> ⚠️ Nunca coloque a senha real do EMQX no README ou em um repositório público.

---

## 🌐 Aplicação Web

A aplicação web utiliza **WebSocket Secure (WSS)** para se comunicar com o EMQX:

```text id="8q9n5c"
wss://SEU_BROKER_EMQX:8084/mqtt
```

Caso o deployment do EMQX seja recriado, atualize o endereço do broker no ESP32 e na aplicação web.

Os tópicos MQTT permanecem os mesmos.

---

## 📁 Estrutura

```text id="2jj8u9"
sistema_monitoramento_maquina/
│
├── src/
│   └── main.cpp
│
├── diagram.json
├── platformio.ini
└── README.md
```

---

## 🚀 Objetivo do Projeto

Este projeto foi desenvolvido para demonstrar na prática conceitos de:

* Internet das Coisas (IoT)
* Sistemas embarcados
* MQTT
* Comunicação em tempo real
* Monitoramento industrial
* Cloud Computing
* Desenvolvimento Web

---

## 👨‍💻 Autor

**Arthur dos Anjos**
