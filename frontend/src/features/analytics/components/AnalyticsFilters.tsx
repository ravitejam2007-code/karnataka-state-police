
export function AnalyticsFilters() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">District</label>
        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="">All Districts</option>
          <option value="central">Central</option>
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
        </select>
      </div>
      
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Police Station</label>
        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="">All Stations</option>
          <option value="ps1">Station Alpha</option>
          <option value="ps2">Station Beta</option>
          <option value="ps3">Station Gamma</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Crime Type</label>
        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="">All Types</option>
          <option value="theft">Theft</option>
          <option value="assault">Assault</option>
          <option value="cyber">Cyber Crime</option>
          <option value="fraud">Fraud</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Year</label>
        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Month</label>
        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Gender</label>
        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="">Any</option>
          <option value="m">Male</option>
          <option value="f">Female</option>
          <option value="o">Other</option>
        </select>
      </div>
      
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Age Group</label>
        <select className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="">Any</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
          <option value="50+">50+</option>
        </select>
      </div>
    </div>
  )
}
