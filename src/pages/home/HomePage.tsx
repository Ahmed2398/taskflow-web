import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { LanguageToggle } from "@/shared/components/LanguageToggle";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";

export function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <h1 className="text-xl font-bold">{t("common.appName")}</h1>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 p-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{t("common.welcome")}</h2>
          <p className="text-muted-foreground">{t("common.appName")} — UI Design System</p>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>All button variants</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status indicators</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input id="email" type="email" placeholder="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System</CardTitle>
              <CardDescription>Theme & Language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("theme.toggle")}</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("language.toggle")}</span>
                <LanguageToggle />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
