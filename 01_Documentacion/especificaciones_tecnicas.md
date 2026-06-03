# Especificaciones Técnicas — ColPLC v1.0

## 1. Módulo CPU

| Parámetro | Especificación |
|-----------|---------------|
| Microcontrolador | STM32F407VGT6 (ARM Cortex-M4, 168 MHz) |
| Memoria Flash | 1 MB interna + 8 MB SPI Flash externa (W25Q64) |
| RAM | 192 KB interna |
| RTC | Integrado con batería CR2032 de respaldo |
| Watchdog | IWDG + WWDG hardware |
| EEPROM emulada | En Flash interna (parámetros de usuario) |
| Debug | SWD (ST-Link v2) |

## 2. Entradas Digitales (12 canales)

| Parámetro | Especificación |
|-----------|---------------|
| Tensión nominal | 24 VDC |
| Rango aceptado | 18 – 30 VDC |
| Corriente por entrada | ~7 mA a 24V |
| Aislamiento | Optoacoplador PC817 (5 kV) |
| Tiempo de respuesta | < 1 ms (filtro hardware) |
| Indicación | LED verde por canal |
| Protección | Diodo TVS + resistencia limitadora |
| Conector | Bornera extraíble 3.5 mm paso |
| Tipo de señal | PNP / NPN seleccionable por jumper |

### Circuito por canal (entrada digital):
```
24VDC ──[R1 3.3kΩ]──[D1 TVS]──[Anodo PC817]──[Cátodo]── GND
                                      │
                               [Colector PC817]
                                      │
                               [R2 10kΩ pull-up 3.3V]
                                      │
                               GPIO STM32 (entrada)
```

## 3. Salidas a Relé (8 canales)

| Parámetro | Especificación |
|-----------|---------------|
| Tipo de relé | HF115F-H / SRD-05VDC-SL-C |
| Tensión bobina | 5 VDC |
| Contacto | SPDT (NA, NC, COM) |
| Capacidad contacto | 10A / 250VAC — 10A / 30VDC |
| Vida mecánica | 10 millones de operaciones |
| Vida eléctrica | 100.000 operaciones a carga nominal |
| Aislamiento bobina-contacto | 4 kV |
| Driver | ULN2803A (Darlington array) |
| Protección bobina | Diodo flyback 1N4007 |
| Indicación | LED rojo por canal |
| Conector | Bornera extraíble 5.08 mm paso |

### Circuito por canal (salida relé):
```
GPIO STM32 ──[R 1kΩ]──[Base ULN2803]
                              │
                         [Colector ULN2803]──[Bobina Relé]──[+5V]
                              │                    │
                             GND            [D flyback 1N4007]
```

## 4. Alimentación

| Parámetro | Especificación |
|-----------|---------------|
| Entrada | 24 VDC ±20% (19.2 – 28.8 V) |
| Protección entrada | Fusible 2A + diodo inversión polaridad |
| Regulador 5V | LM2596 (buck switching, 3A) |
| Regulador 3.3V | AMS1117-3.3 (LDO, 1A) |
| Filtrado | Condensadores electrolíticos + cerámicos |
| Protección transitorios | MOV 39V + TVS bidireccional |
| Consumo típico (base) | ~500 mA a 24V (sin carga en salidas) |
| Consumo máximo | ~1.5A a 24V (todas salidas activas) |

## 5. Comunicaciones

### Puerto base (integrado):
| Puerto | Interfaz | Protocolo | Conector |
|--------|----------|-----------|---------|
| COM1 | RS-485 | Modbus RTU Slave/Master | DB9 o bornera |
| USB | USB-CDC | Programación / Debug | Mini-USB |

### Puertos de expansión (opcionales):
| Puerto | Interfaz | Protocolo |
|--------|----------|-----------|
| COM2 | RS-232 | HMI / SCADA |
| ETH | Ethernet 10/100 | Modbus TCP / EtherNet/IP |
| CAN | CAN 2.0B | CANopen / DeviceNet |

## 6. Bus de Expansión E/S

| Parámetro | Especificación |
|-----------|---------------|
| Tipo de bus | SPI + señales de control |
| Velocidad | 10 MHz máximo |
| Módulos soportados | Hasta 8 módulos adicionales |
| Tipos de módulo | 8DI, 8DO relé, 8DO transistor, 4AI, 2AO |
| Conector expansión | IDC 20 pines o conector propietario |
| Distancia máxima | 30 cm (backplane) / 1 m (cable plano) |

## 7. Condiciones Ambientales

| Parámetro | Especificación |
|-----------|---------------|
| Temperatura operación | -10°C a +60°C |
| Temperatura almacenamiento | -25°C a +85°C |
| Humedad relativa | 5% – 95% sin condensación |
| Altitud | Hasta 3000 msnm (apto para Bogotá) |
| Grado de protección | IP20 (gabinete DIN) |
| Resistencia vibración | IEC 60068-2-6 |
| Resistencia golpes | IEC 60068-2-27 |

## 8. Características Mecánicas

| Parámetro | Especificación |
|-----------|---------------|
| Montaje | Riel DIN 35mm (EN 60715) |
| Ancho módulo base | 105 mm (6 módulos DIN) |
| Alto | 90 mm |
| Profundidad | 65 mm |
| Material carcasa | ABS V0 (autoextinguible) |
| Color | Gris RAL 7035 |
| Peso | ~350 g |

## 9. Normas y Certificaciones Objetivo

- IEC 61131-2: Requisitos y ensayos de equipos PLC
- IEC 61000-4-x: Compatibilidad electromagnética (EMC)
- RETIE (Colombia): Reglamento Técnico de Instalaciones Eléctricas
- ICONTEC NTC 2050: Código Eléctrico Colombiano
- CE (exportación Europa)
- UL 508 (exportación USA, opcional)
