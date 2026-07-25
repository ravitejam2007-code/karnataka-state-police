import { useState } from "react"
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label } from "recharts"
import { FORECAST_DATA } from "../mockData"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Clock, ShieldAlert, Car, TrendingUp, CheckCircle, ArrowRight, MapPin, Cpu, Radio, ShieldCheck } from "lucide-react"

const SHIFT_PROBABILITY = [
  { shift: "Night Shift (00:00 - 06:00)", risk: "High Risk (78%)", primary: "Residential Burglary & Theft", alert: "Critical Surveillance Required", status: "High Priority" },
  { shift: "Morning Shift (06:00 - 12:00)", risk: "Medium Risk (42%)", primary: "Traffic Violations & Snatching", alert: "Routine Patrol Checkpoints", status: "Normal" },
  { shift: "Afternoon Shift (12:00 - 18:00)", risk: "Medium Risk (54%)", primary: "Commercial Fraud & Cyber Crime", alert: "Bank & Tech Zone Surveillance", status: "Normal" },
  { shift: "Evening Shift (18:00 - 24:00)", risk: "High Risk (84%)", primary: "Armed Assault & Robbery", alert: "QRT Deployment Recommended", status: "High Priority" },
]

const PATROL_DEPLOYMENT_MATRIX = [
  { district: "Mysuru Urban", station: "Devaraja Sub-Division", riskScore: 88, predictedType: "Armed Robbery", unitsRequired: 4, status: "Deployed" },
  { district: "Bengaluru East", station: "Whitefield Division", riskScore: 75, predictedType: "Cyber Crypto Phishing", unitsRequired: 3, status: "Standby" },
  { district: "Bengaluru South", station: "Koramangala Station", riskScore: 82, predictedType: "Night Burglary", unitsRequired: 5, status: "Dispatched" },
  { district: "Belagavi North", station: "City Central Station", riskScore: 64, predictedType: "Vehicle Theft", unitsRequired: 2, status: "Standby" },
]

const STATEWIDE_ZONES = [
  { zone: "Bengaluru Urban Zone", primaryThreat: "Cyber Crime & Night Burglary", probability: "89%", units: "14 Patrol Vehicles", status: "High Alert" },
  { zone: "Mysuru Range", primaryThreat: "Highway Robbery & Theft", probability: "76%", units: "8 Patrol Vehicles", status: "Active Watch" },
  { zone: "Coastal Karnataka Zone", primaryThreat: "Smuggling & Narcotics", probability: "62%", units: "6 Coastal Units", status: "Standard" },
  { zone: "Kalyana Karnataka Zone", primaryThreat: "Interstate Absconders", probability: "71%", units: "9 Border Checkposts", status: "Active Watch" }
]

const LIVE_COMMAND_LOGS = [
  { id: "CMD-2026-901", unit: "QRT Unit 04 (Blr North)", threat: "Armed Gang Assembly", location: "Peenya Industrial Area", time: "12 mins ago", status: "En Route" },
  { id: "CMD-2026-902", unit: "Patrol Alpha (Mysuru)", threat: "ANPR License Plate Match", location: "Hunsur Highway Toll", time: "28 mins ago", status: "Intercepting" },
  { id: "CMD-2026-903", unit: "Cyber Rapid Response", threat: "ATM Phishing Skimmer", location: "Indiranagar 100ft Rd", time: "45 mins ago", status: "Resolved" }
]

export function ForecastCharts() {
  const [deployedDistricts, setDeployedDistricts] = useState<string[]>([])
  const [taskedCommands, setTaskedCommands] = useState<string[]>([])

  const handleDeployPatrol = (district: string) => {
    setDeployedDistricts(prev => [...prev, district])
    toast.success(`Patrol Unit Dispatched to ${district}`, {
      description: "Tactical QRT team notified for high-risk surveillance deployment."
    })
  }

  const handleTaskCommand = (id: string, unit: string) => {
    setTaskedCommands(prev => [...prev, id])
    toast.success(`Tactical Unit Dispatched: ${unit}`, {
      description: `Command Order #${id} dispatched to field officers.`
    })
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Chart 1: Crime Volume Forecast */}
      <Card className="border-[#E2E8F0] shadow-2xs">
        <CardHeader className="pb-3 border-b border-[#E2E8F0]">
          <CardTitle className="text-sm font-bold text-[#1F2937] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#0F172A]" />
              7-Day Crime Volume AI Predictive Engine
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              95% Confidence Interval
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={FORECAST_DATA} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  dy={8}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  dx={-8}
                  domain={[80, 180]}
                />
                
                {/* Divider */}
                <ReferenceLine x="Oct 22" stroke="#64748B" strokeDasharray="4 4">
                  <Label value="Today" position="top" fill="#1F2937" fontSize={11} fontWeight="bold" />
                </ReferenceLine>

                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FFFFFF", 
                    borderColor: "#E2E8F0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: "12px"
                  }}
                  itemStyle={{ color: "#1F2937" }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "14px", fontSize: "12px" }}
                  formatter={(value) => {
                    const colors: Record<string, string> = {
                      "AI Prediction": "#2563EB",
                      "Actual Incidents": "#0F172A",
                      "Confidence Interval": "#93C5FD",
                    }
                    return <span style={{ color: colors[value] || "#1F2937", fontWeight: "bold" }}>{value}</span>
                  }}
                />
                
                <Area 
                  type="monotone" 
                  dataKey="confidenceMax" 
                  stroke="none" 
                  fill="#2563EB" 
                  fillOpacity={0.12} 
                  name="Confidence Interval"
                  activeDot={false}
                />
                <Area 
                  type="monotone" 
                  dataKey="confidenceMin" 
                  stroke="none" 
                  fill="#FFFFFF" 
                  fillOpacity={1} 
                  name=""
                  activeDot={false}
                />

                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#2563EB" 
                  strokeWidth={2.5}
                  strokeDasharray="6 4"
                  dot={{ r: 3, strokeWidth: 1.5, fill: "#FFFFFF", stroke: "#2563EB" }}
                  activeDot={{ r: 5, fill: "#2563EB", stroke: "#FFFFFF", strokeWidth: 2 }}
                  name="AI Prediction"
                />

                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#0F172A" 
                  strokeWidth={2.5}
                  connectNulls={false}
                  dot={{ r: 3, strokeWidth: 1.5, fill: "#0F172A", stroke: "#0F172A" }}
                  activeDot={{ r: 5, fill: "#0F172A", stroke: "#FFFFFF", strokeWidth: 2 }}
                  name="Actual Incidents"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 24-Hour Shift Crime Likelihood Breakdown */}
      <Card className="border-[#E2E8F0] shadow-2xs">
        <CardHeader className="pb-3 border-b border-[#E2E8F0]">
          <CardTitle className="text-sm font-bold text-[#1F2937] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#0F172A]" />
              Temporal Shift Crime Likelihood Breakdown
            </span>
            <span className="text-[10px] text-[#64748B] font-mono">24-Hour Operational Cycle</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SHIFT_PROBABILITY.map((item, idx) => (
              <div key={idx} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F2937]">{item.shift}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.status === "High Priority" ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700"
                  }`}>
                    {item.risk}
                  </span>
                </div>
                <div className="text-[11px] text-[#475569]">
                  Threat: <strong className="text-[#1F2937]">{item.primary}</strong>
                </div>
                <div className="text-[10px] text-[#64748B] flex items-center gap-1 font-mono">
                  <ShieldAlert className="h-3 w-3 text-amber-600 shrink-0" />
                  {item.alert}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* District Patrol Deployment Matrix */}
      <Card className="border-[#E2E8F0] shadow-2xs">
        <CardHeader className="pb-3 border-b border-[#E2E8F0]">
          <CardTitle className="text-sm font-bold text-[#1F2937] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Car className="h-4 w-4 text-[#0F172A]" />
              District Patrol Allocation Matrix
            </span>
            <span className="text-[10px] text-[#64748B]">Statewide Command Action</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E2E8F0]">
            {PATROL_DEPLOYMENT_MATRIX.map((row, idx) => {
              const isDeployed = row.status === "Deployed" || deployedDistricts.includes(row.district)
              return (
                <div key={idx} className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#F8FAFC] transition-colors text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#1F2937] text-xs">{row.district}</h4>
                      <span className="text-[10px] bg-slate-100 text-[#1F2937] px-1.5 py-0.5 rounded font-mono font-semibold">
                        {row.station}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Predicted Threat: <strong className="text-[#1F2937]">{row.predictedType}</strong> • Required Units: <span className="font-mono font-bold text-[#0F172A]">{row.unitsRequired} QRT</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="font-mono font-bold text-xs text-[#0F172A]">
                      Risk: {row.riskScore}/100
                    </span>
                    <Button
                      size="sm"
                      disabled={isDeployed}
                      onClick={() => handleDeployPatrol(row.district)}
                      className={`h-7 text-xs font-semibold px-3 cursor-pointer ${
                        isDeployed 
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border border-emerald-300" 
                          : "bg-[#0F172A] hover:bg-black text-white"
                      }`}
                    >
                      {isDeployed ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1 text-emerald-600" />
                          Patrol Active
                        </>
                      ) : (
                        <>
                          Deploy Patrol <ArrowRight className="h-3 w-3 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statewide Spatial Crime Risk Zones (Fills remaining left column space) */}
      <Card className="border-[#E2E8F0] shadow-2xs">
        <CardHeader className="pb-3 border-b border-[#E2E8F0]">
          <CardTitle className="text-sm font-bold text-[#1F2937] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#0F172A]" />
              Statewide Predictive Risk Zones
            </span>
            <span className="text-[10px] text-[#64748B] font-mono">Karnataka Police Command Feeds</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E2E8F0]">
            {STATEWIDE_ZONES.map((z, idx) => (
              <div key={idx} className="p-3.5 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors text-xs">
                <div>
                  <h4 className="font-bold text-[#1F2937] text-xs">{z.zone}</h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Threat: <strong className="text-[#1F2937]">{z.primaryThreat}</strong> • Active Assets: <span className="font-mono font-bold text-[#0F172A]">{z.units}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    Probability: {z.probability}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Tactical Tasking Log (Fills bottom left column alongside Live Alerts) */}
      <Card className="border-[#E2E8F0] shadow-2xs">
        <CardHeader className="pb-3 border-b border-[#E2E8F0]">
          <CardTitle className="text-sm font-bold text-[#1F2937] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-[#0F172A]" />
              Live Tactical Tasking Dispatch Queue
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Active Telemetry
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E2E8F0]">
            {LIVE_COMMAND_LOGS.map((log) => {
              const isTasked = taskedCommands.includes(log.id) || log.status === "Resolved"
              return (
                <div key={log.id} className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#F8FAFC] transition-colors text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#0F172A]">{log.id}</span>
                      <span className="font-bold text-[#1F2937] text-xs">{log.unit}</span>
                      <span className="text-[9px] text-[#64748B] font-mono">{log.time}</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Target Threat: <strong className="text-[#1F2937]">{log.threat}</strong> @ {log.location}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    disabled={isTasked}
                    onClick={() => handleTaskCommand(log.id, log.unit)}
                    className={`h-7 text-xs font-semibold px-3 cursor-pointer shrink-0 ${
                      isTasked 
                        ? "bg-slate-100 text-[#64748B] border border-[#E2E8F0]" 
                        : "bg-[#0F172A] hover:bg-black text-white"
                    }`}
                  >
                    {isTasked ? (
                      <>
                        <ShieldCheck className="h-3 w-3 mr-1 text-emerald-600" />
                        Dispatched
                      </>
                    ) : (
                      <>
                        Dispatch Unit <ArrowRight className="h-3 w-3 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Model Telemetry & Accuracy Footer */}
      <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#0F172A] text-white rounded-lg">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="font-bold text-[#1F2937]">KSP AI Forecast Model Engine v4.2</div>
            <div className="text-[10px] text-[#64748B]">Trained on 2020-2026 Karnataka State Crime Records & ANPR Telemetry</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono font-bold text-[#0F172A]">
          <span>Precision: <strong className="text-emerald-700">94.2%</strong></span>
          <span>•</span>
          <span>Recall: <strong className="text-blue-700">91.8%</strong></span>
          <span>•</span>
          <span>F1 Score: <strong className="text-[#0F172A]">92.9%</strong></span>
        </div>
      </div>
    </div>
  )
}
