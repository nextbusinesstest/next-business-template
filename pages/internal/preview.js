import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

/* ---------------- UI HELPERS ---------------- */

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-white/60">
      {children}
    </span>
  );
}

function Icon({ name }) {
  // Iconos SVG simples (sin librerías)
  const common = "w-5 h-5";
  if (name === "check") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "spark") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v20M2 12h20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Card({ title, desc, icon = "spark" }) {
  return (
    <div className="p-6 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: "var(--c-accent)", color: "white" }}
      >
        <Icon name={icon} />
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ---------------- SECTION RENDERER ---------------- */

function Section({ section }) {
  if (!section) return null;

  if (section.type === "cards") {
    return (
      <section id={section.id} className="mt-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(section.items || []).map((it, i) => (
            <Card key={i} title={it.name} desc={it.description} icon="spark" />
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "services_grid") {
    return (
      <section id={section.id} className="mt-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(section.items || []).map((it, i) => (
            <Card key={i} title={it.name} desc={it.description} icon="check" />
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "bullets") {
    return (
      <section id={section.id} className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        <div className="mt-6 rounded-2xl border bg-white shadow-sm p-6">
          <ul className="space-y-3 text-gray-700">
            {(section.bullets || []).map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--c-secondary)" }}
                >
                  <span style={{ color: "var(--c-primary)" }}>
                    <Icon name="check" />
                  </span>
                </span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (section.type === "text") {
    return (
      <section id={section.id} className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        <div className="mt-6 rounded-2xl border bg-white shadow-sm p-6">
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            {section.body}
          </p>
        </div>
      </section>
    );
  }

  if (section.type === "contact") {
    return (
      <section id={section.id} className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold">{section.title}</h2>
        <div className="mt-6 rounded-2xl border bg-white shadow-sm p-6">
          <p className="text-gray-700">{section.body}</p>
        </div>
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

  const navItems = useMemo(() => {
    const ids = new Set(["services", "contact"]);
    (siteSpec?.sections || []).forEach((s) => ids.add(s.id));
    return Array.from(ids).filter(Boolean);
  }, [siteSpec]);

  if (!siteSpec) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white border rounded-2xl p-6 max-w-md text-center shadow-sm">
          <h1 className="text-lg font-semibold mb-2">
            No hay site_spec cargado
          </h1>
          <p className="text-sm text-gray-600">
            Genera un <code>site_spec</code> desde el panel interno y vuelve aquí.
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

  const title = siteSpec.meta?.title || "Vista previa";
  const description = siteSpec.meta?.description || "";
  const heroHeadline = siteSpec.hero?.headline || title;
  const heroSub = siteSpec.hero?.subheadline || description;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
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
        {/* TOP BAR */}
        <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
                style={{ backgroundColor: "var(--c-primary)" }}
              >
                {title.charAt(0) || "W"}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{title}</div>
                <div className="text-xs text-gray-500 truncate">
                  Vista previa generada automáticamente
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-5 text-sm text-gray-700">
              {navItems.slice(0, 6).map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="hover:underline"
                  style={{ textDecorationColor: "var(--c-primary)" }}
                >
                  {id.replace(/_/g, " ").toUpperCase()}
                </a>
              ))}
            </nav>

            <a
              href="/internal/new-client"
              className="text-xs underline"
              style={{ color: "var(--c-primary)" }}
            >
              Volver al panel
            </a>
          </div>
        </header>

        {/* HERO */}
        <section
          className="border-b"
          style={{
            background:
              "linear-gradient(120deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.02) 100%)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-2 items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill>
                  <span style={{ color: "var(--c-primary)" }}>
                    <Icon name="spark" />
                  </span>
                  <span className="ml-2">Web lista para publicar</span>
                </Pill>
                <Pill>
                  <span style={{ color: "var(--c-primary)" }}>
                    <Icon name="shield" />
                  </span>
                  <span className="ml-2">Diseño profesional</span>
                </Pill>
              </div>

              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
                {heroHeadline}
              </h1>
              <p className="mt-4 text-gray-700 leading-relaxed max-w-xl">
                {heroSub}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#services"
                  className="px-5 py-3 rounded-md text-white font-semibold shadow-sm"
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
            </div>

            <div className="rounded-2xl border bg-white shadow-sm p-6">
              <div className="text-xs text-gray-500">Resumen</div>
              <div className="mt-2 text-lg font-semibold">{title}</div>
              <div className="mt-3 grid gap-3">
                <div className="p-4 rounded-xl border" style={{ backgroundColor: "var(--c-secondary)" }}>
                  <div className="text-xs text-gray-600">Objetivo</div>
                  <div className="font-semibold">
                    {siteSpec.hero?.primary_cta_label || "Solicitudes / Ventas"}
                  </div>
                </div>
                <div className="p-4 rounded-xl border">
                  <div className="text-xs text-gray-600">Contacto</div>
                  <div className="text-sm text-gray-700 mt-1">
                    {siteSpec.contact?.phone || "—"} · {siteSpec.contact?.email || "—"}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Esta vista previa ya tiene estructura, secciones y estilo coherente.
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <main className="max-w-6xl mx-auto px-6 pb-16">
          {(siteSpec.sections || []).map((section) => (
            <Section key={section.id} section={section} />
          ))}

          {/* CONTACT DETAILS (footer contact) */}
          <section id="contact" className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold">Contacto</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="p-6 rounded-2xl border bg-white shadow-sm">
                <div className="text-xs text-gray-500">Teléfono</div>
                <div className="mt-1 font-semibold">
                  {siteSpec.contact?.phone || "—"}
                </div>
              </div>
              <div className="p-6 rounded-2xl border bg-white shadow-sm">
                <div className="text-xs text-gray-500">Email</div>
                <div className="mt-1 font-semibold">
                  {siteSpec.contact?.email || "—"}
                </div>
              </div>
              <div className="p-6 rounded-2xl border bg-white shadow-sm">
                <div className="text-xs text-gray-500">Dirección</div>
                <div className="mt-1 font-semibold">
                  {siteSpec.contact?.address || "—"}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t bg-white">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600">
            <div>
              Vista previa generada automáticamente desde{" "}
              <code className="bg-gray-100 px-1 rounded">site_spec</code>.
            </div>
            <div className="text-xs">
              Diseño coherente · Estructura sólida · Listo para producción
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
