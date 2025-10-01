
import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Example datasets
const data7Days = [
  { date: "Day 1", estimates: 3 },
  { date: "Day 2", estimates: 5 },
  { date: "Day 3", estimates: 2 },
  { date: "Day 4", estimates: 4 },
  { date: "Day 5", estimates: 6 },
  { date: "Day 6", estimates: 5 },
  { date: "Day 7", estimates: 7 },
]

const data30Days = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  estimates: Math.floor(Math.random() * 10) + 1,
}))

const data3Months = Array.from({ length: 90 }, (_, i) => ({
  date: `Day ${i + 1}`,
  estimates: Math.floor(Math.random() * 12) + 1,
}))

export default function EstimateChart() {
  const [range, setRange] = useState("3m")

  const chartData =
    range === "7d" ? data7Days : range === "30d" ? data30Days : data3Months

  return (
    <Card className="w-full h-[450px] flex flex-col mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Total Estimates</CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={range === "3m" ? "default" : "outline"}
            onClick={() => setRange("3m")}
          >
            Last 3 months
          </Button>
          <Button
            size="sm"
            variant={range === "30d" ? "default" : "outline"}
            onClick={() => setRange("30d")}
          >
            Last 30 days
          </Button>
          <Button
            size="sm"
            variant={range === "7d" ? "default" : "outline"}
            onClick={() => setRange("7d")}
          >
            Last 7 days
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorEstimates" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="estimates"
              stroke="#3b82f6"
              fill="url(#colorEstimates)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Total estimates created in the selected period
        </p>
      </CardContent>
    </Card>
  )
}
