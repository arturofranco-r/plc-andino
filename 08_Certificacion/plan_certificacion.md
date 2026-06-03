# Plan de Certificación — ColPLC v1.0

## 1. Normas Aplicables en Colombia

### Obligatorias (RETIE):
| Norma | Descripción | Organismo |
|-------|-------------|-----------|
| RETIE 2013 | Reglamento Técnico de Instalaciones Eléctricas | MinMinas Colombia |
| NTC 2050 | Código Eléctrico Colombiano (basado en NEC) | ICONTEC |
| NTC 4552 | Equipos de automatización industrial | ICONTEC |

### Internacionales (referencia):
| Norma | Descripción |
|-------|-------------|
| IEC 61131-2 | PLC — Requisitos y ensayos de equipos |
| IEC 61000-4-2 | EMC — Inmunidad a descargas electrostáticas (ESD) |
| IEC 61000-4-3 | EMC — Inmunidad a campos electromagnéticos radiados |
| IEC 61000-4-4 | EMC — Inmunidad a transitorios eléctricos rápidos (EFT) |
| IEC 61000-4-5 | EMC — Inmunidad a sobretensiones (Surge) |
| IEC 61000-4-6 | EMC — Inmunidad a perturbaciones conducidas |
| IEC 61000-4-8 | EMC — Inmunidad a campos magnéticos de frecuencia industrial |
| IEC 60068-2-6 | Ensayos ambientales — Vibración sinusoidal |
| IEC 60068-2-27 | Ensayos ambientales — Golpes |
| IEC 60664-1 | Coordinación de aislamiento |

---

## 2. Ensayos Requeridos IEC 61131-2

### Ensayos Eléctricos:
| Ensayo | Nivel | Método |
|--------|-------|--------|
| Tensión de prueba dieléctrica | 500VAC/1min (E/S a tierra) | IEC 61131-2 §6.4 |
| Resistencia de aislamiento | >10MΩ a 500VDC | IEC 61131-2 §6.4 |
| Tensión de impulso | 1kV (1.2/50µs) | IEC 61131-2 §6.4 |
| Corriente de fuga | <3.5mA | IEC 61131-2 §6.4 |

### Ensayos EMC (Inmunidad):
| Ensayo | Nivel | Puerto |
|--------|-------|--------|
| ESD (IEC 61000-4-2) | ±4kV contacto, ±8kV aire | Carcasa |
| EFT/Burst (IEC 61000-4-4) | ±2kV | Alimentación, E/S |
| Surge (IEC 61000-4-5) | ±1kV L-L, ±2kV L-PE | Alimentación |
| Conducida RF (IEC 61000-4-6) | 10V (0.15-80MHz) | Alimentación, E/S |
| Campo radiado (IEC 61000-4-3) | 10V/m (80-1000MHz) | Carcasa |
| Campo magnético (IEC 61000-4-8) | 30A/m a 50Hz | Carcasa |

### Ensayos Ambientales:
| Ensayo | Condición | Norma |
|--------|-----------|-------|
| Temperatura operación | -10°C a +60°C, 16h | IEC 60068-2-1/2 |
| Temperatura almacenamiento | -25°C a +85°C, 16h | IEC 60068-2-1/2 |
| Humedad | 95% HR, 40°C, 48h | IEC 60068-2-78 |
| Vibración | 10-57Hz, 0.075mm; 57-150Hz, 1g | IEC 60068-2-6 |
| Golpes | 15g, 11ms, 3 ejes | IEC 60068-2-27 |
| Ciclos térmicos | -10°C a +60°C, 5 ciclos | IEC 60068-2-14 |

---

## 3. Laboratorios de Ensayo en Colombia

| Laboratorio | Ciudad | Servicios | Contacto |
|-------------|--------|-----------|---------|
| ICONTEC | Bogotá | Certificación, ensayos EMC | www.icontec.org |
| CIDET | Medellín | Ensayos eléctricos, EMC | www.cidet.org.co |
| ONAC | Nacional | Acreditación laboratorios | www.onac.org.co |
| UL Colombia | Bogotá | Certificación UL/CE | ul.com/es |
| SGS Colombia | Bogotá | Ensayos y certificación | sgs.com/es-co |

---

## 4. Plan de Pruebas de Producción

### Pruebas 100% (cada unidad fabricada):

#### Prueba 1 — Verificación Visual
```
□ Inspección visual de soldadura (IPC-A-610 Clase 2)
□ Verificar polaridad de componentes
□ Verificar ausencia de puentes de soldadura
□ Verificar integridad de conectores
□ Verificar etiquetado correcto
□ Verificar montaje en carcasa
```

#### Prueba 2 — Alimentación
```
□ Aplicar 24VDC en bornes de alimentación
□ Verificar LED PWR encendido
□ Medir tensión +5V: 4.75V – 5.25V
□ Medir tensión +3.3V: 3.2V – 3.4V
□ Verificar corriente en vacío: < 200mA
□ Prueba inversión polaridad: no debe dañarse
```

#### Prueba 3 — Entradas Digitales
```
□ Aplicar 24VDC a cada entrada DI1-DI12
□ Verificar LED indicador enciende
□ Verificar lectura correcta por Modbus (coil = 1)
□ Retirar señal y verificar LED apaga
□ Verificar lectura correcta por Modbus (coil = 0)
□ Tiempo de respuesta: < 5ms
```

#### Prueba 4 — Salidas a Relé
```
□ Activar cada salida DO1-DO8 por Modbus
□ Verificar LED indicador enciende
□ Medir continuidad contacto NA: < 0.5Ω
□ Medir aislamiento contacto NC: > 1MΩ
□ Desactivar salida y verificar conmutación
□ Verificar LED apaga
□ Prueba de carga: 1A/24VDC por 10 ciclos
```

#### Prueba 5 — Comunicaciones
```
□ Conectar PC por USB
□ Verificar aparece como puerto COM virtual
□ Conectar maestro Modbus por RS-485
□ Leer registros de estado (función 03)
□ Escribir y leer coils (funciones 05/01)
□ Verificar CRC correcto en todas las tramas
```

#### Prueba 6 — Programa de Prueba
```
□ Cargar programa de prueba (ladder básico)
□ Verificar ciclo de scan: < 20ms
□ Verificar watchdog: forzar reset y verificar recuperación
□ Verificar RTC: leer hora y fecha
□ Prueba de temperatura: 30 minutos a 50°C
```

### Pruebas de Lote (1 unidad por cada 10):

```
□ Prueba dieléctrica: 500VAC/1min entre E/S y tierra
□ Prueba de vibración: 10 minutos a 2g
□ Prueba de temperatura: -10°C y +60°C
□ Prueba EMC básica: ESD ±4kV
□ Prueba de vida relés: 10.000 ciclos
```

---

## 5. Documentación para Certificación

```
Documentos requeridos para certificación ICONTEC/RETIE:

1. Manual técnico del producto
   - Especificaciones eléctricas completas
   - Instrucciones de instalación
   - Instrucciones de operación
   - Mantenimiento preventivo

2. Esquemáticos eléctricos completos
   - Firmados por ingeniero responsable

3. Lista de materiales (BOM)
   - Con datasheets de componentes críticos

4. Informe de ensayos
   - Realizados en laboratorio acreditado ONAC

5. Declaración de conformidad
   - Firmada por el fabricante

6. Manual de usuario en español
   - Instrucciones de seguridad
   - Advertencias y precauciones
```

---

## 6. Marcado del Producto

```
Marcado obligatorio en la carcasa:

┌─────────────────────────────────────────────────────────┐
│  ColPLC v1.0                                            │
│  Fabricante: [Nombre empresa]                           │
│  Dirección: [Ciudad, Colombia]                          │
│                                                         │
│  Alimentación: 24VDC ±20%, 1.5A máx.                   │
│  Entradas: 12 × 24VDC                                   │
│  Salidas: 8 × Relé 10A/250VAC                           │
│                                                         │
│  Temperatura: -10°C a +60°C                             │
│  Humedad: 5-95% sin condensación                        │
│  Grado protección: IP20                                 │
│                                                         │
│  Norma: IEC 61131-2                                     │
│  S/N: XXXXXXXXXX                                        │
│  Fecha: MM/AAAA                                         │
│                                                         │
│  [Símbolo tierra]  [Símbolo WEEE]  [Símbolo CE*]       │
└─────────────────────────────────────────────────────────┘

* CE solo si se certifica para exportación a Europa
```

---

## 7. Cronograma de Certificación

| Fase | Actividad | Duración | Costo estimado |
|------|-----------|----------|----------------|
| 1 | Diseño y prototipo | 3 meses | $2,000 USD |
| 2 | Pruebas internas | 1 mes | $500 USD |
| 3 | Ensayos laboratorio | 2 meses | $3,000 USD |
| 4 | Correcciones | 1 mes | $500 USD |
| 5 | Certificación ICONTEC | 2 meses | $2,500 USD |
| 6 | Producción piloto | 1 mes | $1,000 USD |
| **Total** | | **~10 meses** | **~$9,500 USD** |
