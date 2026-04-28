import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Typography,
} from "@/components";
import { IGetSummaryResponse } from "@/types";

const ACTIVE_ALERTS_LABEL = "Alertas Ativos";
const LABELS = ["Saúde", "Educação", "Assistência Social"];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface IBarChartProps {
  summary: IGetSummaryResponse | null;
}

export function BarChart({ summary }: IBarChartProps) {
  const DESCRIPTION_CHART = `Total de alertas ativos por área: Saúde (${summary?.alerts?.health || 0}), Educação (${summary?.alerts?.education || 0}) e Assistência Social (${summary?.alerts?.socialAssistance || 0}).`;

  const { childrenTotal = 0, reviewedTotal = 0 } = summary || {};
  const {
    health = 0,
    education = 0,
    socialAssistance = 0,
  } = summary?.alerts || {};

  const chartData = {
    labels: LABELS,
    datasets: [
      {
        data: [health, education, socialAssistance],
        backgroundColor: [
          "rgba(42,157, 143, 0.6)",
          "rgba( 106, 76, 147, 0.6)",
          "rgba(172, 24, 111, 0.6)",
        ],
      },
    ],
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>{ACTIVE_ALERTS_LABEL}</CardTitle>
        <CardDescription>{DESCRIPTION_CHART}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex-col justify-center gap-4">
        <Typography color="text-vm-navy" className="mt-8">
          <b>Total de crianças: </b> {childrenTotal || 0}
        </Typography>
        <Typography color="text-vm-navy" className="mb-8">
          <b>Crianças revisadas: </b> {reviewedTotal || 0}
        </Typography>
        <Bar options={options} data={chartData} />
      </CardContent>
    </Card>
  );
}
