import type { Case } from "../types"
import { Badge } from "@/components/ui/badge"

interface CasesTableProps {
  cases: Case[]
  onRowClick: (caseData: Case) => void
}

export function CasesTable({ cases, onRowClick }: CasesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open": return "destructive"
      case "closed": return "secondary"
      case "under investigation": return "default"
      default: return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "text-red-500 bg-red-100 dark:bg-red-900/30"
      case "medium": return "text-orange-500 bg-orange-100 dark:bg-orange-900/30"
      case "low": return "text-green-500 bg-green-100 dark:bg-green-900/30"
      default: return "text-gray-500 bg-gray-100 dark:bg-gray-800"
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[750px] text-sm text-left border-collapse">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-3 font-medium">FIR Number</th>
            <th className="px-4 py-3 font-medium">Case ID</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Officer</th>
            <th className="px-4 py-3 font-medium">District</th>
            <th className="px-4 py-3 font-medium">Victims</th>
            <th className="px-4 py-3 font-medium">Accused</th>
            <th className="px-4 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {cases.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                No cases found.
              </td>
            </tr>
          ) : (
            cases.map((c) => (
              <tr 
                key={c.id} 
                className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onRowClick(c)}
              >
                <td className="px-4 py-3 font-medium">{c.firNumber}</td>
                <td className="px-4 py-3 font-medium text-muted-foreground">{c.id}</td>
                <td className="px-4 py-3">
                  <Badge variant={getStatusColor(c.status) as any}>{c.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(c.priority)}`}>
                    {c.priority}
                  </span>
                </td>
                <td className="px-4 py-3">{c.officer}</td>
                <td className="px-4 py-3">{c.district}</td>
                <td className="px-4 py-3 max-w-[150px] truncate" title={c.victims.join(", ")}>
                  {c.victims.length > 0 ? c.victims.join(", ") : "-"}
                </td>
                <td className="px-4 py-3 max-w-[150px] truncate" title={c.accused.join(", ")}>
                  {c.accused.length > 0 ? c.accused.join(", ") : "-"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(c.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
