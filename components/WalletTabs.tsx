"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SendTab } from "@/components/tabs/SendTab";
import { OverviewTab } from "@/components/tabs/OverviewTab";
import { ReceiveTab } from "@/components/tabs/ReceiveTab";

export function WalletTabs() {
  return (
    <Tabs
      defaultValue="overview"
      className="w-full max-w-md"
    >
      <TabsList className="grid w-full grid-cols-3">
      <TabsTrigger className="cursor-pointer" value="overview">Overview</TabsTrigger>

        <TabsTrigger className="cursor-pointer" value="send">Send</TabsTrigger>
        <TabsTrigger className="cursor-pointer" value="receive">Receive</TabsTrigger>
      </TabsList>

      <TabsContent value="send">
        <SendTab />
      </TabsContent>

      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="receive">
        <ReceiveTab />
      </TabsContent>
    </Tabs>
  );
}
