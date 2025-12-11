export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { client_brief } = req.body || {};

  if (!client_brief || !client_brief.company) {
    return res.status(400).json({ error: "Missing client_brief" });
  }

  const {
    company,
    website_goal,
    services = [],
    target_audience,
    contact_info = {},
  } = client_brief;

  const slug = company.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // Esto es un MOCK: más adelante lo generará la IA
  const site_spec = {
    slug,
    meta: {
      title: `${company.name} · ${website_goal || "Web corporativa"}`,
      description:
        `Web de ${company.name} en ${company.location || ""}. ` +
        `Sector: ${company.sector || "empresa"}. ` +
        (website_goal ? `Objetivo: ${website_goal}.` : ""),
    },
    theme: {
      primaryColor: "#0b3d91",
      secondaryColor: "#0fb7c1",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      accentColor: "#e5f0ff",
    },
    hero: {
      headline: `${company.name}: ${website_goal || "servicios profesionales"}`,
      subheadline:
        target_audience ||
        "Soluciones pensadas para tus clientes y tu día a día.",
      primary_cta_label: "Solicitar información",
      secondary_cta_label: "Ver servicios",
    },
    sections: [
      {
        id: "services",
        type: "services_grid",
        title: "Servicios",
        items:
          services.length > 0
            ? services.map((s) => ({
                name: s,
                description: `Servicio de ${s.toLowerCase()} adaptado a las necesidades de los clientes.`,
              }))
            : [],
      },
      {
        id: "about",
        type: "text",
        title: `Sobre ${company.name}`,
        body:
          `${company.name} es una empresa del sector ${company.sector || ""}` +
          (company.location ? ` con base en ${company.location}. ` : ". ") +
          "Ofrece soluciones orientadas a resultados y a un trato cercano con el cliente.",
      },
      {
        id: "why_us",
        type: "bullets",
        title: "Por qué elegirnos",
        bullets: [
          "Experiencia en el sector y atención personalizada.",
          "Compromiso con la calidad y el servicio.",
          "Orientación a resultados y a la satisfacción del cliente.",
        ],
      },
      {
        id: "contact",
        type: "contact",
        title: "Contacto",
        body: "Ponte en contacto para solicitar presupuesto o resolver dudas.",
      },
    ],
    contact: {
      phone: contact_info.phone || "",
      email: contact_info.email || "",
      address: contact_info.address || "",
      socials: contact_info.socials || [],
    },
  };

  return res.status(200).json({ site_spec });
}
