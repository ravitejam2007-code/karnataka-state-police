import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const trendData = [
  { month: 'Jan', total: 4000, resolved: 2400 },
  { month: 'Feb', total: 3000, resolved: 1398 },
  { month: 'Mar', total: 2000, resolved: 9800 },
  { month: 'Apr', total: 2780, resolved: 3908 },
  { month: 'May', total: 1890, resolved: 4800 },
  { month: 'Jun', total: 2390, resolved: 3800 },
  { month: 'Jul', total: 3490, resolved: 4300 },
]

const districtData = [
  { name: 'Central', cases: 4000 },
  { name: 'North', cases: 3000 },
  { name: 'South', cases: 2000 },
  { name: 'East', cases: 2780 },
  { name: 'West', cases: 1890 },
]

export function OverviewCharts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Crime Trends</CardTitle>
          <CardDescription>Total reported vs resolved cases over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="total" name="Total Reported" stroke="#ef4444" fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="resolved" name="Cases Resolved" stroke="#22c55e" fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Incidents by District</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }} />
                  <Bar dataKey="cases" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col gap-1">
              <span className="text-sm text-muted-foreground font-medium">Total Crimes</span>
              <span className="text-3xl font-bold">14,284</span>
              <span className="text-xs text-red-500 font-medium">+2.4% vs last month</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col gap-1">
              <span className="text-sm text-muted-foreground font-medium">Resolution Rate</span>
              <span className="text-3xl font-bold">68.5%</span>
              <span className="text-xs text-green-500 font-medium">+5.2% vs last month</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col gap-1">
              <span className="text-sm text-muted-foreground font-medium">Avg Response Time</span>
              <span className="text-3xl font-bold">8m 12s</span>
              <span className="text-xs text-green-500 font-medium">-45s vs last month</span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg flex flex-col gap-1">
              <span className="text-sm text-muted-foreground font-medium">Active Patrols</span>
              <span className="text-3xl font-bold">142</span>
              <span className="text-xs text-muted-foreground font-medium">Current active units</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
