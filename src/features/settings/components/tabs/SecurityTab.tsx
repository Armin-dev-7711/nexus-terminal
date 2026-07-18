// src/features/settings/components/tabs/SecurityTab.tsx
"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import {
  Loader2,
  Key,
  SmartphoneNfc,
  Laptop,
  LogOut,
  ShieldCheck,
  MapPin,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";

import { mockSessions } from "../../mocks/settings.mock";
import { useSecuritySettings } from "../../hooks/useSecuritySettings";

export function SecurityTab() {
  const {
    form,
    isPending,
    twoFactorEnabled,
    onSubmit,
    handleRevokeSession,
    toggleTwoFactor,
  } = useSecuritySettings();

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 transform-gpu'>
      {/* 1. Change Password Section */}
      <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-lg font-bold text-foreground flex items-center gap-2'>
            <Key className='size-5 text-primary' /> Password Management
          </CardTitle>
          <CardDescription className='text-xs text-zinc-400'>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id='password-form' onSubmit={onSubmit}>
            <FieldGroup className='space-y-4 max-w-md'>
              {/* Input current password */}
              <Controller
                name='currentPassword'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor='currentPassword'
                      className='text-[11px] font-medium text-zinc-400 uppercase'
                    >
                      Current Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id='currentPassword'
                      aria-label='Current Password'
                      type='password'
                      disabled={isPending}
                      className='h-10 rounded-xl border-border bg-muted/10 text-sm focus-visible:ring-1 focus-visible:ring-primary placeholder:text-zinc-500'
                      placeholder='••••••••'
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-[10px]'
                      />
                    )}
                  </Field>
                )}
              />

              {/* Input new password */}
              <Controller
                name='newPassword'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor='newPassword'
                      className='text-[11px] font-medium text-zinc-400 uppercase'
                    >
                      New Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id='newPassword'
                      aria-label='New Password'
                      type='password'
                      disabled={isPending}
                      className='h-10 rounded-xl border-border bg-muted/10 text-sm focus-visible:ring-1 focus-visible:ring-primary placeholder:text-zinc-500'
                      placeholder='••••••••'
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-[10px]'
                      />
                    )}
                  </Field>
                )}
              />

              {/* Repeat new password */}
              <Controller
                name='confirmPassword'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor='confirmPassword'
                      className='text-[11px] font-medium text-zinc-400 uppercase'
                    >
                      Confirm New Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id='confirmPassword'
                      aria-label='Confirm New Password'
                      type='password'
                      disabled={isPending}
                      className='h-10 rounded-xl border-border bg-muted/10 text-sm focus-visible:ring-1 focus-visible:ring-primary placeholder:text-zinc-500'
                      placeholder='••••••••'
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className='text-[10px]'
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className='px-6 py-4 bg-muted/5 border-t border-border/40 flex justify-end'>
          <Button
            type='submit'
            form='password-form'
            disabled={isPending}
            className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 shadow-md shadow-primary/10'
          >
            {isPending ? (
              <>
                <Loader2 className='mr-2 size-4 animate-spin' /> Updating
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* 2. 2FA Layer */}
      <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm'>
        <CardContent className='p-6'>
          <div className='flex max-[1184px]:flex-col max-[1184px]:items-start items-center justify-between gap-6'>
            <div className='flex max-[1184px]:flex-col items-start gap-4 min-w-0'>
              <div
                className={`shrink-0 p-3 rounded-2xl ${twoFactorEnabled ? "bg-emerald-500/10 text-emerald-400" : "bg-muted/20 text-zinc-400"}`}
              >
                <SmartphoneNfc className='size-6' />
              </div>
              <div className='min-w-0 max-[372px]:space-y-4'>
                <h3 className='text-base font-bold text-foreground flex items-center gap-2 flex-wrap'>
                  Two-Factor Authentication (2FA)
                  {twoFactorEnabled && (
                    <ShieldCheck className='shrink-0 size-4 text-emerald-400' />
                  )}
                </h3>
                <p className='text-xs text-zinc-400 mt-1 max-w-md leading-relaxed'>
                  Add an extra layer of security to your account. We recommend
                  using an authenticator app.
                </p>
              </div>
            </div>
            <Button
              variant={twoFactorEnabled ? "outline" : "default"}
              onClick={toggleTwoFactor}
              className={`shrink-0 ${twoFactorEnabled ? "rounded-xl border-border/60" : "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"}`}
            >
              {twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 3. Active Sessions Group */}
      <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm overflow-hidden'>
        <CardHeader>
          <CardTitle className='text-lg font-bold text-foreground'>
            Active Sessions
          </CardTitle>
          <CardDescription className='text-xs text-zinc-400'>
            Devices that are currently logged into your account.
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='divide-y divide-border/40'>
            {mockSessions.map((session) => (
              <div
                key={session.id}
                className='flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-6 hover:bg-muted/5 transition-colors'
              >
                <div className='flex items-start gap-4 min-w-0'>
                  <div className='mt-1 shrink-0'>
                    {session.device.toLowerCase().includes("macbook") ||
                    session.device.toLowerCase().includes("windows") ? (
                      <Laptop className='size-5 text-zinc-400' />
                    ) : (
                      <SmartphoneNfc className='size-5 text-zinc-400' />
                    )}
                  </div>
                  <div className='space-y-1 min-w-0'>
                    <p className='text-sm font-semibold text-foreground flex items-center gap-2 flex-wrap'>
                      <span className='truncate'>{session.device}</span>
                      {session.isCurrent && (
                        <span className='shrink-0 text-[9px] uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-bold tracking-wider'>
                          Current
                        </span>
                      )}
                    </p>
                    <div className='flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400'>
                      <span className='truncate'>{session.browser}</span>
                      <span className='shrink-0 size-1 rounded-full bg-border/80' />
                      <span className='shrink-0'>{session.ipAddress}</span>
                      <span className='shrink-0 size-1 rounded-full bg-border/80' />
                      <span className='flex items-center gap-1 shrink-0'>
                        <MapPin className='size-3' />
                        <span className='truncate max-w-[120px] sm:max-w-none'>
                          {session.location}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => handleRevokeSession(session.id)}
                    className='shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl h-8 cursor-pointer self-start md:self-auto'
                  >
                    <LogOut className='size-3.5 mr-1.5' /> Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
