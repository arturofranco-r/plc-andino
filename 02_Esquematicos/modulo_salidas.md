# Esquemático — Módulo de Salidas a Relé (8 canales)

## Descripción
8 salidas a relé con contacto SPDT (NA, NC, COM).
Driver ULN2803A para manejo desde GPIO 3.3V del STM32.
Protección flyback, indicación LED y fusible por canal.

---

## Circuito Completo — Canal DO1 (repetir para DO2 a DO8)

```
LADO CPU:
STM32 GPIO (PC0) ──[R1 1kΩ]──── IN1 ULN2803A (Pin 1)
                                      │
                               OUT1 ULN2803A (Pin 18)
                                      │
                              [Bobina Relé K1] ──── +5V
                                      │
                              [D1 1N4007 flyback]
                                      │
                                     GND

RELÉ K1 (HF115F-H-005-1ZS1):
  Bobina: 5VDC, 89.3Ω, 56mA
  Contacto SPDT: 10A/250VAC

BORNERAS CAMPO (J4):
  COM ──── Terminal común relé K1
  NA  ──── Contacto normalmente abierto
  NC  ──── Contacto normalmente cerrado

LED indicador:
+3.3V ──[R2 330Ω]──[LED Rojo]──── GPIO PC0 (activo alto)
```

---

## Esquema ULN2803A (8 canales en un IC)

```
STM32 GPIO:                    ULN2803A                    Relés:
                          ┌─────────────────┐
PC0 ──[R 1kΩ]──────────── IN1 (1)   OUT1 (18) ──── Bobina K1 ──+5V
PC1 ──[R 1kΩ]──────────── IN2 (2)   OUT2 (17) ──── Bobina K2 ──+5V
PC2 ──[R 1kΩ]──────────── IN3 (3)   OUT3 (16) ──── Bobina K3 ──+5V
PC3 ──[R 1kΩ]──────────── IN4 (4)   OUT4 (15) ──── Bobina K4 ──+5V
PC4 ──[R 1kΩ]──────────── IN5 (5)   OUT5 (14) ──── Bobina K5 ──+5V
PC5 ──[R 1kΩ]──────────── IN6 (6)   OUT6 (13) ──── Bobina K6 ──+5V
PC6 ──[R 1kΩ]──────────── IN7 (7)   OUT7 (12) ──── Bobina K7 ──+5V
PC7 ──[R 1kΩ]──────────── IN8 (8)   OUT8 (11) ──── Bobina K8 ──+5V
                          │                  │
GND ──────────────────── COM (9)   COM (10) ──── GND
                          └─────────────────┘

Nota: Pin COM (10) es el pin de supresión de flyback interno del ULN2803A
      Conectar a +5V para usar diodos flyback internos del IC
      O usar diodos externos 1N4007 para mayor robustez
```

---

## Esquema Completo 8 Canales — Borneras

```
                    BORNERAS CAMPO (J4)
                    ┌─────────────────┐
DO1 COM ───────────┤  1  COM1        ├──── Común relé K1
DO1 NA  ───────────┤  2  NA1         ├──── Normalmente Abierto K1
DO1 NC  ───────────┤  3  NC1         ├──── Normalmente Cerrado K1
                   ├─────────────────┤
DO2 COM ───────────┤  4  COM2        ├──── Común relé K2
DO2 NA  ───────────┤  5  NA2         ├──── Normalmente Abierto K2
DO2 NC  ───────────┤  6  NC2         ├──── Normalmente Cerrado K2
                   ├─────────────────┤
DO3 COM ───────────┤  7  COM3        ├──── Común relé K3
DO3 NA  ───────────┤  8  NA3         ├──── Normalmente Abierto K3
DO3 NC  ───────────┤  9  NC3         ├──── Normalmente Cerrado K3
                   ├─────────────────┤
DO4 COM ───────────┤ 10  COM4        ├──── Común relé K4
DO4 NA  ───────────┤ 11  NA4         ├──── Normalmente Abierto K4
DO4 NC  ───────────┤ 12  NC4         ├──── Normalmente Cerrado K4
                   ├─────────────────┤
DO5 COM ───────────┤ 13  COM5        ├──── Común relé K5
DO5 NA  ───────────┤ 14  NA5         ├──── Normalmente Abierto K5
DO5 NC  ───────────┤ 15  NC5         ├──── Normalmente Cerrado K5
                   ├─────────────────┤
DO6 COM ───────────┤ 16  COM6        ├──── Común relé K6
DO6 NA  ───────────┤ 17  NA6         ├──── Normalmente Abierto K6
DO6 NC  ───────────┤ 18  NC6         ├──── Normalmente Cerrado K6
                   ├─────────────────┤
DO7 COM ───────────┤ 19  COM7        ├──── Común relé K7
DO7 NA  ───────────┤ 20  NA7         ├──── Normalmente Abierto K7
DO7 NC  ───────────┤ 21  NC7         ├──── Normalmente Cerrado K7
                   ├─────────────────┤
DO8 COM ───────────┤ 22  COM8        ├──── Común relé K8
DO8 NA  ───────────┤ 23  NA8         ├──── Normalmente Abierto K8
DO8 NC  ───────────┤ 24  NC8         ├──── Normalmente Cerrado K8
                   └─────────────────┘
                   Bornera Phoenix
                   MSTB 2.5/24-ST
                   Paso 5.08mm
```

---

## Lista de Componentes

| Ref | Componente | Valor/Modelo | Cantidad | Descripción |
|-----|-----------|--------------|----------|-------------|
| K1-K8 | Relé | HF115F-H-005-1ZS1 | 8 | SPDT 5VDC, 10A/250VAC |
| U2 | Driver | ULN2803ADWR | 1 | Darlington array 8 canales |
| D1-D8 | Diodo | 1N4007 | 8 | Flyback protección bobina |
| R1-R8 | Resistencia | 1kΩ 1/4W | 8 | Limitador base Darlington |
| R9-R16 | Resistencia | 330Ω 1/4W | 8 | Limitador LED indicador |
| LED1-8 | LED | Rojo 3mm | 8 | Indicador estado salida |
| C1 | Condensador | 100µF/16V | 1 | Filtro +5V para relés |
| C2 | Condensador | 100nF | 1 | Desacoplamiento ULN2803 |
| J4 | Bornera | MSTB 2.5/24-ST | 1 | Conexión campo 24 pines |

---

## Especificaciones del Relé HF115F-H-005-1ZS1

```
Fabricante: Hongfa (disponible en Colombia)
Alternativa: SRD-05VDC-SL-C (Songle) — más económico

Parámetros eléctricos:
  Tensión bobina:     5 VDC
  Resistencia bobina: 89.3 Ω
  Corriente bobina:   56 mA
  Potencia bobina:    280 mW

Contactos:
  Configuración:      SPDT (1 Form C)
  Capacidad AC:       10A / 250VAC
  Capacidad DC:       10A / 30VDC
  Tensión máx. AC:    400VAC
  Corriente máx.:     15A (pico)

Mecánico:
  Vida mecánica:      10 × 10⁶ operaciones
  Vida eléctrica:     1 × 10⁵ operaciones (carga nominal)
  Temperatura:        -40°C a +85°C
  Montaje:            PCB through-hole
```

---

## Cálculo de Potencia Disipada

```
Por relé activado:
  P_bobina = V² / R = 5² / 89.3 = 280 mW

8 relés activados simultáneamente:
  P_total = 8 × 280mW = 2.24 W

Temperatura de la PCB con 8 relés activos:
  Considerar ventilación adecuada en gabinete
  Temperatura máxima PCB: +85°C (dentro de especificación)
```

---

## Protección de Contactos (Snubber RC)

Para cargas inductivas (motores, solenoides):
```
Entre COM y NA de cada relé:
  [R_snubber 100Ω 1W] en serie con [C_snubber 100nF/630V]

Esto reduce el arco en los contactos y aumenta la vida útil
cuando se conmutan cargas inductivas AC.
```

---

## Notas de Diseño PCB

1. **Separación**: Mínimo 8mm entre pistas de campo (alta tensión) y pistas de CPU
2. **Ranura PCB**: Considerar ranura de aislamiento entre zona de relés y zona CPU
3. **Pistas de potencia**: Mínimo 2mm de ancho para pistas de contactos (10A)
4. **Plano de tierra**: No compartir plano de tierra entre zona de relés y CPU
5. **Montaje relés**: Usar relés con pines de montaje mecánico (no solo soldadura)
6. **Disipación**: Dejar espacio libre alrededor de los relés para ventilación
7. **Borneras**: Paso 5.08mm mínimo para cables de potencia (hasta 2.5mm²)
8. **Marcado**: Serigrafiar NA/NC/COM claramente en cada canal
