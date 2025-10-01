
import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"

// Example datasets
const dataCash = [
  { month: "Apr 2025", income: 250000, expense: 120000 },
  { month: "May 2025", income: 320000, expense: 150000 },
  { month: "Jun 2025", income: 360000, expense: 180000 },
  { month: "Jul 2025", income: 480000, expense: 200000 },
  { month: "Aug 2025", income: 560000, expense: 220000 },
  { month: "Sep 2025", income: 540000, expense: 210000 },
]

const dataAccrual = [
  { month: "Apr 2025", income: 280000, expense: 100000 },
  { month: "May 2025", income: 350000, expense: 130000 },
  { month: "Jun 2025", income: 400000, expense: 160000 },
  { month: "Jul 2025", income: 500000, expense: 190000 },
  { month: "Aug 2025", income: 590000, expense: 210000 },
  { month: "Sep 2025", income: 570000, expense: 200000 },
]

export default function IncomeExpenseCard() {
  const [mode, setMode] = useState("cash")
  const chartData = mode === "cash" ? dataCash : dataAccrual

  const totalIncome = chartData.reduce((sum, d) => sum + d.income, 0)
  const totalExpense = chartData.reduce((sum, d) => sum + d.expense, 0)

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Income and Expense</CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === "accrual" ? "default" : "outline"}
            onClick={() => setMode("accrual")}
          >
            Accrual
          </Button>
          <Button
            size="sm"
            variant={mode === "cash" ? "default" : "outline"}
            onClick={() => setMode("cash")}
          >
            Cash
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ResponsiveContainer width="100%" height="70%">
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#49b0f3" name="Income" />
            <Bar dataKey="expense" fill="#2f4a5cff" name="Expense" />
          </BarChart>
        </ResponsiveContainer>

        {/* Summary section */}
        <div className="mt-6 flex justify-around border-t pt-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-green-500"></span>
            <div>
              <p className="text-sm text-green-600 font-medium">Total Income</p>
              <p className="text-xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-red-500"></span>
            <div>
              <p className="text-sm text-red-600 font-medium">Total Expenses</p>
              <p className="text-xl font-bold text-red-600">₹{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          * Income and expense values displayed are exclusive of taxes.
        </p>
      </CardContent>
    </Card>
  )
}
