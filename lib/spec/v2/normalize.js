import {
  DEFAULT_BRAND_EXPRESSION,
  DEFAULT_STRATEGY,
  DEFAULT_LAYOUT,
} from "./schema";

export function normalizeV2(spec) {
  const modules = spec.modules || {};
if (!modules.hero_auto) {
  modules.hero_auto = {
    headline: spec.seo?.title || spec.business?.name || "Bienvenido",
    subheadline: spec.seo?.description || "Descubre lo que ofrecemos",
    primary_cta: { label: "Ver más", href: "#categories" },
    secondary_cta: { label: "Contacto", href: "#contact" },
  };
}

  return {
    version: "2.0",

    meta: {
      locale: spec.meta?.locale || "es-ES",
      site_id: spec.meta?.site_id || spec.business?.slug || "nb-site",
      seed: spec.meta?.seed || Math.floor(Math.random() * 100000),
    },

    business: spec.business,

    strategy: {
      ...DEFAULT_STRATEGY,
      ...spec.strategy,
    },

    brand: {
      brand_personality: spec.brand?.brand_personality || "modern_minimal",
      brand_expression: {
        ...DEFAULT_BRAND_EXPRESSION,
        ...spec.brand?.brand_expression,
      },
      design_tokens: spec.brand?.design_tokens || {},
    },

    navigation: spec.navigation || {},

    layout: {
      ...DEFAULT_LAYOUT,
      ...spec.layout,
    },

    modules: spec.modules || {},

    contact: spec.contact || {},

    seo: spec.seo || {},
  };
}

// --- Bridge para packs antiguos (v1-like) ---
const homeSections = spec.layout?.pages?.home?.sections || [];
const modulesByKey = spec.modules || {};

// Construye un array estilo v1.sections a partir de V2
const bridgedSections = homeSections
  .filter((s) => s.module !== "hero") // hero va aparte
  .map((s) => {
    const key = (s.props_ref || "").replace("modules.", "");
    return modulesByKey[key] || null;
  })
  .filter(Boolean);

// Hero bridged desde modules.hero_auto
const heroKey = (homeSections.find((s) => s.module === "hero")?.props_ref || "").replace("modules.", "");
const bridgedHero = modulesByKey[heroKey] || null;

// Inyecta fields v1 para que los packs existentes funcionen
return {
  ...finalSpec,
  hero: bridgedHero ? {
    headline: bridgedHero.headline,
    subheadline: bridgedHero.subheadline,
    primary_cta_label: bridgedHero.primary_cta?.label,
    secondary_cta_label: bridgedHero.secondary_cta?.label,
  } : finalSpec.hero,
  sections: bridgedSections.length ? bridgedSections : finalSpec.sections,
};
