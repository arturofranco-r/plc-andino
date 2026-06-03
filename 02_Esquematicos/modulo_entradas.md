# Esquemático — Módulo de Entradas Digitales (12 canales)

## Descripción
12 entradas digitales optoacopladas para señales 24VDC industriales.
Compatibles con sensores PNP y NPN mediante jumper de configuración.
Protección contra transitorios, inversión de polaridad y cortocircuito.

---

## Circuito Completo — Canal DI1 (repetir para DI2 a DI12)

```
BORNERA CAMPO
    │
    ├── [+] Terminal positivo entrada
    │         │
    │        [F1] Fusible PTC 100mA (autorecuperable)
    │         │
    │        [D1] TVS Unidireccional P6KE30A (30V, 600W)
    │         │
    │        [R1] 3.3 kΩ 1/4W (limitador de corriente)
    │         │
    │    ┌────┴────┐
    │    │ PC817C  │  Optoacoplador
    │    │  LED    │  CTR mínimo 100%
    │    │ Anodo   │
    │    └────┬────┘
    │         │
    │        [D2] 1N4148 (protección polaridad inversa)
    │         │
    └── [-] Terminal negativo entrada (COM)
              │
             GND_CAMPO (aislado de GND_CPU)

LADO CPU (salida del optoacoplador):
    │
    ├── Colector PC817 ──[R2 10kΩ]──+3.3V  (pull-up)
    │                      │
    │                      └──── GPIO STM32 (DI1 = PA0)
    │
    └── Emisor PC817 ──── GND_CPU

LED indicador:
+3.3V ──[R3 1kΩ]──[LED Verde]──── Colector PC817
(LED enciende cuando la entrada está activa)
```

---

## Configuración PNP / NPN (Jumper JP1 por canal)

### Modo PNP (sensor fuente corriente — más común en Colombia):
```
Sensor PNP:
  +24V ──── COM sensor
  Salida sensor ──── Terminal (+) entrada PLC
  GND ──── Terminal (-) entrada PLC

Jumper JP1: posición A (COM a GND_CAMPO)
```

### Modo NPN (sensor drena corriente):
```
Sensor NPN:
  +24V ──── Terminal (+) entrada PLC  
  Salida sensor ──── Terminal (-) entrada PLC
  GND ──── COM sensor

Jumper JP1: posición B (COM a +24V_CAMPO)
```

---

## Esquema Completo 12 Canales

```
                    BORNERAS CAMPO (J3)          LADO CPU
                    ┌─────────────┐
DI1  (+) ──────────┤ 1           ├──[F][TVS][R]──[PC817]──── PA0
DI1  (-) ──────────┤ 2           ├──────────────────────────  COM
                   ├─────────────┤
DI2  (+) ──────────┤ 3           ├──[F][TVS][R]──[PC817]──── PA1
DI2  (-) ──────────┤ 4           ├──────────────────────────  COM
                   ├─────────────┤
DI3  (+) ──────────┤ 5           ├──[F][TVS][R]──[PC817]──── PA2
DI3  (-) ──────────┤ 6           ├──────────────────────────  COM
                   ├─────────────┤
DI4  (+) ──────────┤ 7           ├──[F][TVS][R]──[PC817]──── PA3
DI4  (-) ──────────┤ 8           ├──────────────────────────  COM
                   ├─────────────┤
DI5  (+) ──────────┤ 9           ├──[F][TVS][R]──[PC817]──── PA4
DI5  (-) ──────────┤ 10          ├──────────────────────────  COM
                   ├─────────────┤
DI6  (+) ──────────┤ 11          ├──[F][TVS][R]──[PC817]──── PA5
DI6  (-) ──────────┤ 12          ├──────────────────────────  COM
                   ├─────────────┤
DI7  (+) ──────────┤ 13          ├──[F][TVS][R]──[PC817]──── PA6
DI7  (-) ──────────┤ 14          ├──────────────────────────  COM
                   ├─────────────┤
DI8  (+) ──────────┤ 15          ├──[F][TVS][R]──[PC817]──── PA7
DI8  (-) ──────────┤ 16          ├──────────────────────────  COM
                   ├─────────────┤
DI9  (+) ──────────┤ 17          ├──[F][TVS][R]──[PC817]──── PB0
DI9  (-) ──────────┤ 18          ├──────────────────────────  COM
                   ├─────────────┤
DI10 (+) ──────────┤ 19          ├──[F][TVS][R]──[PC817]──── PB1
DI10 (-) ──────────┤ 20          ├──────────────────────────  COM
                   ├─────────────┤
DI11 (+) ──────────┤ 21          ├──[F][TVS][R]──[PC817]──── PB2
DI11 (-) ──────────┤ 22          ├──────────────────────────  COM
                   ├─────────────┤
DI12 (+) ──────────┤ 23          ├──[F][TVS][R]──[PC817]──── PB3
DI12 (-) ──────────┤ 24          ├──────────────────────────  COM
                   └─────────────┘
                   Bornera Phoenix
                   MSTB 2.5/24-ST
                   Paso 5.08mm
```

---

## Lista de Componentes por Canal (×12)

| Ref | Componente | Valor/Modelo | Descripción |
|-----|-----------|--------------|-------------|
| F1 | Fusible PTC | MF-MSMF010-2 | 100mA autorecuperable |
| D1 | TVS | P6KE30A | Protección transitorios 30V |
| D2 | Diodo | 1N4148 | Protección polaridad inversa |
| R1 | Resistencia | 3.3kΩ 1/4W | Limitador corriente LED opto |
| R2 | Resistencia | 10kΩ 1/4W | Pull-up salida opto |
| R3 | Resistencia | 1kΩ 1/4W | Limitador LED indicador |
| U1 | Optoacoplador | PC817C | Aislamiento 5kV |
| LED1 | LED | Verde 3mm | Indicador estado entrada |

---

## Cálculo de Corriente por Entrada

```
Tensión entrada: 24V
Resistencia R1: 3.3kΩ
Caída LED PC817: ~1.2V
Caída D2: ~0.7V

I_LED = (24V - 1.2V - 0.7V) / 3300Ω = 6.7 mA ✓

Corriente mínima PC817 para CTR=100%: 1mA
Corriente de operación: 6.7mA → margen amplio ✓

Potencia R1: P = I² × R = (6.7mA)² × 3300 = 148mW → usar 1/4W ✓
```

---

## Filtro Anti-rebote Hardware

```
Después del optoacoplador, filtro RC en cada entrada GPIO:

GPIO STM32 ──[R4 1kΩ]──┬──── GPIO Pin
                        │
                       [C1 10nF]
                        │
                       GND

Constante de tiempo: τ = 1kΩ × 10nF = 10µs
Frecuencia de corte: fc = 1/(2π×τ) = 15.9 kHz
Tiempo de respuesta: ~50µs (suficiente para señales industriales)
```

---

## Notas de Diseño PCB

1. **Aislamiento**: Mantener separación mínima 6mm entre GND_CAMPO y GND_CPU
2. **Ranura de aislamiento**: Considerar ranura física en PCB bajo los optoacopladores
3. **Borneras**: Usar borneras con tornillo, paso 5.08mm, capacidad 2.5mm²
4. **Marcado**: Serigrafiar número de canal y polaridad en PCB
5. **LEDs**: Visibles desde el frente del gabinete DIN
6. **Fusibles PTC**: Accesibles para inspección (no requieren reemplazo)
7. **Agrupación**: Agrupar los 12 canales en 2 grupos de 6 para mejor distribución
