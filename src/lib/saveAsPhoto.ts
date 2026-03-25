import html2canvas from "html2canvas-pro";

export async function captureProfile(element: HTMLElement): Promise<void> {
  await document.fonts.ready;

  const canvas = await html2canvas(element, {
    scale: 3,
    backgroundColor: null,
    useCORS: true,
    logging: false,
  });

  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b!), "image/png")
  );

  const file = new File([blob], "dupr-profile.png", { type: "image/png" });

  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch {
      // User cancelled or share failed, fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "dupr-profile.png";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
