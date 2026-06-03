# Cómo abrir el proyecto ColPLC en KiCad

## Paso 1 — Instalar KiCad (si no lo tienes)

1. Ir a: https://www.kicad.org/download/windows/
2. Descargar KiCad 7.x o 8.x para Windows
3. Instalar con opciones por defecto (~5 GB con librerías)

## Paso 2 — Abrir el proyecto

1. Abrir KiCad
2. Menú: File → Open Project
3. Navegar a: `C:\Users\Soportedrai\Desktop\plc andino\KiCad_Project\`
4. Seleccionar: `ColPLC.kicad_pro`
5. Clic en "Abrir"

## Paso 3 — Ver los esquemáticos

En el panel principal de KiCad:
1. Hacer doble clic en **"Schematic Editor"** (ícono del esquemático)
2. Se abre `ColPLC_Root.kicad_sch` — la hoja raíz con el índice
3. Hacer doble clic en cada recuadro para entrar a cada hoja:
   - **CPU_Module** — STM32F407VGT6 y periféricos
   - **Power_Module** — Alimentación 24V→5V→3.3V
   - **DI_Module** — 12 entradas digitales optoacopladas
   - **DO_Module** — 8 salidas a relé
   - **Comms_Module** — RS-485, Ethernet, CAN

## Paso 4 — Agregar símbolos faltantes

Los esquemáticos usan símbolos de las librerías estándar de KiCad.
Si aparece "Symbol not found", hacer:
1. Menú: Tools → Edit Symbol Libraries
2. Verificar que estén activas: `Device`, `power`, `Connector`

Para el STM32F407 específicamente:
1. Menú: Tools → Manage Symbol Libraries
2. Agregar librería: `MCU_ST_STM32F4` (incluida en KiCad)

## Paso 5 — Completar el esquemático

Los archivos `.kicad_sch` generados contienen:
- ✅ Estructura jerárquica completa
- ✅ Todos los componentes con valores y footprints
- ✅ Conexiones de red (wires)
- ✅ Símbolos de alimentación (+24V, +5V, +3.3V, GND)
- ✅ Notas técnicas en cada hoja
- ⚠️ El STM32F407 requiere agregar el símbolo desde la librería MCU_ST_STM32F4

## Estructura de archivos del proyecto

```
KiCad_Project/
├── ColPLC.kicad_pro        ← Archivo de proyecto (abrir este)
├── ColPLC_Root.kicad_sch   ← Hoja raíz (índice jerárquico)
├── CPU_Module.kicad_sch    ← Hoja 2: CPU STM32F407
├── Power_Module.kicad_sch  ← Hoja 3: Alimentación
├── DI_Module.kicad_sch     ← Hoja 4: Entradas digitales
├── DO_Module.kicad_sch     ← Hoja 5: Salidas relé
└── Comms_Module.kicad_sch  ← Hoja 6: Comunicaciones
```

## Próximos pasos en KiCad

1. **Revisar y completar** los esquemáticos (agregar símbolos exactos)
2. **Asignar footprints** a cada componente (Tools → Assign Footprints)
3. **Generar Netlist** (Tools → Generate Netlist)
4. **Abrir PCB Editor** y hacer el layout siguiendo la guía en `03_PCB/guia_layout.md`
5. **Ejecutar DRC** (Design Rule Check) para verificar errores
6. **Generar Gerbers** para fabricación (File → Fabrication Outputs)
