// // src/features/settings/hooks/useSettingsData.ts
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { getUserSettings } from "../actions/settings.actions";

// export function useSettingsData() {
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["user-settings"],
//     queryFn: async () => {
//       const response = await getUserSettings();
//       // خروجی شامل نوع لاگین (OAuth یا ایمیل) هم هست!
//       return response;
//     },
//     staleTime: 1000 * 60 * 5, // دیتا تا ۵ دقیقه تازه (Fresh) محسوب می‌شود
//   });

//   // 🚀 استخراج هوشمندانه اینکه آیا کاربر فقط با گوگل/گیت‌هاب لاگین کرده یا پسورد هم دارد؟
//   const isOAuthOnly = data?.accounts?.every(
//     (acc) => acc.providerId === "google" || acc.providerId === "github",
//   );

//   return {
//     settings: data,
//     isLoading,
//     error,
//     refetch,
//     isOAuthOnly, // این متغیر طلایی برای مدیریت فرم تغییر پسورد است!
//   };
// }

// src/features/settings/hooks/useSettingsData.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserSettings } from "../actions/settings.actions";
import { UserSettingsResponse } from "../types";

export function useSettingsData() {
  const { data, isLoading, error, refetch } = useQuery<UserSettingsResponse>({
    queryKey: ["user-settings"],
    queryFn: async () => {
      return await getUserSettings();
    },
    staleTime: 1000 * 60 * 5,
  });

  const isOAuthOnly = data?.accounts?.every(
    (acc) => acc.providerId === "google" || acc.providerId === "github",
  );

  return {
    settings: data,
    isLoading,
    error,
    refetch,
    isOAuthOnly,
  };
}
