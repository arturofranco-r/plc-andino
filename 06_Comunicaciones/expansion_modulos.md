# Módulos de Expansión — ColPLC v1.0

## 1. Catálogo de Módulos Disponibles

| Código | Descripción | E/S | Ancho DIN |
|--------|-------------|-----|-----------|
| EXP-8DI | 8 entradas digitales 24VDC | 8 DI | 2 módulos (35mm) |
| EXP-8DO-R | 8 salidas a relé 10A/250VAC | 8 DO | 2 módulos (35mm) |
| EXP-8DO-T | 8 salidas transistor NPN 24VDC/0.5A | 8 DO | 2 módulos (35mm) |
| EXP-4AI | 4 entradas analógicas 0-10V / 4-20mA | 4 AI | 2 módulos (35mm) |
| EXP-2AO | 2 salidas analógicas 0-10V / 4-20mA | 2 AO | 2 módulos (35mm) |
| EXP-ETH | Módulo Ethernet Modbus TCP | — | 2 módulos (35mm) |
| EXP-CAN | Módulo CANopen | — | 2 módulos (35mm) |
| EXP-232 | Módulo RS-232 adicional | — | 1 módulo (17.5mm) |

---

## 2. Protocolo de Bus de Expansión

### Especificaciones del Bus:
```
Interfaz física:  SPI modo 0 (CPOL=0, CPHA=0)
Velocidad:        10 MHz máximo
Tensión:          3.3V (señales) + 5V (alimentación módulos)
Conector:         IDC-20 pines, paso 2.54mm
Cable:            Plano de 20 conductores, máximo 30cm
Módulos máximos:  8 módulos simultáneos
```

### Trama de Comunicación (16 bits):
```
Byte de Comando (enviado por CPU):
  Bits [7:4] — Comando:
    0x1 = Leer E/S
    0x2 = Escribir salidas
    0x3 = Leer configuración
    0x4 = Escribir configuración
    0xF = Identificar módulo

  Bits [3:0] — Dirección/Canal:
    0x0-0x7 = Canal específico
    0xF = Todos los canales

Byte de Datos (enviado por CPU o módulo):
  Bits [7:0] — Datos (depende del comando)

Byte de Respuesta (enviado por módulo):
  Bits [7:4] — Estado:
    0x0 = OK
    0x1 = Error
    0x2 = Ocupado
    0xF = No presente

  Bits [3:0] — Tipo de módulo:
    0x1 = EXP-8DI
    0x2 = EXP-8DO-R
    0x3 = EXP-8DO-T
    0x4 = EXP-4AI
    0x5 = EXP-2AO
    0x6 = EXP-ETH
    0x7 = EXP-CAN
```

---

## 3. Módulo EXP-8DI — 8 Entradas Digitales

### Esquemático simplificado:
```
Microcontrolador módulo: STM32F030F4P6 (TSSOP-20, económico)

Bus SPI ──── STM32F030 ──── 8× PC817 ──── Borneras campo 24VDC

Características:
  - 8 entradas digitales 24VDC optoacopladas
  - Idéntico circuito al módulo base
  - Dirección asignada por posición en bus (CS1-CS8)
  - Dimensiones: 35mm × 90mm × 65mm
```

### Mapa de variables (módulo en posición 1):
```
%IX1.0 a %IX1.7 — Entradas DI1-DI8 del módulo 1
```

---

## 4. Módulo EXP-4AI — 4 Entradas Analógicas

### Especificaciones:
```
Resolución:     12 bits (4096 niveles)
Modos:          0-10V o 4-20mA (seleccionable por jumper)
Precisión:      ±0.5% fondo de escala
Impedancia:     >100kΩ (modo tensión), 250Ω (modo corriente)
Tiempo muestreo: 1ms por canal
Protección:     ±30V (modo tensión), ±30mA (modo corriente)
ADC:            ADS1115 (16 bits, I2C) o MCP3204 (12 bits, SPI)
```

### Circuito por canal (modo 4-20mA):
```
Campo 4-20mA ──[R_shunt 250Ω]──┬──[R_div1]──┬──── ADC
                                │            │
                               GND          [R_div2]
                                             │
                                            GND

Tensión en shunt: 4mA×250Ω = 1V a 20mA×250Ω = 5V
Divisor a 3.3V: R_div1=10kΩ, R_div2=10kΩ → 0.5V a 2.5V ✓
```

### Mapa de variables (módulo en posición 3):
```
%IW3.0 a %IW3.3 — Valores analógicos AI1-AI4 (0-32767 = 0-100%)
```

---

## 5. Módulo EXP-ETH — Ethernet Modbus TCP

### Especificaciones:
```
Chip Ethernet:  W5500 (WIZnet)
Velocidad:      10/100 Mbps
Protocolo:      Modbus TCP (puerto 502)
IP:             DHCP o estática (configurable)
Conexiones:     Hasta 4 clientes simultáneos
Conector:       RJ45 con LEDs integrados
```

### Configuración por Modbus RTU:
```
Registro 0x0200: IP Address byte 1
Registro 0x0201: IP Address byte 2
Registro 0x0202: IP Address byte 3
Registro 0x0203: IP Address byte 4
Registro 0x0204: Subnet Mask byte 1-4
Registro 0x0208: Gateway byte 1-4
Registro 0x020C: Puerto TCP (default 502)
Registro 0x020D: DHCP enable (1=DHCP, 0=estática)
```

---

## 6. Capacidad Máxima del Sistema

```
Configuración máxima (módulo base + 8 módulos de expansión):

Módulo Base:
  12 DI + 8 DO relé

+ 4× EXP-8DI:
  32 DI adicionales

+ 4× EXP-8DO-R:
  32 DO relé adicionales

TOTAL MÁXIMO:
  Entradas digitales:  12 + 32 = 44 DI
  Salidas relé:         8 + 32 = 40 DO
  
Con módulos analógicos (reemplazando algunos DI/DO):
  Entradas analógicas: hasta 32 AI (8× EXP-4AI)
  Salidas analógicas:  hasta 16 AO (8× EXP-2AO)

Combinación típica industrial:
  Base: 12DI + 8DO
  + 2× EXP-8DI:  16 DI adicionales
  + 2× EXP-8DO:  16 DO adicionales
  + 2× EXP-4AI:   8 AI
  + 1× EXP-ETH:   Ethernet
  + 1× EXP-CAN:   CANopen
  
  TOTAL: 28 DI + 24 DO + 8 AI + Ethernet + CAN
```

---

## 7. Identificación Automática de Módulos

```c
/* Al encender, el CPU escanea todos los slots de expansión */
void PLC_DetectExpansionModules(void) {
    for(int slot = 0; slot < MAX_SLOTS; slot++) {
        CS_Select(slot);
        uint8_t response = SPI_SendCommand(CMD_IDENTIFY, 0x00);
        CS_Deselect(slot);
        
        if((response >> 4) == STATUS_OK) {
            uint8_t module_type = response & 0x0F;
            expansion_modules[slot].present = true;
            expansion_modules[slot].type = module_type;
            
            /* Asignar direcciones de variables automáticamente */
            PLC_AssignModuleVariables(slot, module_type);
            
            /* Log de detección */
            LOG_Info("Módulo %d detectado: tipo %d", slot+1, module_type);
        }
    }
}
```
