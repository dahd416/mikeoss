export const PRACTICE_OPTIONS = [
    "Transacciones Generales",
    "Corporativo",
    "Finanzas",
    "Litigios",
    "Bienes Raíces",
    "Fiscal",
    "Laboral",
    "PI",
    "Competencia",
    "Transacciones Tecnológicas",
    "Financiamiento de Proyectos",
    "EC/VC",
    "Capital Privado",
    "Crédito Privado",
    "ECM",
    "DCM",
    "Lev Fin",
    "Arbitraje",
    "Otros",
] as const;

export type Practice = (typeof PRACTICE_OPTIONS)[number];
