# PLC-COL-1208
## PLC Colombiano — 12 Entradas Digitales / 8 Salidas a Relé

[![Licencia: CERN OHL v2](https://img.shields.io/badge/Licencia-CERN%20OHL%20v2-blue.svg)](https://ohwr.org/cern_ohl_s_v2.txt)
[![Estado: Prototipo](https://img.shields.io/badge/Estado-Prototipo-yellow.svg)]()
[![Versión: 1.0.0](https://img.shields.io/badge/Versión-1.0.0-green.svg)]()

---

## Descripción General

El **PLC-COL-1208** es un controlador lógico programable de código abierto diseñado y desarrollado en Colombia para aplicaciones de automatización industrial de pequeña y mediana escala. El proyecto nace de la necesidad de contar con una plataforma PLC accesible, documentada en español, fabricable localmente y con soporte de la comunidad colombiana de ingeniería.

El sistema está basado en el microcontrolador **STM32F103C8T6** (ARM Cortex-M3, 72 MHz) y ofrece 12 entradas digitales optoacopladas y 8 salidas a relé, comunicación **Modbus RTU** sobre RS-485, y un bus de expansión propietario que permite agregar hasta 8 módulos adicionales de entradas/salidas analógicas o digitales.

Este proyecto es completamente **Open Hardware** y **Open Source**: todos los esquemáticos, archivos de PCB (KiCad), firmware (C/STM32 HAL) y documentación están disponibles libremente bajo la licencia CERN OHL v2.

---

## Características Principales

- **12 entradas digitales** optoacopladas (PC817), compatibles con señales de 24 VDC industrial
- **8 salidas a relé** (HF115F-024-1ZS1), 10 A / 250 VAC, con indicador LED por canal
- **Microcontrolador STM32F103C8T6**: ARM Cortex-M3 a 72 MHz, 64 KB Flash, 20 KB RAM
- **Comunicación Modbus RTU** sobre RS-485 (MAX485), hasta 115200 bps
- **Bus de expansión** SPI de 20 pines para hasta 8 módulos adicionales
- **Alimentación** 24 VDC industrial (rango 18–30 VDC) o 220 VAC con módulo HLK-PM01
- **Montaje en riel DIN 35 mm**, gabinete ABS V0 ignífugo
- **Grado de protección** IP20 (para montaje en tablero eléctrico cerrado)
- **Programación** vía conector SWD (ST-Link V2) y bootloader UART
- **Watchdog** hardware para reinicio automático ante fallas de firmware
- **LED de estado** del sistema, comunicación y alimentación
- **Temperatura de operación**: -10 °C a +60 °C
- **Diseñado para cumplir** IEC 61131-2, IEC 61000-4-x

---

## Tabla de Especificaciones Técnicas

| Parámetro                        | Valor                                      |
|----------------------------------|--------------------------------------------|
| Microcontrolador                 | STM32F103C8T6 (ARM Cortex-M3, 72 MHz)     |
| Memoria Flash                    | 64 KB                                      |
| Memoria RAM                      | 20 KB                                      |
| Entradas digitales               | 12 canales, 24 VDC, optoacopladas (PC817)  |
| Umbral lógico "1" entrada        | 15–30 VDC                                  |
| Umbral lógico "0" entrada        | 0–5 VDC                                    |
| Corriente de entrada por canal   | ~10 mA a 24 VDC                            |
| Salidas digitales                | 8 canales, relé HF115F-024-1ZS1            |
| Capacidad de salida (relé)       | 10 A / 250 VAC, 10 A / 30 VDC             |
| Tiempo de respuesta salida       | < 10 ms (mecánico)                         |
| Alimentación principal           | 24 VDC ± 20% (18–30 VDC)                  |
| Consumo máximo                   | 15 W (todas las salidas activas)           |
| Comunicación                     | RS-485, Modbus RTU, hasta 115200 bps       |
| Bus de expansión                 | SPI 1 MHz, conector IDC 20 pines           |
| Módulos de expansión máximos     | 8 módulos                                  |
| Temperatura de operación         | -10 °C a +60 °C                            |
| Temperatura de almacenamiento    | -25 °C a +85 °C                            |
| Humedad relativa                 | 5–95% sin condensación                     |
| Dimensiones PCB                  | 160 mm × 100 mm                            |
| Dimensiones gabinete             | 180 mm × 120 mm × 60 mm                   |
| Montaje                          | Riel DIN 35 mm (EN 60715)                  |
| Grado de protección              | IP20                                       |
| Material gabinete                | ABS V0 (ignífugo UL94)                     |
| Normas de referencia             | IEC 61131-2, IEC 61000-4-2/4/5, UL 508    |
| Licencia hardware                | CERN OHL v2 (Open Hardware)                |
| Licencia firmware                | MIT                                        |

---

## Estructura del Repositorio

```
PLC-COL-1208/
├── README.md                            ← Este archivo
├── docs/
│   ├── 01_diagrama_de_bloques.md        ← Diagrama de bloques del sistema
│   ├── 02_especificaciones_tecnicas.md  ← Especificaciones completas
│   ├── 03_esquema_electrico.md          ← Descripción del esquema eléctrico
│   ├── 04_BOM.md                        ← Lista de materiales (BOM)
│   ├── 05_firmware_arquitectura.md      ← Arquitectura del firmware
│   ├── 06_protocolo_expansion.md        ← Protocolo del bus de expansión
│   ├── 07_diseno_mecanico.md            ← Diseño mecánico y gabinete
│   ├── 08_plan_pruebas.md               ← Plan de pruebas y certificación
│   └── 09_guia_fabricacion.md           ← Guía de fabricación
├── firmware/
│   ├── main.c                           ← Código principal STM32
│   ├── modbus_rtu.h                     ← Header librería Modbus RTU
│   └── modbus_rtu.c                     ← Implementación Modbus RTU
└── kicad/
    └── notas_esquematico.md             ← Notas para KiCad 7
```

---

## Cómo Empezar

### Requisitos de Hardware

- Placa PLC-COL-1208 ensamblada (ver `docs/09_guia_fabricacion.md`)
- Programador ST-Link V2 (disponible en Electronilab, Sigma Electrónica o Mercado Libre Colombia)
- Fuente de alimentación 24 VDC, mínimo 1 A
- PC con Windows 10/11, Linux o macOS

### Requisitos de Software

- [STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html) (gratuito)
- [STM32CubeProgrammer](https://www.st.com/en/development-tools/stm32cubeprog.html) (gratuito)
- [KiCad 7](https://www.kicad.org/) para editar los esquemáticos y PCB
- Cliente Modbus para pruebas: [ModRSsim2](https://sourceforge.net/projects/modrssim2/) o [QModMaster](https://sourceforge.net/projects/qmodmaster/)

### Pasos para Programar el Firmware

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/PLC-COL-1208.git
   cd PLC-COL-1208
   ```

2. Abrir STM32CubeIDE e importar el proyecto desde la carpeta `firmware/`.

3. Conectar el ST-Link V2 al conector SWD de la placa (ver pinout en `docs/01_diagrama_de_bloques.md`).

4. Compilar y cargar el firmware con **Run → Debug** o **Run → Run**.

5. Verificar el LED de estado (verde parpadeante = sistema OK).

### Configuración Modbus RTU

Por defecto el PLC-COL-1208 opera como esclavo Modbus RTU con:
- **Dirección esclavo**: 1 (configurable por holding register)
- **Baudrate**: 9600 bps (configurable)
- **Paridad**: Ninguna
- **Bits de datos**: 8
- **Bits de parada**: 1

Mapa de registros básico:
- **Coils 0–7**: Salidas Q0–Q7 (lectura/escritura)
- **Discrete Inputs 0–11**: Entradas I0–I11 (solo lectura)
- **Holding Registers 0–9**: Configuración del sistema

---

## Comunidad y Soporte

- **Issues y preguntas**: Usar la sección Issues de GitHub
- **Foro**: [Electronilab Foro](https://electronilab.co/foro/) — comunidad colombiana de electrónica
- **Contribuciones**: Ver `CONTRIBUTING.md` (próximamente)

---

## Licencia

### Hardware
Este proyecto de hardware está licenciado bajo la **CERN Open Hardware Licence Version 2 - Strongly Reciprocal (CERN OHL-S v2)**.

Esto significa que puedes usar, estudiar, modificar y distribuir el hardware libremente, siempre que cualquier trabajo derivado se distribuya bajo la misma licencia y se atribuya al proyecto original.

Texto completo: https://ohwr.org/cern_ohl_s_v2.txt

### Firmware
El firmware está licenciado bajo la **Licencia MIT**.

Copyright (c) 2024 PLC-COL-1208 Contributors

---

## Créditos

Proyecto desarrollado en Colombia con el objetivo de democratizar el acceso a tecnología de automatización industrial de código abierto.

**Versión**: 1.0.0  
**Fecha**: 2024  
**País de origen**: Colombia
