import type { MikeWorkflow } from "../shared/types";

export const BUILT_IN_WORKFLOWS: MikeWorkflow[] = [
    {
        id: "builtin-cp-checklist",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Generar Lista de Condiciones Previas",
        type: "assistant",
        practice: "Transacciones Generales",
        prompt_md:
            "## Generar Lista de Condiciones Previas\n\n" +
            "Revisa el contrato de crédito o documento de financiamiento subido y genera una lista completa " +
            "de condiciones previas (Condiciones Precedentes, CP).\n\n" +
            "DEBES usar la herramienta generate_docx para producir la lista como un documento Word descargable. " +
            "DEBES pasar landscape: true a la herramienta generate_docx — el documento debe estar en orientación horizontal. " +
            "No muestres la lista en línea — genera el archivo .docx y proporciona el enlace de descarga.\n\n" +
            "Estructura el documento de la siguiente manera:\n" +
            "- Para cada categoría de condiciones (p. ej., Corporativas, Financieras, Legales, Garantías), agrega una sección con un encabezado\n" +
            "- Bajo cada encabezado de categoría, incluye una tabla con exactamente estas cuatro columnas en este orden:\n" +
            "  1. Índice — número secuencial dentro de la categoría (1, 2, 3…)\n" +
            "  2. Número de Cláusula — la referencia de la cláusula o anexo del contrato\n" +
            "  3. Cláusula — una descripción concisa de la condición precedente\n" +
            "  4. Estado — dejar en blanco (cadena vacía) para que el usuario complete\n\n" +
            "Usa el campo table en el objeto section (no content) para las filas de cada categoría.",
        columns_config: null,
    },
    {
        id: "builtin-coc-dd",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de Cambio de Control",
        type: "tabular",
        practice: "Corporativo",
        prompt_md:
            "## Revisión de Debida Diligencia de Cambio de Control\n\n" +
            "Este flujo de trabajo realiza una revisión de debida diligencia de cambio de control sobre los documentos seleccionados.",
        columns_config: [
            {
                index: 0,
                name: "Partes",
                format: "bulleted_list",
                prompt: "Identifica todas las partes de este contrato. Para cada parte indica su nombre legal completo y su rol (p. ej., contraparte, licenciante, prestamista, proveedor).",
            },
            {
                index: 1,
                name: "Fecha",
                format: "date",
                prompt: "¿Cuál es la fecha de este contrato? Si la fecha de entrada en vigor difiere de la fecha de firma, indica ambas.",
            },
            {
                index: 2,
                name: "Plazo",
                format: "text",
                prompt: "¿Cuál es el plazo o duración de este contrato? Indica las fechas de inicio y fin o la duración del plazo.",
            },
            {
                index: 3,
                name: "Cláusula de Cambio de Control",
                prompt: "Identifica y resume la(s) cláusula(s) de cambio de control en este documento. Cita el lenguaje exacto que activa la cláusula y especifica qué constituye un 'cambio de control'.",
            },
            {
                index: 4,
                name: "Consentimiento Requerido",
                prompt: "¿Requiere un cambio de control el consentimiento previo de alguna parte? Identifica quién debe consentir, el plazo de preaviso y cualquier condición.",
            },
            {
                index: 5,
                name: "Derechos de Terminación",
                prompt: "¿Qué derechos de terminación surgen ante un cambio de control? ¿Quién puede terminar y cuáles son los requisitos de preaviso?",
            },
            {
                index: 6,
                name: "Opciones Put/Call",
                prompt: "¿Existen opciones put o call activadas por un cambio de control? Resume los términos, el precio y el período de ejercicio.",
            },
            {
                index: 7,
                name: "Implicaciones Financieras",
                prompt: "¿Cuáles son las implicaciones financieras de un cambio de control? Incluye cualquier comisión, pago, obligación acelerada o ajuste de precios.",
            },
        ],
    },
    {
        id: "builtin-credit-summary",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Resumen de Contrato de Crédito",
        type: "assistant",
        practice: "Finanzas",
        prompt_md:
            "## Resumen de Contrato de Crédito\n\n" +
            "Revisa el contrato de crédito subido y elabora un resumen legal completo que cubra los siguientes temas. " +
            "Para cada sección, identifica las disposiciones clave, cita las referencias de cláusulas o anexos relevantes y señala cualquier término inusual, oneroso o fuera de mercado.\n\n" +
            "1. **Prestamistas** — Todos los prestamistas o miembros del sindicato de prestamistas, incluyendo su nombre legal completo y rol (p. ej., banco coordinador principal, prestamista original, banco agente)\n" +
            "2. **Prestatarios** — Todos los prestatarios, incluyendo su nombre legal completo y jurisdicción de constitución\n" +
            "3. **Garantes** — Todos los garantes, incluyendo su nombre legal completo y el alcance de su obligación de garantía\n" +
            "4. **Otras Partes** — Cualquier otra parte material (p. ej., agente de la facilidad, agente de garantías, contrapartes de cobertura, banco emisor) y sus roles\n" +
            "5. **Fecha del Contrato** — Fecha del contrato de crédito\n" +
            "6. **Facilidades** — Cada facilidad disponible (p. ej., Facilidad de Crédito Revolvente, Préstamo a Plazo A, Préstamo a Plazo B, Préstamo a Plazo C), el tipo de facilidad, nombre del tramo y cualquier característica estructural clave\n" +
            "7. **Monto** — Monto total comprometido entre todas las facilidades, la moneda y desglose por tramo si corresponde\n" +
            "8. **Propósito** — Propósito declarado para el cual se pueden utilizar los préstamos y cualquier restricción sobre el uso de los fondos\n" +
            "9. **Intereses** — Tasa de referencia aplicable (p. ej., SOFR, EURIBOR, tasa base), el margen, cualquier mecanismo de ajuste de margen y cómo se estructuran los períodos de interés\n" +
            "10. **Comisión de Compromiso** — Comisiones de compromiso o utilización, la tasa aplicable, cómo se calculan y la base (p. ej., compromiso no dispuesto, utilización promedio)\n" +
            "11. **Calendario de Amortización** — Perfil de amortización para cada facilidad, ya sea mediante cuotas programadas o pago único al vencimiento, y las fechas y montos de amortización\n" +
            "12. **Vencimiento** — Fecha de vencimiento final para cada facilidad\n" +
            "13. **Garantías** — Cada tipo de garantía otorgada o requerida (p. ej., prendas de acciones, cargas fijas y flotantes, hipotecas inmobiliarias, prendas de cuentas) y los activos o entidades sobre los cuales se constituye la garantía\n" +
            "14. **Garantías Personales** — Obligaciones de garantía, los garantes, el alcance de la garantía y cualquier limitación (p. ej., limitaciones de garantías aguas arriba, prueba de cobertura de garantes)\n" +
            "15. **Covenants Financieros** — Cada covenant financiero, la métrica (p. ej., ratio de apalancamiento, cobertura de intereses, cobertura de flujo de caja), la prueba aplicable, frecuencia de prueba y cualquier derecho de subsanación mediante aporte de capital\n" +
            "16. **Eventos de Incumplimiento** — Cada evento de incumplimiento, señalando cualquier período de gracia, umbrales de materialidad o disposiciones de incumplimiento cruzado\n" +
            "17. **Cesión** — Restricciones o permisos sobre cesión o transferencia (p. ej., listas blancas/negras, consentimiento del prestatario para transferencias de prestamistas; restricciones sobre cesión por el prestatario)\n" +
            "18. **Cambio de Control** — Qué constituye un cambio de control, qué obligaciones activa (p. ej., prepago obligatorio, cancelación, consentimiento del prestamista) y cualquier período de subsanación\n" +
            "19. **Comisión por Prepago** — Cualquier comisión por prepago, primas de compensación total (make-whole) o protecciones de llamada suave, la comisión aplicable, el período durante el cual aplica y cualquier excepción (p. ej., prepago por indemnización de seguros o venta de activos)\n" +
            "20. **Ley Aplicable** — Ley aplicable al contrato\n" +
            "21. **Resolución de Controversias** — Si las controversias se resuelven por litigio o arbitraje, el foro o sede elegido y cualquier disposición de sumisión a jurisdicción\n\n" +
            "Entrega el resumen en línea en tu respuesta del chat — NO llames a generate_docx. Solo produce un documento Word descargable si el usuario lo solicita explícitamente.",
        columns_config: null,
    },

    // ─── Contrato Comercial ───────────────────────────────────────────────────
    {
        id: "builtin-commercial-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de Contrato Comercial",
        type: "tabular",
        practice: "Transacciones Generales",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Partes",
                format: "bulleted_list",
                prompt: "Identifica todas las partes de este contrato. Para cada parte indica su nombre legal completo, jurisdicción de constitución (si se indica) y su rol en el contrato (p. ej., proveedor, cliente, licenciante).",
            },
            {
                index: 1,
                name: "Alcance del Trabajo",
                format: "text",
                prompt: "Resume el alcance del trabajo o servicios a prestar bajo este contrato. ¿Cuáles son los entregables, obligaciones o servicios clave? Identifica cualquier limitación o exclusión al alcance.",
            },
            {
                index: 2,
                name: "Modifica Contrato Anterior",
                format: "yes_no",
                prompt: "¿Este contrato modifica, reformula, complementa o reemplaza un contrato anterior? En caso afirmativo, identifica el contrato anterior por nombre y fecha.",
            },
            {
                index: 3,
                name: "Fecha de Entrada en Vigor",
                format: "date",
                prompt: "¿Cuál es la fecha de entrada en vigor o fecha de inicio de este contrato? Si no se indica una fecha explícita, señala cuándo se considera que entra en vigor.",
            },
            {
                index: 4,
                name: "Plazo",
                format: "text",
                prompt: "¿Cuál es la duración o plazo de este contrato? Indica la duración del plazo inicial y cualquier condición que afecte la duración.",
            },
            {
                index: 5,
                name: "Renovación",
                format: "text",
                prompt: "¿Qué disposiciones de renovación aplican? Especifica si la renovación es automática o requiere preaviso, el período de renovación y cualquier condición o plazo de preaviso requerido para evitar la renovación automática.",
            },
            {
                index: 6,
                name: "Precios",
                format: "text",
                prompt: "¿Cuál es la estructura de precios bajo este contrato? Identifica todas las tarifas, tasas, cargos y condiciones de pago incluyendo moneda, calendario de pagos y requisitos de facturación.",
            },
            {
                index: 7,
                name: "Ajustes de Precio",
                format: "text",
                prompt: "¿Existen mecanismos de ajuste de precio en este contrato? Identifica cualquier indexación, vinculación al IPC/IPR, evaluación comparativa, ajustes por volumen u otros mecanismos que permitan que los precios cambien durante el plazo.",
            },
            {
                index: 8,
                name: "Sanciones por Pago Tardío",
                format: "text",
                prompt: "¿Qué sanciones o consecuencias aplican por pago tardío? Incluye cualquier tasa de interés sobre montos vencidos, derechos de suspensión u otros recursos disponibles para el acreedor.",
            },
            {
                index: 9,
                name: "Valor Estimado del Contrato",
                format: "monetary_amount",
                prompt: "¿Cuál es el valor total estimado o declarado del contrato? Si no se indica una cifra única, calcula o estima con base en las tarifas indicadas y el plazo. Indica la moneda y cualquier supuesto utilizado.",
            },
            {
                index: 10,
                name: "Limitación de Responsabilidad",
                format: "text",
                prompt: "¿Qué limitaciones de responsabilidad aplican? Identifica cualquier tope de responsabilidad (incluyendo cómo se calcula), exclusiones de daños consecuenciales o indirectos y cualquier excepción al tope (p. ej., fraude, muerte, infracción de propiedad intelectual).",
            },
            {
                index: 11,
                name: "Propiedad Intelectual y Licencias",
                format: "text",
                prompt: "¿Cómo se aborda la titularidad y licencia de propiedad intelectual? Identifica quién es titular de la PI preexistente, quién es titular de la PI de nueva creación y qué licencias se otorgan a cada parte. Señala cualquier restricción de uso.",
            },
            {
                index: 12,
                name: "Cambio de Control",
                format: "text",
                prompt: "¿Existe una disposición de cambio de control? En caso afirmativo, describe qué constituye un cambio de control, si se requiere consentimiento y qué derechos (p. ej., terminación, cesión) se activan.",
            },
            {
                index: 13,
                name: "Fuerza Mayor",
                format: "text",
                prompt: "Resume la cláusula de fuerza mayor. ¿Qué eventos califican, qué obligaciones se suspenden, cuánto debe persistir el evento antes de que se permita la terminación y qué preaviso se requiere?",
            },
            {
                index: 14,
                name: "Derechos de Terminación",
                format: "text",
                prompt: "¿Cuáles son los derechos de terminación de cada parte? Identifica la terminación por conveniencia (incluyendo el plazo de preaviso), la terminación por causa (incluyendo períodos de subsanación) y las consecuencias de la terminación (p. ej., obligaciones de pago, supervivencia de términos).",
            },
            {
                index: 15,
                name: "Daños Liquidados",
                format: "text",
                prompt: "¿Existen disposiciones de daños liquidados? En caso afirmativo, identifica qué los activa, la tasa o fórmula aplicable, cualquier tope sobre daños liquidados acumulados y si constituyen el recurso exclusivo.",
            },
            {
                index: 16,
                name: "Ley Aplicable",
                format: "text",
                prompt: "¿Qué ley aplicable rige este contrato? Indica la jurisdicción y cualquier sistema legal específico referenciado.",
            },
            {
                index: 17,
                name: "Resolución de Controversias",
                format: "text",
                prompt: "¿Cómo se resuelven las controversias bajo este contrato? Identifica si las controversias se resuelven por litigio o arbitraje, el foro o sede elegido, cualquier paso de escalación o mediación requerido antes de procedimientos formales y el idioma de los procedimientos.",
            },
        ],
    },

    // ─── Contrato de Crédito ────────────────────────────────────────────────────────
    {
        id: "builtin-credit-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de Contrato de Crédito",
        type: "tabular",
        practice: "Finanzas",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Prestamistas",
                format: "bulleted_list",
                prompt: "Identifica todos los prestamistas (o el sindicato de prestamistas) nombrados en este contrato. Para cada uno, indica su nombre legal completo y rol (p. ej., banco coordinador principal, prestamista original, banco agente).",
            },
            {
                index: 1,
                name: "Prestatarios",
                format: "bulleted_list",
                prompt: "Identifica todos los prestatarios nombrados en este contrato, incluyendo su nombre legal completo y jurisdicción de constitución.",
            },
            {
                index: 2,
                name: "Garantes",
                format: "bulleted_list",
                prompt: "Identifica todos los garantes nombrados en este contrato, incluyendo su nombre legal completo y el alcance de su obligación de garantía.",
            },
            {
                index: 3,
                name: "Otras Partes",
                format: "bulleted_list",
                prompt: "Identifica cualquier otra parte material de este contrato (p. ej., agente de la facilidad, agente de garantías, contrapartes de cobertura, banco emisor). Indica su nombre y rol.",
            },
            {
                index: 4,
                name: "Fecha del Contrato",
                format: "date",
                prompt: "¿Cuál es la fecha de este contrato de crédito?",
            },
            {
                index: 5,
                name: "Facilidad",
                format: "bulleted_list",
                prompt: "Enumera cada facilidad disponible bajo este contrato (p. ej., Facilidad de Crédito Revolvente, Préstamo a Plazo A, Préstamo a Plazo B, Préstamo a Plazo C). Para cada una, indica el tipo de facilidad, nombre del tramo y cualquier característica estructural clave.",
            },
            {
                index: 6,
                name: "Monto",
                format: "monetary_amount",
                prompt: "¿Cuál es el monto total comprometido disponible bajo este contrato entre todas las facilidades? Indica el monto, la moneda y el desglose por tramo si corresponde.",
            },
            {
                index: 7,
                name: "Propósito",
                format: "text",
                prompt: "¿Cuál es el propósito declarado para el cual se pueden utilizar los préstamos bajo este contrato? Identifica cualquier restricción sobre el uso de los fondos.",
            },
            {
                index: 8,
                name: "Intereses",
                format: "text",
                prompt: "¿Qué tasa de interés aplica a los préstamos bajo este contrato? Identifica la tasa aplicable (p. ej., SOFR, EURIBOR, tasa base), el margen, cualquier mecanismo de ajuste de margen y cómo se estructuran los períodos de interés.",
            },
            {
                index: 9,
                name: "Comisión de Compromiso",
                format: "text",
                prompt: "¿Existe una comisión de compromiso o comisión de utilización? En caso afirmativo, indica la tasa aplicable, cómo se calcula y sobre qué base (p. ej., compromiso no dispuesto, utilización promedio).",
            },
            {
                index: 10,
                name: "Calendario de Amortización",
                format: "text",
                prompt: "Resume el calendario de amortización para cada facilidad. Identifica si la amortización es mediante cuotas programadas o pago único al vencimiento e indica las fechas y montos de amortización donde se especifiquen.",
            },
            {
                index: 11,
                name: "Vencimiento",
                format: "date",
                prompt: "¿Cuál es la fecha de vencimiento final de las facilidades bajo este contrato? Si distintas facilidades tienen distintos vencimientos, indica cada uno.",
            },
            {
                index: 12,
                name: "Garantías",
                format: "bulleted_list",
                prompt: "¿Qué garantías se otorgan o se requiere otorgar bajo este contrato? Enumera cada tipo de garantía (p. ej., prendas de acciones, cargas fijas y flotantes, hipotecas inmobiliarias, prendas de cuentas) y los activos o entidades sobre los cuales se constituye la garantía.",
            },
            {
                index: 13,
                name: "Garantías Personales",
                format: "bulleted_list",
                prompt: "¿Qué obligaciones de garantía personal se otorgan bajo o en relación con este contrato? Identifica los garantes, el alcance de la garantía y cualquier limitación (p. ej., limitaciones de garantías aguas arriba, prueba de cobertura de garantes).",
            },
            {
                index: 14,
                name: "Covenants Financieros",
                format: "bulleted_list",
                prompt: "¿Qué covenants financieros se incluyen en este contrato? Para cada covenant identifica la métrica (p. ej., ratio de apalancamiento, cobertura de intereses, cobertura de flujo de caja), la prueba aplicable, la frecuencia de prueba y cualquier derecho de subsanación mediante aporte de capital.",
            },
            {
                index: 15,
                name: "Eventos de Incumplimiento",
                format: "bulleted_list",
                prompt: "Enumera los eventos de incumplimiento bajo este contrato. Para cada uno, señala cualquier período de gracia, umbral de materialidad o disposición de incumplimiento cruzado.",
            },
            {
                index: 16,
                name: "Cesión",
                format: "text",
                prompt: "¿Qué restricciones o permisos aplican a la cesión o transferencia de derechos bajo este contrato? Identifica las restricciones sobre transferencias de prestamistas (p. ej., listas blancas/negras, consentimiento del prestatario) y sobre la cesión por el prestatario.",
            },
            {
                index: 17,
                name: "Cambio de Control",
                format: "text",
                prompt: "¿Existe una disposición de cambio de control? En caso afirmativo, ¿qué constituye un cambio de control, qué obligaciones activa (p. ej., prepago obligatorio, cancelación, consentimiento del prestamista) y existe algún período de subsanación?",
            },
            {
                index: 18,
                name: "Comisión por Prepago",
                format: "text",
                prompt: "¿Existen comisiones por prepago, primas de compensación total (make-whole) o protecciones de llamada suave? En caso afirmativo, indica la comisión aplicable, el período durante el cual aplica y cualquier excepción (p. ej., prepago por indemnización de seguros o venta de activos).",
            },
            {
                index: 19,
                name: "Ley Aplicable",
                format: "text",
                prompt: "¿Qué ley aplicable rige este contrato? Indica la jurisdicción y cualquier sistema legal específico referenciado.",
            },
            {
                index: 20,
                name: "Resolución de Controversias",
                format: "text",
                prompt: "¿Cómo se resuelven las controversias bajo este contrato? Identifica si las controversias se resuelven por litigio o arbitraje, el foro o sede elegido y cualquier disposición de sumisión a jurisdicción.",
            },
        ],
    },

    // ─── E-Discovery ─────────────────────────────────────────────────────────────
    {
        id: "builtin-ediscovery",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de E-Discovery",
        type: "tabular",
        practice: "Litigios",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Fecha",
                format: "date",
                prompt: "¿Cuál es la fecha de este documento? Para correos electrónicos o correspondencia, usa la fecha de envío. Para otros documentos, usa la fecha de creación, firma o la fecha más destacada que se muestre.",
            },
            {
                index: 1,
                name: "Tipo de Documento",
                format: "text",
                prompt: "¿Qué tipo de documento es este? (p. ej., correo electrónico, memorándum, carta, contrato, informe, actas de reunión, mensaje de texto, factura, presentación). Sé específico.",
            },
            {
                index: 2,
                name: "Remitente",
                format: "text",
                prompt: "¿Quién es el remitente o autor de este documento? Indica su nombre completo, cargo y organización cuando sea identificable.",
            },
            {
                index: 3,
                name: "Destinatario(s)",
                format: "bulleted_list",
                prompt: "¿Quiénes son los destinatarios de este documento? Enumera todos los destinatarios en Para, CC y CCO cuando sean identificables. Indica su nombre completo, cargo y organización para cada uno. Señala si aparecen en los campos Para, CC o CCO.",
            },
            {
                index: 4,
                name: "Resumen",
                format: "text",
                prompt: "Proporciona un resumen fáctico conciso del contenido de este documento en 2 a 4 oraciones. Enfócate en el tema clave, cualquier decisión tomada, acciones solicitadas o información transmitida. No incluyas conclusiones legales.",
            },
            {
                index: 5,
                name: "Personas Mencionadas",
                format: "bulleted_list",
                prompt: "Enumera todas las personas mencionadas en este documento (además del remitente y los destinatarios ya identificados). Para cada persona, indica su nombre y, si es discernible, su cargo u organización.",
            },
            {
                index: 6,
                name: "¿Privilegiado?",
                format: "yes_no",
                prompt: "¿Este documento parece estar legalmente privilegiado? Responde Sí si parece ser una comunicación entre un abogado y su cliente realizada con el propósito dominante de obtener o dar asesoría legal, o creada con el propósito dominante de un litigio. Responde No en caso contrario. Si hay incertidumbre, señala la base de la misma.",
            },
        ],
    },

    // ─── Contrato de Suministro ────────────────────────────────────────────────────────
    {
        id: "builtin-supply-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de Contrato de Suministro",
        type: "tabular",
        practice: "Transacciones Generales",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Partes",
                format: "bulleted_list",
                prompt: "Identifica todas las partes de este contrato de suministro. Para cada una, indica su nombre legal completo, jurisdicción de constitución (si se indica) y su rol (p. ej., proveedor, comprador, distribuidor).",
            },
            {
                index: 1,
                name: "Fecha de Entrada en Vigor",
                format: "date",
                prompt: "¿Cuál es la fecha de entrada en vigor o fecha de inicio de este contrato? Si no se indica una fecha explícita, señala la fecha en que se considera que entra en vigor.",
            },
            {
                index: 2,
                name: "Productos",
                format: "bulleted_list",
                prompt: "¿Qué productos deben suministrarse bajo este contrato? Enumera cada producto o categoría de producto, incluyendo cualquier especificación relevante, número de parte o norma referenciada.",
            },
            {
                index: 3,
                name: "Plazo",
                format: "text",
                prompt: "¿Cuál es el plazo o duración inicial de este contrato? Indica la fecha de inicio (o referencia a cuándo comienza) y la fecha de fin o duración.",
            },
            {
                index: 4,
                name: "Renovación",
                format: "text",
                prompt: "¿Qué disposiciones de renovación aplican? ¿La renovación es automática o por acuerdo? Indica el período de renovación, los requisitos de preaviso para evitar la renovación y cualquier condición para la renovación.",
            },
            {
                index: 5,
                name: "Entrega",
                format: "text",
                prompt: "¿Qué obligaciones y condiciones de entrega aplican? Identifica los términos de entrega (p. ej., Incoterms), plazos de entrega, lugares de entrega, riesgo de pérdida y cualquier consecuencia por entrega tardía o fallida.",
            },
            {
                index: 6,
                name: "Calidad",
                format: "text",
                prompt: "¿Qué normas o especificaciones de calidad aplican a los productos? Identifica cualquier norma aplicable (p. ej., ISO, requisitos regulatorios), derechos de inspección, procedimientos de aceptación y consecuencias de la no conformidad.",
            },
            {
                index: 7,
                name: "Garantías",
                format: "text",
                prompt: "¿Qué garantías otorga el proveedor en relación con los productos? Indica el período de garantía, el alcance de la garantía (p. ej., libre de defectos, conformidad con especificaciones), el recurso por incumplimiento (p. ej., reparación, reemplazo, reembolso) y cualquier exclusión.",
            },
            {
                index: 8,
                name: "Daños Liquidados",
                format: "text",
                prompt: "¿Existen disposiciones de daños liquidados? En caso afirmativo, identifica qué los activa (p. ej., entrega tardía, incumplimiento de estándares de calidad), la tasa o fórmula aplicable, cualquier tope acumulado y si se establece que constituyen el recurso exclusivo.",
            },
            {
                index: 9,
                name: "Limitación de Responsabilidad",
                format: "text",
                prompt: "¿Qué limitaciones de responsabilidad aplican? Identifica cualquier tope de responsabilidad (y cómo se calcula, p. ej., valor del contrato, tarifas pagadas), exclusiones de daños consecuenciales o indirectos y cualquier excepción a la limitación (p. ej., fraude, dolo, muerte o lesiones personales).",
            },
            {
                index: 10,
                name: "Fuerza Mayor",
                format: "text",
                prompt: "Resume la cláusula de fuerza mayor. ¿Qué eventos califican, qué obligaciones se suspenden, qué preaviso debe darse, cuánto debe persistir el evento antes de que cualquiera de las partes pueda terminar y cuáles son las consecuencias de la terminación por fuerza mayor?",
            },
            {
                index: 11,
                name: "Derechos de Terminación",
                format: "text",
                prompt: "¿Cuáles son los derechos de terminación de cada parte? Distingue entre terminación por conveniencia (incluyendo el plazo de preaviso) y terminación por causa (incluyendo períodos de subsanación y causales). Señala qué sucede al momento de la terminación, incluyendo cualquier orden de compra pendiente u obligación de pago.",
            },
            {
                index: 12,
                name: "Ley Aplicable",
                format: "text",
                prompt: "¿Qué ley aplicable rige este contrato? Indica la jurisdicción y cualquier sistema legal específico referenciado.",
            },
            {
                index: 13,
                name: "Resolución de Controversias",
                format: "text",
                prompt: "¿Cómo se resuelven las controversias bajo este contrato? Identifica si las controversias se resuelven por litigio o arbitraje, el foro o sede elegido y cualquier paso de escalación obligatorio (p. ej., negociación, mediación) antes de procedimientos formales.",
            },
        ],
    },

    // ─── SPA ─────────────────────────────────────────────────────────────────────
    {
        id: "builtin-spa",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de SPA",
        type: "tabular",
        practice: "Corporativo",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Partes",
                format: "bulleted_list",
                prompt: "Identifica todas las partes de este contrato de compraventa de acciones. Para cada una, indica su nombre legal completo, jurisdicción de constitución (si se indica) y su rol (p. ej., vendedor, comprador, sociedad objetivo, garante, otorgante de garantías).",
            },
            {
                index: 1,
                name: "Fecha",
                format: "date",
                prompt: "¿Cuál es la fecha de este contrato de compraventa de acciones?",
            },
            {
                index: 2,
                name: "Transacción",
                format: "text",
                prompt: "Resume la transacción. ¿Qué acciones o participaciones se están adquiriendo, en qué sociedad o sociedades objetivo y cuál es la naturaleza de la transacción (p. ej., adquisición del 100%, participación mayoritaria, inversión minoritaria)?",
            },
            {
                index: 3,
                name: "Contraprestación",
                format: "monetary_amount",
                prompt: "¿Cuál es la contraprestación pagadera bajo este contrato? Indica el precio total principal, la moneda y la estructura (p. ej., efectivo, acciones, pagarés, contraprestación diferida, earnout). Si el precio está sujeto a ajuste (p. ej., caja cerrada, cuentas de cierre), describe el mecanismo.",
            },
            {
                index: 4,
                name: "Condiciones Previas Clave",
                format: "bulleted_list",
                prompt: "Enumera las condiciones previas (CPs) clave para el cierre. Para cada CP, indica qué debe cumplirse o dispensarse y por quién. Identifica cualquier fecha límite (long-stop date) para la cual deben cumplirse las CPs.",
            },
            {
                index: 5,
                name: "Fecha de Cierre",
                format: "text",
                prompt: "¿Cuándo ocurre el cierre? Indica cuántos días hábiles después del cumplimiento o dispensa de todas las CPs debe ocurrir el cierre y/o cualquier fecha límite fija para el cierre. Señala si existe alguna obligación de cerrar para una fecha específica después de la firma.",
            },
            {
                index: 6,
                name: "Garantías",
                format: "text",
                prompt: "Resume el paquete de garantías. ¿Quién otorga las garantías (p. ej., vendedor, administración, todos los vendedores solidariamente)? ¿Existen garantías comerciales y/o garantías de titularidad? Identifica el alcance de cualquier proceso de revelación de garantías y cualquier limitación a las reclamaciones de garantía (p. ej., plazos, umbrales mínimos de reclamación, tope acumulado).",
            },
            {
                index: 7,
                name: "Indemnizaciones",
                format: "text",
                prompt: "¿Existen indemnizaciones específicas en este contrato? En caso afirmativo, enumera las indemnizaciones clave otorgadas, por quién y por qué posibles responsabilidades (p. ej., indemnización fiscal, indemnización ambiental, indemnización por litigios). Señala cualquier plazo o tope aplicable a las reclamaciones de indemnización.",
            },
            {
                index: 8,
                name: "Limitación de Responsabilidad",
                format: "text",
                prompt: "¿Qué limitaciones de responsabilidad aplican a las reclamaciones de garantía e indemnización? Identifica el tope acumulado (y cómo se calcula, p. ej., como porcentaje de la contraprestación), cualquier tope separado para garantías fundamentales o indemnizaciones, umbrales mínimos de reclamación (de minimis y franquicia/deducible) y plazos para presentar reclamaciones.",
            },
            {
                index: 9,
                name: "Pactos Restrictivos",
                format: "text",
                prompt: "¿Qué pactos restrictivos u otros compromisos otorga el vendedor o la administración? Incluye pactos de no competencia, no solicitación y no contratación, indicando el alcance (actividades y geografía) y duración de cada uno.",
            },
            {
                index: 10,
                name: "Exclusividad",
                format: "text",
                prompt: "¿Existe una disposición de exclusividad o no-shop en este contrato? En caso afirmativo, indica el período de exclusividad, qué actividades están restringidas (p. ej., solicitar ofertas competidoras, relacionarse con terceros) y cualquier excepción o disposición de comisión por ruptura (break fee).",
            },
            {
                index: 11,
                name: "Ley Aplicable y Jurisdicción",
                format: "text",
                prompt: "¿Qué ley aplicable rige este contrato y qué tribunales o cortes arbitrales tienen jurisdicción? Indica la ley elegida, el foro para controversias y si la jurisdicción es exclusiva o no exclusiva.",
            },
            {
                index: 12,
                name: "Resolución de Controversias",
                format: "text",
                prompt: "¿Cómo se resolverán las controversias bajo este contrato? Identifica si las controversias se resuelven por litigio o arbitraje, la sede o foro elegido, las reglas aplicables (si es arbitraje) y cualquier paso de escalación previo obligatorio.",
            },
        ],
    },

    // ─── NDA ─────────────────────────────────────────────────────────────────────
    {
        id: "builtin-nda",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de NDA",
        type: "tabular",
        practice: "Transacciones Generales",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Dirección",
                format: "tag",
                tags: ["Mutuo", "Unilateral"],
                prompt: "¿Es este NDA mutuo (ambas partes tienen obligaciones de confidencialidad entre sí) o unilateral (solo una parte tiene obligaciones de confidencialidad)? Identifica la dirección y nombra a la parte reveladora y a la parte receptora.",
            },
            {
                index: 1,
                name: "Definición de Información Confidencial",
                format: "text",
                prompt: "¿Cómo se define la 'Información Confidencial' en este contrato? ¿Está redactada de manera amplia o restrictiva? ¿Requiere que la información esté marcada como confidencial o toda la información compartida en relación con el propósito queda automáticamente cubierta? Señala cualquier inclusión o exclusión expresa.",
            },
            {
                index: 2,
                name: "Obligaciones de la Parte Receptora",
                format: "bulleted_list",
                prompt: "¿Cuáles son las obligaciones clave de la parte receptora respecto de la información confidencial? Enumera cada obligación (p. ej., mantener confidencialidad, no divulgar a terceros, usar solo para el propósito permitido, aplicar un estándar de cuidado específico, restringir acceso a personal con necesidad de conocer).",
            },
            {
                index: 3,
                name: "¿Exclusiones Estándar Presentes?",
                format: "yes_no",
                prompt: "¿Incluye el contrato las exclusiones estándar a las obligaciones de confidencialidad? Responde Sí si el contrato excluye información que: (a) es o se vuelve de dominio público sin incumplimiento; (b) ya era conocida por la parte receptora; (c) se desarrolla de forma independiente; y (d) se recibe de un tercero sin restricción. Señala cualquier exclusión que falte o esté redactada de manera diferente a la formulación estándar.",
            },
            {
                index: 4,
                name: "Divulgaciones Permitidas",
                format: "bulleted_list",
                prompt: "¿A quién puede la parte receptora divulgar información confidencial? Enumera cada categoría de destinatario permitido (p. ej., empleados, asesores profesionales, afiliadas, entidades financieras, autoridades regulatorias). Señala si la divulgación ulterior requiere que el destinatario esté sujeto a obligaciones equivalentes.",
            },
            {
                index: 5,
                name: "Plazo y Duración",
                format: "text",
                prompt: "¿Cuál es el plazo de este NDA y cuánto duran las obligaciones de confidencialidad? Indica el plazo inicial del contrato y la duración de las obligaciones de confidencialidad (señalando si sobreviven a la terminación y por cuánto tiempo).",
            },
            {
                index: 6,
                name: "Devolución y Destrucción",
                format: "text",
                prompt: "¿Qué obligaciones aplican al vencimiento o terminación respecto de la devolución o destrucción de información confidencial? ¿Existe opción entre devolución y destrucción? ¿Debe certificarse la destrucción? ¿Existen excepciones de retención (p. ej., para fines regulatorios, sistemas de respaldo de TI)?",
            },
            {
                index: 7,
                name: "Recursos",
                format: "text",
                prompt: "¿Qué recursos están disponibles por incumplimiento de las obligaciones de confidencialidad? ¿Reconoce el contrato que los daños pueden ser inadecuados y que hay disponibles medidas cautelares o cumplimiento específico? ¿Existen daños liquidados pactados o indemnizaciones por incumplimiento?",
            },
            {
                index: 8,
                name: "Ley Aplicable y Jurisdicción",
                format: "text",
                prompt: "¿Qué ley aplicable rige este contrato y qué tribunales tienen jurisdicción? Indica la ley elegida, el foro y si la jurisdicción es exclusiva o no exclusiva.",
            },
        ],
    },

    // ─── Arrendamiento Comercial ─────────────────────────────────────────────────────────
    {
        id: "builtin-commercial-lease",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de Arrendamiento Comercial",
        type: "tabular",
        practice: "Bienes Raíces",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Arrendador",
                format: "text",
                prompt: "¿Quién es el arrendador bajo este contrato de arrendamiento? Indica el nombre legal completo, jurisdicción de constitución o registro (si aplica) y cualquier domicilio registrado o número de título indicado.",
            },
            {
                index: 1,
                name: "Arrendatario",
                format: "text",
                prompt: "¿Quién es el arrendatario bajo este contrato de arrendamiento? Indica el nombre legal completo, jurisdicción de constitución o registro (si aplica) y cualquier domicilio registrado indicado.",
            },
            {
                index: 2,
                name: "Garante",
                format: "text",
                prompt: "¿Existe un garante bajo este contrato de arrendamiento? En caso afirmativo, indica el nombre legal completo del garante y el alcance de la garantía (p. ej., garantía total de las obligaciones del arrendatario o limitada a obligaciones específicas). Si no hay garante, indícalo explícitamente.",
            },
            {
                index: 3,
                name: "Inmueble",
                format: "text",
                prompt: "Describe el inmueble arrendado bajo este contrato. Incluye la dirección, piso(s), referencia de unidad, superficie interna neta (si se indica) y cualquier área incluida o excluida del arrendamiento (p. ej., áreas comunes, techo, estructura, estacionamiento).",
            },
            {
                index: 4,
                name: "Fecha del Contrato",
                format: "date",
                prompt: "¿Cuál es la fecha de este contrato de arrendamiento? Si el contrato no tiene fecha o si la fecha de inicio del plazo difiere de la fecha de firma, indica ambas.",
            },
            {
                index: 5,
                name: "Plazo",
                format: "text",
                prompt: "¿Cuál es el plazo contractual de este arrendamiento? Indica la duración del plazo y las fechas de inicio y vencimiento del plazo.",
            },
            {
                index: 6,
                name: "Renta",
                format: "monetary_amount",
                prompt: "¿Cuál es la renta anual inicial pagadera bajo este contrato de arrendamiento? Indica el monto, la moneda, la frecuencia de pago (p. ej., trimestral por adelantado) y las fechas de pago. Señala cualquier período de carencia de renta o renta concesional inicial.",
            },
            {
                index: 7,
                name: "Revisión de Renta",
                format: "text",
                prompt: "¿Existen disposiciones de revisión de renta? En caso afirmativo, indica las fechas o frecuencia de revisión, el mecanismo de revisión (p. ej., revisión a renta de mercado, indexación IPC/IPR, incremento fijo), si la revisión es solo al alza, cualquier supuesto y exclusión aplicable a una revisión de mercado y el mecanismo de resolución de controversias si las partes no pueden acordar la renta revisada.",
            },
            {
                index: 8,
                name: "Gastos Comunes",
                format: "text",
                prompt: "¿Es responsable el arrendatario de los gastos comunes? En caso afirmativo, describe qué costos se incluyen dentro de los gastos comunes, la prorrata o porcentaje del arrendatario, cualquier tope sobre los gastos comunes y cómo se administran y concilian los gastos comunes.",
            },
            {
                index: 9,
                name: "Seguro",
                format: "text",
                prompt: "¿Cuáles son las obligaciones de seguro bajo este contrato de arrendamiento? Indica quién asegura (arrendador o arrendatario), qué riesgos deben asegurarse, quién soporta el costo de la prima de seguro y las obligaciones del arrendatario respecto del seguro del arrendador (p. ej., no viciar la póliza, pagar la prima como renta adicional).",
            },
            {
                index: 10,
                name: "Uso Permitido",
                format: "text",
                prompt: "¿Cuál es el uso permitido del inmueble bajo este contrato de arrendamiento? Indica la clase de uso o uso específico permitido e identifica cualquier restricción de uso. Señala si se requiere el consentimiento del arrendador para cambiar el uso y sobre qué base se puede denegar el consentimiento.",
            },
            {
                index: 11,
                name: "Reparación y Mantenimiento",
                format: "text",
                prompt: "¿Quién es responsable de la reparación y mantenimiento del inmueble? Describe el alcance de la obligación de reparación del arrendatario (p. ej., reparación total, solo reparación interior, sujeto a un inventario de condiciones). Indica las obligaciones de reparación del arrendador, si las hay, respecto de la estructura, exterior o áreas comunes.",
            },
            {
                index: 12,
                name: "Modificaciones",
                format: "text",
                prompt: "¿Qué modificaciones puede realizar el arrendatario al inmueble? Distingue entre modificaciones estructurales y no estructurales. ¿Se requiere el consentimiento del arrendador y, en caso afirmativo, sobre qué base se puede denegar? ¿Debe el arrendatario reponer las modificaciones al final del plazo?",
            },
            {
                index: 13,
                name: "Cesión y Subarrendamiento",
                format: "text",
                prompt: "¿Qué derechos tiene el arrendatario para ceder o subarrendar el inmueble? Indica si la cesión y el subarrendamiento están permitidos con el consentimiento del arrendador, sobre qué bases se puede denegar el consentimiento, cualquier condición a cumplir (p. ej., un acuerdo de garantía autorizado en la cesión, renta no inferior a la renta vigente en el subarrendamiento) y si alguna operación está prohibida de manera absoluta.",
            },
            {
                index: 14,
                name: "Derechos de Rescisión Anticipada",
                format: "text",
                prompt: "¿Existen derechos de rescisión anticipada en este contrato de arrendamiento? En caso afirmativo, identifica quién tiene el derecho de rescisión (arrendador, arrendatario o ambos), la(s) fecha(s) de rescisión, el plazo de preaviso y la forma requerida para ejercer la rescisión y cualquier condición previa para el ejercicio efectivo (p. ej., ausencia de incumplimiento material, posesión vacante, pago de todas las sumas debidas).",
            },
            {
                index: 15,
                name: "Protección Legal de Permanencia",
                format: "yes_no",
                prompt: "¿Tiene el arrendatario protección legal de permanencia (p. ej., bajo la Ley de Arrendador y Arrendatario de 1954 en Inglaterra y Gales o legislación equivalente en otra jurisdicción)? Responde Sí si el arrendamiento está dentro del régimen o se beneficia de la protección de permanencia. Responde No si el arrendamiento ha sido excluido o si la protección de permanencia no aplica. Indica la base de tu respuesta.",
            },
            {
                index: 16,
                name: "Deterioros",
                format: "text",
                prompt: "¿Qué obligaciones de deterioros aplican al final del plazo? Describe las obligaciones de entrega del arrendatario (p. ej., entregar el inmueble en buen estado de reparación, reponer modificaciones, redecorar). ¿Existe un inventario de condiciones que limite la responsabilidad del arrendatario? Señala cualquier tope de deterioros u otra limitación sobre la reclamación del arrendador.",
            },
            {
                index: 17,
                name: "Depósito de Renta",
                format: "monetary_amount",
                prompt: "¿Se requiere un depósito de renta? En caso afirmativo, indica el monto, el período durante el cual se mantiene, las condiciones bajo las cuales el arrendador puede disponer de él y las circunstancias en que se devuelve al arrendatario.",
            },
            {
                index: 18,
                name: "Rescisión por Incumplimiento y Terminación",
                format: "text",
                prompt: "¿Cuáles son los derechos de rescisión por incumplimiento o terminación del arrendador? Identifica los eventos que dan derecho al arrendador a rescindir el arrendamiento (p. ej., falta de pago de renta después de un período de gracia, incumplimiento material de obligaciones, insolvencia) y cualquier requisito de preaviso antes de que se pueda ejercer la rescisión.",
            },
            {
                index: 19,
                name: "Ley Aplicable",
                format: "text",
                prompt: "¿Qué ley aplicable rige este contrato de arrendamiento y qué tribunales tienen jurisdicción sobre las controversias?",
            },
        ],
    },

    // ─── Contrato de Sociedad Limitada ───────────────────────────────────────────
    {
        id: "builtin-lpa",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de Contrato de Sociedad Limitada",
        type: "tabular",
        practice: "Capital Privado",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Socio General",
                format: "text",
                prompt: "Identifica al Socio General (General Partner o GP) del fondo. Indica el nombre legal completo, jurisdicción de constitución y cualquier entidad de gestión afiliada (p. ej., el gestor del fondo o asesor de inversiones) nombrada en el contrato.",
            },
            {
                index: 1,
                name: "Nombre del Fondo y Jurisdicción",
                format: "text",
                prompt: "¿Cuál es el nombre completo del fondo y en qué jurisdicción está constituida o registrada la sociedad limitada?",
            },
            {
                index: 2,
                name: "Capital Comprometido Total",
                format: "monetary_amount",
                prompt: "¿Cuál es el capital comprometido total del fondo? Indica el tamaño objetivo, cualquier tope máximo (hard cap), la moneda y la fecha o fechas de cierre si se especifican.",
            },
            {
                index: 3,
                name: "Llamadas de Capital y Disposiciones",
                format: "text",
                prompt: "¿Cómo y cuándo puede el GP solicitar capital a los LPs? Indica el plazo de preaviso para las llamadas de capital, la mecánica para emitir una notificación de llamada, cualquier límite en la frecuencia o tamaño de las llamadas y si los compromisos no dispuestos pueden ser llamados nuevamente después del reembolso.",
            },
            {
                index: 4,
                name: "Sanciones por Incumplimiento de Aportación",
                format: "text",
                prompt: "¿Cuáles son las consecuencias si un LP no cumple con una llamada de capital? Describe cualquier sanción (p. ej., intereses sobre el déficit, dilución de participación, transferencia forzosa con descuento, pérdida de derechos de voto o distribución, exclusión de inversiones futuras). ¿Existen períodos de subsanación antes de que apliquen las sanciones?",
            },
            {
                index: 5,
                name: "Alcance y Restricciones de Inversión",
                format: "text",
                prompt: "¿Cuál es la estrategia de inversión declarada del fondo, su alcance y cualquier restricción? Incluye sectores permitidos, geografías, etapas de inversión, tipos de instrumentos y cualquier límite de concentración (p. ej., porcentaje máximo del capital comprometido por inversión individual). Señala cuánta discreción tiene el GP para desviarse de la estrategia declarada.",
            },
            {
                index: 6,
                name: "Plazo del Fondo",
                format: "text",
                prompt: "¿Cuál es el plazo del fondo? Indica el plazo inicial (p. ej., 10 años desde el cierre final), cualquier período de extensión permitido (p. ej., 2 extensiones de 1 año), quién tiene el derecho de aprobar las extensiones (solo el GP o con consentimiento de LP/LPAC) y cualquier mecánica de terminación anticipada.",
            },
            {
                index: 7,
                name: "Comisión de Gestión",
                format: "text",
                prompt: "¿Qué comisión de gestión es pagadera al GP o gestor? Indica la tasa de la comisión, la base sobre la cual se calcula (p. ej., capital comprometido durante el período de inversión, luego capital invertido o valor liquidativo después), cualquier reducción escalonada durante la vida del fondo y la frecuencia de pago.",
            },
            {
                index: 8,
                name: "Carried Interest (Participación en Beneficios)",
                format: "text",
                prompt: "¿Qué carried interest (carry) es pagadero al GP? Indica el porcentaje de carry, la estructura (cascada de distribución a nivel de fondo/europea vs. operación por operación/americana) e identifica cada paso de la cascada de distribución en secuencia (p. ej., devolución de capital, rentabilidad preferente, recuperación del GP, luego reparto de beneficios).",
            },
            {
                index: 9,
                name: "Rentabilidad Preferente (Tasa Hurdle)",
                format: "percentage",
                prompt: "¿Existe una rentabilidad preferente o tasa hurdle que los LPs deben recibir antes de que el GP obtenga carry? Indica la tasa, si es compuesta (y sobre qué base) y cómo se calcula (p. ej., sobre capital invertido, sobre capital aportado). Si no hay rentabilidad preferente, indícalo explícitamente.",
            },
            {
                index: 10,
                name: "Recuperación del GP (GP Catch-Up)",
                format: "text",
                prompt: "¿Existe un mecanismo de recuperación del GP (GP catch-up) después de alcanzada la rentabilidad preferente? En caso afirmativo, describe cómo opera: qué porcentaje de las distribuciones va al GP durante la recuperación y qué resultado económico busca lograr la recuperación (p. ej., el GP recibe el 20% de todas las ganancias hasta la fecha).",
            },
            {
                index: 11,
                name: "Clawback (Devolución de Excesos)",
                format: "text",
                prompt: "¿Existe una obligación de clawback para el GP si recibe carry en exceso? Indica si el clawback se calcula a nivel de fondo o a nivel de socio individual, cuándo se activa, cualquier tope o límite sobre la obligación de clawback y si existe algún depósito en garantía (escrow) u otro mecanismo de seguridad para respaldar la obligación de clawback del GP.",
            },
            {
                index: 12,
                name: "Comisiones y Gastos (Más Allá de la Comisión de Gestión)",
                format: "bulleted_list",
                prompt: "¿Qué comisiones y gastos se cargan al fondo o a los LPs más allá de la comisión de gestión? Enumera cada categoría (p. ej., comisiones de transacción, comisiones de seguimiento, costos de operaciones fallidas, gastos de constitución, honorarios legales, costos de administración del fondo, gastos organizativos). Para cada una, indica quién soporta el costo y si algún monto se compensa contra la comisión de gestión.",
            },
            {
                index: 13,
                name: "Distribuciones",
                format: "text",
                prompt: "¿Cómo y cuándo se realizan las distribuciones a los LPs? Describe el momento de las distribuciones (p. ej., al realizarse las inversiones o a discreción del GP), si el GP puede reinvertir los ingresos dentro del período de inversión y si las distribuciones pueden hacerse en especie (es decir, como valores en lugar de efectivo).",
            },
            {
                index: 14,
                name: "Cláusula de Personas Clave",
                format: "text",
                prompt: "¿Existe una cláusula de personas clave? Identifica a las personas clave designadas. ¿Qué activa el evento de persona clave (p. ej., salida, incapacidad, reducción del compromiso de tiempo por debajo de un umbral)? ¿Cuáles son las consecuencias (p. ej., suspensión del período de inversión)? ¿Tienen los LPs algún derecho a terminar o votar sobre la continuación tras un evento de persona clave?",
            },
            {
                index: 15,
                name: "Remoción del GP",
                format: "text",
                prompt: "¿Bajo qué circunstancias puede ser removido el GP? Distingue entre remoción por causa (p. ej., fraude, negligencia grave, dolo — indica el umbral de votación de LPs requerido) y remoción sin causa (indica el umbral de votación de LPs y cualquier consecuencia asociada, como el tratamiento del carried interest al momento de la remoción).",
            },
            {
                index: 16,
                name: "Comité Asesor (LPAC)",
                format: "text",
                prompt: "¿Existe un Comité Asesor de LPs (LPAC) u órgano de gobierno similar? En caso afirmativo, describe su composición, cómo se seleccionan los miembros, sus poderes y responsabilidades clave (p. ej., aprobar conflictos de interés, valoraciones, extensiones, operaciones con partes vinculadas) y si su aprobación es vinculante o meramente consultiva.",
            },
            {
                index: 17,
                name: "Restricciones de Transferencia",
                format: "text",
                prompt: "¿Qué restricciones aplican a la transferencia o cesión de la participación de un LP en el fondo? ¿Se requiere el consentimiento del GP? ¿Existen excepciones de transferencia permitida (p. ej., a afiliadas)? ¿Se permiten ventas en el mercado secundario y, en caso afirmativo, sujetas a qué condiciones o derechos de primera oferta?",
            },
            {
                index: 18,
                name: "Conflictos de Interés",
                format: "text",
                prompt: "¿Cómo aborda el contrato los conflictos de interés? Describe la política de asignación de operaciones entre fondos, cualquier derecho de co-inversión otorgado a los LPs, restricciones sobre operaciones con partes vinculadas y el rol del LPAC en la revisión o aprobación de conflictos. Señala cualquier escenario de conflicto específico expresamente contemplado.",
            },
            {
                index: 19,
                name: "Ley Aplicable",
                format: "text",
                prompt: "¿Qué ley aplicable rige este contrato y qué tribunales o cortes arbitrales tienen jurisdicción sobre las controversias?",
            },
        ],
    },

    // ─── Pacto de Socios (Asistente) ───────────────────────────────────────
    {
        id: "builtin-sha-summary",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Resumen de Pacto de Socios",
        type: "assistant",
        practice: "Corporativo",
        prompt_md:
            "## Resumen de Pacto de Socios\n\n" +
            "Revisa el pacto de socios subido y elabora un resumen legal completo que cubra los siguientes temas. " +
            "Para cada sección, identifica las disposiciones clave, cita las referencias de cláusulas relevantes y señala cualquier término inusual, oneroso o desviación del estándar de mercado.\n\n" +
            "1. **Partes y Participaciones** — Nombres legales completos, roles, clases de acciones poseídas y porcentajes de participación (sobre base totalmente diluida si se indica)\n" +
            "2. **Clases de Acciones y Derechos** — Para cada clase: derechos de voto, derechos a dividendos, preferencia de liquidación, características de conversión o rescate\n" +
            "3. **Composición del Consejo y Gobierno** — Tamaño del consejo, derechos de designación de consejeros (y los umbrales de participación requeridos para mantenerlos), quórum y voto de calidad\n" +
            "4. **Materias Reservadas** — Decisiones que requieren mayoría cualificada, unanimidad o el consentimiento de un socio específico; señala el umbral y de quién se requiere el consentimiento para cada una\n" +
            "5. **Derecho de Suscripción Preferente sobre Nuevas Acciones** — Quién tiene derechos de suscripción preferente, procedimiento, plazos y cualquier excepción (p. ej., planes de opciones para empleados)\n" +
            "6. **Restricciones de Transferencia** — Períodos de bloqueo, transferencias prohibidas, transferencias permitidas (p. ej., a afiliadas) y cualquier requisito de aprobación del consejo o de los socios\n" +
            "7. **Derecho de Primera Oferta / Preferencia en Transferencia** — Causante, procedimiento, mecánica de fijación de precios y cualquier excepción\n" +
            "8. **Derechos de Arrastre (Drag-Along)** — Quién tiene el derecho, umbral para activarlo, condiciones (p. ej., precio mínimo, valoración independiente) y protecciones para minoritarios\n" +
            "9. **Derechos de Acompañamiento (Tag-Along)** — Quién tiene el derecho, umbral de activación, procedimiento de ejercicio y condiciones de precio\n" +
            "10. **Protecciones Anti-Dilución** — Tipo (full ratchet, media ponderada), eventos desencadenantes, mecánica de cálculo y excepciones\n" +
            "11. **Política de Dividendos** — Cualquier obligación u objetivo de pagar dividendos, derechos preferentes de dividendo y restricciones sobre distribuciones\n" +
            "12. **Salida y Liquidez** — Rutas de salida acordadas (venta comercial, OPI, venta por arrastre), plazos y preferencias de liquidación en la salida\n" +
            "13. **Punto Muerto (Deadlock)** — Definición de punto muerto, mecanismos de escalación y resolución (p. ej., ruleta rusa, opciones put/call) y consecuencias si no se resuelve\n" +
            "14. **No Competencia y No Solicitación** — Quién está obligado, alcance de actividades y geografía, duración y exclusiones\n" +
            "15. **Ley Aplicable y Resolución de Controversias** — Ley aplicable, foro, arbitraje o litigio y cualquier paso de escalación obligatorio\n\n" +
            "Genera el resumen como un documento Word descargable.",
        columns_config: null,
    },

    // ─── Pacto de Socios ────────────────────────────────────────────────────
    {
        id: "builtin-shareholder-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de Pacto de Socios",
        type: "tabular",
        practice: "Corporativo",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Partes",
                format: "bulleted_list",
                prompt: "Identifica todas las partes de este pacto de socios. Para cada una, indica su nombre legal completo, jurisdicción de constitución o establecimiento (si se indica) y su rol (p. ej., sociedad, socio mayoritario, socio minoritario, inversor, fundador, socio directivo).",
            },
            {
                index: 1,
                name: "Fecha",
                format: "date",
                prompt: "¿Cuál es la fecha de este pacto de socios?",
            },
            {
                index: 2,
                name: "Capital Social y Clases",
                format: "bulleted_list",
                prompt: "¿Qué clases de acciones están emitidas o contempladas por este contrato? Para cada clase, describe los derechos clave inherentes a la misma incluyendo derechos de voto, derechos a dividendos, preferencia de liquidación (si la hay) y cualquier característica de conversión o rescate.",
            },
            {
                index: 3,
                name: "Participaciones",
                format: "bulleted_list",
                prompt: "¿Cuáles son las participaciones de cada parte según lo establecido o contemplado en este contrato? Para cada socio, indica el número de acciones poseídas, la clase y el porcentaje del capital social total (sobre base totalmente diluida si se indica).",
            },
            {
                index: 4,
                name: "Composición del Consejo",
                format: "text",
                prompt: "¿Cómo se constituye el consejo de administración bajo este contrato? Indica el número total de consejeros, el derecho de cada socio o clase de socios a designar o nominar consejeros (y el umbral de participación requerido para mantener ese derecho) y cualquier disposición sobre presidente o voto de calidad.",
            },
            {
                index: 5,
                name: "Materias Reservadas",
                format: "bulleted_list",
                prompt: "¿Cuáles son las materias reservadas o derechos de veto establecidos en este contrato? Enumera cada materia que requiere aprobación de socios o consejeros más allá de una mayoría simple (p. ej., mayoría cualificada, unanimidad o el consentimiento de un socio específico). Identifica el umbral aplicable o de quién se requiere el consentimiento para cada una.",
            },
            {
                index: 6,
                name: "Derecho de Suscripción Preferente sobre Nuevas Acciones",
                format: "text",
                prompt: "¿Qué derechos de suscripción preferente aplican a la emisión de nuevas acciones? Describe quién tiene derechos de suscripción preferente, el procedimiento para ofrecer nuevas acciones a los socios existentes, el plazo para la aceptación y cualquier excepción (p. ej., acciones emitidas bajo un plan de opciones para empleados, emisiones permitidas).",
            },
            {
                index: 7,
                name: "Restricciones de Transferencia",
                format: "text",
                prompt: "¿Qué restricciones aplican a la transferencia de acciones? Identifica cualquier período de bloqueo (y su duración), qué transferencias están prohibidas de manera absoluta y qué transferencias están permitidas sin consentimiento (p. ej., transferencias a afiliadas o fideicomisos familiares). Señala cualquier requisito de aprobación del consejo o de los socios para transferencias.",
            },
            {
                index: 8,
                name: "Derecho de Primera Oferta / Preferencia en Transferencia",
                format: "text",
                prompt: "¿Existe un derecho de primera oferta o derecho de preferencia sobre una transferencia de acciones propuesta? En caso afirmativo, describe quién tiene el derecho, el procedimiento para activarlo y ejercerlo (incluyendo plazos de preaviso y mecánica de fijación de precios) y cualquier excepción.",
            },
            {
                index: 9,
                name: "Derechos de Arrastre (Drag-Along)",
                format: "text",
                prompt: "¿Existen derechos de arrastre (drag-along)? En caso afirmativo, identifica quién tiene el derecho de arrastre (p. ej., socios mayoritarios por encima de un umbral especificado), el umbral requerido para activar el arrastre, las obligaciones impuestas a los socios arrastrados, cualquier condición sobre el arrastre (p. ej., precio mínimo, valoración independiente) y cualquier protección para socios minoritarios.",
            },
            {
                index: 10,
                name: "Derechos de Acompañamiento (Tag-Along)",
                format: "text",
                prompt: "¿Existen derechos de acompañamiento (tag-along)? En caso afirmativo, identifica quién tiene el derecho de acompañamiento, la transferencia umbral que activa el acompañamiento, el procedimiento para ejercer el acompañamiento (incluyendo plazos de preaviso), el precio y condiciones bajo los cuales el socio acompañante puede vender y cualquier excepción.",
            },
            {
                index: 11,
                name: "Protecciones Anti-Dilución",
                format: "text",
                prompt: "¿Existen protecciones anti-dilución para alguna clase de socios? En caso afirmativo, describe el tipo de protección (p. ej., full ratchet, media ponderada, base amplia o restringida), los eventos desencadenantes, cómo se calcula el precio o derecho ajustado y cualquier excepción (p. ej., emisiones permitidas excluidas del cálculo).",
            },
            {
                index: 12,
                name: "Política de Dividendos",
                format: "text",
                prompt: "¿Qué disposiciones sobre dividendos se establecen en este contrato? Describe cualquier obligación o política de pago de dividendos (p. ej., un porcentaje mínimo de beneficios distribuibles), cualquier derecho preferente de dividendo inherente a una clase particular de acciones y cualquier restricción sobre el pago de dividendos (p. ej., sujeto a beneficios disponibles, aprobación del consejo o de los socios, consentimiento del prestamista).",
            },
            {
                index: 13,
                name: "Disposiciones de Salida y Liquidez",
                format: "text",
                prompt: "¿Qué disposiciones de salida o liquidez se incluyen? Describe cualquier mecanismo de salida acordado (p. ej., venta comercial, OPI, venta por arrastre), cualquier plazo o hito para el cual se proyecta una salida, cualquier derecho de los socios para iniciar o impulsar un proceso de salida después de un período especificado y cualquier preferencia sobre los ingresos de salida inherente a una clase particular de acciones.",
            },
            {
                index: 14,
                name: "Punto Muerto (Deadlock)",
                format: "text",
                prompt: "¿Cómo se aborda el punto muerto (deadlock)? Describe cualquier mecanismo de resolución de punto muerto (p. ej., escalación a la alta dirección, mediación, disposiciones de ruleta rusa / shoot-out, opciones put/call). Para cada mecanismo, indica las condiciones de activación, el procedimiento y las consecuencias si el punto muerto no se resuelve.",
            },
            {
                index: 15,
                name: "No Competencia y No Solicitación",
                format: "text",
                prompt: "¿Está algún socio sujeto a obligaciones de no competencia o no solicitación? En caso afirmativo, identifica qué socios están obligados, el alcance de la restricción (actividades y geografía) y la duración (durante la vigencia del contrato y/o por un período después de que un socio deje de poseer acciones). Señala cualquier exclusión.",
            },
            {
                index: 16,
                name: "Confidencialidad",
                format: "text",
                prompt: "¿Qué obligaciones de confidencialidad se imponen a los socios? Indica el alcance de la información confidencial cubierta, las divulgaciones permitidas (p. ej., a asesores profesionales, afiliadas, prestamistas) y la duración de la obligación. Señala si la obligación sobrevive a la terminación del contrato.",
            },
            {
                index: 17,
                name: "Garantías",
                format: "text",
                prompt: "¿Qué garantías otorgan los socios bajo este contrato? Identifica quién otorga garantías, el objeto (p. ej., titularidad de acciones, capacidad, ausencia de gravámenes, ausencia de conflictos), cualquier limitación a las reclamaciones de garantía (p. ej., plazos, topes, reservas de conocimiento) y cualquier indemnización otorgada junto con las garantías.",
            },
            {
                index: 18,
                name: "Ley Aplicable",
                format: "text",
                prompt: "¿Qué ley aplicable rige este contrato? Indica la jurisdicción y cualquier sistema legal específico referenciado.",
            },
            {
                index: 19,
                name: "Resolución de Controversias",
                format: "text",
                prompt: "¿Cómo se resuelven las controversias bajo este contrato? Identifica si las controversias se resuelven por litigio o arbitraje, el foro o sede elegido, cualquier paso de escalación obligatorio y si la jurisdicción es exclusiva.",
            },
        ],
    },

    // ─── Contrato de Trabajo ─────────────────────────────────────────────────────
    {
        id: "builtin-employment-agreement",
        user_id: null,
        is_system: true,
        created_at: "",
        title: "Revisión de Contrato de Trabajo",
        type: "tabular",
        practice: "Laboral",
        prompt_md: null,
        columns_config: [
            {
                index: 0,
                name: "Empleador",
                format: "text",
                prompt: "¿Quién es el empleador bajo este contrato? Indica el nombre legal completo y la jurisdicción de constitución o establecimiento.",
            },
            {
                index: 1,
                name: "Empleado",
                format: "text",
                prompt: "¿Quién es el empleado bajo este contrato? Indica su nombre completo y, si se proporciona, su dirección o ubicación.",
            },
            {
                index: 2,
                name: "Fecha",
                format: "date",
                prompt: "¿Cuál es la fecha de este contrato de trabajo? Si la fecha de inicio o entrada en funciones difiere de la fecha de firma, indica ambas.",
            },
            {
                index: 3,
                name: "Cargo",
                format: "text",
                prompt: "¿Cuál es el cargo o puesto del empleado según lo indicado en este contrato? Si se especifica una línea de reporte, inclúyela.",
            },
            {
                index: 4,
                name: "Remuneración",
                format: "text",
                prompt: "¿Cuál es la remuneración del empleado bajo este contrato? Indica el salario base o sueldo, la moneda y la frecuencia de pago (p. ej., mensual, quincenal). Incluye cualquier bono garantizado, comisión u otros elementos de remuneración fija.",
            },
            {
                index: 5,
                name: "Tiempo Completo / Tiempo Parcial",
                format: "tag",
                tags: ["Tiempo Completo", "Tiempo Parcial"],
                prompt: "¿Es este un puesto de tiempo completo o tiempo parcial? Si es tiempo parcial, indica el número de días u horas por semana donde se especifique.",
            },
            {
                index: 6,
                name: "¿Contratista Independiente?",
                format: "yes_no",
                prompt: "¿Caracteriza el contrato al trabajador como contratista independiente en lugar de empleado? Responde Sí si el contrato utiliza lenguaje de contratista, consultor o trabajador por cuenta propia. Señala cualquier disposición que aborde la naturaleza de la relación.",
            },
            {
                index: 7,
                name: "Prestaciones",
                format: "bulleted_list",
                prompt: "¿A qué prestaciones tiene derecho el empleado bajo este contrato? Enumera cada prestación (p. ej., seguro médico, aportaciones de pensión/jubilación, seguro de vida, asignación para automóvil, opciones sobre acciones, reembolso de gastos). Señala cualquier condición de elegibilidad o límite.",
            },
            {
                index: 8,
                name: "Plazo de Preaviso (Empleador a Empleado)",
                format: "text",
                prompt: "¿Qué preaviso debe dar el empleador para terminar la relación laboral del empleado (distinto del despido por causa)? Indica el plazo de preaviso y cualquier disposición sobre pago en sustitución de preaviso.",
            },
            {
                index: 9,
                name: "Plazo de Preaviso (Empleado a Empleador)",
                format: "text",
                prompt: "¿Qué preaviso debe dar el empleado para renunciar? Indica el plazo de preaviso y cualquier disposición sobre pago en sustitución de preaviso o permiso retribuido de exención de servicios (garden leave).",
            },
            {
                index: 10,
                name: "Horas Extra",
                format: "text",
                prompt: "¿Qué disposiciones aplican a las horas extra? ¿Tiene el empleado derecho a pago de horas extra y, en caso afirmativo, a qué tasa? ¿O establece el contrato que el salario incluye cualquier hora extra? Señala cualquier exclusión voluntaria de los límites legales de tiempo de trabajo.",
            },
            {
                index: 11,
                name: "Jornada Laboral",
                format: "text",
                prompt: "¿Qué jornada laboral se especifica en este contrato? Indica el horario normal de trabajo, cualquier disposición de flexibilidad y si se espera que el empleado trabaje horas adicionales según sea necesario.",
            },
            {
                index: 12,
                name: "Modificación",
                format: "text",
                prompt: "¿Qué disposiciones rigen la modificación de los términos de este contrato? ¿Puede el empleador modificar términos unilateralmente o se requiere el consentimiento del empleado? Señala cualquier término específico que se indique como modificable sin consentimiento.",
            },
            {
                index: 13,
                name: "Cesión de Propiedad Intelectual",
                format: "text",
                prompt: "¿Qué disposiciones de cesión de propiedad intelectual se incluyen? ¿Cede el empleado al empleador toda la PI creada en el curso del empleo? ¿Existen exclusiones para PI preexistente o invenciones creadas fuera del horario laboral? Señala cualquier renuncia a derechos morales.",
            },
            {
                index: 14,
                name: "Causales de Terminación",
                format: "bulleted_list",
                prompt: "¿Qué causales de despido inmediato o terminación por causa se establecen en el contrato? Enumera cada causal (p. ej., falta grave, incumplimiento de confidencialidad, insolvencia, condena penal). Señala si el despido inmediato es sin preaviso ni pago en sustitución.",
            },
            {
                index: 15,
                name: "Derecho a Vacaciones Anuales",
                format: "text",
                prompt: "¿Cuál es el derecho a vacaciones anuales del empleado? Indica el número de días (o semanas) por año, si esto incluye o es adicional a los días festivos y cualquier disposición sobre acumulación, arrastre o pago de vacaciones no disfrutadas al término de la relación.",
            },
        ],
    },
];

export const BUILT_IN_IDS = new Set(BUILT_IN_WORKFLOWS.map((wf) => wf.id));
