import {
  DEFAULT_BRAND_EXPRESSION,
  DEFAULT_STRATEGY,
  DEFAULT_LAYOUT,
} from "./schema";

export function normalizeV2(spec) {
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
