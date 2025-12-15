export default function handler(req, res) {
  try {
    // ✅ Responde a preflight si aparece
    if (req.method === "OPTIONS") {
      res.setHeader("Allow", "POST, OPTIONS");
      return res.status(204).end();
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST, OPTIONS");
      return res.status(405).json({
        error: `Method Not Allowed: ${req.method}. Use POST.`,
      });
    }

    const { client_brief: brief } = req.body || {};

    if (!brief || !brief.company || !brief.company.name) {
      return res.status(400).json({
        error: "Missing client_brief or client_brief.company.name",
      });
    }

    const site_spec = {
      slug: slugify(brief.company.name),
      meta: buildMeta(brief),
      theme: selectTheme(brief),
      hero: buildHero(brief),
      sections: buildSections(brief),
      contact: brief.contact_info || {},
    };

    return res.status(200).json({ site_spec });
  } catch (err) {
    console.error("generate-site error:", err);
    return res.status(500).json({
      error: "Internal server error generating site_spec",
    });
  }
}

/* ---------------- HELPERS ---------------- */

function slugify(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function buildMeta(brief) {
  const name = capitalizeWords(brief.company.name);
  const sector = brief.company.sector || "Empresa";
  const businessType = brief.company.business_type || "servicios";
  return {
    title: `${name} | ${sector}`,
    description: `${name} ofrece ${businessType}. Información clara, contacto directo y una presencia online pensada para convertir.`,
  };
}

function selectTheme(brief) {
  const goal = (brief.website_goal || "").toLowerCase();
  const sector = (brief.company.sector || "").toLowerCase();
  const businessType = (brief.company.business_type || "").toLowerCase();

  const isEcommerce = goal.includes("e-commerce") || goal.includes("vender online");
  const isRetail =
    sector.includes("comercio") ||
    businessType.includes("tienda") ||
    businessType.includes("retail") ||
    businessType.includes("moda") ||
    businessType.includes("calzado");

  if (isEcommerce && isRetail) {
    return {
      primaryColor: "#111827",
      secondaryColor: "#F9FAFB",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      accentColor: "#C2410C",
    };
  }

  if (isEcommerce) {
    return {
      primaryColor: "#111827",
      secondaryColor: "#F3F4F6",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      accentColor: "#2563EB",
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
  const name = capitalizeWords(brief.company.name);
  const goal = (brief.website_goal || "").toLowerCase();
  const businessType = brief.company.business_type || "servicios";
  const audience = brief.target_audience || "";

  const isEcommerce = goal.includes("e-commerce") || goal.includes("vender online");

  if (isEcommerce) {
    return {
      headline: `${name}: compra online fácil y clara`,
      subheadline:
        audience ||
        "Catálogo organizado, proceso sencillo y atención para ayudarte a elegir.",
      primary_cta_label: "Ver categorías",
      secondary_cta_label: "Contactar",
    };
  }

  return {
    headline: `${name} · ${capitalizeSentence(businessType)}`,
    subheadline:
      audience ||
      "Información clara, confianza y un contacto directo para ayudarte rápido.",
    primary_cta_label: "Solicitar información",
    secondary_cta_label: "Ver servicios",
  };
}

function buildSections(brief) {
  const sections = [];
  const goal = (brief.website_goal || "").toLowerCase();
  const isEcommerce = goal.includes("e-commerce") || goal.includes("vender online");
  const services = Array.isArray(brief.services) ? brief.services : [];

  if (isEcommerce) {
    sections.push({
      id: "categories",
      type: "cards",
      title: "Compra por categorías",
      items: inferCategoriesFromServices(services),
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

  sections.push({
    id: "services",
    type: "services_grid",
    title: isEcommerce ? "Qué encontrarás" : "Servicios",
    items: services.map((s) => ({
      name: s,
      description: `Información y opciones sobre ${s.toLowerCase()} pensadas para facilitar la decisión del cliente.`,
    })),
  });

  sections.push({
    id: "about",
    type: "text",
    title: `Sobre ${capitalizeWords(brief.company.name)}`,
    body: buildAbout(brief),
  });

  sections.push({
    id: "contact",
    type: "contact",
    title: "Contacto",
    body: "Ponte en contacto para resolver dudas o solicitar más información.",
  });

  return sections;
}

function buildAbout(brief) {
  const name = capitalizeWords(brief.company.name);
  const sector = brief.company.sector ? `del sector ${brief.company.sector}` : "de su sector";
  const location = brief.company.location ? `con base en ${brief.company.location}` : "";
  const businessType = brief.company.business_type || "servicios";

  return `${name} es una empresa ${sector}${location ? `, ${location}` : ""}. Ofrecemos ${businessType} con un enfoque profesional y cercano: información clara, buena experiencia para el cliente y atención directa cuando hace falta.`;
}

function inferCategoriesFromServices(services) {
  const text = services.join(" ").toLowerCase();
  const items = [];

  const looksLikeShoes =
    text.includes("calzado") ||
    text.includes("zapato") ||
    text.includes("zapatilla") ||
    text.includes("bota") ||
    text.includes("moda");

  if (looksLikeShoes) {
    items.push(
      { name: "Hombre", description: "Modelos para diario, vestir y comodidad." },
      { name: "Mujer", description: "Estilo y confort para cada ocasión." },
      { name: "Infantil", description: "Opciones pensadas para su ritmo." }
    );
  }

  if (items.length === 0) {
    items.push(
      { name: "Novedades", description: "Lo más reciente y destacado." },
      { name: "Más vendidos", description: "Selección popular y recomendada." },
      { name: "Ofertas", description: "Promociones y oportunidades puntuales." }
    );
  }

  return items;
}

function capitalizeSentence(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function capitalizeWords(text) {
  return (text || "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
