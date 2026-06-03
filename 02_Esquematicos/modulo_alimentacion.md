# Esquemático — Módulo de Alimentación

## Descripción
Fuente de alimentación industrial para el ColPLC.
Entrada: 24VDC ±20% (19.2V – 28.8V)
Salidas: +5VDC/3A (relés y lógica) y +3.3VDC/1A (CPU y comunicaciones)
Protección completa contra transitorios, inversión de polaridad y sobrecarga.

---

## Diagrama de Bloques de Alimentación

```
24VDC ENTRADA
     │
    [F1] Fusible 2A/32V (reemplazable)
     │
    [D1] Diodo inversión polaridad (P600M, 6A)
     │
    [MOV1] Varistor 39V (S20K39)
     │
    [TVS1] TVS Bidireccional 33V (P6SMB33CA)
     │
    [C1] 470µF/50V (filtro entrada)
     │
    ├──────────────────────────────────────────────────────────┐
    │                                                          │
    ▼                                                          │
[LM2596-5.0]                                              24V_RAW
Buck Converter 5V/3A                                     (para uso futuro)
    │
   [L1] Inductor 100µH/3A
    │
   [D2] Schottky 1N5822 (3A/40V)
    │
   [C2] 470µF/16V (filtro salida 5V)
    │
   +5V ──────────────────────────────────────────────────────────
    │                                                            │
    │                                                     [Relés K1-K8]
    │                                                     [ULN2803A]
    │                                                     [LEDs salidas]
    ▼
[AMS1117-3.3]
LDO Regulador 3.3V/1A
    │
   [C3] 10µF/16V (entrada LDO)
   [C4] 10µF/16V (salida LDO)
   [C5] 100nF    (desacoplamiento)
    │
   +3.3V ──────────────────────────────────────────────────────
                                                               │
                                                        [STM32F407]
                                                        [W25Q64]
                                                        [MAX706]
                                                        [RS-485 IC]
                                                        [LEDs CPU]
```

---

## Circuito Detallado — Etapa de Entrada y Protección

```
J_PWR (Bornera 2 pines, paso 7.62mm):
  Pin 1: +24VDC
  Pin 2: GND

+24V ──[F1 2A/32V]──[D1 P600M]──┬──[MOV1 S20K39]──GND
                                 │
                                [TVS1 P6SMB33CA]
                                 │
                                GND
                                 │
                                [C1 470µF/50V]──GND
                                 │
                               +24V_FILT (alimentación al LM2596)

Nota: D1 P600M protege contra inversión de polaridad
      MOV1 absorbe transitorios de red (picos de 1kV típico)
      TVS1 limita tensión máxima a 33V
      C1 filtra ripple de la fuente de alimentación externa
```

---

## Circuito LM2596-5.0 (Buck 5V/3A)

```
+24V_FILT ──── VIN (Pin 1) LM2596-5.0
               │
              [C6 100nF] ──── GND  (desacoplamiento VIN)
               │
          OUTPUT (Pin 2) ──[L1 100µH/3A]──┬──── +5V
                                          │
                                         [D2 1N5822]──GND
                                          │
                                         [C2 470µF/16V]──GND
                                          │
                                         [C7 100nF]──GND

          FEEDBACK (Pin 4) ──── +5V  (versión fija 5V)
          ON/OFF   (Pin 5) ──── GND  (siempre encendido)
          GND      (Pin 3) ──── GND

Frecuencia de conmutación: 150 kHz
Eficiencia típica: 77% a 24V entrada, 5V/3A salida
Potencia disipada: (24V × 3A) × (1 - 0.77) = 1.66W (en L1 y D2)
```

---

## Circuito AMS1117-3.3 (LDO 3.3V/1A)

```
+5V ──[C3 10µF/16V]──┬──── VIN (Pin 3) AMS1117-3.3
                     │
                    GND
                     │
               VOUT (Pin 2) ──┬──── +3.3V
                              │
                             [C4 10µF/16V]──GND
                             [C5 100nF]──GND

               GND  (Pin 1) ──── GND

Caída de tensión: 5V - 3.3V = 1.7V
Corriente máxima: 1A
Potencia disipada: 1.7V × 1A = 1.7W → Requiere disipador pequeño
Temperatura de unión: Tj = Ta + (Pd × θja) = 60 + (1.7 × 43) = 133°C
Nota: Usar AMS1117 en encapsulado SOT-223 con pad térmico soldado
```

---

## Monitoreo de Tensiones

```
Divisor resistivo para monitoreo por ADC del STM32:

+24V_FILT ──[R_MON1 100kΩ]──┬──[R_MON2 10kΩ]──GND
                             │
                            [C_MON 100nF]──GND
                             │
                          ADC_24V (PA0 STM32, rango 0-3.3V)

Escala: 24V → 3.3V × (10k/(100k+10k)) = 3.0V ✓
Resolución: 24V / 4096 = 5.86 mV/bit

+5V ──[R_MON3 10kΩ]──┬──[R_MON4 10kΩ]──GND
                     │
                  ADC_5V (PA1 STM32)

Escala: 5V → 2.5V (dentro del rango ADC) ✓
```

---

## Conector de Alimentación

```
J_PWR — Bornera principal (paso 7.62mm, 2 pines):
  Pin 1: +24VDC (marcado con +)
  Pin 2: GND    (marcado con -)

Capacidad: 16A (suficiente para 2A fusible)
Material: Nylon PA66, resistente a 105°C
Tornillo: M3, par de apriete 0.5 Nm
```

---

## Indicadores de Alimentación

```
+5V ──[R_LED1 1kΩ]──[LED Verde "PWR"]──GND
  (LED siempre encendido cuando hay alimentación)

+3.3V ──[R_LED2 1kΩ]──[LED Verde "3V3"]──GND
  (LED siempre encendido cuando 3.3V está OK)
```

---

## Lista de Componentes — Alimentación

| Ref | Componente | Valor/Modelo | Descripción |
|-----|-----------|--------------|-------------|
| F1 | Fusible | 2A/32V (5×20mm) | Protección entrada |
| D1 | Diodo | P600M (6A/1000V) | Inversión polaridad |
| MOV1 | Varistor | S20K39 | Protección transitorios |
| TVS1 | TVS | P6SMB33CA | Limitador tensión 33V |
| C1 | Electrolítico | 470µF/50V | Filtro entrada |
| U_BUCK | Regulador | LM2596-5.0 | Buck 5V/3A |
| L1 | Inductor | 100µH/3A | Inductor buck |
| D2 | Schottky | 1N5822 (3A/40V) | Rectificador buck |
| C2 | Electrolítico | 470µF/16V | Filtro salida 5V |
| C6,C7 | Cerámico | 100nF/50V | Desacoplamiento |
| U_LDO | Regulador | AMS1117-3.3 | LDO 3.3V/1A |
| C3,C4 | Electrolítico | 10µF/16V | Filtro LDO |
| C5 | Cerámico | 100nF/50V | Desacoplamiento LDO |
| R_MON1 | Resistencia | 100kΩ 1% | Divisor monitoreo 24V |
| R_MON2 | Resistencia | 10kΩ 1% | Divisor monitoreo 24V |
| R_MON3,4 | Resistencia | 10kΩ 1% | Divisor monitoreo 5V |
| LED_PWR | LED | Verde 3mm | Indicador alimentación |

---

## Notas de Diseño PCB — Alimentación

1. **Pistas de potencia**: Mínimo 3mm para pistas de 3A (5V), 1.5mm para 1A (3.3V)
2. **Inductor L1**: Colocar cerca del LM2596, pistas cortas y anchas
3. **Condensadores de filtro**: Lo más cerca posible de los reguladores
4. **Disipador AMS1117**: Pad térmico SOT-223 soldado completamente al plano de cobre
5. **Separación**: Zona de alta tensión (24V) separada de zona de baja tensión (3.3V)
6. **Fusible**: Accesible desde el exterior para reemplazo sin desmontar el PLC
7. **Bornera de entrada**: Usar bornera robusta con tornillo, mínimo 16A
8. **Plano de tierra**: Plano de tierra sólido en capa 2, sin cortes en zona de alimentación
