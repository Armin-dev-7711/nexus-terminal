// src/features/settings/components/tabs/DeveloperTab.tsx
"use client";

import { Key, Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDeveloperSettings } from "../../hooks/useDeveloperSettings";
import { mockApiKeys } from "../../mocks/settings.mock";

export function DeveloperTab() {
  const { hiddenKeys, toggleVisibility, copyKey } = useDeveloperSettings();

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 transform-gpu'>
      <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm overflow-hidden'>
        <CardHeader className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 items-start pb-6'>
          <div className='space-y-1'>
            <CardTitle className='text-lg font-bold text-foreground flex items-center gap-2'>
              <Key className='size-5 text-primary' />
              API Management
            </CardTitle>

            <CardDescription className='text-xs text-zinc-300'>
              Manage your secret keys for external integrations.
            </CardDescription>
          </div>
          <Button className='w-full sm:w-auto shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer shadow-md shadow-primary/10'>
            <Plus className='size-4 mr-2' /> New Key
          </Button>
        </CardHeader>

        <CardContent className='p-0 border-t border-border/40'>
          <div className='divide-y divide-border/40'>
            {mockApiKeys.map((key) => (
              <div
                key={key.id}
                className='flex flex-col xl:flex-row xl:items-center justify-between p-4 sm:p-6 gap-4 sm:gap-6 hover:bg-muted/5 transition-colors'
              >
                <div className='space-y-1 min-w-0 flex-1'>
                  <p className='text-sm font-bold text-foreground truncate'>
                    {key.name}
                  </p>

                  <p className='text-xs text-zinc-300 truncate'>
                    Created: {new Date(key.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className='flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto shrink-0'>
                  <div className='flex items-center justify-between bg-muted/20 border border-border/40 p-1.5 rounded-xl text-xs w-full sm:w-[280px]'>
                    <span className='truncate px-2 text-zinc-300'>
                      {hiddenKeys[key.id] ? "••••••••••••••••" : key.keyPrefix}
                    </span>
                    <div className='flex items-center shrink-0'>
                      <Button
                        variant='ghost'
                        size='icon'
                        aria-label={
                          hiddenKeys[key.id] ? "Reveal API Key" : "Hide API Key"
                        }
                        className='size-7 rounded-lg cursor-pointer hover:bg-muted/40 text-zinc-300 hover:text-foreground'
                        onClick={() => toggleVisibility(key.id)}
                      >
                        {hiddenKeys[key.id] ? (
                          <Eye className='size-3.5' />
                        ) : (
                          <EyeOff className='size-3.5' />
                        )}
                      </Button>

                      <Button
                        variant='ghost'
                        size='icon'
                        aria-label='Copy API Key to clipboard'
                        className='size-7 rounded-lg cursor-pointer hover:bg-muted/40 text-zinc-300 hover:text-foreground'
                        onClick={() => copyKey(key.keyPrefix)}
                      >
                        <Copy className='size-3.5' />
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant='ghost'
                    aria-label={`Delete API Key: ${key.name}`}
                    className='text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl w-full sm:w-10 sm:h-10 sm:p-0 shrink-0 flex items-center justify-center cursor-pointer'
                  >
                    <Trash2 className='size-4' />
                    <span className='sm:hidden ml-2 font-medium'>
                      Delete Key
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
