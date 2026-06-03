# Diseño Mecánico — Gabinete DIN ColPLC v1.0

## 1. Dimensiones del Módulo Base

```
Vista Frontal:
┌─────────────────────────────────────────────────────────────────┐
│  ColPLC v1.0                                    ● RUN  ● ERR   │  ← 90mm alto
│                                                 ● COM  ● PRG   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ DI  1  2  3  4  5  6  7  8  9  10 11 12                 │  │
│  │    ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ DO  1  2  3  4  5  6  7  8                               │  │
│  │    ●  ●  ●  ●  ●  ●  ●  ●                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [RS485] [USB] [24V+] [24V-]              [EXP ▶]             │
└─────────────────────────────────────────────────────────────────┘
←──────────────────── 105mm ancho ────────────────────────────────→

Vista Lateral:
┌──────────────────────────────────────────────────────────────┐
│                                                              │  ← 65mm profundidad
│  [Clip DIN]                                                  │
└──────────────────────────────────────────────────────────────┘

Equivalencia en módulos DIN: 6 módulos (6 × 17.5mm = 105mm)
```

---

## 2. Distribución de Conectores en Panel Frontal

```
Panel frontal (vista desde el frente):

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ZONA SUPERIOR — Indicadores LED                               │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ● RUN (verde)    ● ERR (rojo)                          │  │
│  │  ● COM (amarillo) ● PRG (azul)                          │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ZONA MEDIA SUPERIOR — Entradas Digitales                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  DI1  DI2  DI3  DI4  DI5  DI6  DI7  DI8  DI9 DI10 DI11 DI12│
│  │  ●    ●    ●    ●    ●    ●    ●    ●    ●   ●    ●    ●  │
│  │  [+][-][+][-][+][-][+][-][+][-][+][-][+][-][+][-]...      │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ZONA MEDIA INFERIOR — Salidas a Relé                          │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  DO1    DO2    DO3    DO4    DO5    DO6    DO7    DO8    │  │
│  │  ●      ●      ●      ●      ●      ●      ●      ●    │  │
│  │ [C][A][N][C][A][N][C][A][N][C][A][N][C][A][N][C][A][N] │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ZONA INFERIOR — Comunicaciones y Alimentación                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  [RS485/DB9]  [USB]  [24V+]  [24V-]  [FUSE]  [EXP▶]   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Leyenda borneras:
  [+][-] = Par de borneras entrada digital (+ y -)
  [C][A][N] = COM, NA (Normalmente Abierto), NC (Normalmente Cerrado)
```

---

## 3. Montaje en Riel DIN

```
Vista de perfil — Montaje en riel DIN 35mm:

        ┌──────────────────────────────────────────┐
        │           ColPLC v1.0                    │
        │                                          │
        │  ┌────────────────────────────────────┐  │
        │  │           PCB Principal            │  │
        │  └────────────────────────────────────┘  │
        │                                          │
        └──────────────────────────────────────────┘
                    │              │
               ┌────┘              └────┐
               │   Clip DIN superior   │
               │   ┌──────────────┐    │
               │   │  Riel DIN    │    │
               │   │  35mm        │    │
               │   └──────────────┘    │
               │   Clip DIN inferior   │
               └───────────────────────┘

Clips DIN:
  - Superior: Fijo (soldado al PCB o atornillado a carcasa)
  - Inferior: Con resorte para montaje/desmontaje sin herramienta
  - Material: Acero inoxidable o zamak
  - Norma: EN 60715 (riel DIN 35mm × 7.5mm)
```

---

## 4. Carcasa Recomendada

### Opción 1 — Carcasa Comercial (Bopla):
```
Modelo: Bopla Bocube B 106009 GR
  - Ancho: 105mm (6 módulos DIN)
  - Alto: 90mm
  - Profundidad: 65mm
  - Material: ABS V0 (autoextinguible)
  - Color: Gris RAL 7035
  - Clip DIN: Integrado
  - Ventanas LED: Incluidas
  - Precio aprox: $12-15 USD
  - Disponible: RS Components, Mouser

Alternativa económica: Gainta G203C
  - Dimensiones similares
  - Precio aprox: $6-8 USD
```

### Opción 2 — Carcasa Impresa en 3D (para prototipos):
```
Material: PETG o ABS (resistencia temperatura)
Espesor paredes: 2mm mínimo
Acabado: Pintura gris RAL 7035 (opcional)
Ventajas: Personalizable, económico para prototipos
Desventajas: No certificable para producción industrial

Archivo STL: Diseñar en FreeCAD o Fusion 360
Dimensiones internas: 100mm × 85mm × 60mm
```

---

## 5. Etiquetado y Serigrafía

```
Etiqueta frontal (impresión UV o serigrafía):

┌─────────────────────────────────────────────────────────────────┐
│  ColPLC v1.0                              [LOGO EMPRESA]        │
│  PLC Industrial Colombiano                                      │
│                                                                 │
│  ENTRADAS DIGITALES 24VDC                                       │
│  DI1  DI2  DI3  DI4  DI5  DI6  DI7  DI8  DI9  DI10 DI11 DI12 │
│                                                                 │
│  SALIDAS A RELÉ 10A/250VAC                                      │
│  DO1    DO2    DO3    DO4    DO5    DO6    DO7    DO8           │
│  COM NA NC                                                      │
│                                                                 │
│  ALIMENTACIÓN: 24VDC ±20%    FUSIBLE: 2A                       │
│  RS-485: Modbus RTU          USB: Programación                  │
│                                                                 │
│  Fabricado en Colombia  │  S/N: ___________  │  Rev: 1.0       │
└─────────────────────────────────────────────────────────────────┘

Información de placa (lateral o posterior):
  - Tensión de alimentación: 24VDC ±20%
  - Consumo máximo: 1.5A
  - Temperatura: -10°C a +60°C
  - Grado protección: IP20
  - Norma: IEC 61131-2
  - Número de serie
  - Fecha de fabricación
  - Marca RETIE (cuando aplique)
```

---

## 6. Expansión Mecánica

```
Módulos de expansión (mismo formato DIN):

Módulo base (6 módulos DIN = 105mm)
    │
    ├── Módulo EXP-8DI  (2 módulos DIN = 35mm)
    ├── Módulo EXP-8DO  (2 módulos DIN = 35mm)
    ├── Módulo EXP-4AI  (2 módulos DIN = 35mm)
    └── Módulo EXP-ETH  (2 módulos DIN = 35mm)

Conexión mecánica entre módulos:
  - Conector lateral IDC-20 (bus de expansión)
  - Guía de alineación plástica
  - Sin tornillos (conexión por presión)

Longitud total máxima (base + 8 módulos):
  105mm + (8 × 35mm) = 385mm en riel DIN
```

---

## 7. Consideraciones de Instalación

```
Orientación de montaje:
  ✓ Vertical (recomendado) — mejor ventilación natural
  ✓ Horizontal — aceptable
  ✗ Invertido — no recomendado (calor acumulado)

Espacio libre requerido:
  - Superior: 25mm mínimo (ventilación)
  - Inferior: 25mm mínimo (ventilación)
  - Lateral: 10mm mínimo

Temperatura ambiente máxima: +60°C
  (Con ventilación forzada puede extenderse a +70°C)

Distancia a fuentes de calor:
  - Mínimo 50mm de transformadores o resistencias de potencia
  - Mínimo 100mm de variadores de frecuencia (EMI)

Cableado:
  - Cables de campo (24V, señales): Máximo 2.5mm²
  - Cables de potencia (relés): Máximo 2.5mm²
  - Separar cables de señal de cables de potencia
  - Usar canaleta separada para cables de campo y de control
```
