import { usePersistentTabSettings } from "@/components/settings/usePersistentTabSettings";

export function useDownloadCode(url: string) {
  const { code } = usePersistentTabSettings(url);

  function downloadFile(fileName: string) {
    const blob = new Blob([code.value], { type: "text/plain" });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  return { downloadFile };
}
