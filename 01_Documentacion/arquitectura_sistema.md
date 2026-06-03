# Arquitectura del Sistema — ColPLC v1.0

## 1. Diagrama de Bloques General

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ColPLC v1.0 — Módulo Base                    │
│                                                                     │
│  ┌──────────────┐    ┌─────────────────────────────────────────┐   │
│  │ ALIMENTACIÓN │    │              MÓDULO CPU                  │   │
│  │              │    │                                         │   │
│  │  24VDC IN    │    │  ┌─────────────────────────────────┐   │   │
│  │  [Fusible]   │    │  │     STM32F407VGT6               │   │   │
│  │  [MOV/TVS]   │    │  │     ARM Cortex-M4 @ 168MHz      │   │   │
│  │              │    │  │                                 │   │   │
│  │  [LM2596]    │    │  │  Flash: 1MB  RAM: 192KB        │   │   │
│  │  5VDC/3A     │    │  │  RTC + Watchdog + DMA          │   │   │
│  │              │    │  └─────────────────────────────────┘   │   │
│  │  [AMS1117]   │    │         │           │           │       │   │
│  │  3.3VDC/1A   │    │    [SPI Bus]   [UART1-3]   [GPIO]      │   │
│  └──────────────┘    └─────────────────────────────────────────┘   │
│         │                    │           │           │              │
│         │            ┌───────┘    ┌──────┘    ┌─────┘             │
│         │            │            │            │                    │
│  ┌──────┴──────┐  ┌──┴──────┐  ┌─┴──────┐  ┌─┴──────────────┐   │
│  │  WATCHDOG   │  │  FLASH  │  │  COM   │  │  BUS EXPANSIÓN  │   │
│  │  EXTERNO    │  │  EXT    │  │  RS485 │  │  SPI + CTRL     │   │
│  │  MAX706     │  │  8MB    │  │  USB   │  │  IDC-20         │   │
│  └─────────────┘  └─────────┘  └────────┘  └────────────────┘   │
│                                                                     │
│  ┌──────────────────────────┐  ┌──────────────────────────────┐   │
│  │   12 ENTRADAS DIGITALES  │  │    8 SALIDAS A RELÉ          │   │
│  │                          │  │                              │   │
│  │  [Bornera 24VDC]         │  │  [Bornera NA/NC/COM]        │   │
│  │  [TVS + R limitadora]    │  │  [Relé HF115F]              │   │
│  │  [Optoacoplador PC817]   │  │  [Driver ULN2803A]          │   │
│  │  [LED indicador verde]   │  │  [LED indicador rojo]       │   │
│  │  [GPIO STM32]            │  │  [GPIO STM32]               │   │
│  └──────────────────────────┘  └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
         │
         │ Bus de Expansión (SPI + CS + INT + PWR)
         │
┌────────┴────────────────────────────────────────────────────────────┐
│                    MÓDULOS DE EXPANSIÓN (opcionales)                │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ EXP-8DI  │  │ EXP-8DO  │  │ EXP-4AI  │  │ EXP-ETH  │  ...    │
│  │ 8 Ent.   │  │ 8 Sal.   │  │ 4 Anal.  │  │ Ethernet │          │
│  │ Digital  │  │ Relé     │  │ 0-10V/   │  │ Modbus   │          │
│  │          │  │          │  │ 4-20mA   │  │ TCP      │          │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────────────────────┘
```

## 2. Arquitectura de Software (Capas)

```
┌─────────────────────────────────────────────────────┐
│              CAPA DE APLICACIÓN                     │
│   Programa de usuario (Ladder / ST / FBD)           │
│   Lógica de control, temporizadores, contadores     │
├─────────────────────────────────────────────────────┤
│              CAPA DE RUNTIME PLC                    │
│   Motor de ejecución IEC 61131-3                    │
│   Scheduler de tareas cíclicas                      │
│   Gestión de variables y memoria                    │
├─────────────────────────────────────────────────────┤
│              CAPA DE COMUNICACIONES                 │
│   Stack Modbus RTU / TCP                            │
│   Protocolo de expansión SPI                        │
│   USB CDC (programación)                            │
├─────────────────────────────────────────────────────┤
│              CAPA HAL (Hardware Abstraction)        │
│   Drivers GPIO, SPI, UART, ADC, Timer               │
│   Gestión de E/S físicas                            │
│   Watchdog, RTC, Flash                              │
├─────────────────────────────────────────────────────┤
│              RTOS — FreeRTOS                        │
│   Tareas, semáforos, colas de mensajes              │
│   Gestión de interrupciones                         │
├─────────────────────────────────────────────────────┤
│              HARDWARE STM32F407                     │
│   Cortex-M4, periféricos, memoria                   │
└─────────────────────────────────────────────────────┘
```

## 3. Mapa de Pines STM32F407VGT6

### Entradas Digitales (12 canales)
| Canal | Pin STM32 | Puerto | Función |
|-------|-----------|--------|---------|
| DI1   | PA0       | GPIOA  | Entrada digital 1 |
| DI2   | PA1       | GPIOA  | Entrada digital 2 |
| DI3   | PA2       | GPIOA  | Entrada digital 3 |
| DI4   | PA3       | GPIOA  | Entrada digital 4 |
| DI5   | PA4       | GPIOA  | Entrada digital 5 |
| DI6   | PA5       | GPIOA  | Entrada digital 6 |
| DI7   | PA6       | GPIOA  | Entrada digital 7 |
| DI8   | PA7       | GPIOA  | Entrada digital 8 |
| DI9   | PB0       | GPIOB  | Entrada digital 9 |
| DI10  | PB1       | GPIOB  | Entrada digital 10 |
| DI11  | PB2       | GPIOB  | Entrada digital 11 |
| DI12  | PB3       | GPIOB  | Entrada digital 12 |

### Salidas a Relé (8 canales)
| Canal | Pin STM32 | Puerto | Función |
|-------|-----------|--------|---------|
| DO1   | PC0       | GPIOC  | Salida relé 1 |
| DO2   | PC1       | GPIOC  | Salida relé 2 |
| DO3   | PC2       | GPIOC  | Salida relé 3 |
| DO4   | PC3       | GPIOC  | Salida relé 4 |
| DO5   | PC4       | GPIOC  | Salida relé 5 |
| DO6   | PC5       | GPIOC  | Salida relé 6 |
| DO7   | PC6       | GPIOC  | Salida relé 7 |
| DO8   | PC7       | GPIOC  | Salida relé 8 |

### Comunicaciones
| Función | Pin STM32 | Periférico |
|---------|-----------|------------|
| RS485 TX | PD5 | USART2 TX |
| RS485 RX | PD6 | USART2 RX |
| RS485 DE/RE | PD4 | GPIO |
| USB D+ | PA12 | USB OTG FS |
| USB D- | PA11 | USB OTG FS |

### Bus de Expansión SPI
| Función | Pin STM32 | Periférico |
|---------|-----------|------------|
| SPI SCK | PB13 | SPI2 SCK |
| SPI MOSI | PB15 | SPI2 MOSI |
| SPI MISO | PB14 | SPI2 MISO |
| CS Módulo 1 | PE0 | GPIO |
| CS Módulo 2 | PE1 | GPIO |
| CS Módulo 3 | PE2 | GPIO |
| CS Módulo 4 | PE3 | GPIO |
| CS Módulo 5 | PE4 | GPIO |
| CS Módulo 6 | PE5 | GPIO |
| CS Módulo 7 | PE6 | GPIO |
| CS Módulo 8 | PE7 | GPIO |
| INT Expansión | PD0 | EXTI |

### Otros
| Función | Pin STM32 | Descripción |
|---------|-----------|-------------|
| LED RUN | PD12 | Verde — ciclo OK |
| LED ERR | PD13 | Rojo — fallo |
| LED COM | PD14 | Amarillo — comunicación |
| BOOT0 | BOOT0 | Modo bootloader |
| SWD CLK | PA14 | Debug |
| SWD DIO | PA13 | Debug |
| Flash SPI SCK | PA5 | SPI1 |
| Flash SPI MOSI | PA7 | SPI1 |
| Flash SPI MISO | PA6 | SPI1 |
| Flash CS | PA4 | GPIO |

## 4. Flujo de Operación del PLC

```
ENCENDIDO
    │
    ▼
[Inicialización Hardware]
    │  - Configurar relojes y PLL
    │  - Inicializar GPIO, SPI, UART
    │  - Verificar watchdog
    ▼
[Auto-diagnóstico (POST)]
    │  - Test RAM
    │  - Test Flash
    │  - Verificar módulos de expansión
    │  - Verificar comunicaciones
    ▼
[Cargar Programa de Usuario]
    │  - Leer desde Flash externa
    │  - Verificar CRC del programa
    ▼
[Ciclo de Scan PLC] ◄──────────────────────┐
    │                                       │
    ├─[1. Leer Entradas]                    │
    │    - Leer 12 DI físicas               │
    │    - Leer módulos expansión           │
    │    - Actualizar imagen de proceso     │
    │                                       │
    ├─[2. Ejecutar Programa Usuario]        │
    │    - Procesar lógica Ladder/ST        │
    │    - Actualizar temporizadores        │
    │    - Procesar contadores              │
    │                                       │
    ├─[3. Escribir Salidas]                 │
    │    - Actualizar 8 DO físicas          │
    │    - Actualizar módulos expansión     │
    │                                       │
    ├─[4. Comunicaciones]                   │
    │    - Procesar Modbus RTU              │
    │    - Actualizar variables HMI         │
    │                                       │
    └─[5. Reset Watchdog] ──────────────────┘
         - Tiempo ciclo típico: 1-10 ms
```

## 5. Arquitectura de Expansión

```
Módulo Base (Dirección 0)
    │
    ├── Módulo Expansión 1 (CS1) — Dirección 1
    ├── Módulo Expansión 2 (CS2) — Dirección 2
    ├── Módulo Expansión 3 (CS3) — Dirección 3
    ├── Módulo Expansión 4 (CS4) — Dirección 4
    ├── Módulo Expansión 5 (CS5) — Dirección 5
    ├── Módulo Expansión 6 (CS6) — Dirección 6
    ├── Módulo Expansión 7 (CS7) — Dirección 7
    └── Módulo Expansión 8 (CS8) — Dirección 8

Capacidad máxima con 8 módulos EXP-8DI + 8 módulos EXP-8DO:
  - Entradas: 12 + (8 × 8) = 76 entradas digitales
  - Salidas:   8 + (8 × 8) = 72 salidas
```
