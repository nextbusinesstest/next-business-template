import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

/* ---------------- SECTION RENDERER ---------------- */

function Section({ section }) {
  if (!section) return null;

  if (section.type === "cards") {
    return (
      <section id={section.id} className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {section.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {section.items?.map((item, i) => (
            <div
              key={i}
              className="p-5 border rounded-xl bg-white shadow-sm"
            >
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "services_grid") {
    return (
      <section id={section.id} className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          {section.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {section.items?.map((item, i) => (
            <div
              key={i}
              className="p-5 border rounded-xl bg-white shadow-sm"
            >
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "bullets") {
    return (
      <section id={section.id} className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {section.title}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {section.bullets?.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>
    );
  }

  if (section.type === "text") {
    return (
      <section id={section.id} className="mt-16 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {section.title}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {section.body}
        </p>
      </section>
    );
  }

  if (section.type === "contact") {
    return (
      <section id={section.id} className="mt-16 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {section.title}
        </h2>
        <p className="text-gray-700">{section.body}</p>
      </section>
    );
  }

  return null;
}

/* ---------------- PAGE ---------------- */

export default function PreviewPage() {
  const [siteSpec, setSiteSpec] = useState(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("nb_last_site_spec");
    if (raw) {
      try {
        setSiteSpec(JSON.parse(raw));
      } catch {
        setSiteSpec(null);
      }
    }
  }, []);

  const themeVars = useMemo(() => {
    if (!siteSpec?.theme) return {};
    return {
      "--c-primary": siteSpec.theme.primaryColor,
      "--c-secondary": siteSpec.theme.secondaryColor,
      "--c-bg": siteSpec.theme.backgroundColor,
      "--c-text": siteSpec.theme.textColor,
      "--c-accent": siteSpec.theme.accentColor,
    };
  }, [siteSpec]);

  if (!siteSpec) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white border rounded-xl p-6 max-w-md text-center shadow-sm">
          <h1 className="text-lg font-semibold mb-2">
            No hay site_spec cargado
          </h1>
          <p className="text-sm text-gray-600">
            Genera un site_spec desde el panel interno y vuelve aquí.
          </p>
          <a
            href="/internal/new-client"
            className="inline-block mt-4 text-sm underline text-blue-900"
          >
            Ir al panel interno
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{siteSpec.meta?.title || "Vista previa"}</title>
        <meta
          name="description"
          content={siteSpec.meta?.description || ""}
        />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "var(--c-bg)",
          color: "var(--c-text)",
          ...themeVars,
        }}
      >
        {/* HEADER */}
        <header className="border-b bg-white/90 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "var(--c-primary)" }}
              >
                {siteSpec.meta?.title?.charAt(0) || "W"}
              </div>
              <div>
                <div className="text-sm font-semibold">
                  {siteSpec.meta?.title}
                </div>
                <div className="text-xs text-gray-500">
                  Vista previa generada automáticamente
                </div>
              </div>
            </div>
            <a
              href="/internal/new-client"
              className="text-xs underline"
              style={{ color: "var(--c-primary)" }}
            >
              Volver al panel
            </a>
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-6xl mx-auto px-6 py-10">
          {/* HERO */}
          <section className="p-8 border rounded-2xl bg-white shadow-sm">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              {siteSpec.hero?.headline}
            </h1>
            <p className="mt-4 text-gray-700 max-w-2xl">
              {siteSpec.hero?.subheadline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#services"
                className="px-5 py-3 rounded-md text-white font-semibold"
                style={{ backgroundColor: "var(--c-primary)" }}
              >
                {siteSpec.hero?.primary_cta_label || "Ver más"}
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-md border font-semibold"
                style={{
                  borderColor: "var(--c-primary)",
                  color: "var(--c-primary)",
                }}
              >
                {siteSpec.hero?.secondary_cta_label || "Contacto"}
              </a>
            </div>
          </section>

          {/* SECTIONS */}
          {siteSpec.sections?.map((section) => (
            <Section key={section.id} section={section} />
          ))}

          {/* CONTACT FOOTER */}
          <section
            id="contact"
            className="mt-20 p-6 border rounded-2xl bg-white shadow-sm max-w-2xl"
          >
            <h3 className="text-lg font-semibold mb-3">
              Datos de contacto
            </h3>
            <div className="space-y-1 text-sm text-gray-700">
              {siteSpec.contact?.phone && <div>📞 {siteSpec.contact.phone}</div>}
              {siteSpec.contact?.email && <div>✉️ {siteSpec.contact.email}</div>}
              {siteSpec.contact?.address && (
                <div>📍 {siteSpec.contact.address}</div>
              )}
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t py-6 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-xs text-gray-500">
            Vista previa generada automáticamente desde <code>site_spec</code>.
          </div>
        </footer>
      </div>
    </>
  );
}
