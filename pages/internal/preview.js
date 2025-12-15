import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

import PremiumBrand from "../../components/layouts/PremiumBrand";
import LocalService from "../../components/layouts/LocalService";
import EcommerceRetail from "../../components/layouts/EcommerceRetail";

export default function PreviewPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("nb_last_site_spec");
    if (raw) {
      try {
        setSpec(JSON.parse(raw));
      } catch {
        setSpec(null);
      }
    }
  }, []);

  const themeVars = useMemo(() => {
    if (!spec?.theme) return {};
    return {
      "--c-primary": spec.theme.primaryColor,
      "--c-secondary": spec.theme.secondaryColor,
      "--c-bg": spec.theme.backgroundColor,
      "--c-text": spec.theme.textColor,
      "--c-accent": spec.theme.accentColor,
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

  const layout = (spec.layout || "premiumBrand").toLowerCase();

  const LayoutComponent =
    layout === "localservice"
      ? LocalService
      : layout === "ecommerceretail"
      ? EcommerceRetail
      : PremiumBrand;

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href={spec.brand?.logoDataUrl ? spec.brand.logoDataUrl : "/logo.png"} />
      </Head>

      <div style={{ ...themeVars }}>
        <LayoutComponent spec={spec} />
      </div>
    </>
  );
}
