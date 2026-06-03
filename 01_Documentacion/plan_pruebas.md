# Plan de Pruebas — ColPLC v1.0

## 1. Pruebas de Prototipo (Fase de Desarrollo)

### PT-001 — Prueba de Alimentación
```
Objetivo: Verificar reguladores de tensión y protecciones
Equipo: Fuente de laboratorio, multímetro, osciloscopio

Procedimiento:
  1. Conectar fuente a 24VDC, medir corriente en vacío
  2. Verificar +5V: debe estar entre 4.75V y 5.25V
  3. Verificar +3.3V: debe estar entre 3.2V y 3.4V
  4. Aplicar 19.2V (mínimo): verificar funcionamiento
  5. Aplicar 28.8V (máximo): verificar funcionamiento
  6. Invertir polaridad: verificar que no hay daño
  7. Aplicar transitorio 1kV/1µs: verificar protección MOV/TVS
  8. Medir ripple en +5V: debe ser < 50mV pico a pico
  9. Medir ripple en +3.3V: debe ser < 20mV pico a pico

Criterio de aceptación:
  ✓ Tensiones dentro de rango en todo el rango de entrada
  ✓ Sin daño por inversión de polaridad
  ✓ Sin daño por transitorio
  ✓ Ripple dentro de especificación
```

### PT-002 — Prueba de Entradas Digitales
```
Objetivo: Verificar los 12 canales de entrada digital
Equipo: Fuente 24VDC, multímetro, PC con software Modbus

Procedimiento:
  1. Conectar PC por USB, abrir terminal Modbus
  2. Para cada canal DI1-DI12:
     a. Aplicar 24VDC en la entrada
     b. Verificar LED verde enciende
     c. Leer coil por Modbus: debe ser 1
     d. Retirar señal
     e. Verificar LED apaga
     f. Leer coil por Modbus: debe ser 0
  3. Aplicar 18VDC (mínimo): verificar detección
  4. Aplicar 30VDC (máximo): verificar sin daño
  5. Medir tiempo de respuesta: debe ser < 5ms
  6. Prueba de ruido: aplicar señal con ruido 1kHz

Criterio de aceptación:
  ✓ Los 12 canales funcionan correctamente
  ✓ Detección correcta en todo el rango de tensión
  ✓ Tiempo de respuesta < 5ms
  ✓ Sin falsas activaciones por ruido
```

### PT-003 — Prueba de Salidas a Relé
```
Objetivo: Verificar los 8 canales de salida a relé
Equipo: PC con Modbus, multímetro, carga resistiva 1A/24VDC

Procedimiento:
  1. Para cada canal DO1-DO8:
     a. Activar salida por Modbus (coil = 1)
     b. Verificar LED rojo enciende
     c. Medir continuidad contacto NA: debe ser < 0.5Ω
     d. Medir aislamiento contacto NC: debe ser > 1MΩ
     e. Desactivar salida (coil = 0)
     f. Verificar LED apaga
     g. Verificar conmutación de contactos
  2. Prueba de carga: conectar 1A/24VDC, 100 ciclos
  3. Prueba de carga AC: conectar 1A/220VAC, 100 ciclos
  4. Medir tiempo de conmutación: debe ser < 10ms

Criterio de aceptación:
  ✓ Los 8 canales funcionan correctamente
  ✓ Resistencia de contacto < 0.5Ω
  ✓ Sin pegado de contactos después de 100 ciclos
  ✓ Tiempo de conmutación < 10ms
```

### PT-004 — Prueba de Comunicaciones RS-485
```
Objetivo: Verificar comunicación Modbus RTU
Equipo: PC con adaptador USB-RS485, software Modbus Poll

Procedimiento:
  1. Conectar PC al puerto RS-485 del PLC
  2. Configurar: 9600 bps, 8N1, dirección 1
  3. Leer registros de estado (función 03, reg 0x0000-0x000F)
  4. Escribir y leer coils (funciones 05/01)
  5. Escribir y leer holding registers (funciones 06/03)
  6. Probar todas las velocidades: 1200 a 115200 bps
  7. Prueba de distancia: cable de 100m
  8. Prueba de ruido: con variador de frecuencia cercano

Criterio de aceptación:
  ✓ Comunicación correcta a todas las velocidades
  ✓ CRC correcto en todas las tramas
  ✓ Funcionamiento a 100m de distancia
  ✓ Sin errores con ruido industrial
```

### PT-005 — Prueba de Firmware y Ciclo de Scan
```
Objetivo: Verificar el runtime del PLC
Equipo: PC con OpenPLC Editor, osciloscopio

Procedimiento:
  1. Cargar programa de prueba (ladder básico)
  2. Medir tiempo de ciclo de scan: debe ser < 20ms
  3. Verificar watchdog: desconectar kick, verificar reset
  4. Verificar RTC: leer hora, apagar, encender, verificar hora
  5. Prueba de memoria: cargar programa máximo
  6. Prueba de temperatura: 1 hora a 50°C ambiente
  7. Verificar LEDs de estado: RUN, ERR, COM

Criterio de aceptación:
  ✓ Tiempo de ciclo < 20ms
  ✓ Watchdog funciona correctamente
  ✓ RTC mantiene hora con batería
  ✓ Sin errores después de 1 hora a 50°C
```

---

## 2. Programa Ladder de Prueba

```
(* Programa de prueba básico — ColPLC v1.0 *)
(* Verifica todas las E/S y comunicaciones *)

PROGRAM PLC_TEST
VAR
    timer1: TON;
    counter1: CTU;
    test_cycle: INT := 0;
END_VAR

(* Red 1: Pasar entradas a salidas (DI1→DO1, DI2→DO2, etc.) *)
DO1 := DI1;
DO2 := DI2;
DO3 := DI3;
DO4 := DI4;
DO5 := DI5;
DO6 := DI6;
DO7 := DI7;
DO8 := DI8;

(* Red 2: Temporizador de prueba — DO1 parpadea cada 1 segundo *)
timer1(IN := NOT timer1.Q, PT := T#1000ms);
IF timer1.Q THEN
    DO1 := NOT DO1;
END_IF;

(* Red 3: Contador — cuenta flancos de DI9 *)
counter1(CU := DI9, R := DI10, PV := 100);

(* Red 4: Activar DO5 cuando contador llega a 10 *)
DO5 := (counter1.CV >= 10);

END_PROGRAM
```

---

## 3. Registro de Pruebas

```
Formato de registro para cada unidad fabricada:

REGISTRO DE PRUEBAS — ColPLC v1.0
Número de serie: _______________
Fecha de fabricación: _______________
Operario: _______________

PT-001 Alimentación:
  +5V medido: _______ V  (Esp: 4.75-5.25V)  □ OK  □ FALLA
  +3.3V medido: _____ V  (Esp: 3.2-3.4V)    □ OK  □ FALLA
  Corriente vacío: ___ mA (Esp: <200mA)      □ OK  □ FALLA

PT-002 Entradas Digitales:
  DI1: □OK  DI2: □OK  DI3: □OK  DI4: □OK
  DI5: □OK  DI6: □OK  DI7: □OK  DI8: □OK
  DI9: □OK  DI10:□OK  DI11:□OK  DI12:□OK

PT-003 Salidas Relé:
  DO1: □OK  DO2: □OK  DO3: □OK  DO4: □OK
  DO5: □OK  DO6: □OK  DO7: □OK  DO8: □OK

PT-004 Comunicaciones:
  RS-485 9600bps: □OK    RS-485 115200bps: □OK
  USB CDC: □OK

PT-005 Firmware:
  Tiempo ciclo: _____ ms  (Esp: <20ms)  □ OK  □ FALLA
  Watchdog: □OK
  RTC: □OK

RESULTADO FINAL: □ APROBADO  □ RECHAZADO

Firma inspector: _______________
```
