COMANDOS PARA CONECTAR O SERVIDOR EMQX NO PROJETO:

vá na aba teste online: nome de usuário: esp32 senha: 123456

Na parte de assinaturas: Tópico: industria4/#

Após isso clique em inscrever-se

Agora é só rodar o hardware

Sistema Inteligente de Monitoramento de Máquinas com ESP32
Projeto desenvolvido para monitoramento industrial utilizando ESP32, sensor MPU6050, display OLED e integração MQTT com EMQX Cloud.

Objetivo
O sistema realiza o monitoramento em tempo real de:

Temperatura
Vibração da máquina
Quando valores críticos são detectados:

O buzzer é acionado
Alertas aparecem no display OLED
Os dados são enviados via MQTT para o EMQX Cloud
Órfão Utilizado
ESP32
MPU6050
OLED SSD1306
MQTT
Nuvem EMQX
Wokwi
PlatformIO
VSCode
Funcionalidades
Monitoramento contínuo de temperatura
Monitoramento contínuo de vibração
Alertas sonoros via buzzer
Exibição das informações no display OLED
Envio de dados em tempo real via MQTT
Integração com EMQX Cloud
Simulação completa no Wokwi
Estrutura do Projeto
src/main.cpp→ código principal do ESP32
diagram.json→ Configuração do circuito no Wokwi
platformio.ini→ Configuração do PlatformIO
Bibliotecas Utilizadas
O PlatformIO instala automaticamente as dependências abaixo:

Adafruit MPU6050
Sensor Unificado da Adafruit
Biblioteca GFX da Adafruit
Adafruit SSD1306
PubSubCliente
Como Executar o Projeto
1. Instale os programas necessários
VSCode
Extensão PlatformIO IDE
Extensão Wokwi para VSCode
2. Clonar o
git clone https://github.com/Arthuranjo/sistema_monitoramento_maquina.git
