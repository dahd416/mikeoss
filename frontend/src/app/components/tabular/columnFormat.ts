import type { LucideIcon } from "lucide-react";
import { AlignLeft, List, Hash, DollarSign, ToggleLeft, Calendar, Tag, Percent, Banknote } from "lucide-react";
import type { ColumnFormat } from "../shared/types";

export const FORMAT_OPTIONS: Array<{ value: ColumnFormat; label: string; icon: LucideIcon }> = [
    { value: "text",            label: "Texto libre",       icon: AlignLeft  },
    { value: "bulleted_list",   label: "Lista con viñetas", icon: List       },
    { value: "number",          label: "Número",            icon: Hash       },
    { value: "percentage",      label: "Porcentaje",        icon: Percent    },
    { value: "monetary_amount", label: "Monto monetario",   icon: Banknote   },
    { value: "currency",        label: "Moneda",            icon: DollarSign },
    { value: "yes_no",          label: "Sí / No",           icon: ToggleLeft },
    { value: "date",            label: "Fecha",             icon: Calendar   },
    { value: "tag",             label: "Etiquetas",         icon: Tag        },
];

export function formatLabel(format: ColumnFormat): string {
    return FORMAT_OPTIONS.find((o) => o.value === format)?.label ?? "Texto";
}

export function formatIcon(format: ColumnFormat): LucideIcon {
    return FORMAT_OPTIONS.find((o) => o.value === format)?.icon ?? AlignLeft;
}
