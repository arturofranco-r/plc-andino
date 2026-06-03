# Guía de Layout PCB — ColPLC v1.0

## 1. Especificaciones Generales del PCB

| Parámetro | Valor |
|-----------|-------|
| Dimensiones | 160mm × 100mm |
| Capas | 4 capas |
| Material | FR4, Tg 150°C |
| Espesor | 1.6mm |
| Acabado superficial | HASL sin plomo (o ENIG para producción) |
| Espesor cobre | 35µm (1oz) capas externas, 17.5µm internas |
| Tamaño mínimo pista | 0.2mm (señal), 0.5mm (alimentación) |
| Espacio mínimo | 0.2mm |
| Tamaño mínimo via | 0.3mm taladro, 0.6mm pad |
| Serigrafía | Ambas caras |
| Máscara soldadura | Verde (o azul para diferenciación) |

---

## 2. Stack de Capas (4 capas)

```
┌─────────────────────────────────────────────────────┐
│  CAPA 1 (TOP)    — Señales + Componentes SMD        │
│  Pistas de señal, componentes, pads                 │
├─────────────────────────────────────────────────────┤
│  CAPA 2 (GND)    — Plano de Tierra Sólido           │
│  Plano GND continuo (sin cortes excepto vías)       │
├─────────────────────────────────────────────────────┤
│  CAPA 3 (PWR)    — Planos de Alimentación           │
│  Plano +3.3V (zona CPU) / +5V (zona relés)          │
├─────────────────────────────────────────────────────┤
│  CAPA 4 (BOTTOM) — Señales secundarias              │
│  Pistas de señal adicionales, componentes THT       │
└─────────────────────────────────────────────────────┘
```

---

## 3. Zonificación del PCB

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PCB ColPLC v1.0 — 160mm × 100mm                  │
│                                                                     │
│  ┌──────────────┐  ┌──────────────────────────────────────────┐    │
│  │   ZONA       │  │              ZONA CPU                    │    │
│  │ ALIMENTACIÓN │  │                                          │    │
│  │              │  │  [STM32F407]  [W25Q64]  [MAX706]        │    │
│  │  [LM2596]    │  │  [Cristal]    [RTC]     [LEDs]          │    │
│  │  [AMS1117]   │  │                                          │    │
│  │  [Fusible]   │  │  ┌──────────────────────────────────┐   │    │
│  │  [MOV/TVS]   │  │  │     ZONA COMUNICACIONES          │   │    │
│  │              │  │  │  [MAX485]  [USB]  [W5500*]       │   │    │
│  └──────────────┘  │  └──────────────────────────────────┘   │    │
│                    └──────────────────────────────────────────┘    │
│                                                                     │
│  ═══════════════ BARRERA DE AISLAMIENTO (6mm) ═══════════════════  │
│                                                                     │
│  ┌──────────────────────────────┐  ┌──────────────────────────┐   │
│  │    ZONA ENTRADAS DIGITALES   │  │   ZONA SALIDAS RELÉ      │   │
│  │                              │  │                          │   │
│  │  [PC817 ×12]                 │  │  [ULN2803A]              │   │
│  │  [TVS ×12]                   │  │  [Relés K1-K8]           │   │
│  │  [LEDs verdes ×12]           │  │  [LEDs rojos ×8]         │   │
│  │                              │  │  [Diodos flyback ×8]     │   │
│  │  [Borneras DI1-DI12]         │  │  [Borneras DO1-DO8]      │   │
│  └──────────────────────────────┘  └──────────────────────────┘   │
│                                                                     │
│  [J_PWR]  [J_RS485]  [J_USB]  [J_EXP]  [J_SWD]                   │
│  (Conectores en borde inferior del PCB)                            │
└─────────────────────────────────────────────────────────────────────┘

Leyenda:
  * Módulo opcional
  ═══ Barrera de aislamiento (ranura o espacio libre)
```

---

## 4. Reglas de Enrutamiento por Zona

### Zona CPU (señales digitales 3.3V):
```
Ancho pistas señal:    0.2mm mínimo, 0.3mm recomendado
Ancho pistas SPI:      0.3mm, longitudes iguales (±5mm)
Ancho pistas USB:      0.3mm, par diferencial 90Ω
Espacio entre pistas:  0.2mm mínimo
Vías señal:            0.3mm taladro, 0.6mm pad
Plano de tierra:       Capa 2 sólida
```

### Zona Alimentación:
```
Pistas 24V entrada:    3.0mm (hasta 2A)
Pistas 5V:             2.0mm (hasta 3A)
Pistas 3.3V:           1.0mm (hasta 1A)
Inductor LM2596:       Pistas cortas y anchas (mínimo 3mm)
Condensadores filtro:  Lo más cerca posible del regulador
```

### Zona Entradas Digitales (campo — 24V):
```
Pistas campo (24V):    1.0mm mínimo
Pistas CPU (3.3V):     0.3mm
Separación campo/CPU:  6mm mínimo (barrera de aislamiento)
Ranura PCB:            Considerar ranura 1mm bajo optoacopladores
```

### Zona Salidas Relé (campo — hasta 250VAC):
```
Pistas contactos relé: 2.0mm mínimo (10A)
Pistas bobina relé:    0.5mm (56mA)
Separación campo/CPU:  8mm mínimo
Creepage distance:     6mm mínimo (250VAC, categoría II)
Clearance:             3mm mínimo (250VAC)
```

---

## 5. Reglas de Aislamiento (IEC 60664-1)

```
Tensión de trabajo: 250VAC (zona relés)
Categoría de sobretensión: II
Grado de contaminación: 2

Distancias mínimas requeridas:
  Clearance (distancia en aire):    3.0mm
  Creepage (distancia superficial): 6.0mm

Implementación en PCB:
  1. Ranura de 1mm en PCB entre zona campo y zona CPU
  2. Espacio libre de 8mm en serigrafía y cobre
  3. Máscara de soldadura en toda la zona de aislamiento
  4. Sin pistas ni planos cruzando la barrera
```

---

## 6. Consideraciones para Componentes Específicos

### STM32F407VGT6 (LQFP-100):
```
- Pad térmico: No aplica (LQFP)
- Desacoplamiento: 100nF en cada pin VDD (mínimo 11 condensadores)
- Condensadores VCAP: 2.2µF en VCAP1 y VCAP2 (regulador interno)
- Cristal HSE: Zona libre de 3mm, sin pistas debajo
- Orientación: Pines de comunicación hacia conectores
```

### LM2596 (TO-263-5):
```
- Pad térmico: Soldar completamente al plano de cobre
- Inductor: Colocar a máximo 10mm del pin OUTPUT
- Diodo Schottky: Colocar a máximo 10mm del inductor
- Loop de conmutación: Minimizar área (VIN→LM2596→L1→D2→GND)
- Condensadores: Cerca de VIN y VOUT
```

### Relés HF115F (SIP-5):
```
- Footprint: 5 pines en línea, paso 5.08mm
- Zona libre: 3mm alrededor para ventilación
- Pistas de contacto: 2mm mínimo, cobre adicional en capa 4
- Borneras: Alineadas con el borde del PCB
```

### Optoacopladores PC817 (DIP-4):
```
- Orientación: LED hacia borneras de campo
- Ranura de aislamiento: Bajo el cuerpo del IC
- Pistas: No cruzar la barrera de aislamiento
```

---

## 7. Vías y Taladros

| Tipo | Taladro | Pad | Uso |
|------|---------|-----|-----|
| Via señal | 0.3mm | 0.6mm | Señales digitales |
| Via potencia | 0.5mm | 1.0mm | Alimentación |
| Via térmica | 0.3mm | 0.6mm | Disipación calor (array) |
| Taladro montaje | 3.2mm | 6.0mm | Tornillos M3 |
| Taladro bornera | 1.2mm | 2.5mm | Borneras THT |
| Taladro relé | 1.0mm | 2.0mm | Pines relé |

---

## 8. Serigrafía y Marcado

```
Elementos obligatorios en serigrafía:
  - Número de referencia de cada componente
  - Polaridad de condensadores electrolíticos (+)
  - Polaridad de diodos (banda cátodo)
  - Orientación de ICs (punto pin 1)
  - Número de canal en entradas y salidas (DI1-DI12, DO1-DO8)
  - Polaridad de borneras (+/-)
  - NA/NC/COM en borneras de relés
  - Versión del PCB y fecha
  - Logo ColPLC
  - Número de serie (espacio para etiqueta)

Texto mínimo: 1mm altura, 0.15mm grosor de línea
```

---

## 9. Archivos de Fabricación (Gerber)

```
Archivos requeridos para fabricación:
  - GTL: Capa superior (cobre)
  - GBL: Capa inferior (cobre)
  - G2L: Capa interna 2 (GND)
  - G3L: Capa interna 3 (PWR)
  - GTS: Máscara soldadura superior
  - GBS: Máscara soldadura inferior
  - GTO: Serigrafía superior
  - GBO: Serigrafía inferior
  - GKO: Contorno del PCB
  - DRL: Archivo de taladros (Excellon)
  - BOM: Lista de materiales
  - CPL: Posición de componentes (para pick & place)

Software recomendado: KiCad 7.x (libre y gratuito)
Fabricante recomendado Colombia: PCBWay, JLCPCB (importado)
                                 o fabricante local si disponible
```

---

## 10. Checklist Pre-fabricación

```
□ Verificar reglas DRC (Design Rule Check) sin errores
□ Verificar ERC (Electrical Rule Check) sin errores
□ Confirmar footprints contra datasheet de cada componente
□ Verificar distancias de aislamiento (clearance/creepage)
□ Confirmar orientación de todos los ICs polarizados
□ Verificar que todos los condensadores de desacoplamiento están colocados
□ Confirmar ancho de pistas de potencia
□ Verificar continuidad del plano de tierra (capa 2)
□ Confirmar dimensiones del PCB vs gabinete DIN
□ Verificar posición de taladros de montaje
□ Revisar serigrafía (texto legible, sin superposición)
□ Generar y revisar archivos Gerber en visor externo
□ Confirmar stack de capas con el fabricante
```
