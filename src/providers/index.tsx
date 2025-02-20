import { SpeedInsights } from "@vercel/speed-insights/next";
import { type Atom, Provider as JotaiProvider, useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";

import { getConfig } from "@/lib/actions";

import { Toaster } from "sonner";
import { ModalProvider } from "./modal-provider";
import { ApolloProvider } from "./apollo-provider";
import { ConfigProvider } from "./config-provider";
import { DirectHooks } from "./direct-hooks";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = async ({ children }: ProvidersProps) => {
  const { config } = await getConfig();

  return (
    <JotaiProvider>
      <ApolloProvider>
        <ConfigProvider config={config}>{children}</ConfigProvider>

        <ModalProvider />

        <Toaster richColors position="top-right" closeButton />

        <SpeedInsights />

        <DirectHooks />
      </ApolloProvider>
    </JotaiProvider>
  );
};

export function useSelectAtom(
  anAtom: Atom<unknown>,
  keyFn: (v: unknown, prevSlice?: unknown) => unknown,
) {
  return useAtomValue(selectAtom(anAtom, keyFn));
}
