# Esquemático — Módulo CPU (STM32F407VGT6)

## Descripción
Núcleo de procesamiento del ColPLC. Basado en STM32F407VGT6 con cristal externo,
memoria Flash SPI, RTC con batería de respaldo y circuitos de reset/watchdog.

---

## Circuito de Alimentación del CPU

```
+3.3V ──┬──[C1 100nF]──GND   (desacoplamiento VDD)
        ├──[C2 100nF]──GND   (desacoplamiento VDDA)
        ├──[C3 4.7µF]──GND   (bulk)
        └── VDD, VDDA, VREF+ del STM32

+1.2V ──┬──[C4 100nF]──GND   (desacoplamiento VCAP — regulador interno)
        └── VCAP1, VCAP2 del STM32
```

---

## Circuito de Cristal (HSE)

```
STM32 OSC_IN (PH0) ──┬──[C5 22pF]──GND
                     └──[XTAL1 8MHz]──┬──[C6 22pF]──GND
                                      └── STM32 OSC_OUT (PH1)

Nota: Usar cristal HC-49S 8MHz, CL=18pF, ESR<50Ω
      Pistas cortas, sin cruzar otras señales
```

---

## Circuito de Reset

```
+3.3V ──[R1 10kΩ]──┬── NRST STM32
                   ├──[C7 100nF]──GND   (filtro RC)
                   └──[SW1 RESET]──GND  (pulsador reset)
```

---

## Circuito RTC con Batería de Respaldo

```
+3.3V ──[D1 BAT54]──┬── VBAT STM32
                    │
CR2032 (+) ─────────┘
CR2032 (-) ─── GND

[C8 100nF] entre VBAT y GND

Cristal RTC:
STM32 PC14 (OSC32_IN)  ──[C9 12pF]──GND
                        ──[XTAL2 32.768kHz]──[C10 12pF]──GND
STM32 PC15 (OSC32_OUT) ──────────────────────────────────────
```

---

## Memoria Flash SPI Externa (W25Q64JVSIQ — 8MB)

```
STM32 SPI1_SCK  (PA5) ──── SCK  (Pin 6)  W25Q64
STM32 SPI1_MOSI (PA7) ──── DI   (Pin 5)  W25Q64
STM32 SPI1_MISO (PA6) ──── DO   (Pin 2)  W25Q64
STM32 GPIO      (PA4) ──── /CS  (Pin 1)  W25Q64
+3.3V ──────────────────── VCC  (Pin 8)  W25Q64
GND ────────────────────── GND  (Pin 4)  W25Q64
+3.3V ──────────────────── /WP  (Pin 3)  W25Q64 (write protect deshabilitado)
+3.3V ──────────────────── /HOLD(Pin 7)  W25Q64

Desacoplamiento: [C11 100nF] + [C12 10µF] entre VCC y GND del W25Q64
```

---

## Watchdog Externo (MAX706TESA)

```
+3.3V ──── VCC (Pin 8)  MAX706
GND   ──── GND (Pin 4)  MAX706

STM32 GPIO (PD11) ──── WDI (Pin 6)  MAX706   (pulso cada <1.6s)
MAX706 /RESET     ──── NRST STM32             (reset si no hay pulso)
MAX706 /WDO       ──── GPIO STM32 (PD10)      (monitoreo)

[C13 100nF] entre VCC y GND del MAX706
```

---

## LEDs de Estado

```
+3.3V ──[R2 330Ω]──[LED1 Verde]──── PD12 STM32   (RUN)
+3.3V ──[R3 330Ω]──[LED2 Rojo] ──── PD13 STM32   (ERROR)
+3.3V ──[R4 330Ω]──[LED3 Amari]──── PD14 STM32   (COM)
+3.3V ──[R5 330Ω]──[LED4 Azul] ──── PD15 STM32   (PROG)
```

---

## Conector de Programación SWD

```
J1 — Conector SWD (2x5, 1.27mm pitch, Tag-Connect o IDC)

Pin 1: VCC (+3.3V)
Pin 2: SWDIO (PA13)
Pin 3: GND
Pin 4: SWDCLK (PA14)
Pin 5: GND
Pin 6: NC
Pin 7: NC (SWO — PB3, opcional)
Pin 8: NC
Pin 9: NC
Pin 10: /RESET (NRST)
```

---

## Conector USB (Mini-USB tipo B)

```
USB Conector ──── D-  ──[R6 22Ω]──── PA11 STM32 (USB_DM)
             ──── D+  ──[R7 22Ω]──── PA12 STM32 (USB_DP)
             ──── VBUS ──[R8 1MΩ]──── PA9 STM32 (detección VBUS)
             ──── GND ──── GND

+3.3V ──[R9 1.5kΩ]──── PA12 (pull-up USB FS)
ESD: USBLC6-2SC6 entre D+/D- y GND
```

---

## Conector Bus de Expansión (IDC 20 pines)

```
J2 — Bus Expansión (IDC-20, 2.54mm)

Pin  1: +5V (alimentación módulos)
Pin  2: GND
Pin  3: +3.3V
Pin  4: GND
Pin  5: SPI2_SCK  (PB13)
Pin  6: SPI2_MOSI (PB15)
Pin  7: SPI2_MISO (PB14)
Pin  8: GND
Pin  9: CS_MOD1   (PE0)
Pin 10: CS_MOD2   (PE1)
Pin 11: CS_MOD3   (PE2)
Pin 12: CS_MOD4   (PE3)
Pin 13: CS_MOD5   (PE4)
Pin 14: CS_MOD6   (PE5)
Pin 15: CS_MOD7   (PE6)
Pin 16: CS_MOD8   (PE7)
Pin 17: INT_EXP   (PD0)  — Interrupción módulos
Pin 18: MOD_RST   (PD1)  — Reset módulos
Pin 19: ID0       (PD2)  — Identificación módulo
Pin 20: GND
```

---

## Notas de Diseño PCB para CPU

1. **Desacoplamiento**: Colocar condensadores 100nF lo más cerca posible de cada pin VDD/VDDA
2. **Cristal HSE**: Pistas < 10mm, sin vías debajo del cristal, plano de tierra completo
3. **Cristal RTC**: Aislar del resto del circuito, pistas cortas
4. **USB**: Pistas diferenciales D+/D- de 90Ω, longitud igual, sin vías
5. **SWD**: Accesible desde el exterior del gabinete (conector en panel frontal)
6. **Plano de tierra**: Capa 2 completa, sin cortes bajo el CPU
7. **Separación**: Mantener zona libre de 3mm alrededor del cristal HSE
