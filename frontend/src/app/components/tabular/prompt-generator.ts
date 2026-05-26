const PROMPT_PRESETS: Array<{
    matches: RegExp;
    prompt: (title: string) => string;
}> = [
    {
        matches: /\bpart(y|ies)\b/i,
        prompt: () =>
            'Identifica todas las partes referenciadas en el documento. Enumera sus nombres completos y describe la función o capacidad de cada parte en el acuerdo. Si una parte no está claramente identificada, indica "No abordado".',
    },
    {
        matches: /\bchange of control\b/i,
        prompt: () =>
            'Identifica cualquier disposición sobre cambio de control en el documento. Resume el desencadenante, las consecuencias, los requisitos de consentimiento y cualquier obligación relacionada de terminación, aceleración o notificación. Si no se aborda, indica "No abordado".',
    },
    {
        matches: /\bterminat(e|ion|ing)\b/i,
        prompt: () =>
            'Extrae las disposiciones de terminación del documento. Resume quién puede terminar, los desencadenantes de terminación, los requisitos de preaviso, los períodos de subsanación y las consecuencias de la terminación. Si no se aborda, indica "No abordado".',
    },
    {
        matches: /\bgoverning law\b|\bjurisdiction\b/i,
        prompt: () =>
            'Identifica las disposiciones de ley aplicable y jurisdicción en el documento. Indica la ley aplicable, el foro para disputas y cualquier sumisión a jurisdicción o requisito de competencia territorial. Si no se aborda, indica "No abordado".',
    },
    {
        matches: /\bconfidential(ity)?\b|\bnon-?disclosure\b/i,
        prompt: () =>
            'Extrae las disposiciones de confidencialidad del documento. Resume el alcance de la información confidencial, las divulgaciones permitidas, las restricciones de uso, la duración y cualquier exclusión o excepción. Si no se aborda, indica "No abordado".',
    },
    {
        matches: /\bassign(ment|ability)?\b/i,
        prompt: () =>
            'Identifica cualquier disposición de cesión en el documento. Resume si la cesión está permitida, restringida o requiere consentimiento, y señala cualquier excepción o cesión implícita. Si no se aborda, indica "No abordado".',
    },
    {
        matches: /\bpayment\b|\bfees?\b/i,
        prompt: () =>
            'Extrae las condiciones de pago y honorarios del documento. Resume las obligaciones de pago, importes, plazos, monedas, tipos de honorarios y cualquier consecuencia por retraso o falta de pago. Si no se aborda, indica "No abordado".',
    },
];

export function getPresetTabularPrompt(title: string): string | null {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return null;

    const preset = PROMPT_PRESETS.find(({ matches }) => matches.test(trimmedTitle));
    return preset ? preset.prompt(trimmedTitle) : null;
}

export function buildFallbackTabularPrompt(title: string): string {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return "";

    return (
        `Revisa cada documento y extrae la información relevante sobre "${trimmedTitle}". ` +
        `Proporciona un resumen conciso y específico del documento para esta columna. ` +
        `Incluye los hechos clave, fechas, umbrales, partes y condiciones cuando corresponda. ` +
        `Si el documento no contiene información relevante, devuelve "No abordado".`
    );
}
