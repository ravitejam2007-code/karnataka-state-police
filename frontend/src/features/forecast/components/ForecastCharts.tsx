import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label } from "recharts"
import { FORECAST_DATA } from "../mockData"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ForecastCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Crime Volume Forecast
          <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">
            95% Confidence Interval
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={FORECAST_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                dx={-10}
                domain={[80, 180]}
              />
              
              {/* "Today" divider between historical and forecast */}
              <ReferenceLine x="Oct 22" stroke="hsl(var(--muted-foreground)/0.5)" strokeDasharray="4 4">
                <Label value="Today" position="top" fill="hsl(var(--muted-foreground))" fontSize={11} />
              </ReferenceLine>

              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
                itemStyle={{ color: "hsl(var(--foreground))", fontSize: "14px" }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: "20px", fontSize: "13px" }}
                formatter={(value) => {
                  const colors: Record<string, string> = {
                    "AI Prediction": "#2563eb",
                    "Actual Incidents": "#0f172a",
                    "Confidence Interval": "#93c5fd",
                    "Lower Bound": "transparent",
                    "Upper Bound": "transparent",
                  }
                  return <span style={{ color: colors[value] || "inherit" }}>{value}</span>
                }}
              />
              
              {/* Confidence Interval Band: max area with fill, min area as cutout */}
              <Area 
                type="monotone" 
                dataKey="confidenceMax" 
                stroke="none" 
                fill="#2563eb" 
                fillOpacity={0.12} 
                name="Confidence Interval"
                activeDot={false}
              />
              <Area 
                type="monotone" 
                dataKey="confidenceMin" 
                stroke="none" 
                fill="hsl(var(--card))" 
                fillOpacity={1} 
                name=""
                activeDot={false}
              />

              {/* AI Prediction Line: dashed blue */}
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#2563eb" 
                strokeWidth={2.5}
                strokeDasharray="6 4"
                dot={{ r: 3, strokeWidth: 1.5, fill: "hsl(var(--card))", stroke: "#2563eb" }}
                activeDot={{ r: 5, fill: "#2563eb", stroke: "hsl(var(--card))", strokeWidth: 2 }}
                name="AI Prediction"
              />

              {/* Actual Incidents Line: solid dark */}
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#0f172a" 
                strokeWidth={2.5}
                connectNulls={false}
                dot={{ r: 3, strokeWidth: 1.5, fill: "#0f172a", stroke: "#0f172a" }}
                activeDot={{ r: 5, fill: "#0f172a", stroke: "hsl(var(--card))", strokeWidth: 2 }}
                name="Actual Incidents"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
