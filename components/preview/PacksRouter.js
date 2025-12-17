import PremiumBrand from "../layouts/PremiumBrand";
import LocalService from "../layouts/LocalService";
import EcommerceRetail from "../layouts/EcommerceRetail";

// Packs nuevos (los iremos creando después)
import BrandPremiumPack from "./packs/BrandPremiumPack";
import LocalServiceTrustPack from "./packs/LocalServiceTrustPack";
import EcommerceRetailConversionPack from "./packs/EcommerceRetailConversionPack";

export default function PacksRouter({ spec }) {
  const pack = (spec?.layout_pack || "brand_premium").toLowerCase();

  // Si todavía no has creado todos los packs, hacemos fallback a tus layouts existentes.
  // Lo importante es que la arquitectura ya queda “pro”.

  if (pack === "brand_premium") return <BrandPremiumPack spec={spec} fallback={<PremiumBrand spec={spec} />} />;
  if (pack === "local_service_trust") return <LocalServiceTrustPack spec={spec} fallback={<LocalService spec={spec} />} />;
  if (pack === "ecommerce_retail_conversion") return <EcommerceRetailConversionPack spec={spec} fallback={<EcommerceRetail spec={spec} />} />;

  // Fallback global
  return <PremiumBrand spec={spec} />;
}
