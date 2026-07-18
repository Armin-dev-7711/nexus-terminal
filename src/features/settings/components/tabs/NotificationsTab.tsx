// src/features/settings/components/tabs/NotificationsTab.tsx
"use client";

import * as React from "react";
import { Bell, Mail, ShieldAlert, Activity, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { useNotificationSettings } from "../../hooks/useNotificationSettings";

export function NotificationsTab() {
  const { isPending, handleSave } = useNotificationSettings();

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 transform-gpu'>
      <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='text-lg font-bold text-foreground flex items-center gap-2'>
            <Bell className='size-5 text-primary' /> Notification Settings
          </CardTitle>
          <CardDescription className='text-xs text-zinc-400'>
            Control how you receive updates and alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-4'>
            <h4 className='text-xs font-semibold text-zinc-400 uppercase tracking-wider'>
              Security & Account
            </h4>
            <div className='flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/40'>
              <div className='flex items-center gap-3'>
                <ShieldAlert className='size-4 text-primary' />
                {/* 🚀 فیکس شد: جفت شدن معنایی Label و Switch با کمک id و htmlFor */}
                <Label
                  htmlFor='security-alerts'
                  className='text-sm font-medium cursor-pointer'
                >
                  Security Alerts
                </Label>
              </div>
              <Switch
                id='security-alerts'
                aria-label='Toggle Security Alerts'
                defaultChecked
              />
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='text-xs font-semibold text-zinc-400 uppercase tracking-wider'>
              Trading Activity
            </h4>
            <div className='flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/40'>
              <div className='flex items-center gap-3'>
                <Activity className='size-4 text-primary' />

                <Label
                  htmlFor='trade-executions'
                  className='text-sm font-medium cursor-pointer'
                >
                  Trade Executions
                </Label>
              </div>
              <Switch
                id='trade-executions'
                aria-label='Toggle Trade Executions'
                defaultChecked
              />
            </div>

            <div className='flex items-center justify-between p-4 rounded-xl bg-muted/10 border border-border/40'>
              <div className='flex items-center gap-3'>
                <Mail className='size-4 text-primary' />

                <Label
                  htmlFor='weekly-reports'
                  className='text-sm font-medium cursor-pointer'
                >
                  Weekly Portfolio Report
                </Label>
              </div>
              <Switch
                id='weekly-reports'
                aria-label='Toggle Weekly Portfolio Report'
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='px-6 py-4 bg-muted/5 border-t border-border/40 flex justify-end'>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 shadow-md shadow-primary/10'
          >
            {isPending ? (
              <>
                <Loader2 className='mr-2 size-4 animate-spin' /> Saving
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
