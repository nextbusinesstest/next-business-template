import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

function Section({ section }) {
  if (!section) return null;

  if (section.type === "cards") {
    return (
      <section id={section.id} className="mt-14">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {(section.items || []).map((it, i) => (
            <div key={i} className="p-5 border rounded-xl bg-white shadow-sm">
              <div className="font-semibold">{it.name}</div>
              <div className="mt-2 text-sm text-gray-600">{it.description}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "bullets") {
    return (
      <section id={section.id} className="mt-14">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
          {(section.bullets || []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </section>
    );
  }

  if (section.type === "services_grid") {
    return (
      <section id={section.id} className="mt-14">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(section.items || []).map((it, i) => (
            <div key={i} className="p-5 border rounded-xl bg-white shadow-sm">
              <div className="font-semibold">{it.name}</div>
              <div className="mt-2 text-sm text-gray-600">{it.description}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "text") {
    return (
      <section id={section.id} className="mt-14">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        <p className="mt-3 text-gray-700 leading-relaxed max-w-3xl">
          {section.body}
        </p>
      </section>
    );
  }

  if (section.type === "contact") {
    return (
      <section id={section.id} className="mt-14 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        <p className="mt-2 text-gray-700">{section.body}</p>
      </section>
    );
  }

  return null;
}

export default function PreviewPage() {
  const [siteSpec, setSiteSpec] = useState(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("nb_last_site_spec");
    if (raw) {
      try {
        setSiteSpec(JSON.parse(raw));
      } catch (e) {
        setSiteSpec(null);
      }
    }
  }, []);

  const themeVars = useMemo(() => {
    const t = siteSpec?.theme;
    if (!t) return {};
    return {
      "--c-primary": t.primaryColor,
      "--c-secondary": t.secondaryColor,
      "--c-bg": t.backgroundColor,
      "--c-text": t.textColor,
      "--c-accent": t.accentColor,
    };
  }, [siteSpec]);

  if (!siteSpec) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white border rounded-xl p-6 shadow-sm">
          <h1 className="text-lg font-semibold">No hay site_spec para previsualizar</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ve a <code className="bg-gray-100 px-1 rounded">/internal/new-client</code>,
            genera un <code className="bg-gray-100 px-1 rounded">site_spec</code> y vuelve aquí.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{siteSpec?.meta?.title || "Preview"}</title>
        <meta name="description" content={siteSpec?.meta?.description || ""} />
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
        <header className="border-b bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "var(--c-primary)" }}
              >
                {siteSpec?.meta?.title?.[0] || "W"}
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">{siteSpec?.meta?.title}</div>
                <div className="text-xs text-gray-500">Vista previa desde site_spec</div>
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

        <main className="max-w-6xl mx-auto px-6 py-10">
          {/* HERO */}
          <section className="rounded-2xl border bg-white shadow-sm p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold">
              {siteSpec.hero?.headline}
            </h1>
            <p className="mt-3 text-gray-700 max-w-2xl">
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
                style={{ borderColor: "var(--c-primary)", color: "var(--c-primary)" }}
              >
                {siteSpec.hero?.secondary_cta_label || "Contacto"}
              </a>
            </div>
          </section>

          {/* SECTIONS */}
          {(siteSpec.sections || []).map((s) => (
            <Section key={s.id} section={s} />
          ))}

          {/* CONTACT FOOT */}
          <section className="mt-10 p-6 rounded-2xl border bg-white shadow-sm">
            <h3 className="font-semibold">Datos de contacto</h3>
            <div className="mt-3 text-sm text-gray-700 space-y-1">
              {siteSpec.contact?.phone && <div>📞 {siteSpec.contact.phone}</div>}
              {siteSpec.contact?.email && <div>✉️ {siteSpec.contact.email}</div>}
              {siteSpec.contact?.address && <div>📍 {siteSpec.contact.address}</div>}
            </div>
          </section>
        </main>

        <footer className="border-t py-6">
          <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500">
            Vista previa generada automáticamente desde <code>site_spec</code>.
          </div>
        </footer>
      </div>
    </>
  );
}
