# PLC-COL-1208 — Diagrama de Bloques del Sistema

**Versión**: 1.0.0  
**Fecha**: 2024  
**Documento**: DOC-001

---

## 1. Diagrama de Bloques General

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                              PLC-COL-1208 — DIAGRAMA DE BLOQUES                     ║
╚══════════════════════════════════════════════════════════════════════════════════════╝

  ALIMENTACIÓN EXTERNA
  ┌─────────────────┐
  │  220 VAC / 50Hz │──┐
  │  o 24 VDC ext.  │  │
  └─────────────────┘  │
                        │
  ┌─────────────────────▼──────────────────────────────────────────────────────────┐
  │                        BLOQUE DE ALIMENTACIÓN                                   │
  │                                                                                  │
  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
  │  │  HLK-PM01    │    │   Fusible    │    │  LM2596-5V   │    │  LM2596-3V3  │  │
  │  │ 220VAC→5VDC  │    │  F1: 1A/250V │    │  5V → 5V reg │    │  5V → 3.3V  │  │
  │  │  (opcional)  │    │  (entrada AC)│    │  500mA       │    │  800mA       │  │
  │  └──────┬───────┘    └──────────────┘    └──────┬───────┘    └──────┬───────┘  │
  │         │                                        │                    │           │
  │         │  24VDC ──────────────────────────────►│                    │           │
  │         │                                        │                    │           │
  │         └──────────────────────────────────────►│ +5V_SYS            │ +3V3_SYS  │
  │                                                  │                    │           │
  │  Protecciones: Varistor MOV (275V), TVS 30V,    │                    │           │
  │  Diodo Schottky anti-inversión, Condensadores   │                    │           │
  │  de filtro 1000µF/50V + 100µF/50V               │                    │           │
  └──────────────────────────────────────────────────┼────────────────────┼───────────┘
                                                      │ +5V                │ +3.3V
                                                      │                    │
  ┌───────────────────────────────────────────────────▼────────────────────▼───────────┐
  │                     MICROCONTROLADOR PRINCIPAL                                       │
  │                                                                                       │
  │                    ┌─────────────────────────────────────────┐                       │
  │                    │         STM32F103C8T6                    │                       │
  │                    │         ARM Cortex-M3 @ 72 MHz           │                       │
  │                    │         64 KB Flash / 20 KB RAM          │                       │
  │                    │                                          │                       │
  │  Cristal 8MHz ────►│ OSC_IN/OUT    PA0-PA7 ──────────────────┼──► Entradas I0-I7    │
  │  NRST ────────────►│ NRST          PB0-PB3 ──────────────────┼──► Entradas I8-I11   │
  │  BOOT0 ───────────►│ BOOT0         PC0-PC7 ──────────────────┼──► Salidas Q0-Q7     │
  │                    │               PA9 (TX1) ─────────────────┼──► RS-485 TX         │
  │                    │               PA10 (RX1) ────────────────┼──◄ RS-485 RX         │
  │                    │               PA8 (DE/RE) ───────────────┼──► RS-485 DIR        │
  │                    │               PA2 (TX2) ─────────────────┼──► UART Debug TX     │
  │                    │               PA3 (RX2) ─────────────────┼──◄ UART Debug RX     │
  │                    │               PB13 (SCK) ────────────────┼──► SPI CLK (EXP)    │
  │                    │               PB14 (MISO) ───────────────┼──◄ SPI MISO (EXP)   │
  │                    │               PB15 (MOSI) ───────────────┼──► SPI MOSI (EXP)   │
  │                    │               PB12 (NSS) ────────────────┼──► SPI CS0 (EXP)    │
  │                    │               PA13 (SWDIO) ──────────────┼──► SWD Data         │
  │                    │               PA14 (SWCLK) ──────────────┼──► SWD Clock        │
  │                    │               PC13 ──────────────────────┼──► LED Estado       │
  │                    └─────────────────────────────────────────┘                       │
  └───────────────────────────────────────────────────────────────────────────────────────┘
         │                    │                    │                    │
         │ PA0-PA7             │ PB0-PB3            │ PC0-PC7            │ USART1
         ▼                    ▼                    ▼                    ▼
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐
  │  ENTRADAS    │    │  ENTRADAS    │    │   SALIDAS    │    │  COMUNICACIÓN    │
  │ DIGITALES    │    │ DIGITALES    │    │  A RELÉ      │    │    RS-485        │
  │  I0 – I7     │    │  I8 – I11   │    │  Q0 – Q7     │    │                  │
  │              │    │              │    │              │    │  ┌────────────┐  │
  │ 8x PC817     │    │ 4x PC817     │    │ 8x HF115F   │    │  │  MAX485    │  │
  │ Optoacoplador│    │ Optoacoplador│    │ Relé 24VDC  │    │  │ RS-485 IC  │  │
  │              │    │              │    │ 10A/250VAC  │    │  └─────┬──────┘  │
  │ R_lim 2.2kΩ  │    │ R_lim 2.2kΩ │    │              │    │        │          │
  │ LED indicador│    │ LED indicador│    │ BC547 driver│    │  Terminación     │
  │ TVS protec.  │    │ TVS protec.  │    │ 1N4007 FWB  │    │  120Ω (jumper)  │
  │              │    │              │    │ LED indicador│    │  TVS ESD        │
  │ 24VDC campo  │    │ 24VDC campo  │    │              │    │                  │
  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘    └────────┬─────────┘
         │                    │                    │                    │
         ▼                    ▼                    ▼                    ▼
  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐
  │ BORNES       │    │ BORNES       │    │ BORNES       │    │ BORNE RS-485     │
  │ ENTRADA      │    │ ENTRADA      │    │ SALIDA       │    │ A, B, GND        │
  │ I0-I7 + COM  │    │ I8-I11 + COM │    │ Q0-Q7 + COM  │    │ (3 bornes)       │
  │ (9 bornes)   │    │ (5 bornes)   │    │ (9 bornes)   │    └──────────────────┘
  └──────────────┘    └──────────────┘    └──────────────┘

  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │                         BUS DE EXPANSIÓN                                          │
  │                                                                                    │
  │  Conector IDC 20 pines (2x10, paso 2.54mm)                                        │
  │                                                                                    │
  │  SPI: SCK, MOSI, MISO, CS0-CS7 (hasta 8 módulos)                                 │
  │  Alimentación: +5V, +3.3V, GND                                                    │
  │  Control: RESET_EXP, INT_EXP                                                      │
  │                                                                                    │
  │  Módulos planificados:                                                             │
  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
  │  │ EXP-DI8  │ │ EXP-DO8R │ │ EXP-AI4  │ │ EXP-AO2  │ │ EXP-ETH  │ │ EXP-CAN  │ │
  │  │ 8 DI     │ │ 8 DO Relé│ │ 4 AI     │ │ 2 AO     │ │ W5500    │ │ MCP2515  │ │
  │  │ adicional│ │ adicional│ │ 4-20mA   │ │ 4-20mA   │ │ Ethernet │ │ CANbus   │ │
  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
  └──────────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────────────────────┐
  │                    INDICADORES Y CONECTORES AUXILIARES                             │
  │                                                                                    │
  │  LEDs de estado:                                                                   │
  │  ● PWR (verde)   — Alimentación 3.3V presente                                     │
  │  ● RUN (verde)   — Firmware ejecutándose (parpadeo 1 Hz)                          │
  │  ● ERR (rojo)    — Error de sistema o watchdog                                    │
  │  ● COM (amarillo)— Actividad Modbus RTU                                           │
  │  ● I0-I11 (amarillo) — Estado de cada entrada (12 LEDs)                          │
  │  ● Q0-Q7 (verde) — Estado de cada salida (8 LEDs)                                │
  │                                                                                    │
  │  Conector SWD (4 pines):  SWDIO, SWCLK, GND, 3.3V                               │
  │  Conector UART Debug (3 pines): TX, RX, GND                                      │
  │  Jumper BOOT0: Selección modo bootloader / ejecución normal                       │
  │  Jumper RT: Terminación RS-485 (120Ω)                                             │
  └──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Descripción de Cada Bloque

### 2.1 Bloque de Alimentación

El bloque de alimentación acepta dos fuentes de entrada:

**Opción A — Entrada 24 VDC industrial (principal)**
- Entrada: 18–30 VDC
- Protección contra inversión de polaridad: diodo Schottky SS34 en serie
- Protección contra sobretensión transitoria: varistor MOV 30V y TVS bidireccional P6KE30CA
- Fusible de protección: F1, 1 A, 250 V, tipo fusible de vidrio 5×20 mm
- Regulador 5 V: LM2596-5V (buck converter), salida 5 V / 500 mA para lógica y optoacopladores
- Regulador 3.3 V: LM2596-ADJ configurado para 3.3 V / 800 mA para el STM32 y periféricos digitales
- Condensadores de filtro: 1000 µF / 50 V en entrada, 470 µF / 16 V en salidas de reguladores

**Opción B — Módulo HLK-PM01 (220 VAC → 5 VDC)**
- Para instalaciones donde solo se dispone de 220 VAC
- El HLK-PM01 entrega 5 VDC / 600 mA directamente
- Se omite el LM2596-5V y se alimenta directamente desde el HLK-PM01
- El LM2596-ADJ sigue siendo necesario para generar 3.3 V

**Distribución de potencia:**
- +24V_COIL: Alimentación de bobinas de relés (directamente desde entrada 24 VDC)
- +5V_SYS: Alimentación de optoacopladores, LEDs, MAX485
- +3V3_SYS: Alimentación del STM32F103C8T6 y lógica digital

### 2.2 Microcontrolador Principal — STM32F103C8T6

El corazón del sistema es el STM32F103C8T6, un microcontrolador ARM Cortex-M3 de 32 bits con las siguientes características relevantes para este diseño:

- **Frecuencia**: 72 MHz con PLL interno, cristal externo de 8 MHz
- **Flash**: 64 KB para almacenamiento del firmware
- **RAM**: 20 KB SRAM para variables, buffers y stack
- **GPIO**: 37 pines de E/S de propósito general, tolerantes a 5 V en la mayoría de pines
- **USART**: 3 puertos serie (USART1 para Modbus, USART2 para debug)
- **SPI**: 2 puertos SPI (SPI2 para bus de expansión)
- **Timers**: TIM1-TIM4 para temporización, PWM y captura
- **Watchdog**: IWDG (Independent Watchdog) y WWDG (Window Watchdog)
- **ADC**: 2 ADC de 12 bits (para futuras expansiones analógicas)
- **Encapsulado**: LQFP-48, soldable manualmente con práctica

**Circuito de soporte:**
- Cristal: 8 MHz con condensadores de carga 22 pF
- Condensadores de desacople: 100 nF en cada pin VDD/VSS, 4.7 µF en VDD principal
- Circuito de reset: condensador 100 nF + resistencia 10 kΩ pull-up en NRST
- BOOT0: resistencia 10 kΩ pull-down a GND (modo ejecución normal), jumper para activar bootloader

### 2.3 Entradas Digitales (12 canales)

Cada uno de los 12 canales de entrada digital está diseñado para señales de 24 VDC industrial:

**Componentes por canal:**
- **Resistencia de limitación de corriente**: R = (24V - 1.2V) / 10 mA = 2.28 kΩ → se usa **2.2 kΩ** (valor estándar E24)
- **Optoacoplador PC817**: aislamiento galvánico entre campo (24 VDC) y lógica (3.3 V)
- **LED indicador**: LED amarillo 3 mm en paralelo con el LED del optoacoplador (con resistencia propia)
- **Diodo TVS**: P6KE30A para protección contra transitorios de 30 V en la línea de campo
- **Diodo de protección**: 1N4148 anti-inversión en serie con la entrada

**Funcionamiento:**
- Cuando la entrada recibe 24 VDC: el LED del PC817 conduce (~10 mA), el fototransistor satura, el pin del STM32 lee "0" lógico (lógica invertida por el optoacoplador)
- Cuando la entrada está en 0 V: el LED del PC817 no conduce, el fototransistor corta, resistencia pull-up lleva el pin del STM32 a "1" lógico
- El firmware invierte la lógica para presentar "1" cuando hay 24 VDC en la entrada

**Asignación de pines STM32:**
- I0: PA0, I1: PA1, I2: PA2, I3: PA3, I4: PA4, I5: PA5, I6: PA6, I7: PA7
- I8: PB0, I9: PB1, I10: PB8, I11: PB9

### 2.4 Salidas a Relé (8 canales)

Cada uno de los 8 canales de salida utiliza un relé electromecánico de potencia:

**Componentes por canal:**
- **Transistor driver BC547**: NPN, activa la bobina del relé cuando el pin del STM32 está en alto
- **Resistencia de base**: 1 kΩ para limitar corriente de base del BC547
- **Relé HF115F-024-1ZS1**: bobina 24 VDC, contacto SPDT (1 NA + 1 NC), 10 A / 250 VAC
- **Diodo flyback 1N4007**: protección contra pico de tensión al desactivar la bobina del relé
- **LED indicador**: LED verde 3 mm con resistencia 1 kΩ, indica estado de la salida

**Funcionamiento:**
- Pin STM32 en alto (3.3 V) → BC547 satura → bobina relé energizada → contacto NA cierra
- Pin STM32 en bajo (0 V) → BC547 corta → bobina relé desenergizada → contacto NA abre

**Asignación de pines STM32:**
- Q0: PC0, Q1: PC1, Q2: PC2, Q3: PC3, Q4: PC4, Q5: PC5, Q6: PC6, Q7: PC7

### 2.5 Comunicación RS-485 (Modbus RTU)

- **Transceptor**: MAX485 (o equivalente SN75176, SP485)
- **Interfaz con STM32**: USART1 (PA9=TX, PA10=RX, PA8=DE/RE control de dirección)
- **Velocidades soportadas**: 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200 bps
- **Protocolo**: Modbus RTU, modo esclavo
- **Terminación de línea**: resistencia 120 Ω seleccionable por jumper (JP_RT)
- **Protección ESD**: TVS bidireccional SMBJ6.5CA en líneas A y B
- **Resistencias de polarización**: 560 Ω pull-up en A, 560 Ω pull-down en B (fail-safe)
- **Longitud máxima de cable**: 1200 m a 9600 bps, 100 m a 115200 bps

### 2.6 Bus de Expansión

- **Interfaz física**: SPI modo 0 (CPOL=0, CPHA=0) a 1 MHz
- **Conector**: IDC 20 pines (2×10, paso 2.54 mm), compatible con cable plano
- **Señales**: SCK, MOSI, MISO, CS0–CS7 (8 chip selects para 8 módulos), +5V, +3.3V, GND, RESET_EXP, INT_EXP
- **Protocolo**: trama propietaria [SYNC][ADDR][CMD][DATA_LEN][DATA][CRC16]
- **Detección automática**: al inicio, el firmware escanea los 8 CS buscando módulos presentes

### 2.7 Indicadores LED y Conectores Auxiliares

**LEDs de estado del sistema (frente del gabinete):**
- PWR (verde): +3.3V presente
- RUN (verde): parpadeo 1 Hz = firmware OK, encendido fijo = colgado
- ERR (rojo): error de sistema, watchdog, o falla de comunicación
- COM (amarillo): parpadeo en cada trama Modbus recibida/enviada

**Conector SWD** (J_SWD, 4 pines, paso 2.54 mm):
- Pin 1: SWDIO (PA13)
- Pin 2: SWCLK (PA14)
- Pin 3: GND
- Pin 4: +3.3V (solo para referencia, no alimentar desde aquí)

**Conector UART Debug** (J_DBG, 3 pines, paso 2.54 mm):
- Pin 1: TX (PA2 / USART2_TX)
- Pin 2: RX (PA3 / USART2_RX)
- Pin 3: GND

---

## 3. Flujo de Señales

```
CAMPO (24VDC)                    LÓGICA (3.3V)                    CAMPO (AC/DC)
     │                                │                                  │
     │  Señal de sensor/PB            │                                  │
     ▼                                │                                  │
[Borne entrada Ix] ──► [TVS] ──► [R 2.2kΩ] ──► [PC817] ──► [STM32 PAx/PBx]
                                                                    │
                                                              [Firmware]
                                                              [Lógica Ladder]
                                                              [Modbus RTU]
                                                                    │
[STM32 PCx] ──► [R 1kΩ] ──► [BC547] ──► [Relé HF115F] ──► [Borne salida Qx]
                                              │                      │
                                         [1N4007]              [Carga AC/DC]
                                         [flyback]
```

---

## 4. Interfaces Entre Bloques

| Interfaz                    | Señales                          | Nivel lógico | Notas                              |
|-----------------------------|----------------------------------|--------------|------------------------------------|
| Alimentación → STM32        | +3.3V, GND                       | —            | Desacople 100nF por pin VDD        |
| Alimentación → Optoacoplador| +5V, GND                         | —            | Lado receptor del PC817            |
| Alimentación → Relés        | +24V_COIL, GND                   | —            | Bobina 24 VDC del HF115F           |
| STM32 → Entradas            | PA0-PA7, PB0-PB3 (GPIO input)    | 3.3V CMOS    | Pull-up interno habilitado         |
| STM32 → Salidas             | PC0-PC7 (GPIO output)            | 3.3V CMOS    | Push-pull, 8 mA máx por pin        |
| STM32 → RS-485              | PA9 (TX), PA10 (RX), PA8 (DE/RE) | 3.3V CMOS    | USART1, half-duplex                |
| STM32 → Bus expansión       | PB13 (SCK), PB14 (MISO), PB15 (MOSI), PB12 (CS0) | 3.3V CMOS | SPI2 |
| STM32 → SWD                 | PA13 (SWDIO), PA14 (SWCLK)       | 3.3V CMOS    | Programación y debug               |
| STM32 → UART Debug          | PA2 (TX), PA3 (RX)               | 3.3V CMOS    | USART2, 115200 bps                 |
| STM32 → LEDs estado         | PC13, PB5, PB6, PB7              | 3.3V CMOS    | Con resistencia limitadora 330Ω    |
