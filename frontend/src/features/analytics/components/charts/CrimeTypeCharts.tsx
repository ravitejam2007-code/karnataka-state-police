import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Treemap, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const data = [
  { name: 'Theft', value: 400 },
  { name: 'Assault', value: 300 },
  { name: 'Cyber Crime', value: 300 },
  { name: 'Fraud', value: 200 },
  { name: 'Vandalism', value: 150 },
  { name: 'Narcotics', value: 250 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#F2726F']

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
    const data = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow-sm text-sm">
        <p className="font-bold">{data.name}</p>
        <p>Value: {data.value || data.size}</p>
      </div>
    );
  }
  return null;
};

// Custom Treemap Content
const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, payload } = props

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? COLORS[Math.floor((index / root.children.length) * 6)] : '#ffffff00',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="bold">
          {payload.name}
        </text>
      ) : null}
      {depth === 2 ? (
        <text x={x + 4} y={y + 18} fill="#fff" fontSize={12} fillOpacity={0.9}>
          {payload.name}
        </text>
      ) : null}
    </g>
  )
}


export function CrimeTypeCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Crime Distribution</CardTitle>
            <CardDescription>Major categories breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent || 0) * 100}%`}
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

        <Card>
          <CardHeader>
            <CardTitle>Sub-Category Heatmap</CardTitle>
            <CardDescription>Hierarchical view of crime types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full relative -mx-4 sm:mx-0">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={treeData}
                  dataKey="size"
                  aspectRatio={4 / 3}
                  stroke="#fff"
                  content={<CustomizedContent />}
                >
                  <Tooltip />
                </Treemap>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
