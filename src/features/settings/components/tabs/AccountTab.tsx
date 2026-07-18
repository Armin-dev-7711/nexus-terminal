// src/features/settings/components/tabs/AccountTab.tsx
"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { Loader2, Trash2, Camera, UploadCloud } from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAccountSettings } from "../../hooks/useAccountSettings";
import { mockUserProfile } from "../../mocks/settings.mock";

export function AccountTab() {
  const {
    form,
    isPending,
    isAvatarModalOpen,
    setIsAvatarModalOpen,
    avatarPreview,
    onSubmit,
    handleDeleteAccount,
    handleFileChange,
    handleUploadAvatar,
    handleRemoveAvatar,
  } = useAccountSettings();

  const currentFirstName = form.watch("firstName") || "";
  const currentLastName = form.watch("lastName") || "";

  return (
    <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
      {/* Avatar Upload Modal */}
      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent className='sm:max-w-md border-border/60 bg-card/95 backdrop-blur-xl rounded-2xl'>
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription className='text-xs text-zinc-400'>
              Upload a new avatar or remove the current one.
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col items-center justify-center py-6 gap-6'>
            <Avatar className='size-24 rounded-full border-2 border-border/60 shadow-xl'>
              <AvatarImage
                src={avatarPreview || mockUserProfile.avatarUrl}
                alt='Preview'
                className='object-cover'
              />
              <AvatarFallback className='bg-primary/20 text-primary font-bold text-2xl '>
                {currentFirstName.charAt(0)}
                {currentLastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className='w-full relative'>
              <input
                type='file'
                id='avatar-upload'
                className='hidden'
                accept='image/png, image/jpeg, image/gif'
                onChange={handleFileChange}
              />
              <label
                htmlFor='avatar-upload'
                className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border/60 rounded-xl cursor-pointer bg-muted/5 hover:bg-muted/10 transition-colors group'
              >
                <UploadCloud className='size-8 text-muted-foreground group-hover:text-primary transition-colors mb-2' />
                <p className='text-sm font-semibold text-foreground'>
                  Click or drag file to this area
                </p>
                <p className='text-[10px] text-zinc-400 mt-1'>
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </label>
            </div>
          </div>

          <div className='flex items-center justify-between pt-4 border-t border-border/40'>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleRemoveAvatar}
              className='text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl'
            >
              <Trash2 className='size-4 mr-2' /> Remove
            </Button>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setIsAvatarModalOpen(false)}
                disabled={isPending}
                className='rounded-xl'
              >
                Cancel
              </Button>
              <Button
                size='sm'
                onClick={handleUploadAvatar}
                disabled={isPending || !avatarPreview}
                className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl'
              >
                {isPending ? (
                  <Loader2 className='size-4 mr-2 animate-spin' />
                ) : (
                  "Save Avatar"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main settings */}
      <Card className='rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='text-lg font-bold text-foreground'>
            Personal Information
          </CardTitle>
          <CardDescription className='text-xs text-zinc-400'>
            Update your basic profile details and public email.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center gap-5 bg-muted/5 p-4 rounded-xl border border-border/40 max-w-md'>
            <div
              className='relative group cursor-pointer'
              onClick={() => setIsAvatarModalOpen(true)}
            >
              <Avatar className='size-16 rounded-xl border border-border/60 shadow-lg'>
                <AvatarImage
                  src={avatarPreview || mockUserProfile.avatarUrl}
                  alt={currentFirstName || "User profile"}
                  className='object-cover'
                />
                <AvatarFallback className='bg-primary/20 text-primary font-bold text-sm '>
                  {currentFirstName.charAt(0)}
                  {currentLastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white'>
                <Camera className='size-4' />
              </div>
            </div>
            <div className='space-y-1'>
              <p className='text-xs font-semibold text-foreground'>
                Profile Picture
              </p>
              <p className='text-[12px] text-zinc-400'>
                PNG, JPG or GIF. Max 2MB.
              </p>
              <div className='flex items-center gap-2 mt-1'>
                <button
                  type='button'
                  onClick={() => setIsAvatarModalOpen(true)}
                  className='text-[10px] font-medium text-primary hover:underline cursor-pointer'
                >
                  Change Avatar
                </button>
              </div>
            </div>
          </div>

          <form id='profile-form' onSubmit={onSubmit}>
            <FieldGroup className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* First Name */}
                <Controller
                  name='firstName'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor='firstName'
                        className='text-[11px] font-medium text-zinc-400 uppercase'
                      >
                        First Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id='firstName'
                        disabled={isPending}
                        aria-label='First name'
                        className='h-10 rounded-xl border-border bg-muted/10 text-sm focus-visible:ring-1 focus-visible:ring-primary'
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

                {/* Last Name */}
                <Controller
                  name='lastName'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor='lastName'
                        className='text-[11px] font-medium text-zinc-400 uppercase'
                      >
                        Last Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id='lastName'
                        disabled={isPending}
                        aria-label='Last name'
                        className='h-10 rounded-xl border-border bg-muted/10 text-sm focus-visible:ring-1 focus-visible:ring-primary'
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
              </div>

              {/* Email */}
              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor='email'
                      className='text-[11px] font-medium text-zinc-400 uppercase'
                    >
                      Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      type='email'
                      id='email'
                      aria-label='Email Address'
                      disabled={isPending}
                      className='h-10 rounded-xl border-border bg-muted/10 text-sm focus-visible:ring-1 focus-visible:ring-primary'
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
            form='profile-form'
            disabled={isPending}
            className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 shadow-md shadow-primary/10'
          >
            {isPending ? (
              <Loader2 className='mr-2 size-4 animate-spin' />
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Danger Zone */}
      <Card className='rounded-2xl border border-destructive/20 bg-destructive/5 backdrop-blur-sm overflow-hidden'>
        <CardHeader>
          <CardTitle className='text-lg font-bold text-destructive flex items-center gap-2'>
            Danger Zone
          </CardTitle>
          <CardDescription className='text-xs text-zinc-400'>
            Irreversible actions regarding your account and data.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/40 bg-card/50'>
            <div>
              <p className='text-sm font-semibold text-foreground'>
                Export Account Data
              </p>
              <p className='text-xs text-zinc-400 mt-1'>
                Download all your transaction history and settings as JSON.
              </p>
            </div>
            <Button
              variant='outline'
              className='rounded-xl h-9 border-border/60 hover:bg-muted/30'
            >
              Export Data
            </Button>
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-destructive/20 bg-destructive/10'>
            <div>
              <p className='text-sm font-semibold text-destructive'>
                Delete Account
              </p>
              <p className='text-xs text-zinc-400 mt-1'>
                Permanently remove your account and all associated data.
              </p>
            </div>
            <Button
              variant='destructive'
              onClick={handleDeleteAccount}
              className='rounded-xl h-9'
            >
              <Trash2 className='size-4 mr-2' /> Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
