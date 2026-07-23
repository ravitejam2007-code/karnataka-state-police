import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const data = [
  { name: 'Sector 1', crime: 400, patrol: 24 },
  { name: 'Sector 2', crime: 300, patrol: 13 },
  { name: 'Sector 3', crime: 200, patrol: 38 },
  { name: 'Sector 4', crime: 278, patrol: 39 },
  { name: 'Sector 5', crime: 189, patrol: 48 },
  { name: 'Sector 6', crime: 239, patrol: 38 },
  { name: 'Sector 7', crime: 349, patrol: 43 },
]

export function DistrictCharts() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sector Level Analysis</CardTitle>
          <CardDescription>Reported incidents vs Patrol coverage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="crime" name="Crimes Reported" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="patrol" name="Patrol Units" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>High Risk Zones (Heatmap)</CardTitle>
            <CardDescription>Relative frequency by ward</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simple CSS grid to simulate a heatmap */}
            <div className="grid grid-cols-5 gap-1 h-[250px] w-full">
              {[...Array(25)].map((_, i) => {
                const intensity = Math.random();
                let bgColor = 'bg-red-500/10';
                if (intensity > 0.8) bgColor = 'bg-red-600';
                else if (intensity > 0.6) bgColor = 'bg-red-500/80';
                else if (intensity > 0.4) bgColor = 'bg-red-500/50';
                else if (intensity > 0.2) bgColor = 'bg-red-500/30';
                
                return (
                  <div 
                    key={i} 
                    className={`${bgColor} rounded-sm flex items-center justify-center group relative cursor-pointer hover:ring-2 hover:ring-primary z-10 transition-all`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-white bg-black/50 px-1 rounded transition-opacity">
                      W-{i+1}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Low Risk</span>
              <div className="w-1/2 h-2 bg-gradient-to-r from-red-500/10 to-red-600 rounded-full" />
              <span>High Risk</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>District Clearance Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['Central', 'North', 'South', 'East', 'West'].map((dist, i) => (
              <div key={dist} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{dist}</span>
                  <span>{75 - i * 5}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${75 - i * 5}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
