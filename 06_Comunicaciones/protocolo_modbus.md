# Protocolo Modbus RTU — ColPLC v1.0

## 1. Configuración por Defecto

| Parámetro | Valor por defecto | Rango |
|-----------|------------------|-------|
| Dirección esclavo | 1 | 1 – 247 |
| Velocidad | 9600 bps | 1200 – 115200 bps |
| Bits de datos | 8 | 8 |
| Paridad | None | None / Even / Odd |
| Bits de parada | 1 | 1 / 2 |
| Modo | Esclavo | Esclavo / Maestro |
| Timeout respuesta | 1000 ms | 100 – 5000 ms |

---

## 2. Mapa Completo de Registros Modbus

### Coils (Función 01/05/0F) — Dirección base 0x0000

| Dirección | Nombre | Acceso | Descripción |
|-----------|--------|--------|-------------|
| 0x0000 | DI1 | R | Entrada digital 1 |
| 0x0001 | DI2 | R | Entrada digital 2 |
| 0x0002 | DI3 | R | Entrada digital 3 |
| 0x0003 | DI4 | R | Entrada digital 4 |
| 0x0004 | DI5 | R | Entrada digital 5 |
| 0x0005 | DI6 | R | Entrada digital 6 |
| 0x0006 | DI7 | R | Entrada digital 7 |
| 0x0007 | DI8 | R | Entrada digital 8 |
| 0x0008 | DI9 | R | Entrada digital 9 |
| 0x0009 | DI10 | R | Entrada digital 10 |
| 0x000A | DI11 | R | Entrada digital 11 |
| 0x000B | DI12 | R | Entrada digital 12 |
| 0x0064 | DO1 | R/W | Salida relé 1 |
| 0x0065 | DO2 | R/W | Salida relé 2 |
| 0x0066 | DO3 | R/W | Salida relé 3 |
| 0x0067 | DO4 | R/W | Salida relé 4 |
| 0x0068 | DO5 | R/W | Salida relé 5 |
| 0x0069 | DO6 | R/W | Salida relé 6 |
| 0x006A | DO7 | R/W | Salida relé 7 |
| 0x006B | DO8 | R/W | Salida relé 8 |
| 0x00C8 | M0 | R/W | Marca interna 0 |
| ... | ... | R/W | Marcas M1-M99 |
| 0x012B | M99 | R/W | Marca interna 99 |

### Holding Registers (Función 03/06/10) — Dirección base 0x0000

| Dirección | Nombre | Acceso | Descripción | Unidad |
|-----------|--------|--------|-------------|--------|
| 0x0000 | MODBUS_ADDR | R/W | Dirección Modbus del PLC | 1-247 |
| 0x0001 | BAUD_RATE | R/W | Velocidad: 0=9600, 1=19200, 2=38400, 3=115200 | — |
| 0x0002 | PLC_MODE | R/W | 0=STOP, 1=RUN, 2=RESET | — |
| 0x0003 | FW_VERSION | R | Versión firmware (ej: 0x0100 = v1.0) | — |
| 0x0004 | HW_VERSION | R | Versión hardware | — |
| 0x0005 | STATUS_WORD | R | Palabra de estado (ver bits abajo) | — |
| 0x0006 | SCAN_TIME | R | Tiempo de ciclo actual | ms |
| 0x0007 | SCAN_TIME_MAX | R | Tiempo de ciclo máximo | ms |
| 0x0008 | UPTIME_H | R | Tiempo encendido (horas) | h |
| 0x0009 | UPTIME_M | R | Tiempo encendido (minutos) | min |
| 0x000A | V_24V | R | Tensión entrada 24V × 100 | mV |
| 0x000B | V_5V | R | Tensión 5V × 100 | mV |
| 0x000C | TEMP_CPU | R | Temperatura CPU | °C |
| 0x000D | EXP_MODULES | R | Módulos de expansión detectados (bitmap) | — |
| 0x0064 | T0_PRESET | R/W | Preset temporizador T0 | ms |
| ... | ... | R/W | Presets T1-T99 | ms |
| 0x00C7 | T99_PRESET | R/W | Preset temporizador T99 | ms |
| 0x00C8 | T0_CURRENT | R | Valor actual temporizador T0 | ms |
| ... | ... | R | Valores actuales T1-T99 | ms |
| 0x012B | T99_CURRENT | R | Valor actual temporizador T99 | ms |
| 0x012C | C0_PRESET | R/W | Preset contador C0 | — |
| ... | ... | R/W | Presets C1-C99 | — |
| 0x018F | C99_PRESET | R/W | Preset contador C99 | — |
| 0x0190 | C0_CURRENT | R | Valor actual contador C0 | — |
| ... | ... | R | Valores actuales C1-C99 | — |
| 0x01F3 | C99_CURRENT | R | Valor actual contador C99 | — |

### Bits de STATUS_WORD (registro 0x0005)

| Bit | Nombre | Descripción |
|-----|--------|-------------|
| 0 | RUN | PLC en modo RUN |
| 1 | STOP | PLC en modo STOP |
| 2 | ERROR | Error en programa usuario |
| 3 | COMM_OK | Comunicación Modbus activa |
| 4 | WDG_OK | Watchdog OK |
| 5 | PROG_OK | Programa de usuario cargado |
| 6 | EXP_OK | Módulos de expansión OK |
| 7 | BATT_OK | Batería RTC OK |
| 8-15 | Reservado | — |

---

## 3. Ejemplos de Tramas Modbus RTU

### Leer estado de entradas DI1-DI12 (Función 02):
```
Petición (maestro → PLC):
  01 02 00 00 00 0C C0 09
  │  │  │──────│ │──────│ │──────│
  │  │  Dirección Cantidad  CRC
  │  Función 02
  Dirección esclavo 1

Respuesta (PLC → maestro):
  01 02 02 FF 0F 7A 8D
  │  │  │  │──────│ │──────│
  │  │  │  Datos   CRC
  │  │  2 bytes de datos
  │  Función 02
  Dirección esclavo 1

  Datos: 0xFF 0x0F = 0000 1111 1111 1111
  DI1-DI8 = 0xFF (todas activas)
  DI9-DI12 = 0x0F (todas activas)
```

### Activar salida DO1 (Función 05):
```
Petición:
  01 05 00 64 FF 00 CC 3B
  │  │  │──────│ │──────│ │──────│
  │  │  Dirección Valor   CRC
  │  Función 05
  Dirección esclavo 1

  Dirección 0x0064 = DO1
  Valor 0xFF00 = activar (0x0000 = desactivar)

Respuesta (eco de la petición):
  01 05 00 64 FF 00 CC 3B
```

### Leer tensión de alimentación (Función 03):
```
Petición:
  01 03 00 0A 00 01 A4 08
  │  │  │──────│ │──────│ │──────│
  │  │  Dirección Cantidad  CRC
  │  Función 03
  Dirección esclavo 1

  Dirección 0x000A = V_24V
  Cantidad 1 registro

Respuesta:
  01 03 02 09 60 B8 FA
  │  │  │  │──────│ │──────│
  │  │  │  Datos   CRC
  │  │  2 bytes
  │  Función 03
  Dirección esclavo 1

  Datos: 0x0960 = 2400 → 24.00V
```

---

## 4. Configuración de Red RS-485

```
Topología recomendada (bus lineal):

[Maestro SCADA]──────[PLC #1]──────[PLC #2]──────[PLC #n]
                                                      │
                                               [R 120Ω terminación]

Reglas:
  - Máximo 32 dispositivos por segmento (sin repetidor)
  - Longitud máxima: 1200m a 9600 bps
  - Cable: Par trenzado apantallado (Belden 9841 o similar)
  - Terminación: 120Ω en ambos extremos del bus
  - Bias: Resistencias de polarización en el maestro
  - Apantallamiento: Conectar a tierra en un solo punto
```

---

## 5. Software de Configuración y Monitoreo

| Software | Plataforma | Uso | Costo |
|----------|-----------|-----|-------|
| Modbus Poll | Windows | Maestro Modbus para pruebas | $129 USD |
| QModMaster | Windows/Linux | Maestro Modbus libre | Gratis |
| ScadaBR | Windows/Linux | SCADA completo | Gratis |
| Ignition (trial) | Windows/Linux | SCADA industrial | Trial gratis |
| Node-RED | Windows/Linux | Integración IoT | Gratis |
| OpenPLC Editor | Windows/Linux | Programación PLC | Gratis |
