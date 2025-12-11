import Head from "next/head";
import { useState } from "react";

export default function NewClientPage() {
  const [clientBrief, setClientBrief] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const companyName = data.get("companyName")?.toString().trim() || "";
    const currentWebsite =
      data.get("currentWebsite")?.toString().trim() || null;
    const location = data.get("location")?.toString().trim() || "";
    const sector = data.get("sector")?.toString().trim() || "";
    const businessType = data.get("businessType")?.toString().trim() || "";
    const websiteGoal = data.get("websiteGoal")?.toString().trim() || "";
    const servicesRaw = data.get("services")?.toString() || "";
    const targetAudience =
      data.get("targetAudience")?.toString().trim() || "";
    const phone = data.get("phone")?.toString().trim() || "";
    const email = data.get("email")?.toString().trim() || "";
    const address = data.get("address")?.toString().trim() || "";
    const socialsRaw = data.get("socials")?.toString() || "";

    const services = servicesRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const socials = socialsRaw
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const brief = {
      company: {
        name: companyName,
        current_website: currentWebsite || null,
        location,
        sector,
        business_type: businessType,
      },
      website_goal: websiteGoal,
      services,
      target_audience: targetAudience,
      contact_info: {
        phone,
        email,
        address,
        socials,
      },
    };

    setClientBrief(brief);
    // Más adelante aquí llamaremos a la IA con este JSON.
  };

  return (
    <>
      <Head>
        <title>Next Business · Nuevo cliente</title>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Next Business"
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="text-sm font-semibold text-blue-900">
                  Next Business · Panel interno
                </div>
                <div className="text-xs text-gray-500">
                  Alta rápida de nuevo cliente para generación de web con IA
                </div>
              </div>
            </div>
            <a
              href="/"
              className="text-xs text-blue-900 underline hover:no-underline"
            >
              Volver a la web principal
            </a>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8 grid gap-8 lg:grid-cols-[2fr,1.2fr]">
          {/* FORMULARIO */}
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h1 className="text-xl font-semibold text-blue-900">
              Nuevo cliente · Brief para web
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Rellena estos campos y generaremos un JSON listo para enviar a la
              IA y montar la web automáticamente.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Bloque: Empresa */}
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  1. Datos de la empresa
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Nombre de la empresa *
                    </label>
                    <input
                      name="companyName"
                      type="text"
                      required
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder="Ej. Nombre empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Web actual (si tiene)
                    </label>
                    <input
                      name="currentWebsite"
                      type="url"
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder="Ej. https://www.tuempresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Ubicación principal *
                    </label>
                    <input
                      name="location"
                      type="text"
                      required
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder="Ej. Ciudad, región, país"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Sector *
                    </label>
                    <input
                      name="sector"
                      type="text"
                      required
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder="Ej. Sector o actividad principal"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Tipo de negocio *
                    </label>
                    <input
                      name="businessType"
                      type="text"
                      required
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder="Ej. Tipo de negocio (taller mecánico, clínica dental, e-commerce…)"
                    />
                  </div>
                </div>
              </div>

              {/* Bloque: Objetivo */}
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  2. Objetivo principal de la web
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Objetivo principal *
                    </label>
                    <select
                      name="websiteGoal"
                      required
                      className="w-full p-2.5 border rounded-md text-sm bg-white"
                    >
                      <option value="">Selecciona una opción...</option>
                      <option value="Captar contactos / solicitudes de presupuesto">
                        Captar contactos / solicitudes de presupuesto
                      </option>
                      <option value="Presentación corporativa">
                        Presentación corporativa
                      </option>
                      <option value="Vender online (e-commerce)">
                        Vender online (e-commerce)
                      </option>
                      <option value="Reservas / citas">
                        Reservas / citas
                      </option>
                      <option value="Informativa / catálogo">
                        Informativa / catálogo
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bloque: Servicios */}
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  3. Servicios / productos principales
                </h2>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Lista de servicios (uno por línea) *
                </label>
                <textarea
                  name="services"
                  required
                  rows={5}
                  className="w-full p-2.5 border rounded-md text-sm"
                  placeholder={
                    "Ej.\nInstalación y mantenimiento de equipos\nVenta de productos o servicios específicos\nServicio posventa y atención al cliente"
                  }
                />
              </div>

              {/* Bloque: Público objetivo */}
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  4. Público objetivo
                </h2>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Descripción breve del cliente ideal *
                </label>
                <textarea
                  name="targetAudience"
                  required
                  rows={3}
                  className="w-full p-2.5 border rounded-md text-sm"
                  placeholder="Ej. Empresas que necesitan..., familias que buscan..., clientes que valoran..."
                />
              </div>

              {/* Bloque: Contacto */}
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  5. Datos de contacto para la web
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Teléfono *
                    </label>
                    <input
                      name="phone"
                      type="text"
                      required
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder="Ej. +34 600 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder="Ej. info@empresa.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Dirección (opcional)
                    </label>
                    <input
                      name="address"
                      type="text"
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder="Ej. Calle, número, ciudad..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Redes sociales (una por línea, opcional)
                    </label>
                    <textarea
                      name="socials"
                      rows={3}
                      className="w-full p-2.5 border rounded-md text-sm"
                      placeholder={
                        "Ej.\nInstagram: https://www.instagram.com/...\nLinkedIn: https://www.linkedin.com/company/..."
                      }
                    />
                  </div>
                </div>
              </div>

              {/* BOTÓN */}
              <div className="pt-2 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-900 text-white text-sm font-semibold rounded-md hover:bg-blue-800"
                >
                  Generar brief JSON
                </button>
              </div>
            </form>
          </section>

          {/* PANEL JSON */}
          <section className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Resultado · client_brief
              </h2>
              <p className="text-xs text-gray-500 mb-3">
                Este es el objeto JSON que se enviará a la IA para generar la web
                del cliente. Más adelante, desde aquí podemos lanzar la llamada a
                la API, guardar en base de datos o disparar un flujo en Make/n8n.
              </p>
              {clientBrief ? (
                <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-md overflow-auto max-h-[460px]">
                  {JSON.stringify(clientBrief, null, 2)}
                </pre>
              ) : (
                <div className="text-xs text-gray-500">
                  Rellena el formulario de la izquierda y pulsa{" "}
                  <span className="font-semibold">“Generar brief JSON”</span> para
                  ver el resultado aquí.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
