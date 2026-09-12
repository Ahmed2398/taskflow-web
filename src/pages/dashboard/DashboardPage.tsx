import { useTranslation } from "react-i18next";
import {
  Users,
  FolderKanban,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { useAuth } from "@/shared/hooks/useAuth";

const taskCompletionData = [
  { name: "Mon", completed: 12, created: 15 },
  { name: "Tue", completed: 18, created: 20 },
  { name: "Wed", completed: 14, created: 10 },
  { name: "Thu", completed: 22, created: 25 },
  { name: "Fri", completed: 28, created: 30 },
  { name: "Sat", completed: 8, created: 12 },
  { name: "Sun", completed: 5, created: 7 },
];

const teamActivityData = [
  { name: "Design", tasks: 24 },
  { name: "Frontend", tasks: 38 },
  { name: "Backend", tasks: 31 },
  { name: "QA", tasks: 16 },
  { name: "DevOps", tasks: 9 },
];

const stats = [
  { key: "teams", value: 4, icon: Users, color: "text-blue-500" },
  { key: "projects", value: 12, icon: FolderKanban, color: "text-purple-500" },
  { key: "completed", value: 147, icon: CheckCircle2, color: "text-green-500" },
  { key: "productivity", value: 23, icon: TrendingUp, color: "text-orange-500", suffix: "%" },
];

export function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* Welcome message */}
      <div>
        <h1 className="text-2xl font-bold">
          {t("dashboard.welcome")}, {user?.email?.split("@")[0] || t("common.welcome")} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">{t("dashboard.welcomeDescription")}</p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.key}>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {stat.value}
                    {stat.suffix || ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t(`dashboard.stats.${stat.key}`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Task completion area chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.taskCompletionTitle")}</CardTitle>
            <CardDescription>{t("dashboard.taskCompletionDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={taskCompletionData}>
                <defs>
                  <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#863bff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#863bff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="createdGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="created"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#createdGradient)"
                  name={t("dashboard.created")}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#863bff"
                  strokeWidth={2}
                  fill="url(#completedGradient)"
                  name={t("dashboard.completed")}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team activity bar chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.teamActivityTitle")}</CardTitle>
            <CardDescription>{t("dashboard.teamActivityDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" stroke="hsl(var(--muted-foreground))" />
                <YAxis className="text-xs" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                />
                <Bar
                  dataKey="tasks"
                  fill="#863bff"
                  radius={[4, 4, 0, 0]}
                  name={t("dashboard.tasks")}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
