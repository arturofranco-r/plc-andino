# Esquemático — Módulo de Comunicaciones

## Descripción
Interfaces de comunicación del ColPLC v1.0.
Base: RS-485 (Modbus RTU) + USB CDC.
Expansión: RS-232, Ethernet, CAN (mediante módulos opcionales).

---

## 1. Puerto RS-485 (Modbus RTU — COM1)

### Transceptor: MAX485CSA+ (o SN75176B)

```
STM32 USART2:
  TX  (PD5) ──[R1 33Ω]──── DI  (Pin 4) MAX485
  RX  (PD6) ──────────────  RO  (Pin 1) MAX485
  DE  (PD4) ──────────────  DE  (Pin 3) MAX485  (Driver Enable)
  DE  (PD4) ──────────────  /RE (Pin 2) MAX485  (Receiver Enable, invertido)

MAX485 Bus:
  A   (Pin 6) ──[R2 120Ω termination]──── B (Pin 7)  (solo en extremo de línea)
  A   (Pin 6) ──────────────────────────── RS485_A (bornera)
  B   (Pin 7) ──────────────────────────── RS485_B (bornera)
  GND (Pin 5) ──────────────────────────── GND_RS485

Alimentación:
  VCC (Pin 8) ──[C1 100nF]──GND ──── +3.3V

Protección bus RS-485:
  RS485_A ──[TVS1 SMBJ6.5CA]──GND  (protección ESD/transitorios)
  RS485_B ──[TVS2 SMBJ6.5CA]──GND
  RS485_A ──[R3 560Ω]──+5V         (bias resistor, pull-up)
  RS485_B ──[R4 560Ω]──GND         (bias resistor, pull-down)
```

### Conector RS-485

```
J_RS485 — DB9 Hembra (panel frontal) o Bornera 3 pines:

DB9:
  Pin 1: GND_RS485
  Pin 3: RS485_B (-)
  Pin 8: RS485_A (+)
  (Pinout estándar Modbus RS-485)

Bornera alternativa (paso 5.08mm):
  Pin 1: A (+)
  Pin 2: B (-)
  Pin 3: GND (referencia)
```

### Parámetros Modbus RTU

```
Velocidades soportadas: 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200 bps
Paridad: None, Even, Odd
Bits de parada: 1 o 2
Dirección esclavo: 1-247 (configurable)
Modo: Esclavo (por defecto) / Maestro (configurable)
Timeout: 3.5 caracteres (estándar Modbus)
```

---

## 2. Puerto USB (Programación y Debug)

### Conector: Mini-USB tipo B

```
USB Conector Mini-B:
  Pin 1: VBUS ──[R5 1MΩ]──── PA9 STM32 (detección conexión)
  Pin 2: D-   ──[R6 22Ω] ──── PA11 STM32 (USB_DM)
  Pin 3: D+   ──[R7 22Ω] ──── PA12 STM32 (USB_DP)
  Pin 4: ID   ──── NC
  Pin 5: GND  ──── GND

Pull-up USB FS:
  +3.3V ──[R8 1.5kΩ]──── PA12 (D+)  (señaliza Full Speed al host)

Protección ESD:
  USBLC6-2SC6 entre D+/D- y GND
  (IC de protección ESD específico para USB)

Filtro ferrita:
  D+ ──[FB1 600Ω@100MHz]──── PA12
  D- ──[FB2 600Ω@100MHz]──── PA11
```

### Función USB CDC

```
El STM32 implementa USB CDC (Communications Device Class)
Aparece como puerto COM virtual en Windows/Linux/Mac
Usos:
  - Programación del PLC (carga de programa Ladder)
  - Monitoreo en tiempo real de variables
  - Actualización de firmware (DFU)
  - Terminal de diagnóstico
```

---

## 3. Módulo de Expansión RS-232 (Opcional — COM2)

### Transceptor: MAX232CPE+

```
STM32 USART3:
  TX  (PB10) ──── T1IN (Pin 11) MAX232
  RX  (PB11) ──── R1OUT(Pin 12) MAX232

MAX232 Charge Pump:
  C1+ (Pin 1) ──[C2 1µF]──── C1- (Pin 3)
  C2+ (Pin 4) ──[C3 1µF]──── C2- (Pin 5)
  V+  (Pin 2) ──[C4 1µF]──── GND
  V-  (Pin 6) ──[C5 1µF]──── GND
  VCC (Pin 16)──[C6 100nF]── GND ──── +3.3V
  GND (Pin 15)──── GND

Salida RS-232:
  T1OUT(Pin 14)──── RS232_TX (DB9 Pin 3)
  R1IN (Pin 13)──── RS232_RX (DB9 Pin 2)

Conector DB9 Macho:
  Pin 2: RX (entrada)
  Pin 3: TX (salida)
  Pin 5: GND
  Pin 7: RTS (opcional)
  Pin 8: CTS (opcional)
```

---

## 4. Módulo de Expansión Ethernet (Opcional)

### Chip: W5500 (WIZnet — SPI Ethernet)

```
STM32 SPI3:
  SCK  (PC10) ──── SCLK (Pin 22) W5500
  MOSI (PC12) ──── MOSI (Pin 23) W5500
  MISO (PC11) ──── MISO (Pin 24) W5500
  CS   (PD7)  ──── /SCS (Pin 25) W5500
  INT  (PD8)  ──── /INT (Pin 26) W5500
  RST  (PD9)  ──── /RES (Pin 27) W5500

Alimentación W5500:
  VCC (3.3V) ──[C7 100nF]──GND
             ──[C8 10µF] ──GND

Transformador de red:
  W5500 TX+/TX- ──── Transformador HR911105A ──── RJ45
  W5500 RX+/RX- ──── Transformador HR911105A ──── RJ45

Conector RJ45 con LEDs integrados:
  LED_LINK (verde): Conectado a W5500 LINKLED
  LED_ACT  (ambar): Conectado a W5500 ACTLED

Protección ESD:
  Cada par diferencial: PRTR5V0U2X (ESD protection)
```

### Protocolos soportados con W5500:
- Modbus TCP (puerto 502)
- EtherNet/IP (opcional, requiere licencia)
- HTTP (servidor web de configuración)
- DHCP / IP estática configurable

---

## 5. Módulo de Expansión CAN (Opcional)

### Transceptor: TJA1050T

```
STM32 CAN1:
  TX  (PD1) ──── TXD (Pin 1) TJA1050
  RX  (PD0) ──── RXD (Pin 4) TJA1050

TJA1050 Bus:
  CANH (Pin 7) ──[R9 120Ω]──── CANL (Pin 6)  (terminación, solo extremo)
  CANH (Pin 7) ──────────────── CAN_H (bornera)
  CANL (Pin 6) ──────────────── CAN_L (bornera)

  VCC (Pin 3) ──[C9 100nF]──GND ──── +5V
  GND (Pin 2) ──── GND
  S   (Pin 8) ──── GND  (modo normal, no silencioso)

Protección bus CAN:
  CAN_H ──[TVS3 SMBJ12CA]──GND
  CAN_L ──[TVS4 SMBJ12CA]──GND

Conector CAN (bornera 3 pines):
  Pin 1: CAN_H
  Pin 2: CAN_L
  Pin 3: GND_CAN
```

### Protocolos CAN soportados:
- CANopen (DS301, DS401)
- DeviceNet (opcional)
- CAN 2.0B a 1 Mbps

---

## Tabla Resumen de Comunicaciones

| Puerto | IC | STM32 | Velocidad | Protocolo | Conector |
|--------|-----|-------|-----------|-----------|---------|
| COM1 RS-485 | MAX485 | USART2 | 115200 bps | Modbus RTU | DB9/Bornera |
| USB | Interno | USB OTG | 12 Mbps | CDC/DFU | Mini-USB |
| COM2 RS-232* | MAX232 | USART3 | 115200 bps | HMI/SCADA | DB9 |
| ETH* | W5500 | SPI3 | 100 Mbps | Modbus TCP | RJ45 |
| CAN* | TJA1050 | CAN1 | 1 Mbps | CANopen | Bornera |

*Módulos opcionales de expansión

---

## Notas de Diseño PCB — Comunicaciones

1. **RS-485**: Pistas diferenciales A/B de igual longitud, 120Ω impedancia diferencial
2. **USB**: Par diferencial D+/D- de 90Ω, longitud igual, sin vías, sin ángulos de 90°
3. **Ethernet**: Par diferencial 100Ω, longitud igual, transformador cerca del conector
4. **CAN**: Par diferencial 120Ω, terminación en extremos de la red
5. **Ferrites**: Usar ferrites en todas las líneas de comunicación que salen del PCB
6. **Condensadores de desacoplamiento**: 100nF cerca de cada IC de comunicación
7. **Plano de tierra**: Plano sólido bajo todos los ICs de comunicación
8. **ESD**: Protección ESD en todos los conectores externos
