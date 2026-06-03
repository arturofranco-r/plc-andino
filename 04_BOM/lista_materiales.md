# Lista de Materiales (BOM) — ColPLC v1.0

## Resumen de Costos Estimados

| Categoría | Costo USD (unidad) | Costo COP aprox. |
|-----------|-------------------|-----------------|
| CPU y memoria | $18.00 | $75,000 |
| Entradas digitales | $8.50 | $35,000 |
| Salidas relé | $12.00 | $50,000 |
| Alimentación | $6.00 | $25,000 |
| Comunicaciones | $4.50 | $19,000 |
| PCB (10 unidades) | $8.00 | $33,000 |
| Gabinete DIN | $15.00 | $62,000 |
| Conectores y borneras | $9.00 | $37,000 |
| Pasivos (R, C, L) | $3.00 | $12,500 |
| **TOTAL** | **$84.00** | **~$348,500** |

*Precios estimados para lote de 10-50 unidades (Mayo 2026)*
*TRM referencia: $4,150 COP/USD*

---

## BOM Detallada

### Módulo CPU

| Ref | Descripción | Modelo | Cant | Precio USD | Proveedor |
|-----|-------------|--------|------|-----------|-----------|
| U1 | Microcontrolador ARM Cortex-M4 | STM32F407VGT6 | 1 | $8.50 | Mouser/DigiKey |
| U2 | Flash SPI 8MB | W25Q64JVSIQ | 1 | $0.80 | Mouser/DigiKey |
| U3 | Watchdog externo | MAX706TESA | 1 | $1.20 | Mouser/DigiKey |
| Y1 | Cristal 8MHz | HC-49S 8MHz | 1 | $0.30 | Mouser/DigiKey |
| Y2 | Cristal RTC 32.768kHz | CM315 32.768kHz | 1 | $0.25 | Mouser/DigiKey |
| BT1 | Batería RTC | CR2032 + holder | 1 | $0.50 | Mercado local |
| D_BAT | Diodo protección batería | BAT54S | 1 | $0.10 | Mouser/DigiKey |
| C_CPU | Condensadores desacoplamiento 100nF | X7R 100nF/50V | 15 | $0.30 | Mercado local |
| C_VCAP | Condensadores VCAP | 2.2µF/6.3V | 2 | $0.10 | Mercado local |
| C_BULK | Condensadores bulk | 10µF/16V | 4 | $0.20 | Mercado local |
| LED_RUN | LED verde 3mm | L-934GT | 1 | $0.05 | Mercado local |
| LED_ERR | LED rojo 3mm | L-934LT | 1 | $0.05 | Mercado local |
| LED_COM | LED amarillo 3mm | L-934YT | 1 | $0.05 | Mercado local |
| LED_PRG | LED azul 3mm | L-934BT | 1 | $0.05 | Mercado local |
| J_SWD | Conector SWD 2×5 1.27mm | FTSH-105-01-L-DV | 1 | $0.50 | Mouser/DigiKey |
| J_USB | Conector Mini-USB B | USB-B-S-RA | 1 | $0.40 | Mouser/DigiKey |
| U_ESD | Protección ESD USB | USBLC6-2SC6 | 1 | $0.30 | Mouser/DigiKey |

### Módulo Entradas Digitales (×12 canales)

| Ref | Descripción | Modelo | Cant | Precio USD | Proveedor |
|-----|-------------|--------|------|-----------|-----------|
| OPT1-12 | Optoacoplador 5kV | PC817C | 12 | $1.80 | Mercado local |
| TVS1-12 | TVS 30V 600W | P6KE30A | 12 | $1.20 | Mouser/DigiKey |
| D_IN1-12 | Diodo señal | 1N4148 | 12 | $0.24 | Mercado local |
| F_IN1-12 | Fusible PTC 100mA | MF-MSMF010-2 | 12 | $1.80 | Mouser/DigiKey |
| R_IN1-12 | Resistencia 3.3kΩ 1/4W | CF 3.3kΩ | 12 | $0.12 | Mercado local |
| R_PU1-12 | Resistencia pull-up 10kΩ | CF 10kΩ | 12 | $0.12 | Mercado local |
| R_LED1-12 | Resistencia LED 1kΩ | CF 1kΩ | 12 | $0.12 | Mercado local |
| LED_DI1-12 | LED verde 3mm indicador | L-934GT | 12 | $0.60 | Mercado local |
| C_FILT1-12 | Condensador filtro 10nF | X7R 10nF | 12 | $0.24 | Mercado local |
| J_DI | Bornera 24 pines campo | MSTB 2.5/24-ST | 1 | $3.50 | Phoenix/Wago |

### Módulo Salidas a Relé (×8 canales)

| Ref | Descripción | Modelo | Cant | Precio USD | Proveedor |
|-----|-------------|--------|------|-----------|-----------|
| K1-K8 | Relé SPDT 5VDC 10A | HF115F-H-005-1ZS1 | 8 | $6.40 | Mercado local |
| U_DRV | Driver Darlington 8ch | ULN2803ADWR | 1 | $0.50 | Mouser/DigiKey |
| D_FLY1-8 | Diodo flyback | 1N4007 | 8 | $0.16 | Mercado local |
| R_DRV1-8 | Resistencia base 1kΩ | CF 1kΩ | 8 | $0.08 | Mercado local |
| R_LED_DO1-8 | Resistencia LED 330Ω | CF 330Ω | 8 | $0.08 | Mercado local |
| LED_DO1-8 | LED rojo 3mm indicador | L-934LT | 8 | $0.40 | Mercado local |
| C_REL | Condensador filtro relés | 100µF/16V | 1 | $0.10 | Mercado local |
| J_DO | Bornera 24 pines campo | MSTB 2.5/24-ST | 1 | $3.50 | Phoenix/Wago |

### Módulo Alimentación

| Ref | Descripción | Modelo | Cant | Precio USD | Proveedor |
|-----|-------------|--------|------|-----------|-----------|
| F1 | Fusible 2A/32V 5×20mm | GMA 2A | 1 | $0.20 | Mercado local |
| F1_H | Portafusible PCB | Keystone 3557-2 | 1 | $0.40 | Mouser/DigiKey |
| D_POL | Diodo inversión polaridad | P600M (6A) | 1 | $0.30 | Mouser/DigiKey |
| MOV1 | Varistor 39V | S20K39 | 1 | $0.25 | Mouser/DigiKey |
| TVS_PWR | TVS bidireccional 33V | P6SMB33CA | 1 | $0.30 | Mouser/DigiKey |
| U_BUCK | Regulador buck 5V/3A | LM2596-5.0 | 1 | $0.80 | Mouser/DigiKey |
| L1 | Inductor 100µH/3A | SRR1260-101Y | 1 | $0.60 | Mouser/DigiKey |
| D_BUCK | Diodo Schottky 3A/40V | 1N5822 | 1 | $0.20 | Mercado local |
| C_IN | Electrolítico 470µF/50V | 470µF/50V | 1 | $0.40 | Mercado local |
| C_5V | Electrolítico 470µF/16V | 470µF/16V | 1 | $0.25 | Mercado local |
| U_LDO | Regulador LDO 3.3V/1A | AMS1117-3.3 SOT-223 | 1 | $0.30 | Mouser/DigiKey |
| C_LDO | Electrolítico 10µF/16V | 10µF/16V | 2 | $0.10 | Mercado local |
| J_PWR | Bornera alimentación | MSTB 2.5/2-ST 7.62mm | 1 | $0.80 | Phoenix/Wago |

### Módulo Comunicaciones

| Ref | Descripción | Modelo | Cant | Precio USD | Proveedor |
|-----|-------------|--------|------|-----------|-----------|
| U_485 | Transceptor RS-485 | MAX485CSA+ | 1 | $0.60 | Mouser/DigiKey |
| TVS_485A | TVS RS-485 línea A | SMBJ6.5CA | 1 | $0.20 | Mouser/DigiKey |
| TVS_485B | TVS RS-485 línea B | SMBJ6.5CA | 1 | $0.20 | Mouser/DigiKey |
| R_TERM | Resistencia terminación 120Ω | CF 120Ω 1/4W | 1 | $0.01 | Mercado local |
| R_BIAS_A | Resistencia bias 560Ω | CF 560Ω 1/4W | 1 | $0.01 | Mercado local |
| R_BIAS_B | Resistencia bias 560Ω | CF 560Ω 1/4W | 1 | $0.01 | Mercado local |
| J_RS485 | Conector DB9 hembra panel | DB9F-PCB | 1 | $0.50 | Mercado local |

### Gabinete y Mecánica

| Ref | Descripción | Modelo | Cant | Precio USD | Proveedor |
|-----|-------------|--------|------|-----------|-----------|
| GAB | Carcasa DIN ABS | Bopla Bocube B 106009 | 1 | $12.00 | Bopla/RS |
| DIN | Clip riel DIN | Clipsal DIN35 | 2 | $1.00 | Mercado local |
| TORN | Tornillos M3×6 | M3×6 inox | 4 | $0.20 | Mercado local |
| ETIQ | Etiqueta identificación | Impresión local | 1 | $0.50 | Local |

### PCB

| Ref | Descripción | Especificación | Cant | Precio USD |
|-----|-------------|----------------|------|-----------|
| PCB | Placa de circuito impreso | 160×100mm, 4 capas, FR4 | 1 | $8.00 |

---

## Componentes Críticos — Alternativas Locales Colombia

| Componente | Modelo Principal | Alternativa 1 | Alternativa 2 |
|-----------|-----------------|---------------|---------------|
| STM32F407VGT6 | STM32F407VGT6 | STM32F405RGT6 | STM32F407IGT6 |
| Relé 5V 10A | HF115F-H-005-1ZS1 | SRD-05VDC-SL-C | JQC-3FF-S-Z |
| Optoacoplador | PC817C | EL817C | 4N35 |
| Regulador buck | LM2596-5.0 | XL4016 | LM2576-5.0 |
| Regulador LDO | AMS1117-3.3 | LD1117-3.3 | LM1117-3.3 |
| Transceptor RS485 | MAX485CSA+ | SN75176B | SP485 |
| Driver relés | ULN2803ADWR | TD62083 | MC1413 |
| Flash SPI | W25Q64JVSIQ | AT25SF641 | MX25L6406E |

---

## Proveedores Recomendados Colombia

### Bogotá:
- **Electronilab** (www.electronilab.co) — Componentes electrónicos, módulos
- **Sigma Electrónica** — Componentes industriales, relés, borneras
- **Districomp** — Semiconductores, ICs
- **Mercado Libre Colombia** — Componentes varios, importados

### Medellín:
- **Electrónica Siglo XXI** — Componentes generales
- **Ingelectra** — Componentes industriales
- **Almacén Electrónico** — Semiconductores

### Nacional (online):
- **Mouser Electronics** (mouser.com) — Envío a Colombia, componentes originales
- **DigiKey** (digikey.com) — Envío a Colombia, amplio catálogo
- **AliExpress** — Económico, verificar calidad (no recomendado para producción)

### Borneras y Conectores:
- **Phoenix Contact** (distribuidores en Bogotá/Medellín)
- **Wago** (distribuidores en Colombia)
- **Dinkle** (alternativa económica, disponible en Colombia)
