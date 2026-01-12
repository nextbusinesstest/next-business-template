import EcommercePack from "./packs/ecommerceRetailConversion"; // o como se llame
import LocalServicePack from "./packs/localServiceTrust";      // o como se llame
import BrandPremiumPack from "./packs/brandPremium";           // default

export default function PacksRouter({ spec }) {
  // V1: spec.layout es string
  // V2: spec.layout es objeto y el pack está en spec.layout.pack
  const packKey =
    typeof spec.layout === "string" ? spec.layout : spec.layout?.pack;

  // Map de compatibilidad
  const normalizedPackKey =
    packKey === "ecommerceRetail" ? "ecommerce_conversion" :
    packKey === "localService" ? "local_service_trust" :
    packKey;

  switch (normalizedPackKey) {
    case "ecommerce_conversion":
      return <EcommercePack spec={spec} />;
    case "local_service_trust":
      return <LocalServicePack spec={spec} />;
    case "brand_premium":
      return <BrandPremiumPack spec={spec} />;
    default:
      return <BrandPremiumPack spec={spec} />;
  }
}
