# PLC-COL-1208 — Especificaciones Técnicas

**Versión**: 1.0.0  
**Fecha**: 2024  
**Documento**: DOC-002  
**Estado**: Revisión A

---

## 1. Especificaciones Eléctricas

### 1.1 Alimentación

| Parámetro                          | Mínimo  | Típico  | Máximo  | Unidad | Notas                              |
|------------------------------------|---------|---------|---------|--------|------------------------------------|
| Tensión de alimentación (VDC)      | 18      | 24      | 30      | VDC    | Entrada directa 24 VDC industrial  |
| Tensión de alimentación (VAC)      | 100     | 220     | 240     | VAC    | Con módulo HLK-PM01 (opcional)     |
| Frecuencia de red (AC)             | 47      | 50/60   | 63      | Hz     | Solo con opción AC                 |
| Corriente de entrada (24 VDC)      | —       | 500     | 700     | mA     | Todas las salidas activas          |
| Potencia consumida máxima          | —       | 12      | 15      | W      | Todas las salidas activas          |
| Potencia en reposo                 | —       | 1.5     | 2       | W      | Sin salidas activas                |
| Tensión interna +5V_SYS            | 4.85    | 5.0     | 5.15    | VDC    | Regulada por LM2596-5V             |
| Tensión interna +3V3_SYS           | 3.20    | 3.30    | 3.40    | VDC    | Regulada por LM2596-ADJ            |
| Rizado tensión +5V (Vpp)           | —       | 50      | 100     | mV     | A plena carga                      |
| Rizado tensión +3.3V (Vpp)         | —       | 30      | 60      | mV     | A plena carga                      |
| Protección contra inversión        | —       | —       | —       | —      | Diodo Schottky SS34 en serie       |
| Tensión de disparo varistor        | —       | 30      | 33      | VDC    | MOV 30V en entrada                 |
| Corriente de fusible de entrada    | —       | —       | 1       | A      | Fusible F1, 5×20 mm, vidrio        |

### 1.2 Entradas Digitales

| Parámetro                          | Mínimo  | Típico  | Máximo  | Unidad | Notas                              |
|------------------------------------|---------|---------|---------|--------|------------------------------------|
| Número de canales                  | —       | 12      | —       | —      | I0–I11                             |
| Tensión nominal de entrada         | —       | 24      | —       | VDC    | Señal de campo                     |
| Rango de tensión de entrada        | 0       | 24      | 30      | VDC    | Operación normal                   |
| Tensión máxima absoluta            | —       | —       | 35      | VDC    | Con protección TVS                 |
| Umbral lógico "1" (ON)             | 15      | 24      | 30      | VDC    | Entrada activa                     |
| Umbral lógico "0" (OFF)            | 0       | 0       | 5       | VDC    | Entrada inactiva                   |
| Corriente de entrada a 24 VDC      | 8       | 10      | 12      | mA     | Con R_lim = 2.2 kΩ                 |
| Corriente de entrada a 12 VDC      | 4       | 5       | 6       | mA     | Operación reducida                 |
| Aislamiento galvánico              | —       | 2500    | —       | Vrms   | Optoacoplador PC817                |
| Tiempo de respuesta (ON→OFF)       | —       | 1       | 5       | ms     | Tiempo de propagación PC817        |
| Tiempo de respuesta (OFF→ON)       | —       | 1       | 5       | ms     | Tiempo de propagación PC817        |
| Tiempo de debounce (firmware)      | —       | 20      | —       | ms     | Configurable por registro          |
| Resistencia de limitación          | —       | 2.2     | —       | kΩ     | R = (24-1.2)/10mA = 2.28 kΩ       |
| Protección ESD                     | —       | ±2      | —       | kV     | TVS P6KE30A por canal              |
| Tipo de entrada                    | —       | —       | —       | —      | Sink (corriente hacia el común)    |
| Indicador por canal                | —       | —       | —       | —      | LED amarillo 3 mm                  |

### 1.3 Salidas Digitales a Relé

| Parámetro                          | Mínimo  | Típico  | Máximo  | Unidad | Notas                              |
|------------------------------------|---------|---------|---------|--------|------------------------------------|
| Número de canales                  | —       | 8       | —       | —      | Q0–Q7                              |
| Tipo de relé                       | —       | —       | —       | —      | HF115F-024-1ZS1, SPDT              |
| Tensión de bobina                  | —       | 24      | —       | VDC    | Alimentada desde +24V_COIL         |
| Corriente de bobina                | —       | 40      | 50      | mA     | Por relé                           |
| Tensión máxima de contacto (AC)    | —       | 250     | 277     | VAC    | Contacto NA o NC                   |
| Tensión máxima de contacto (DC)    | —       | 30      | 110     | VDC    | Contacto NA o NC                   |
| Corriente máxima de contacto       | —       | 10      | 10      | A      | A 250 VAC, carga resistiva         |
| Corriente mínima de contacto       | 10      | —       | —       | mA     | Para confiabilidad del contacto    |
| Resistencia de contacto            | —       | 50      | 100     | mΩ     | Contacto nuevo                     |
| Vida mecánica                      | —       | 10      | —       | M ops  | Millones de operaciones            |
| Vida eléctrica (10A/250VAC)        | —       | 100     | —       | k ops  | Miles de operaciones               |
| Tiempo de operación (ON)           | —       | 7       | 10      | ms     | Tiempo de cierre del contacto      |
| Tiempo de liberación (OFF)         | —       | 3       | 5       | ms     | Tiempo de apertura del contacto    |
| Aislamiento bobina-contacto        | —       | 4000    | —       | Vrms   | Según datasheet HF115F             |
| Transistor driver                  | —       | —       | —       | —      | BC547, NPN, Ic_max = 100 mA        |
| Diodo flyback                      | —       | —       | —       | —      | 1N4007, 1A/1000V                   |
| Indicador por canal                | —       | —       | —       | —      | LED verde 3 mm                     |

---

## 2. Especificaciones del Microcontrolador

| Parámetro                          | Valor                                      |
|------------------------------------|--------------------------------------------|
| Modelo                             | STM32F103C8T6                              |
| Arquitectura                       | ARM Cortex-M3, 32 bits                     |
| Frecuencia máxima                  | 72 MHz                                     |
| Frecuencia de operación            | 72 MHz (con PLL, cristal 8 MHz)            |
| Memoria Flash                      | 64 KB                                      |
| Memoria SRAM                       | 20 KB                                      |
| GPIO disponibles                   | 37 pines (en encapsulado LQFP-48)          |
| Timers de propósito general        | TIM2, TIM3, TIM4 (16 bits)                 |
| Timer avanzado                     | TIM1 (16 bits, con complementarios)        |
| USART                              | 3 (USART1, USART2, USART3)                 |
| SPI                                | 2 (SPI1, SPI2)                             |
| I2C                                | 2 (I2C1, I2C2)                             |
| ADC                                | 2 × 12 bits, 10 canales                    |
| DMA                                | 7 canales                                  |
| Watchdog independiente (IWDG)      | Sí, con oscilador RC interno 40 kHz        |
| Watchdog de ventana (WWDG)         | Sí                                         |
| RTC                                | Sí (requiere cristal 32.768 kHz externo)   |
| Tensión de operación               | 2.0 – 3.6 VDC                              |
| Tolerancia a 5V en pines           | Sí (pines marcados FT en datasheet)        |
| Temperatura de operación           | -40 °C a +85 °C                            |
| Encapsulado                        | LQFP-48 (7×7 mm, paso 0.5 mm)             |
| Consumo en operación (72 MHz)      | ~36 mA típico                              |
| Consumo en modo sleep              | ~500 µA                                    |
| Consumo en modo standby            | ~5 µA                                      |

---

## 3. Especificaciones de Comunicación

### 3.1 RS-485 / Modbus RTU

| Parámetro                          | Valor                                      |
|------------------------------------|--------------------------------------------|
| Estándar físico                    | RS-485 (EIA/TIA-485)                       |
| Protocolo de aplicación            | Modbus RTU (IEC 61158)                     |
| Modo de operación                  | Esclavo (slave)                            |
| Dirección esclavo                  | 1–247 (configurable, defecto: 1)           |
| Baudrates soportados               | 1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200 bps |
| Baudrate por defecto               | 9600 bps                                   |
| Formato de trama                   | 8N1 (8 bits datos, sin paridad, 1 stop)    |
| Paridad configurable               | Ninguna, Par, Impar                        |
| Transceptor RS-485                 | MAX485 (o SN75176, SP485)                  |
| Número de nodos en bus             | Hasta 32 (con MAX485 estándar)             |
| Longitud máxima de cable           | 1200 m a 9600 bps                          |
| Terminación de línea               | 120 Ω, seleccionable por jumper JP_RT      |
| Resistencias de polarización       | 560 Ω pull-up (A), 560 Ω pull-down (B)    |
| Protección ESD                     | TVS SMBJ6.5CA en líneas A y B             |
| Tiempo de silencio inter-trama     | 3.5 caracteres (según Modbus RTU)          |
| Timeout de respuesta               | 1000 ms (configurable)                     |
| Funciones Modbus implementadas     | 0x01, 0x02, 0x03, 0x05, 0x06, 0x0F, 0x10 |

### 3.2 Mapa de Registros Modbus

| Tipo                | Dirección (base 0) | Descripción                        | Acceso    |
|---------------------|--------------------|------------------------------------|-----------|
| Coil                | 0–7                | Salidas Q0–Q7                      | R/W       |
| Discrete Input      | 0–11               | Entradas I0–I11                    | Solo R    |
| Holding Register    | 0                  | Dirección esclavo Modbus           | R/W       |
| Holding Register    | 1                  | Baudrate (0=9600, 1=19200, ...)    | R/W       |
| Holding Register    | 2                  | Paridad (0=None, 1=Even, 2=Odd)   | R/W       |
| Holding Register    | 3                  | Tiempo debounce entradas (ms)      | R/W       |
| Holding Register    | 4                  | Versión firmware (solo lectura)    | Solo R    |
| Holding Register    | 5                  | Estado del sistema (flags)         | Solo R    |
| Holding Register    | 6                  | Contador de tramas recibidas       | Solo R    |
| Holding Register    | 7                  | Contador de errores CRC            | Solo R    |
| Holding Register    | 8                  | Módulos de expansión detectados    | Solo R    |
| Holding Register    | 9                  | Comando de control (reset, save)   | R/W       |

### 3.3 UART Debug (USART2)

| Parámetro          | Valor                    |
|--------------------|--------------------------|
| Baudrate           | 115200 bps               |
| Formato            | 8N1                      |
| Nivel lógico       | 3.3V CMOS (no RS-232)    |
| Conector           | J_DBG, 3 pines, 2.54 mm  |
| Uso                | Debug, configuración, logs |

### 3.4 Bus de Expansión SPI

| Parámetro          | Valor                    |
|--------------------|--------------------------|
| Interfaz           | SPI modo 0 (CPOL=0, CPHA=0) |
| Velocidad          | 1 MHz                    |
| Módulos máximos    | 8 (CS0–CS7)              |
| Conector           | IDC 20 pines, 2×10, 2.54 mm |
| Protocolo          | Propietario (ver DOC-006) |

---

## 4. Especificaciones Ambientales

| Parámetro                          | Mínimo  | Típico  | Máximo  | Unidad | Norma de referencia        |
|------------------------------------|---------|---------|---------|--------|----------------------------|
| Temperatura de operación           | -10     | 25      | +60     | °C     | IEC 61131-2                |
| Temperatura de almacenamiento      | -25     | 25      | +85     | °C     | IEC 61131-2                |
| Humedad relativa (operación)       | 5       | 50      | 95      | %      | Sin condensación           |
| Humedad relativa (almacenamiento)  | 5       | 50      | 95      | %      | Sin condensación           |
| Altitud de operación               | 0       | —       | 2000    | m.s.n.m| IEC 61131-2                |
| Vibración (operación)              | —       | —       | 2       | g      | IEC 60068-2-6, 10-150 Hz   |
| Vibración (transporte)             | —       | —       | 5       | g      | IEC 60068-2-6              |
| Choque mecánico                    | —       | —       | 15      | g      | IEC 60068-2-27, 11 ms      |
| Grado de protección                | —       | IP20    | —       | —      | IEC 60529                  |
| Categoría de instalación           | —       | II      | —       | —      | IEC 60664-1                |
| Grado de contaminación             | —       | 2       | —       | —      | IEC 60664-1                |

---

## 5. Especificaciones Mecánicas

| Parámetro                          | Valor                                      |
|------------------------------------|--------------------------------------------|
| Dimensiones PCB                    | 160 mm × 100 mm × 1.6 mm                  |
| Dimensiones gabinete               | 180 mm × 120 mm × 60 mm (L × H × P)       |
| Peso (sin cables)                  | ~350 g                                     |
| Tipo de montaje                    | Riel DIN 35 mm (EN 60715)                  |
| Material gabinete                  | ABS V0 (ignífugo, UL94 V-0)               |
| Color gabinete                     | Gris RAL 7035                              |
| Grado de protección                | IP20                                       |
| Sección de cable en bornes         | 0.5 – 2.5 mm² (AWG 20–14)                 |
| Tipo de bornes                     | Tornillo, Phoenix Contact o equivalente    |
| Paso de bornes                     | 5.08 mm                                    |
| Número de bornes de entrada        | 14 (12 señales + 2 comunes)                |
| Número de bornes de salida         | 17 (8 NA + 8 NC + 1 común)                |
| Número de bornes RS-485            | 3 (A, B, GND)                              |
| Número de bornes alimentación      | 2 (+24V, GND)                              |

---

## 6. Especificaciones de Confiabilidad

| Parámetro                          | Valor                                      |
|------------------------------------|--------------------------------------------|
| MTBF estimado                      | > 50.000 horas (a 25 °C, 24/7)            |
| Vida útil de relés (mecánica)      | 10 millones de operaciones                 |
| Vida útil de relés (eléctrica)     | 100.000 operaciones a 10A/250VAC           |
| Vida útil de relés (eléctrica)     | 300.000 operaciones a 5A/250VAC            |
| Tiempo de arranque (boot)          | < 500 ms desde aplicación de alimentación  |
| Tiempo de ciclo de scan            | < 10 ms (con 12 entradas y 8 salidas)      |
| Watchdog timeout                   | 1000 ms (configurable 100–5000 ms)         |

---

## 7. Normas Aplicables

| Norma                | Descripción                                                    | Aplicación              |
|----------------------|----------------------------------------------------------------|-------------------------|
| IEC 61131-2          | Controladores programables — Requisitos y ensayos de equipos  | Especificaciones base   |
| IEC 61000-4-2        | Inmunidad a descarga electrostática (ESD)                     | Nivel 3: ±6 kV contacto |
| IEC 61000-4-3        | Inmunidad a campo electromagnético radiado                    | Nivel 3: 10 V/m         |
| IEC 61000-4-4        | Inmunidad a transitorios eléctricos rápidos (Burst)           | Nivel 3: ±2 kV          |
| IEC 61000-4-5        | Inmunidad a sobretensiones (Surge)                            | Nivel 3: ±2 kV          |
| IEC 61000-4-6        | Inmunidad a perturbaciones conducidas por RF                  | Nivel 3: 10 Vrms        |
| IEC 61000-4-8        | Inmunidad a campo magnético de frecuencia industrial          | Nivel 4: 30 A/m         |
| IEC 60068-2-6        | Ensayos ambientales — Vibración sinusoidal                    | Fc: 2g, 10-150 Hz       |
| IEC 60068-2-27       | Ensayos ambientales — Choque mecánico                         | 15g, 11 ms              |
| IEC 60529            | Grados de protección (IP)                                     | IP20                    |
| UL 508               | Industrial Control Equipment                                   | Referencia diseño       |
| NTC 2050 (Colombia)  | Código Eléctrico Colombiano                                    | Instalación             |
| RETIE (Colombia)     | Reglamento Técnico de Instalaciones Eléctricas                | Certificación           |

---

## 8. Tabla de Parámetros Consolidada

| Parámetro                          | Mínimo  | Típico  | Máximo  | Unidad |
|------------------------------------|---------|---------|---------|--------|
| Tensión alimentación               | 18      | 24      | 30      | VDC    |
| Corriente alimentación             | —       | 500     | 700     | mA     |
| Potencia disipada                  | 1.5     | 8       | 15      | W      |
| Tensión entrada digital (ON)       | 15      | 24      | 30      | VDC    |
| Tensión entrada digital (OFF)      | 0       | 0       | 5       | VDC    |
| Corriente entrada digital          | 8       | 10      | 12      | mA     |
| Corriente salida relé (AC)         | 0.01    | 5       | 10      | A      |
| Tensión salida relé (AC)           | —       | 220     | 250     | VAC    |
| Tensión salida relé (DC)           | —       | 24      | 30      | VDC    |
| Tiempo ciclo de scan               | —       | 5       | 10      | ms     |
| Tiempo debounce entradas           | 5       | 20      | 100     | ms     |
| Temperatura operación              | -10     | 25      | +60     | °C     |
| Humedad relativa                   | 5       | 50      | 95      | %      |
| Baudrate RS-485                    | 1200    | 9600    | 115200  | bps    |
| Velocidad SPI expansión            | —       | 1       | 4       | MHz    |
