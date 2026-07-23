import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const ageData = [
  { group: 'Under 18', count: 120 },
  { group: '18-24', count: 450 },
  { group: '25-34', count: 680 },
  { group: '35-44', count: 520 },
  { group: '45-54', count: 310 },
  { group: '55+', count: 180 },
]

const suspectVictimData = [
  { subject: 'Assault', suspect: 120, victim: 110, fullMark: 150 },
  { subject: 'Theft', suspect: 98, victim: 130, fullMark: 150 },
  { subject: 'Fraud', suspect: 86, victim: 130, fullMark: 150 },
  { subject: 'Cyber', suspect: 99, victim: 100, fullMark: 150 },
  { subject: 'Vandalism', suspect: 85, victim: 90, fullMark: 150 },
  { subject: 'Narcotics', suspect: 140, victim: 20, fullMark: 150 },
]

export function DemographicsCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Suspect vs Victim Demographics</CardTitle>
            <CardDescription>Relative representation by crime type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={suspectVictimData}>
                  <PolarGrid stroke="hsl(var(--muted-foreground)/0.3)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Suspect Profile Match" dataKey="suspect" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                  <Radar name="Victim Profile Match" dataKey="victim" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
            <CardDescription>Involved parties by age group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                  <XAxis dataKey="group" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="count" name="Individuals Involved" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
