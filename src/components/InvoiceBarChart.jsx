// src/components/InvoiceBarChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Custom tooltip for hover
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md p-3 rounded-md border">
        <p className="font-medium">{label}</p>
        {payload.map((item, idx) => (
          <p key={idx} className="text-sm" style={{ color: item.fill }}>
            {item.name}: {item.value} invoices <br />
            Total Amount: ₹{item.payload[`${item.dataKey}Amount`]}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function InvoiceBarChart({ data }) {
  return (
    <div className="w-full h-[400px] mt-8  rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Monthly Invoice Status</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="paid" stackId="a" fill="#49b0f3" name="Paid" />
          <Bar dataKey="partial" stackId="a" fill="#81cbfcff" name="Partial Paid" />
          <Bar dataKey="unpaid" stackId="a" fill="#deecf6ff" name="Unpaid" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
