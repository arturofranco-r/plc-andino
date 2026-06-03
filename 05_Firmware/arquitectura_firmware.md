# Arquitectura de Firmware — ColPLC v1.0

## 1. Stack de Software

```
┌─────────────────────────────────────────────────────────────────┐
│                    APLICACIÓN USUARIO                           │
│              Programa Ladder / ST / FBD                         │
│         (almacenado en Flash externa W25Q64)                    │
├─────────────────────────────────────────────────────────────────┤
│                   RUNTIME IEC 61131-3                           │
│   ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐  │
│   │  Scheduler  │  │  Compilador  │  │  Gestión Variables  │  │
│   │  de Tareas  │  │  Bytecode    │  │  %I, %Q, %M, %T, %C │  │
│   └─────────────┘  └──────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                   CAPA DE SERVICIOS                             │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│   │ Modbus   │  │  Logger  │  │  Config  │  │  Diagnóstico│  │
│   │ RTU/TCP  │  │  Flash   │  │  EEPROM  │  │  Self-test  │  │
│   └──────────┘  └──────────┘  └──────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                   HAL — Hardware Abstraction Layer              │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐ │
│   │ GPIO │ │ SPI  │ │ UART │ │ ADC  │ │Timer │ │ Watchdog │ │
│   └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                   FreeRTOS v10.x                                │
│         Tareas, Semáforos, Colas, Timers de software           │
├─────────────────────────────────────────────────────────────────┤
│                   STM32 HAL / LL (STM32CubeF4)                 │
│                   CMSIS — ARM Cortex-M4                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Estructura de Directorios del Firmware

```
firmware/
├── Core/
│   ├── Inc/
│   │   ├── main.h
│   │   ├── plc_config.h          # Configuración general del PLC
│   │   ├── plc_types.h           # Tipos de datos IEC 61131-3
│   │   └── FreeRTOSConfig.h
│   └── Src/
│       ├── main.c                # Punto de entrada, init hardware
│       ├── freertos.c            # Configuración FreeRTOS
│       └── stm32f4xx_it.c        # Manejadores de interrupción
│
├── HAL/
│   ├── Inc/
│   │   ├── hal_gpio.h
│   │   ├── hal_spi.h
│   │   ├── hal_uart.h
│   │   ├── hal_adc.h
│   │   └── hal_flash.h
│   └── Src/
│       ├── hal_gpio.c            # Driver GPIO (DI/DO)
│       ├── hal_spi.c             # Driver SPI (Flash, expansión)
│       ├── hal_uart.c            # Driver UART (RS-485, RS-232)
│       ├── hal_adc.c             # Driver ADC (monitoreo tensiones)
│       └── hal_flash.c           # Driver Flash externa W25Q64
│
├── PLC/
│   ├── Inc/
│   │   ├── plc_io.h              # Gestión E/S físicas
│   │   ├── plc_runtime.h         # Motor de ejecución
│   │   ├── plc_variables.h       # Tabla de variables
│   │   ├── plc_timers.h          # Temporizadores IEC
│   │   ├── plc_counters.h        # Contadores IEC
│   │   └── plc_expansion.h       # Gestión módulos expansión
│   └── Src/
│       ├── plc_io.c
│       ├── plc_runtime.c
│       ├── plc_variables.c
│       ├── plc_timers.c
│       ├── plc_counters.c
│       └── plc_expansion.c
│
├── Comms/
│   ├── Inc/
│   │   ├── modbus_rtu.h
│   │   ├── modbus_tcp.h          # Opcional (con W5500)
│   │   └── usb_cdc.h
│   └── Src/
│       ├── modbus_rtu.c
│       ├── modbus_tcp.c
│       └── usb_cdc.c
│
├── Services/
│   ├── Inc/
│   │   ├── logger.h
│   │   ├── config.h
│   │   └── diagnostics.h
│   └── Src/
│       ├── logger.c
│       ├── config.c
│       └── diagnostics.c
│
└── Drivers/
    ├── STM32F4xx_HAL_Driver/     # STM32CubeF4 HAL
    ├── CMSIS/                    # ARM CMSIS
    └── FreeRTOS/                 # FreeRTOS kernel
```

---

## 3. Tareas FreeRTOS

```c
/* Prioridades de tareas (mayor número = mayor prioridad) */
#define TASK_PRIO_SCAN_IO       5   /* Lectura/escritura E/S físicas */
#define TASK_PRIO_PLC_RUNTIME   4   /* Ejecución programa usuario */
#define TASK_PRIO_MODBUS        3   /* Comunicación Modbus RTU */
#define TASK_PRIO_EXPANSION     3   /* Gestión módulos expansión */
#define TASK_PRIO_DIAGNOSTICS   2   /* Auto-diagnóstico */
#define TASK_PRIO_LOGGER        1   /* Registro de eventos */
#define TASK_PRIO_IDLE          0   /* Tarea idle FreeRTOS */

/* Períodos de tareas */
#define TASK_PERIOD_SCAN_IO     1   /* ms — lectura E/S cada 1ms */
#define TASK_PERIOD_PLC         10  /* ms — ciclo PLC cada 10ms */
#define TASK_PERIOD_MODBUS      5   /* ms — polling Modbus */
#define TASK_PERIOD_DIAG        1000 /* ms — diagnóstico cada 1s */
```

---

## 4. Mapa de Variables IEC 61131-3

```c
/* Entradas digitales físicas: %IX0.0 a %IX0.11 */
typedef struct {
    uint16_t DI_physical;    /* Bits 0-11: DI1-DI12 físicas */
    uint16_t DI_expansion[8]; /* Módulos de expansión */
} PLC_Inputs_t;

/* Salidas digitales físicas: %QX0.0 a %QX0.7 */
typedef struct {
    uint8_t  DO_physical;    /* Bits 0-7: DO1-DO8 físicas */
    uint16_t DO_expansion[8]; /* Módulos de expansión */
} PLC_Outputs_t;

/* Marcas internas: %MX0.0 a %MX99.15 */
typedef struct {
    uint16_t M[100];         /* 1600 bits de marcas */
} PLC_Markers_t;

/* Temporizadores: %T0 a %T99 */
typedef struct {
    uint32_t preset;         /* Valor de preset en ms */
    uint32_t current;        /* Valor actual en ms */
    uint8_t  enable;         /* Bit de habilitación */
    uint8_t  done;           /* Bit de fin */
    uint8_t  type;           /* TON, TOF, TP */
} PLC_Timer_t;

/* Contadores: %C0 a %C99 */
typedef struct {
    int32_t  preset;         /* Valor de preset */
    int32_t  current;        /* Valor actual */
    uint8_t  count_up;       /* Pulso de conteo ascendente */
    uint8_t  count_down;     /* Pulso de conteo descendente */
    uint8_t  reset;          /* Reset del contador */
    uint8_t  done;           /* Bit de fin */
} PLC_Counter_t;
```

---

## 5. Ciclo de Scan del PLC

```c
/* plc_runtime.c — Ciclo principal de scan */
void PLC_ScanTask(void *pvParameters) {
    TickType_t xLastWakeTime = xTaskGetTickCount();
    
    while(1) {
        /* 1. Leer entradas físicas */
        PLC_ReadPhysicalInputs();
        PLC_ReadExpansionInputs();
        
        /* 2. Ejecutar programa de usuario */
        PLC_ExecuteUserProgram();
        
        /* 3. Actualizar temporizadores */
        PLC_UpdateTimers();
        
        /* 4. Actualizar contadores */
        PLC_UpdateCounters();
        
        /* 5. Escribir salidas físicas */
        PLC_WritePhysicalOutputs();
        PLC_WriteExpansionOutputs();
        
        /* 6. Reset watchdog */
        HAL_IWDG_Refresh(&hiwdg);
        WDG_External_Kick();
        
        /* 7. Esperar próximo ciclo (10ms) */
        vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(10));
    }
}
```

---

## 6. Driver de E/S Físicas

```c
/* hal_gpio.c — Lectura de entradas digitales */
uint16_t HAL_ReadDigitalInputs(void) {
    uint16_t inputs = 0;
    
    /* Leer GPIOA bits 0-7 (DI1-DI8) */
    inputs |= (GPIOA->IDR & 0x00FF);
    
    /* Leer GPIOB bits 0-3 (DI9-DI12) */
    inputs |= ((GPIOB->IDR & 0x000F) << 8);
    
    return inputs;
}

/* hal_gpio.c — Escritura de salidas digitales */
void HAL_WriteDigitalOutputs(uint8_t outputs) {
    /* Escribir GPIOC bits 0-7 (DO1-DO8) */
    uint32_t temp = GPIOC->ODR;
    temp &= ~0x00FF;           /* Limpiar bits 0-7 */
    temp |= (outputs & 0xFF);  /* Escribir nuevos valores */
    GPIOC->ODR = temp;
}
```

---

## 7. Stack Modbus RTU

```c
/* modbus_rtu.c — Registros Modbus */

/* Mapa de registros Modbus:
   Coils (0x):          0-11  → Entradas digitales DI1-DI12 (solo lectura)
                        100-107 → Salidas digitales DO1-DO8 (lectura/escritura)
                        200-299 → Marcas internas M0-M99
   
   Discrete Inputs (1x): 0-11  → Entradas digitales DI1-DI12
   
   Input Registers (3x): 0     → Versión firmware
                          1     → Estado del PLC (RUN/STOP/ERROR)
                          2     → Tensión 24V (×100 mV)
                          3     → Tensión 5V  (×100 mV)
                          4     → Temperatura CPU (°C)
                          5-12  → Valores contadores C0-C7
   
   Holding Registers (4x): 0   → Dirección Modbus (1-247)
                             1   → Velocidad baudios
                             2   → Modo PLC (RUN=1, STOP=0)
                             100-199 → Presets temporizadores T0-T99
                             200-299 → Presets contadores C0-C99
*/

/* Funciones Modbus soportadas:
   0x01 — Read Coils
   0x02 — Read Discrete Inputs
   0x03 — Read Holding Registers
   0x04 — Read Input Registers
   0x05 — Write Single Coil
   0x06 — Write Single Register
   0x0F — Write Multiple Coils
   0x10 — Write Multiple Registers
*/
```

---

## 8. Protocolo de Expansión SPI

```c
/* plc_expansion.c — Comunicación con módulos de expansión */

/* Trama de comunicación SPI (16 bits):
   Byte 1: [CMD(4)] [ADDR(4)]
   Byte 2: [DATA(8)]
   
   CMD:
     0x1 — Leer E/S
     0x2 — Escribir salidas
     0x3 — Leer configuración
     0x4 — Escribir configuración
     0xF — Identificar módulo
   
   Respuesta del módulo (16 bits):
   Byte 1: [STATUS(4)] [TYPE(4)]
   Byte 2: [DATA(8)]
   
   TYPE:
     0x1 — Módulo 8DI
     0x2 — Módulo 8DO relé
     0x3 — Módulo 8DO transistor
     0x4 — Módulo 4AI (0-10V / 4-20mA)
     0x5 — Módulo 2AO
     0x6 — Módulo ETH
     0x7 — Módulo CAN
*/

void PLC_ScanExpansionModules(void) {
    for(int i = 0; i < MAX_EXPANSION_MODULES; i++) {
        if(expansion_modules[i].present) {
            CS_Select(i);
            SPI_Transfer(CMD_READ_IO, &expansion_modules[i].data);
            CS_Deselect(i);
        }
    }
}
```

---

## 9. Herramientas de Desarrollo

| Herramienta | Versión | Uso | Costo |
|-------------|---------|-----|-------|
| STM32CubeIDE | 1.15+ | IDE principal, compilador GCC | Gratis |
| STM32CubeMX | 6.x | Configuración periféricos | Gratis |
| OpenPLC Runtime | 3.x | Runtime IEC 61131-3 | Gratis |
| OpenPLC Editor | 3.x | Programación Ladder/ST/FBD | Gratis |
| FreeRTOS | 10.x | RTOS | Gratis |
| ST-Link V2 | — | Programador/debugger | ~$5 USD |
| KiCad | 7.x | Diseño PCB | Gratis |
| Wireshark | 4.x | Análisis Modbus | Gratis |

---

## 10. Proceso de Actualización de Firmware (OTA)

```
Método 1 — USB DFU (Device Firmware Upgrade):
  1. Mantener pulsado botón BOOT durante encendido
  2. STM32 entra en modo bootloader USB
  3. Usar STM32CubeProgrammer para cargar nuevo firmware
  4. Reiniciar el PLC

Método 2 — SWD (Debug):
  1. Conectar ST-Link V2 al conector SWD
  2. Usar STM32CubeIDE o OpenOCD
  3. Cargar firmware directamente

Método 3 — Modbus (futuro):
  1. Enviar comando Modbus de inicio de actualización
  2. Transferir firmware en bloques de 256 bytes
  3. Verificar CRC de cada bloque
  4. Confirmar actualización y reiniciar
```
