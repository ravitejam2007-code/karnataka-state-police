import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const monthData = [
  { name: 'Jan', '2023': 4000, '2024': 4400 },
  { name: 'Feb', '2023': 3000, '2024': 3200 },
  { name: 'Mar', '2023': 2000, '2024': 2400 },
  { name: 'Apr', '2023': 2780, '2024': 2900 },
  { name: 'May', '2023': 1890, '2024': 1950 },
  { name: 'Jun', '2023': 2390, '2024': 2500 },
  { name: 'Jul', '2023': 3490, '2024': 3600 },
  { name: 'Aug', '2023': 3200, '2024': 3400 },
  { name: 'Sep', '2023': 2900, '2024': 3100 },
  { name: 'Oct', '2023': 3800, '2024': 4100 },
  { name: 'Nov', '2023': 4300, '2024': 4500 },
  { name: 'Dec', '2023': 4800, '2024': 4950 },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = ['12A', '4A', '8A', '12P', '4P', '8P'];

export function SeasonalityCharts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Year-over-Year Comparison</CardTitle>
          <CardDescription>Monthly incident volume comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="2023" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="2024" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Time of Day vs Day of Week</CardTitle>
            <CardDescription>Incident frequency heatmap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 w-full max-w-3xl mx-auto overflow-x-auto pb-4">
              <div className="flex text-xs text-muted-foreground ml-12">
                {hours.map(h => (
                  <div key={h} className="flex-1 text-center">{h}</div>
                ))}
              </div>
              
              {days.map(day => (
                <div key={day} className="flex items-center gap-2">
                  <div className="w-10 text-xs font-medium text-right text-muted-foreground">{day}</div>
                  <div className="flex-1 flex gap-1">
                    {[...Array(6)].map((_, i) => {
                      const val = Math.random();
                      let bg = 'bg-blue-100 dark:bg-blue-900/20';
                      if (val > 0.8) bg = 'bg-blue-600 dark:bg-blue-500';
                      else if (val > 0.6) bg = 'bg-blue-500 dark:bg-blue-600';
                      else if (val > 0.4) bg = 'bg-blue-400 dark:bg-blue-700';
                      else if (val > 0.2) bg = 'bg-blue-300 dark:bg-blue-800';
                      
                      return (
                        <div 
                          key={i} 
                          className={`flex-1 h-8 rounded-sm ${bg} cursor-pointer hover:ring-2 ring-primary transition-all relative group`}
                        >
                          <div className="absolute hidden group-hover:block bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50">
                            {Math.floor(val * 100)} incidents
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1 h-3 w-32">
                <div className="flex-1 bg-blue-100 dark:bg-blue-900/20" />
                <div className="flex-1 bg-blue-300 dark:bg-blue-800" />
                <div className="flex-1 bg-blue-400 dark:bg-blue-700" />
                <div className="flex-1 bg-blue-500 dark:bg-blue-600" />
                <div className="flex-1 bg-blue-600 dark:bg-blue-500" />
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
