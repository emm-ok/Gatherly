import { AccountView } from "@neondatabase/auth-ui";
import { accountViewPaths } from "@neondatabase/auth-ui/server";

// export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({
    path,
  }));
}

interface SettingsPageProps {
  params: Promise<{
    path: string;
  }>;
}

export default async function SettingsPage({
  params,
}: SettingsPageProps) {
  const { path } = await params;

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 bg-stone-950 rounded-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Account settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information, security and account preferences.
        </p>
      </div>

      <AccountView path={path} />
    </main>
  );
}