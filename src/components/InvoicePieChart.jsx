// src/components/InvoicePieChart.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

// Colors for statuses
const COLORS = {
  paid: "#22c55e", // green
  partial: "#eab308", // yellow
  unpaid: "#ef4444", // red
}

// Custom tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0]
    return (
      <div className="bg-white shadow-md p-2 rounded-md border text-sm">
        <p className="font-medium">{name}</p>
        <p>{value} Invoices</p>
      </div>
    )
  }
  return null
}

export default function InvoicePieChart({ data }) {
  // Total invoices for center text
  const totalInvoices = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="w-full h-[400px] mt-8 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center relative">
      <h2 className="text-lg font-semibold mb-2">Invoice Status Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase()]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-3xl font-bold">{totalInvoices}</p>
        <p className="text-sm text-muted-foreground">Invoices</p>
      </div>

      {/* Legend below */}
      <div>
        
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full" style={{ backgroundColor: COLORS.paid }}></span>
          <p className="text-sm text-muted-foreground">Paid Invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full" style={{ backgroundColor: COLORS.partial }}></span>
          <p className="text-sm text-muted-foreground">Partial Paid Invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-full" style={{ backgroundColor: COLORS.unpaid }}></span>
          <p className="text-sm text-muted-foreground">Unpaid Invoices</p>
        </div>
      </div>
    </div>
  )
}
