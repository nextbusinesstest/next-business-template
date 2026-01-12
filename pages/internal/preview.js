import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import PacksRouter from "../../components/preview/PacksRouter";

import { v1ToV2 } from "../../lib/spec/adapters/v1_to_v2";
import { normalizeV2 } from "../../lib/spec/v2/normalize";

export default function PreviewPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
  const raw = window.localStorage.getItem("nb_last_site_spec");
  if (!raw) return;

  try {
    let parsed = JSON.parse(raw);

    // Si viene en v1 (o sin version), lo pasamos a v2
    if (!parsed?.version || parsed.version === "v1") {
      parsed = v1ToV2(parsed);
    }

    // Normalizamos a contrato v2 estable
    const normalized = normalizeV2(parsed);

    setSpec(normalized);
  } catch (e) {
    console.error("Error loading site_spec:", e);
    setSpec(null);
  }
}, []);

  const cssVars = useMemo(() => {
  // V2: brand.design_tokens.colors
  const v2c = spec?.brand?.design_tokens?.colors;
  // Compatibilidad por si algo llega raro
  const c = v2c || spec?.design_tokens?.colors || null;
  if (!c) return {};

  // Acepta tanto {primary, secondary, ...} como {primaryColor, ...}
  const primary = c.primary ?? c.primaryColor;
  const secondary = c.secondary ?? c.secondaryColor;
  const bg = c.background ?? c.backgroundColor;
  const text = c.text ?? c.textColor;
  const accent = c.accent ?? c.accentColor;

  return {
    "--c-primary": primary,
    "--c-secondary": secondary,
    "--c-bg": bg,
    "--c-text": text,
    "--c-accent": accent,
  };
}, [spec]);

  if (!spec) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white border rounded-2xl p-6 max-w-md text-center shadow-sm">
          <h1 className="text-lg font-semibold mb-2">No hay site_spec cargado</h1>
          <p className="text-sm text-gray-600">
            Genera un <code>site_spec</code> desde el panel interno o el portal cliente y vuelve aquí.
          </p>
          <a
            href="/internal/new-client"
            className="inline-flex items-center justify-center mt-4 px-4 py-2.5 bg-blue-900 text-white text-sm font-semibold rounded-md hover:bg-blue-800"
          >
            Ir al panel interno
          </a>
        </div>
      </div>
    );
  }

  const title = spec?.seo?.title || spec?.meta?.title || "Preview";
  const favicon = spec?.brand?.logoDataUrl ? spec.brand.logoDataUrl : "/logo.png";

  return (
    <>
      <Head>
        <title>{title} · Preview</title>
        <link rel="icon" type="image/png" href={favicon} />
      </Head>

      <div style={cssVars} className="min-h-screen bg-[var(--c-bg)] text-[var(--c-text)]">
        <PacksRouter spec={spec} />
      </div>
    </>
  );
}
