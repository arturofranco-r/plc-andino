# ColPLC v1.0 — PLC Industrial Colombiano

## Descripción General
PLC industrial de diseño colombiano con 12 entradas digitales y 8 salidas a relé,
arquitectura escalable para expansión de E/S y comunicaciones industriales.

## Estructura del Proyecto

```
plc andino/
├── README.md
├── 01_Documentacion/
│   ├── especificaciones_tecnicas.md
│   ├── arquitectura_sistema.md
│   └── plan_pruebas.md
├── 02_Esquematicos/
│   ├── esquema_principal.md
│   ├── modulo_cpu.md
│   ├── modulo_entradas.md
│   ├── modulo_salidas.md
│   ├── modulo_comunicaciones.md
│   └── modulo_alimentacion.md
├── 03_PCB/
│   ├── guia_layout.md
│   └── consideraciones_emi_emc.md
├── 04_BOM/
│   ├── lista_materiales.md
│   └── proveedores_colombia.md
├── 05_Firmware/
│   ├── arquitectura_firmware.md
│   └── estructura_codigo.md
├── 06_Comunicaciones/
│   ├── protocolo_modbus.md
│   └── expansion_modulos.md
├── 07_Mecanico/
│   ├── diseno_gabinete.md
│   └── montaje_din.md
└── 08_Certificacion/
    └── plan_certificacion.md
```

## Especificaciones Rápidas

| Parámetro | Valor |
|-----------|-------|
| Entradas digitales | 12 x 24VDC optoacopladas |
| Salidas | 8 x Relé 10A/250VAC |
| CPU | STM32F407VGT6 |
| Comunicación base | Modbus RTU RS-485 |
| Alimentación | 24VDC ±20% |
| Expansión E/S | Hasta 8 módulos adicionales |
| Temperatura operación | -10°C a +60°C |
| Montaje | Riel DIN 35mm |
| Protección | IP20 en gabinete DIN |

## Estado del Proyecto
- [x] Documentación técnica
- [x] Esquemáticos detallados
- [x] BOM con proveedores Colombia
- [x] Arquitectura firmware
- [x] Diseño mecánico
- [ ] Prototipo físico
- [ ] Certificación ICONTEC/RETIE
