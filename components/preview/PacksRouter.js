import PremiumBrand from "../layouts/PremiumBrand";
import LocalService from "../layouts/LocalService";
import EcommerceRetail from "../layouts/EcommerceRetail";

import LocalServiceTrustPack from "./packs/LocalServiceTrustPack";
import EcommerceRetailConversionPack from "./packs/EcommerceRetailConversionPack";
import BrandPremiumPack from "./packs/BrandPremiumPack";

export default function PacksRouter({ spec }) {
  const pack = (spec?.layout_pack || "brand_premium").toLowerCase();

  if (pack === "local_service_trust") {
    return <LocalServiceTrustPack spec={spec} fallback={<LocalService spec={spec} />} />;
  }

  if (pack === "ecommerce_retail_conversion") {
    return <EcommerceRetailConversionPack spec={spec} fallback={<EcommerceRetail spec={spec} />} />;
  }

  // default premium
  return <BrandPremiumPack spec={spec} fallback={<PremiumBrand spec={spec} />} />;
}
