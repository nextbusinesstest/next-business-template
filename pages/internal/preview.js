import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

/* ---------------- UI HELPERS ---------------- */

function Icon({ name }) {
  const cls = "w-5 h-5";
  if (name === "spark") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "check") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
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
  if (name === "shield") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l8 4v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l3 7 7 .6-5.3 4.6 1.7 7-6.4-3.8L5.6 21l1.7-7L2 9.6 9 9l3-7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2v20M2 12h20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur">
      {children}
    </span>
  );
}

function PremiumCard({ title, desc, icon = "spark" }) {
  return (
    <div className="group rounded-3xl bg-white/70 backdrop-blur border border-black/10 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
              color: "white",
            }}
          >
            <Icon name={icon} />
          </div>
          <div className="text-[10px] uppercase tracking-wider text-gray-500">
            Selección
          </div>
        </div>

        <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>

        <div className="mt-5 h-px bg-black/5" />
        <div className="mt-4 text-xs font-semibold text-gray-700">
          Ver detalles <span className="opacity-60 group-hover:opacity-100">→</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SECTION RENDERER ---------------- */

function Section({ section }) {
  if (!section) return null;

  if (section.type === "cards") {
    return (
      <section id={section.id} className="mt-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
            {section.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(section.items || []).map((it, i) => (
            <PremiumCard
              key={i}
              title={it.name}
              desc={it.description}
              icon="star"
            />
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "services_grid") {
    return (
      <section id={section.id} className="mt-20">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
          {section.title}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(section.items || []).map((it, i) => (
            <PremiumCard
              key={i}
              title={it.name}
              desc={it.description}
              icon="check"
            />
          ))}
        </div>
      </section>
    );
  }

  if (section.type === "bullets") {
    return (
      <section id={section.id} className="mt-20">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
          {section.title}
        </h2>

        <div className="mt-8 rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-[0_12px_40px_-24px_rgba(0,0,0,0.45)] p-7">
          <ul className="space-y-3 text-gray-700">
            {(section.bullets || []).map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 w-9 h-9 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
                    color: "white",
                  }}
                >
                  <Icon name="check" />
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
      <section id={section.id} className="mt-20">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
          {section.title}
        </h2>
        <div className="mt-8 rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-[0_12px_40px_-24px_rgba(0,0,0,0.45)] p-7">
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            {section.body}
          </p>
        </div>
      </section>
    );
  }

  if (section.type === "contact") {
    return (
      <section id={section.id} className="mt-20">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
          {section.title}
        </h2>
        <div className="mt-8 rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-[0_12px_40px_-24px_rgba(0,0,0,0.45)] p-7">
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
        <div className="bg-white border rounded-3xl p-7 max-w-md text-center shadow-sm">
          <h1 className="text-lg font-semibold mb-2">
            No hay site_spec cargado
          </h1>
          <p className="text-sm text-gray-600">
            Genera un <code>site_spec</code> desde el panel interno y vuelve aquí.
          </p>
          <a
            href="/internal/new-client"
            className="inline-flex items-center justify-center mt-5 px-5 py-3 rounded-2xl text-white text-sm font-semibold"
            style={{
              background:
                "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
            }}
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
        {/* PREMIUM BACKDROP */}
        <div
          className="pointer-events-none fixed inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 400px at 20% 0%, rgba(0,0,0,0.04), transparent 60%), radial-gradient(900px 400px at 80% 10%, rgba(0,0,0,0.03), transparent 55%)",
          }}
        />

        {/* TOP BAR */}
        <header className="sticky top-0 z-20 border-b border-black/10 bg-white/60 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
                }}
              >
                {title.charAt(0) || "W"}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate text-gray-900">
                  {title}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  Diseño premium · estructura lista para producción
                </div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-5 text-xs tracking-wider text-gray-700">
              {navItems.slice(0, 6).map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="hover:opacity-80"
                >
                  {id.replace(/_/g, " ").toUpperCase()}
                </a>
              ))}
            </nav>

            <a
              href="/internal/new-client"
              className="text-xs underline text-gray-700 hover:opacity-80"
            >
              Volver al panel
            </a>
          </div>
        </header>

        {/* HERO */}
        <section className="border-b border-black/10">
          <div className="max-w-6xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2 items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>
                  <span style={{ color: "var(--c-primary)" }}>
                    <Icon name="spark" />
                  </span>
                  <span>Experiencia de marca</span>
                </Badge>
                <Badge>
                  <span style={{ color: "var(--c-primary)" }}>
                    <Icon name="shield" />
                  </span>
                  <span>Confianza y claridad</span>
                </Badge>
              </div>

              <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-tight">
                {heroHeadline}
              </h1>

              <p className="mt-5 text-gray-700 leading-relaxed max-w-xl">
                {heroSub}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#services"
                  className="px-6 py-3 rounded-2xl text-white text-sm font-semibold shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
                  }}
                >
                  {siteSpec.hero?.primary_cta_label || "Ver más"}
                </a>

                <a
                  href="#contact"
                  className="px-6 py-3 rounded-2xl text-sm font-semibold border border-black/10 bg-white/70 backdrop-blur hover:bg-white"
                  style={{ color: "var(--c-primary)" }}
                >
                  {siteSpec.hero?.secondary_cta_label || "Contacto"}
                </a>
              </div>
            </div>

            {/* SIDE SUMMARY */}
            <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-[0_20px_70px_-40px_rgba(0,0,0,0.6)] p-7">
              <div className="text-[10px] uppercase tracking-wider text-gray-500">
                Resumen
              </div>
              <div className="mt-2 text-xl font-semibold text-gray-900">
                {title}
              </div>

              <div className="mt-6 grid gap-4">
                <div className="p-5 rounded-2xl border border-black/10 bg-white">
                  <div className="text-xs text-gray-500">Contacto</div>
                  <div className="mt-2 text-sm text-gray-700">
                    {siteSpec.contact?.phone || "—"}
                  </div>
                  <div className="text-sm text-gray-700">
                    {siteSpec.contact?.email || "—"}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-black/10 bg-white">
                  <div className="text-xs text-gray-500">Dirección</div>
                  <div className="mt-2 text-sm text-gray-700">
                    {siteSpec.contact?.address || "—"}
                  </div>
                </div>
              </div>

              {/* VALUE PROMISE */}
              <div className="mt-6 grid gap-3">
                {[
                  { t: "Claridad", d: "Contenido directo y estructurado." },
                  { t: "Diseño", d: "Estética cuidada y coherente." },
                  { t: "Conversión", d: "Secciones pensadas para acción." },
                ].map((x, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-9 h-9 rounded-2xl flex items-center justify-center text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
                      }}
                    >
                      <Icon name="check" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {x.t}
                      </div>
                      <div className="text-sm text-gray-600">{x.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <main className="max-w-6xl mx-auto px-6 pb-16">
          {(siteSpec.sections || []).map((section) => (
            <Section key={section.id} section={section} />
          ))}

          {/* CONTACT DETAILS */}
          <section id="contact" className="mt-20">
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900">
              Contacto
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { label: "Teléfono", value: siteSpec.contact?.phone || "—" },
                { label: "Email", value: siteSpec.contact?.email || "—" },
                { label: "Dirección", value: siteSpec.contact?.address || "—" },
              ].map((x, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur shadow-[0_12px_40px_-24px_rgba(0,0,0,0.45)] p-7"
                >
                  <div className="text-[10px] uppercase tracking-wider text-gray-500">
                    {x.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-gray-900">
                    {x.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-black/10 bg-white/60 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-700">
              {title}
              <span className="text-gray-400"> · </span>
              <span className="text-gray-500">
                Experiencia premium generada desde <code className="bg-white px-1 rounded">site_spec</code>
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Diseño sobrio · Jerarquía clara · Listo para producción
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
