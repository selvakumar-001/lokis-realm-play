import { useEffect, useState } from "react";

import logoImage from "@/assets/name_logo.png";
import { useSettings } from "@/hooks/use-cms";
import { cn } from "@/lib/utils";

type NameLogoProps = {
  /** Classes applied to the name-logo image. */
  className?: string;
  /** Classes applied to the text-name fallback shown if the image fails. */
  fallbackClassName?: string;
};

/**
 * Site name rendered as the uploaded name-logo image.
 * Uses the bundled asset unless the CMS provides a "logoUrl" override.
 * Falls back to the plain text site name when the image is missing or fails.
 */
export function NameLogo({ className, fallbackClassName }: NameLogoProps) {
  const settings = useSettings();
  const src = settings.logoUrl || logoImage;
  const [failed, setFailed] = useState(false);

  // Retry the image whenever its source changes (e.g. CMS override arrives).
  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return <span className={cn(fallbackClassName)}>{settings.name}</span>;
  }

  return (
    <img
      src={src}
      alt={`${settings.name} logo`}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}