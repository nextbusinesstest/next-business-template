export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const brief = req.body;

  const siteSpec = {
    slug: slugify(brief.company.name),
    meta: buildMeta(brief),
    theme: selectTheme(brief),
    hero: buildHero(brief),
    sections: buildSections(brief),
    contact: brief.contact_info,
  };

  res.status(200).json(siteSpec);
}

/* ---------------- HELPERS ---------------- */

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function buildMeta(brief) {
  return {
    title: `${capitalize(brief.company.name)} | ${brief.company.sector}`,
    description: `${brief.company.name} ofrece servicios de ${brief.company.business_type}. Atención profesional y presencia online clara.`,
  };
}

function selectTheme(brief) {
  // reglas simples, luego las mejoramos
  if (brief.website_goal.toLowerCase().includes("e-commerce")) {
    return {
      primaryColor: "#111827",
      secondaryColor: "#F9FAFB",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      accentColor: "#C2410C",
    };
  }

  return {
    primaryColor: "#0b3d91",
    secondaryColor: "#e5f0ff",
    backgroundColor: "#ffffff",
    textColor: "#111827",
    accentColor: "#0fb7c1",
  };
}

function buildHero(brief) {
  if (brief.website_goal.toLowerCase().includes("e-commerce")) {
    return {
      headline: `${brief.company.name}: compra online de forma sencilla`,
      subheadline:
        "Productos claros, proceso simple y atención cercana cuando lo necesites.",
      primary_cta_label: "Ver productos",
      secondary_cta_label: "Contactar",
    };
  }

  return {
    headline: `Soluciones digitales para ${brief.company.business_type}`,
    subheadline:
      "Presencia online clara, profesional y pensada para generar resultados.",
    primary_cta_label: "Solicitar información",
    secondary_cta_label: "Ver servicios",
  };
}

function buildSections(brief) {
  const sections = [];

  // Servicios
  sections.push({
    id: "services",
    type: "services_grid",
    title: "Servicios",
    items: brief.services.map((s) => ({
      name: s,
      description: `Servicio de ${s.toLowerCase()} adaptado a las necesidades del cliente.`,
    })),
  });

  // E-commerce extra sections
  if (brief.website_goal.toLowerCase().includes("e-commerce")) {
    sections.push({
      id: "benefits",
      type: "bullets",
      title: "Compra sin complicaciones",
      bullets: [
        "Proceso de compra sencillo y claro",
        "Atención para resolver dudas antes de comprar",
        "Condiciones de envío y devolución transparentes",
      ],
    });
  }

  // About
  sections.push({
    id: "about",
    type: "text",
    title: `Sobre ${brief.company.name}`,
    body: `${brief.company.name} es una empresa del sector ${brief.company.sector}. Trabaja con un enfoque profesional y cercano, ofreciendo soluciones pensadas para facilitar la experiencia del cliente.`,
  });

  // Contact
  sections.push({
    id: "contact",
    type: "contact",
    title: "Contacto",
    body: "Ponte en contacto para resolver dudas o solicitar más información.",
  });

  return sections;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
