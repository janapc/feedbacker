import { setApiKey, setCurrentPage, setFingerprint } from '../store';

interface UseIframeControl {
  updateCoreValuesOnStore(): void;
  notifyOpen(): void;
  notifyClose(): void;
}

export default function UseIframeControl (): UseIframeControl {
  function updateCoreValuesOnStore (): void {
    if (process.env.NODE_ENV === 'production') {
      const query = new URLSearchParams(window.location.search);
      const apiKey = query.get('api_key') ?? '';
      const page = query.get('page') ?? '';
      const fingerprint = query.get('fingerprint') ?? '';

      setCurrentPage(page);
      setApiKey(apiKey);
      setFingerprint(fingerprint);

      return;
    }

    setCurrentPage('https://playground-url.app');
    setApiKey('dc25ac58-231c-4f4d-bda8-9311f77602bf');
    setFingerprint('1232345452');
  }

  function notifyOpen (): void {
    window.parent.postMessage(
      {
        isWidget: true,
        isOpen: true
      },
      '*'
    );
  }

  function notifyClose (): void {
    window.parent.postMessage(
      {
        isWidget: true,
        isOpen: false
      },
      '*'
    );
  }

  return {
    updateCoreValuesOnStore,
    notifyOpen,
    notifyClose
  };
}
