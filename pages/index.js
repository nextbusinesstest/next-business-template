import Head from "next/head";
import { useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/xkgkpepa"; // <-- pon aquí tu endpoint real

export default function Home() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("LOADING");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("OK");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      setStatus("ERROR");
    }
  };

  return (
    <>
      <Head>
  <title>Next Business</title>
  <meta
    name="description"
    content="Next Business es una agencia de marketing y automatización con IA para pymes y empresas en crecimiento. Nacida en Sakana (Navarra), trabajamos en remoto con negocios de toda España."
  />
  <meta
    property="og:title"
    content="Next Business — Marketing y automatización con IA"
  />
  <meta
    property="og:description"
    content="Diseñamos sistemas de captación y automatización con IA para empresas de cualquier tamaño. Origen en Sakana, servicio para toda España."
  />
  <meta property="og:image" content="/og_image.png" />
  <link rel="icon" type="image/png" href="/logo.png" />
</Head>

      <div className="min-h-screen bg-white text-gray-800 antialiased">
        <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Logo Next Business"
              className="w-14 h-14 object-contain"
            />
            <div>
              <div className="text-lg font-semibold text-blue-900">
                Next Business
              </div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#services" className="hover:underline">
              Servicios
            </a>
            <a href="#pricing" className="hover:underline">
              Precios
            </a>
            <a href="#about" className="hover:underline">
              Sobre Next Business
            </a>
            <a
              href="#contact"
              className="px-4 py-2 bg-blue-900 text-white rounded-md shadow hover:bg-blue-800"
            >
              Contacto
            </a>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto px-6 pb-16">
          <section className="mt-8 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-blue-900">
                Digitalización real para empresas locales
              </h1>
              <p className="mt-4 text-gray-600">
                Implantamos soluciones de marketing digital, automatización con IA
                y comercio electrónico para que tu negocio gane visibilidad,
                clientes y eficiencia, sin necesidad de montar un departamento de
                marketing interno.
              </p>
              <ul className="mt-4 text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Implantación llave en mano</li>
                <li>Gestión diaria semi-automatizada</li>
                <li>Acompañamiento y mejora continua</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="px-5 py-3 bg-blue-900 text-white rounded-md shadow hover:bg-blue-800"
                >
                  Solicitar demo gratuita
                </a>
                <a
                  href="#services"
                  className="px-5 py-3 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  Ver servicios
                </a>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Proyecto piloto local en Sakana · plazas limitadas.
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center bg-gray-50">
              <img
                src="/logo.png"
                alt="Next Business"
                className="w-40 h-40 object-contain"
              />
            </div>
          </section>

          <section id="services" className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Servicios
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Unimos marketing, automatización e IA para que tu empresa pueda
              vender más con menos esfuerzo operativo.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Gestión de redes sociales",
                  desc: "Contenido profesional, calendario mensual y publicaciones programadas.",
                },
                {
                  title: "Contenido con IA",
                  desc: "Textos, imágenes y guiones generados con IA y revisados antes de publicar.",
                },
                {
                  title: "Páginas web y e-commerce",
                  desc: "Webs rápidas y tiendas online pensadas para convertir visitas en clientes.",
                },
                {
                  title: "Publicidad online",
                  desc: "Campañas en Meta Ads y Google Ads enfocadas a resultados medibles.",
                },
                {
                  title: "Consultoría y estrategia digital",
                  desc: "Análisis de tu situación y plan de acción adaptado a tus recursos.",
                },
                {
                  title: "Automatizaciones",
                  desc: "Flujos automáticos para captación de leads, ventas y atención básica.",
                },
                {
                  title: "Branding y diseño",
                  desc: "Identidad visual, logotipos y materiales corporativos listos para usar.",
                },
                {
                  title: "SEO y contenido web",
                  desc: "Optimización para Google y creación de contenido relevante para tu sector.",
                },
                {
                  title: "Soporte y mantenimiento",
                  desc: "Actualizaciones, informes y ajustes mensuales con un único interlocutor.",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-5 border border-gray-100 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="pricing" className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Planes orientativos
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Adaptamos cada propuesta a la realidad de tu negocio. Estos son
              rangos orientativos para pymes.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="text-xs uppercase text-gray-500">Implantación</div>
                <div className="mt-2 text-2xl font-bold">Desde 399 €</div>
                <p className="mt-3 text-sm text-gray-600">
                  Web básica, presencia en redes y primeras automatizaciones.
                </p>
              </div>

              <div className="p-6 border border-blue-100 rounded-xl bg-blue-50 shadow-sm">
                <div className="text-xs uppercase text-gray-600">
                  Mantenimiento mensual
                </div>
                <div className="mt-2 text-2xl font-bold">Desde 89 € / mes</div>
                <p className="mt-3 text-sm text-gray-700">
                  Gestión de contenido, ajustes periódicos y soporte directo.
                </p>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="text-xs uppercase text-gray-500">E-commerce</div>
                <div className="mt-2 text-2xl font-bold">Desde 799 €</div>
                <p className="mt-3 text-sm text-gray-600">
                  Tienda online, pasarela de pago e integraciones básicas.
                </p>
              </div>
            </div>
          </section>

          <section id="about" className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Sobre Next Business
            </h2>
            <p className="mt-2 text-gray-600 max-w-3xl">
              Next Business nace en Lakuntza (Sakana, Navarra) para acompañar a las
    empresas en su salto digital de una forma práctica y entendible. Nos
    apoyamos en IA y automatización, sí, pero siempre con un enfoque muy
    humano: escuchar, entender el negocio y proponer solo aquello que tiene
    sentido. Trabajamos especialmente con pymes y empresas en crecimiento,
    tanto de la zona como del resto de España, que quieren mejorar su
    presencia online sin llenar su agenda de tareas. Nuestro objetivo es
    que tengas un sistema que funcione en segundo plano mientras tú te
    centras en tu empresa.
            </p>
          </section>

          <section id="contact" className="mt-16 mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Contacto
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Cuéntame brevemente tu situación y te propongo una demo gratuita sin
              compromiso.
            </p>

            <div className="mt-6 max-w-2xl">
              <form
                onSubmit={handleSubmit}
                className="grid gap-4 bg-white p-6 border border-gray-100 rounded-xl shadow-sm"
              >
                <input
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  className="p-3 border rounded-md w-full"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="p-3 border rounded-md w-full"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Teléfono (opcional)"
                  className="p-3 border rounded-md w-full"
                />
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Cuéntame tu proyecto, sector y qué te gustaría mejorar."
                  className="p-3 border rounded-md w-full"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "LOADING"}
                  className="mt-2 px-4 py-3 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-800 disabled:opacity-60"
                >
                  {status === "LOADING" ? "Enviando..." : "Enviar mensaje"}
                </button>

                {status === "OK" && (
                  <p className="text-sm text-green-600">
                    Mensaje enviado correctamente. Te responderé lo antes posible.
                  </p>
                )}
                {status === "ERROR" && (
                  <p className="text-sm text-red-600">
                    Ha habido un problema al enviar el mensaje. Por favor, prueba
                    de nuevo o escríbeme a{" "}
                    <a
                      href="mailto:nextbusiness.test@gmail.com"
                      className="underline"
                    >
                      nextbusiness.test@gmail.com
                    </a>
                    .
                  </p>
                )}
              </form>

              <div className="mt-4 text-sm text-gray-500">
                También puedes escribir a{" "}
                <a
                  href="mailto:nextbusiness.test@gmail.com"
                  className="underline"
                >
                  nextbusiness.test@gmail.com
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t py-6">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600">
            <div>© {new Date().getFullYear()} Next Business — Lakuntza, Sakana</div>
            <div>Agencia de marketing y automatización con IA para pymes.</div>
          </div>
        </footer>
      </div>
    </>
  );
}
