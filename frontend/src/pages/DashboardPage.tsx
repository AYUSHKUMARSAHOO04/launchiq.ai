import { Activity, FlaskConical, Target, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/common/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const recentSimulations = [
  {
    name: 'EcoBlend Protein Shake',
    category: 'Health & Wellness',
    risk: 'Medium',
    updatedAt: '2 hours ago',
  },
  {
    name: 'Minimalist Desk Lamp',
    category: 'Home Office',
    risk: 'Low',
    updatedAt: 'Yesterday',
  },
  {
    name: 'Smart Pet Feeder Pro',
    category: 'Pet Care',
    risk: 'High',
    updatedAt: '3 days ago',
  },
]

export function DashboardPage() {
  return (
  <div className="space-y-6">
    <PageHeader
      title="Dashboard"
      description="Overview of your launch simulations, risk signals, and recent consumer intelligence."
    />

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Active simulations"
        value="12"
        change="+2 this week"
        icon={FlaskConical}
        trend="up"
      />
      <StatCard
        title="Avg. purchase likelihood"
        value="68%"
        change="+4.2% vs last month"
        icon={TrendingUp}
        trend="up"
      />
      <StatCard
        title="Launch risk score"
        value="42"
        change="Lower is better"
        icon={Target}
        trend="neutral"
      />
      <StatCard
        title="Personas generated"
        value="240"
        change="Across all runs"
        icon={Activity}
        trend="neutral"
      />
    </div>

    <Card className="border-border/70">
      <CardHeader>
        <CardTitle>Recent simulations</CardTitle>
        <CardDescription>
          Track synthetic consumer reactions across your latest product tests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border rounded-lg border border-border/70">
          {recentSimulations.map((sim) => (
            <div
              key={sim.name}
              className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-foreground">{sim.name}</p>
                <p className="text-sm text-muted-foreground">{sim.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    sim.risk === 'High'
                      ? 'destructive'
                      : sim.risk === 'Medium'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {sim.risk} risk
                </Badge>
                <span className="text-xs text-muted-foreground">{sim.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
  )
}
