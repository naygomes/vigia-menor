import { Badge, Typography } from "@/components";
import { ALERT_COLORS, ALERT_LABELS } from "@/utils";

const LABEL = "Alertas Ativos";
const NO_ALERTS_LABEL = "Nenhum alerta ativo para esta criança";

interface IAlerts {
  health: string[];
  education: string[];
  assistance: string[];
}

interface IAlertSectionProps {
  alerts: IAlerts;
}

export function AlertSection({ alerts }: IAlertSectionProps) {
  const alertKeys = Object.keys(alerts) as (keyof IAlerts)[];

  const hasAnyAlerts = alertKeys.some((key) => alerts[key]?.length > 0);

  return (
    <div className="h-full flex flex-col items-center gap-2 rounded-lg bg-vm-secondary/10 p-4">
      <Typography align="center" weight="bold" color="text-vm-secondary">
        {LABEL}
      </Typography>

      {!hasAnyAlerts ? (
        <Typography
          align="center"
          color="text-vm-navy"
          className="text-sm mt-2 px-4"
        >
          {NO_ALERTS_LABEL}
        </Typography>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {alertKeys.map((key) =>
            alerts[key]?.map((alertMessage, index) => (
              <Badge key={`${key}-${index}`} className={ALERT_COLORS[key]}>
                {ALERT_LABELS[alertMessage as keyof typeof ALERT_LABELS]}
              </Badge>
            )),
          )}
        </div>
      )}
    </div>
  );
}
