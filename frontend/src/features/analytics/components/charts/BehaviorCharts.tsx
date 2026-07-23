import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const scatterData = [
  { x: 10, y: 30, z: 200, name: 'Group A', type: 'Repeat' },
  { x: 30, y: 200, z: 260, name: 'Group B', type: 'First-time' },
  { x: 45, y: 100, z: 400, name: 'Group C', type: 'Repeat' },
  { x: 50, y: 400, z: 280, name: 'Group D', type: 'Organized' },
  { x: 70, y: 150, z: 500, name: 'Group E', type: 'Organized' },
  { x: 100, y: 250, z: 200, name: 'Group F', type: 'First-time' },
  { x: 80, y: 300, z: 300, name: 'Group G', type: 'Repeat' },
]

const COLORS = {
  'First-time': '#22c55e',
  'Repeat': '#eab308',
  'Organized': '#ef4444'
}

export function BehaviorCharts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Offender Recidivism vs Severity</CardTitle>
          <CardDescription>Correlating prior offenses (X) with incident severity index (Y)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Prior Offenses" 
                  unit=" cases" 
                  stroke="hsl(var(--muted-foreground))" 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Severity Index" 
                  unit=" pts" 
                  stroke="hsl(var(--muted-foreground))" 
                  tickLine={false} 
                  axisLine={false}
                />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Impact Value" unit="k" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Legend />
                <Scatter name="Offender Profile" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.type as keyof typeof COLORS]} fillOpacity={0.7} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span>First-time Offender</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#eab308]" />
              <span>Repeat Offender</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span>Organized Crime</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Modus Operandi Trends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Forced Entry (Night)</span>
                <span className="font-bold text-amber-500">+12%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[65%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Phishing / Social Engineering</span>
                <span className="font-bold text-red-500">+24%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[85%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Opportunistic Theft (Day)</span>
                <span className="font-bold text-green-500">-8%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[40%]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Co-offending Networks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[150px] flex-col gap-2 bg-muted/30 rounded-lg border border-dashed">
              <span className="text-4xl font-bold text-primary">3.2</span>
              <span className="text-sm text-muted-foreground text-center px-4">
                Average number of co-offenders per organized crime incident.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
