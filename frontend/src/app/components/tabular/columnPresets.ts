import type { ColumnFormat } from "../shared/types";

export interface ColumnPreset {
    name: string;
    matches: RegExp;
    prompt: string;
    format: ColumnFormat;
    tags?: string[];
}

export const PROMPT_PRESETS: ColumnPreset[] = [
    {
        name: "Partes",
        matches: /\bpart(y|ies)\b/i,
        format: "bulleted_list",
        prompt: 'Enumera todas las partes de este acuerdo. Para cada parte, indica su nombre legal completo, tipo de entidad y función definida, ej.:\n• ABC Corp, sociedad de Delaware ("Empresa")\n• John Smith ("Accionista")\nUna parte por viñeta. Sin comentarios adicionales.',
    },
    {
        name: "Ley Aplicable",
        matches: /\bgoverning law\b|\bjurisdiction\b/i,
        format: "text",
        prompt: 'Indica únicamente la ley aplicable de este acuerdo usando el nombre abreviado de la jurisdicción, ej. "Ley de Nueva York", "Ley Inglesa", "Ley de India", "Ley de la RPC". Ningún otro texto.',
    },
    {
        name: "Fecha de Vigencia",
        matches: /\beffective date\b/i,
        format: "date",
        prompt: 'Indica únicamente la fecha de vigencia de este acuerdo en formato DD Mes AAAA, ej. "2 Ene 2026". Si no se indica explícitamente, escribe "No especificado".',
    },
    {
        name: "Plazo",
        matches: /\bterm\b|\bduration\b/i,
        format: "text",
        prompt: 'Indica únicamente la duración o plazo de este acuerdo de forma concisa, ej. "3 años", "24 meses", "perpetuo". Ningún otro texto.',
    },
    {
        name: "Terminación",
        matches: /\bterminat(e|ion|ing)\b/i,
        format: "text",
        prompt: "Extrae las disposiciones de terminación. Indica quién puede terminar, los eventos desencadenantes, el plazo de preaviso requerido, cualquier período de subsanación y las consecuencias clave de la terminación. Sé conciso.",
    },
    {
        name: "Cambio de Control",
        matches: /\bchange of control\b/i,
        format: "text",
        prompt: "Identifica cualquier disposición sobre cambio de control. Resume los eventos desencadenantes, consecuencias, requisitos de consentimiento y cualquier derecho relacionado de terminación o aceleración. Sé conciso.",
    },
    {
        name: "Confidencialidad",
        matches: /\bconfidential(ity)?\b|\bnon-?disclosure\b/i,
        format: "text",
        prompt: "Resume las obligaciones de confidencialidad: alcance de la información confidencial, divulgaciones permitidas, restricciones de uso, duración y exclusiones o excepciones clave.",
    },
    {
        name: "Cesión",
        matches: /\bassign(ment|ability)?\b/i,
        format: "yes_no",
        prompt: "¿Se permite la cesión de este acuerdo sin el consentimiento de la otra parte?",
    },
    {
        name: "Pagos y Honorarios",
        matches: /\bpayment\b|\bfees?\b/i,
        format: "text",
        prompt: 'Indica las obligaciones de pago clave de forma concisa: importe, plazo y moneda, ej. "USD 10,000 pagaderos dentro de los 30 días siguientes a la factura". Señala cualquier consecuencia por mora.',
    },
    {
        name: "Modificación",
        matches: /\bamendment\b|\bvariation\b/i,
        format: "text",
        prompt: "Resume las disposiciones de modificación: cómo pueden realizarse modificaciones, quién debe consentir y cualquier requisito de formalidad como forma escrita o firma.",
    },
    {
        name: "Indemnización",
        matches: /\bindemni(ty|ties|fication)\b/i,
        format: "text",
        prompt: "Resume las disposiciones de indemnización: quién indemniza a quién, el alcance de las pérdidas indemnizables, los límites o exclusiones de responsabilidad y los procedimientos clave de reclamación.",
    },
    {
        name: "Garantías",
        matches: /\bwarrant(y|ies|ing)\b|\brepresentations?\b/i,
        format: "text",
        prompt: "Identifica y describe las declaraciones y garantías clave otorgadas por cualquiera de las partes, incluyendo el alcance de dichas manifestaciones y los períodos de tiempo o condiciones específicas aplicables. En particular destaca cualquier garantía no estándar.",
    },
    {
        name: "Fuerza Mayor",
        matches: /\bforce majeure\b/i,
        format: "yes_no",
        prompt: "¿Contiene este acuerdo una cláusula de fuerza mayor?",
    },
];

export function getPresetConfig(
    title: string,
): Pick<ColumnPreset, "prompt" | "format" | "tags"> | null {
    const trimmed = title.trim();
    if (!trimmed) return null;
    const preset = PROMPT_PRESETS.find(({ matches }) => matches.test(trimmed));
    if (!preset) return null;
    return { prompt: preset.prompt, format: preset.format, tags: preset.tags };
}

export function getPresetPrompt(title: string): string | null {
    return getPresetConfig(title)?.prompt ?? null;
}
