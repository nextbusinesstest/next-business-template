import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Business — Agencia de Marketing y Automatización</title>
        <meta name="description" content="Agencia especializada en marketing digital, automatización e IA para pequeñas y medianas empresas." />
        <meta property="og:title" content="Next Business — Impulsa tu empresa con IA" />
        <meta property="og:description" content="Marketing digital, automatización y páginas web rápidas para empresas locales." />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      {/* HERO */}
      <section className="bg-white py-24 border-b">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Digitalización real para empresas locales
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Implantamos soluciones de marketing digital, automatización con IA y comercio electrónico para que tu negocio gane visibilidad, clientes y eficiencia.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#contacto" className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700">
              Solicitar una demo
            </a>
            <a href="#servicios" className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:bg-gray-100">
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Gestión de redes sociales", desc: "Contenido profesional, publicaciones y análisis optimizado para tu negocio." },
              { title: "Contenido con IA", desc: "Creación automática de textos, imágenes y campañas adaptadas a tu marca." },
              { title: "Páginas web y e‑commerce", desc: "Webs rápidas, modernas y optimizadas para convertir clientes." },
              { title: "Publicidad online", desc: "Campañas en Meta Ads y Google Ads para atraer clientes reales." },
              { title: "Consultoría digital", desc: "Análisis estratégico y acompañamiento en tu transformación digital." },
              { title: "Automatizaciones empresariales", desc: "Procesos automáticos para ahorrar tiempo y mejorar la eficiencia." },
              { title: "Branding y diseño", desc: "Diseño de identidad visual, logotipos y estilo corporativo." },
              { title: "SEO y contenido web", desc: "Optimización para Google con contenido profesional y estrategia planificada." }
            ].map((s, i) => (
              <div key={i} className="p-6 bg-white shadow-sm rounded-xl border hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Cómo trabajamos</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultoría inicial", desc: "Analizamos tu empresa y definimos objetivos claros." },
              { step: "02", title: "Plan digital personalizado", desc: "Creamos una estrategia basada en IA y automatización." },
              { step: "03", title: "Implantación", desc: "Desarrollamos tu web, redes, publicidad y procesos automáticos." },
              { step: "04", title: "Mantenimiento", desc: "Mejoras continuas, informes y soporte mensual." }
            ].map((s, i) => (
              <div key={i} className="p-6 bg-white shadow-sm rounded-xl border">
                <p className="text-3xl font-bold text-blue-600 mb-2">{s.step}</p>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24 bg-gray-50 border-t">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Contacto</h2>
          <form action="https://formspree.io/f/xkgkpepa" method="POST" className="space-y-6 bg-white p-8 rounded-xl shadow-sm border">
            <input type="text" name="name" placeholder="Nombre" className="w-full p-3 border rounded-lg" required />
            <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" required />
            <input type="text" name="phone" placeholder="Teléfono (opcional)" className="w-full p-3 border rounded-lg" />
            <textarea name="message" placeholder="Mensaje" className="w-full p-3 border rounded-lg h-32" required></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-white border-t text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Next Business — Agencia de Marketing y Automatización</p>
      </footer>
    </>
  );
}