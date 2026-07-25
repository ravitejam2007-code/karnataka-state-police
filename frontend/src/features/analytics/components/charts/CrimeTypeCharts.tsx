import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const data = [
  { name: 'Theft', value: 400 },
  { name: 'Assault', value: 300 },
  { name: 'Cyber Crime', value: 300 },
  { name: 'Fraud', value: 200 },
  { name: 'Vandalism', value: 150 },
  { name: 'Narcotics', value: 250 },
]

const COLORS = ['#0F172A', '#2563EB', '#D97706', '#DC2626', '#4F46E5', '#059669']

const treeData = [
  {
    name: 'Property',
    children: [
      { name: 'Burglary', size: 1300 },
      { name: 'Larceny', size: 3000 },
      { name: 'Motor Vehicle Theft', size: 1200 },
      { name: 'Arson', size: 100 },
    ],
  },
  {
    name: 'Violent',
    children: [
      { name: 'Aggravated Assault', size: 1500 },
      { name: 'Robbery', size: 800 },
      { name: 'Homicide', size: 50 },
    ],
  },
  {
    name: 'Financial',
    children: [
      { name: 'Fraud', size: 2100 },
      { name: 'Embezzlement', size: 300 },
      { name: 'Forgery', size: 400 },
    ],
  },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-2 border border-[#E2E8F0] rounded shadow-md text-xs font-sans">
        <p className="font-bold text-[#1F2937]">{data.name}</p>
        <p className="text-[#64748B]">Recorded Cases: <span className="font-mono font-bold text-[#0F172A]">{data.value}</span></p>
      </div>
    )
  }
  return null
}

export function CrimeTypeCharts() {
  return (
    <div className="space-y-6 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-[#E2E8F0] shadow-2xs">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-[#1F2937]">Crime Category Distribution</CardTitle>
            <CardDescription className="text-xs text-[#64748B]">Statewide major offense breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E2E8F0] shadow-2xs">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-[#1F2937]">Sub-Category Crime Matrix</CardTitle>
            <CardDescription className="text-xs text-[#64748B]">Hierarchical view of reported offenses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {treeData.map((category, idx) => (
              <div key={idx} className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1F2937]">
                  <span>{category.name} Offenses</span>
                  <span className="text-[10px] text-[#64748B] font-mono">
                    Total: {category.children.reduce((acc, c) => acc + c.size, 0).toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category.children.map((sub, sIdx) => (
                    <div key={sIdx} className="bg-white p-2 rounded border border-[#E2E8F0] flex items-center justify-between text-xs">
                      <span className="text-[#475569] font-medium">{sub.name}</span>
                      <span className="font-bold font-mono text-[#0F172A]">{sub.size.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
