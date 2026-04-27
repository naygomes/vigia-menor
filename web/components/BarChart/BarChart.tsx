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

  const {
    health = 0,
    education = 0,
    socialAssistance = 0,
  } = summary?.alerts || {};

  const chartData = {
    labels: LABELS,
    datasets: [
      {
        label: "Total de Alertas",
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{ACTIVE_ALERTS_LABEL}</CardTitle>
        <CardDescription>{DESCRIPTION_CHART}</CardDescription>
      </CardHeader>
      <CardContent>
        <Bar options={options} data={chartData} />
      </CardContent>
    </Card>
  );
}
