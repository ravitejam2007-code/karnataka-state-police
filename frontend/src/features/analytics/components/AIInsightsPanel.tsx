import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react"

export function AIInsightsPanel({ activeTab }: { activeTab: string }) {
  const getInsights = () => {
    switch (activeTab) {
      case "overview":
        return [
          { type: 'warning', text: "Overall crime rate increased by 4.2% in Central District over the last 30 days." },
          { type: 'trend', text: "Cyber crime complaints show a steady 15% month-over-month upward trend." },
          { type: 'success', text: "Vehicle theft incidents have decreased by 12% following targeted night patrols." }
        ];
      case "crime-types":
        return [
          { type: 'trend', text: "Property crimes constitute 45% of total reported incidents this quarter." },
          { type: 'warning', text: "Spike in financial fraud cases reported primarily on weekends." }
        ];
      case "district":
        return [
          { type: 'alert', text: "North District sector 4 requires immediate resource allocation due to recent spikes in vandalism." },
          { type: 'success', text: "East District shows highest resolution rate (82%) for violent crimes." }
        ];
      case "demographics":
        return [
          { type: 'insight', text: "Majority of cyber fraud victims are in the 50+ age bracket." },
          { type: 'insight', text: "Youth involvement (18-25) in petty theft has decreased by 8% year-over-year." }
        ];
      case "seasonality":
        return [
          { type: 'trend', text: "Historical data suggests a 20% increase in burglaries during the upcoming festival season." },
          { type: 'insight', text: "Assault cases peak consistently between 10 PM and 2 AM on Fridays and Saturdays." }
        ];
      case "behavior":
        return [
          { type: 'insight', text: "Repeat offenders account for 34% of all narcotics-related arrests." },
          { type: 'warning', text: "Emerging pattern of organized retail theft identified across 3 major malls." }
        ];
      default:
        return [
          { type: 'insight', text: "Analyzing current data patterns..." }
        ];
    }
  }

  const insights = getInsights()

  return (
    <div className="flex-1 flex flex-col h-full bg-primary/5 rounded-xl border border-primary/20 overflow-hidden">
      <div className="p-4 border-b border-primary/20 bg-primary/10 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-primary">AI Insights</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {insights.map((insight, idx) => (
          <div key={idx} className="bg-background/80 backdrop-blur-sm rounded-lg p-3 border shadow-sm text-sm flex gap-3 items-start">
            {insight.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />}
            {insight.type === 'alert' && <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />}
            {insight.type === 'trend' && <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />}
            {insight.type === 'success' && <ShieldCheck className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />}
            {insight.type === 'insight' && <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />}
            
            <p className="text-muted-foreground leading-relaxed">
              {insight.text}
            </p>
          </div>
        ))}

        <div className="mt-6">
          <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">Suggested Actions</p>
          <div className="space-y-2">
            <button className="w-full text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20 text-foreground">
              Deploy additional patrols to high-risk zones
            </button>
            <button className="w-full text-left text-sm p-2 rounded hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20 text-foreground">
              Generate predictive deployment schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
