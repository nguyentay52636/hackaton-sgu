"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useAdminLanguage } from "@/features/admin/i18n"
import GeneralSettings from "./components/GeneralSettings"
import NotificationsSettings from "./components/NotificationsSettings"
import SecuritySettings from "./components/SecuritySettings"
import IntegrationsSettings from "./components/IntegrationsSettings"

export default function SettingAdmin() {
  const { t } = useAdminLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("websiteSettings")}</h1>
        <p className="text-muted-foreground">{t("manageAndMonitor")}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t("generalSettings")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="integrations">{t("apiSettings")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>

        <TabsContent value="integrations">
          <IntegrationsSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
