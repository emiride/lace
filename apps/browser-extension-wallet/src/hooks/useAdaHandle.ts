import { useMemo } from 'react';
import { HANDLE_SERVER_URLS } from '@src/features/ada-handle/config';
import { KoraLabsHandleProvider } from '@src/features/ada-handle/provider';
import { useWalletStore } from '@src/stores';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHandleResolver = () => {
  const {
    blockchainProvider,
    currentChain: { networkMagic }
  } = useWalletStore();

  return useMemo(() => {
    const serverUrl = HANDLE_SERVER_URLS[networkMagic as keyof typeof HANDLE_SERVER_URLS];
    return new KoraLabsHandleProvider({
      serverUrl,
      networkInfoProvider: blockchainProvider.networkInfoProvider
    });
  }, [blockchainProvider, networkMagic]);
};
