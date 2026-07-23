import { Input } from "@/components/ui/input"

export function CasesFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {/* Crime Type */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Crime Type</label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <option value="">All Types</option>
          <option value="theft">Theft</option>
          <option value="cyber">Cyber Crime</option>
          <option value="assault">Assault</option>
          <option value="fraud">Fraud</option>
        </select>
      </div>

      {/* Status */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Status</label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <option value="">All Statuses</option>
          <option value="open">Open</option>
          <option value="investigating">Under Investigation</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* District */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">District</label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <option value="">All Districts</option>
          <option value="north">North District</option>
          <option value="south">South District</option>
          <option value="east">East District</option>
          <option value="west">West District</option>
          <option value="central">Central District</option>
        </select>
      </div>

      {/* Officer */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Officer</label>
        <Input placeholder="Officer Name" />
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Date Range</label>
        <Input type="date" className="text-muted-foreground" />
      </div>

      {/* Priority */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-muted-foreground">Priority</label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  )
}
