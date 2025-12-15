export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Aceptamos dos formatos:
  // 1) { client_brief: {...} }  (como tu panel)
  // 2) { ...brief }             (por si lo llamamos directo)
  const brief = req.body?.client_brief || req.body;

  if (!brief?.company?.name) {
    return res.status(400).json({ error: "Missing company.name in client_brief" });
  }

  const siteSpec = {
    slug: slugify(brief.company.name),
    layout: selectLayout(brief),                 // 👈 NUEVO
    meta: buildMeta(brief),
    theme: selectTheme(brief),
    brand: {
      name: brief.company.name,
      // Opcional: logo en base64 dataURL si el cliente lo sube
      logoDataUrl: brief.brand?.logoDataUrl || null,
    },
    hero: buildHero(brief),
    sections: buildSections(brief),
    contact: brief.contact_info,
  };

  return res.status(200).json({ site_spec: siteSpec });
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
    title: `${titleCase(brief.company.name)} | ${titleCase(brief.company.sector || "Empresa")}`,
    description: `${titleCase(brief.company.name)} · Información clara, contacto directo y una presencia online pensada para convertir.`,
  };
}

function selectLayout(brief) {
  const goal = (brief.website_goal || "").toLowerCase();
  const sector = (brief.company?.sector || "").toLowerCase();
  const type = (brief.company?.business_type || "").toLowerCase();

  if (goal.includes("e-commerce") || goal.includes("vender online")) return "ecommerceRetail";
  if (sector.includes("hostel") || sector.includes("restaur") || sector.includes("bar")) return "premiumBrand"; // lo cambiaremos luego a hospitality
  if (sector.includes("salud") || sector.includes("clínica") || type.includes("clínica")) return "premiumBrand"; // luego a healthcare
  if (type.includes("instal") || type.includes("repar") || type.includes("servicio") || type.includes("taller")) return "localService";

  // default premium si no sabemos
  return "premiumBrand";
}

function selectTheme(brief) {
  const goal = (brief.website_goal || "").toLowerCase();

  if (goal.includes("e-commerce") || goal.includes("vender online")) {
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
  const goal = (brief.website_goal || "").toLowerCase();

  if (goal.includes("e-commerce") || goal.includes("vender online")) {
    return {
      headline: `${titleCase(brief.company.name)}: compra online fácil y clara`,
      subheadline: brief.target_audience || "Catálogo y compra con una experiencia cómoda y directa.",
      primary_cta_label: "Ver categorías",
      secondary_cta_label: "Contactar",
    };
  }

  return {
    headline: `${titleCase(brief.company.name)} · ${titleCase(brief.company.business_type || "Servicios")}`,
    subheadline: brief.target_audience || "Información clara, confianza y contacto directo.",
    primary_cta_label: "Ver servicios",
    secondary_cta_label: "Contacto",
  };
}

function buildSections(brief) {
  const sections = [];
  const goal = (brief.website_goal || "").toLowerCase();

  // E-commerce: categorías base (si no vienen)
  if (goal.includes("e-commerce") || goal.includes("vender online")) {
    sections.push({
      id: "categories",
      type: "cards",
      title: "Compra por categorías",
      items: [
        { name: "Novedades", description: "Lo más reciente y destacado." },
        { name: "Básicos", description: "Imprescindibles para el día a día." },
        { name: "Ofertas", description: "Selección con buena relación calidad/precio." },
      ],
    });

    sections.push({
      id: "benefits",
      type: "bullets",
      title: "Compra sin complicaciones",
      bullets: [
        "Proceso de compra sencillo y claro",
        "Ayuda para resolver dudas antes de comprar",
        "Condiciones de envío y devolución transparentes",
      ],
    });
  }

  // Servicios
  sections.push({
    id: "services",
    type: "services_grid",
    title: goal.includes("e-commerce") ? "Qué encontrarás" : "Servicios",
    items: (brief.services || []).map((s) => ({
      name: titleCase(s),
      description: `Información y opciones sobre ${s.toLowerCase()} pensadas para facilitar la decisión del cliente.`,
    })),
  });

  // About
  sections.push({
    id: "about",
    type: "text",
    title: `Sobre ${titleCase(brief.company.name)}`,
    body: `${titleCase(brief.company.name)} ofrece ${brief.company.business_type || "servicios"} con un enfoque profesional: información clara, buena experiencia y atención directa cuando hace falta.`,
  });

  // Contact
  sections.push({
    id: "contact_section",
    type: "contact",
    title: "Contacto",
    body: "Ponte en contacto para resolver dudas o solicitar más información.",
  });

  return sections;
}

function titleCase(text) {
  const t = (text || "").toString().trim();
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
}
