// src/settings/components/tabs/PreferencesTab.tsx
"use client";

import * as React from "react";
import { Loader2, Globe, Moon, Sun, DollarSign, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";

import {
  ThemePreference,
  CurrencyPreference,
  LanguagePreference,
} from "@/features/settings/types";
import { usePreferencesSettings } from "../../hooks/usePreferencesSettings";

export function PreferencesTab() {
  const { isPending, prefs, setPrefs, handleSave } = usePreferencesSettings();

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='text-lg font-bold text-foreground'>
            Platform Preferences
          </CardTitle>
          <CardDescription className='text-xs text-zinc-400'>
            Customize how Nexus looks and feels on your device.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id='preferences-form' onSubmit={handleSave}>
            <FieldGroup className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Theme Preference */}
              <Field>
                <FieldLabel className='text-[11px] font-medium text-zinc-400 uppercase flex items-center gap-2 mb-2'>
                  <div className='flex items-center gap-0.5'>
                    <Sun className='size-3.5' />
                    <Moon className='size-3.5' />
                  </div>
                  Appearance
                </FieldLabel>
                <Select
                  disabled={isPending}
                  value={prefs.theme}
                  onValueChange={(val: string) =>
                    setPrefs((prev) => ({
                      ...prev,
                      theme: val as ThemePreference,
                    }))
                  }
                >
                  <SelectTrigger
                    aria-label='Select Theme Appearance'
                    className='h-10 rounded-xl border-border bg-muted/10 text-sm focus:ring-1 focus:ring-primary'
                  >
                    <SelectValue placeholder='Select theme' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'>
                    <SelectItem value='dark' className='text-xs rounded-lg'>
                      Dark Mode (Default)
                    </SelectItem>
                    <SelectItem value='light' className='text-xs rounded-lg'>
                      Light Mode
                    </SelectItem>
                    <SelectItem value='system' className='text-xs rounded-lg'>
                      System Sync
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Currency Preference */}
              <Field>
                <FieldLabel className='text-[11px] font-medium text-zinc-400 uppercase flex items-center gap-2 mb-2'>
                  <DollarSign className='size-3.5' /> Base Currency
                </FieldLabel>
                <Select
                  disabled={isPending}
                  value={prefs.currency}
                  onValueChange={(val: string) =>
                    setPrefs((prev) => ({
                      ...prev,
                      currency: val as CurrencyPreference,
                    }))
                  }
                >
                  <SelectTrigger
                    aria-label='Select Base Currency'
                    className='h-10 rounded-xl border-border bg-muted/10 text-sm focus:ring-1 focus:ring-primary'
                  >
                    <SelectValue placeholder='Select currency' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'>
                    <SelectItem value='USD' className='text-xs rounded-lg'>
                      USD - US Dollar
                    </SelectItem>
                    <SelectItem value='EUR' className='text-xs rounded-lg'>
                      EUR - Euro
                    </SelectItem>
                    <SelectItem value='GBP' className='text-xs rounded-lg'>
                      GBP - British Pound
                    </SelectItem>
                    <SelectItem value='JPY' className='text-xs rounded-lg'>
                      JPY - Japanese Yen
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Language Preference */}
              <Field>
                <FieldLabel className='text-[11px] font-medium text-zinc-400 uppercase flex items-center gap-2 mb-2'>
                  <Globe className='size-3.5' /> Language
                </FieldLabel>
                <Select
                  disabled={isPending}
                  value={prefs.language}
                  onValueChange={(val: string) =>
                    setPrefs((prev) => ({
                      ...prev,
                      language: val as LanguagePreference,
                    }))
                  }
                >
                  <SelectTrigger
                    aria-label='Select Interface Language'
                    className='h-10 rounded-xl border-border bg-muted/10 text-sm focus:ring-1 focus:ring-primary'
                  >
                    <SelectValue placeholder='Select language' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'>
                    <SelectItem value='English' className='text-xs rounded-lg'>
                      English (US)
                    </SelectItem>
                    <SelectItem value='Persian' className='text-xs rounded-lg'>
                      Persian (FA)
                    </SelectItem>
                    <SelectItem value='French' className='text-xs rounded-lg'>
                      French (FR)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* Timezone Preference */}
              <Field>
                <FieldLabel className='text-[11px] font-medium text-zinc-400 uppercase flex items-center gap-2 mb-2'>
                  <Clock className='size-3.5' /> Timezone
                </FieldLabel>
                <Select
                  disabled={isPending}
                  value={prefs.timezone}
                  onValueChange={(val: string) =>
                    setPrefs((prev) => ({ ...prev, timezone: val }))
                  }
                >
                  <SelectTrigger
                    aria-label='Select System Timezone'
                    className='h-10 rounded-xl border-border bg-muted/10 text-sm focus:ring-1 focus:ring-primary'
                  >
                    <SelectValue placeholder='Select timezone' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-border/80 bg-popover/95 backdrop-blur-md'>
                    <SelectItem
                      value='America/Los_Angeles'
                      className='text-xs rounded-lg'
                    >
                      Pacific Time (PT)
                    </SelectItem>
                    <SelectItem
                      value='America/New_York'
                      className='text-xs rounded-lg'
                    >
                      Eastern Time (ET)
                    </SelectItem>
                    <SelectItem
                      value='Europe/London'
                      className='text-xs rounded-lg'
                    >
                      London (GMT)
                    </SelectItem>
                    <SelectItem
                      value='Asia/Tehran'
                      className='text-xs rounded-lg'
                    >
                      Tehran (IRST)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className='px-6 py-4 bg-muted/5 border-t border-border/40 flex justify-end'>
          <Button
            type='submit'
            form='preferences-form'
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
