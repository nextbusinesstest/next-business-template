import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import PacksRouter from "../../components/preview/PacksRouter";
import { normalizeSpec } from "../../lib/normalizeSpec";

export default function PreviewPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("nb_last_site_spec");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setSpec(normalizeSpec(parsed));
    } catch {
      setSpec(null);
    }
  }, []);

  const cssVars = useMemo(() => {
    const c = spec?.design_tokens?.colors;
    if (!c) return {};
    return {
      "--c-primary": c.primary,
      "--c-secondary": c.secondary,
      "--c-bg": c.background,
      "--c-text": c.text,
      "--c-accent": c.accent,
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

  const title = spec?.meta?.title || "Preview";
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
