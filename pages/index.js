import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Business — IA y automatización para pymes</title>
        <meta name="description" content="Next Business ayuda a pequeñas y medianas empresas a digitalizarse y aumentar ventas mediante soluciones automatizadas con IA. Implantación y mantenimiento." />
        <meta property="og:title" content="Next Business" />
        <meta property="og:description" content="IA-powered marketing & e-commerce para pymes en Sakana y comarca." />
        <meta property="og:image" content="/og_image.png" />
      </Head>

      <div className="min-h-screen bg-white text-gray-800 antialiased">
        <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Next Business logo" className="w-16 h-16 object-contain" />
            <div>
              <div className="text-lg font-semibold" style={{color:'var(--nb-primary)'}}>Next Business</div>
              <div className="text-xs text-gray-500">IA & automatización para pymes</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#services" className="hover:underline">Servicios</a>
            <a href="#about" className="hover:underline">Sobre mí</a>
            <a href="#pricing" className="hover:underline">Precios</a>
            <a href="#contact" className="px-4 py-2 bg-[var(--nb-primary)] text-white rounded-md shadow hover:opacity-90">Contacto</a>
          </nav>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">
          <section className="grid md:grid-cols-2 gap-8 items-center hero-gradient p-8 rounded-lg">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight" style={{color:'#0b3d91'}}>Digitalización real para empresas locales</h1>
              <p className="mt-4 text-gray-600">Implantamos soluciones de marketing y comercio electrónico automatizadas con IA. Te ayudamos a captar clientes, optimizar procesos y aumentar ventas sin necesidad de contratar equipo interno.</p>
              <ul className="mt-4 text-sm text-gray-600 list-disc list-inside">
                <li>Implantación llave en mano</li>
                <li>Automatización de contenido y gestión diaria</li>
                <li>Mantenimiento y mejora continua</li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a href="#contact" className="px-5 py-3 bg-[var(--nb-primary)] text-white rounded-md shadow">Solicitar demo</a>
                <a href="#services" className="px-5 py-3 border border-gray-200 rounded-md">Ver servicios</a>
              </div>
              <div className="mt-6 text-sm text-gray-500">Plan piloto local: 30 días de prueba para una implantación inicial de demostración.</div>
            </div>
            <div className="rounded-lg overflow-hidden shadow card-border p-6 bg-white">
              <img src="https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=1200&q=60" alt="corporate" className="w-full h-64 object-cover rounded-md" />
            </div>
          </section>

          <section id="services" className="mt-12">
            <h2 className="text-2xl font-bold" style={{color:'var(--nb-primary)'}}>Servicios</h2>
            <p className="mt-2 text-gray-600">Ofrecemos un conjunto completo de servicios pensado para pymes que quieren resultados con el mínimo esfuerzo operativo.</p>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Creación y gestión de redes sociales</h3>
                <p className="text-sm text-gray-600 mt-2">Estrategia, creación de contenido y programación automática para mantener presencia constante.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Contenido automatizado con IA</h3>
                <p className="text-sm text-gray-600 mt-2">Generación de textos, imágenes y guiones para vídeo optimizados para conversión.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Páginas web y e-commerce</h3>
                <p className="text-sm text-gray-600 mt-2">Webs profesionales rápidas y tiendas online listas para vender.</p>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Publicidad online (Meta/Google)</h3>
                <p className="text-sm text-gray-600 mt-2">Campañas orientadas a ventas o captación de leads con medición clara del ROI.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Consultoría y estrategia</h3>
                <p className="text-sm text-gray-600 mt-2">Auditoría inicial y plan de crecimiento digital adaptado a tu negocio.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Automatizaciones</h3>
                <p className="text-sm text-gray-600 mt-2">Flujos automatizados para ventas, lead nurturing y atención al cliente.</p>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Creación de marca y diseño</h3>
                <p className="text-sm text-gray-600 mt-2">Identidad visual, logos y materiales listos para usar.</p>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">SEO y contenido web</h3>
                <p className="text-sm text-gray-600 mt-2">Optimización on-page y generación de contenido para mejorar visibilidad orgánica.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Soporte y mantenimiento</h3>
                <p className="text-sm text-gray-600 mt-2">Actualizaciones, informes y mejoras continuas con un único responsable: la IA configurada por nosotros.</p>
              </div>
            </div>
          </section>

          <section id="pricing" className="mt-12">
            <h2 className="text-2xl font-bold" style={{color:'var(--nb-primary)'}}>Planes y precios</h2>
            <p className="mt-2 text-gray-600">Planes transparentes adaptados a pymes. Precios orientativos.</p>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <div className="text-sm text-gray-500">Pack inicial</div>
                <div className="mt-2 text-2xl font-bold">€ 399</div>
                <div className="mt-4 text-sm text-gray-600">Implantación básica + web + 30 días de prueba</div>
              </div>
              <div className="p-6 border rounded-lg bg-gray-50">
                <div className="text-sm text-gray-500">Mantenimiento</div>
                <div className="mt-2 text-2xl font-bold">€ 89 / mes</div>
                <div className="mt-4 text-sm text-gray-600">Publicaciones automáticas y soporte básico</div>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="text-sm text-gray-500">E-commerce</div>
                <div className="mt-2 text-2xl font-bold">€ 799</div>
                <div className="mt-4 text-sm text-gray-600">Tienda + integraciones y formación</div>
              </div>
            </div>
          </section>

          <section id="about" className="mt-12">
            <h2 className="text-2xl font-bold" style={{color:'var(--nb-primary)'}}>Sobre Next Business</h2>
            <p className="mt-2 text-gray-600">Soy el fundador de Next Business, residente en Lakuntza (Sakana). Me encargo de la prospección y la relación con los clientes. La implantación y la gestión diaria la realizan soluciones de IA configuradas por mí para que las empresas no tengan que contratar personal adicional.</p>
          </section>

          <section id="contact" className="mt-12 mb-24">
            <h2 className="text-2xl font-bold" style={{color:'var(--nb-primary)'}}>Contacto</h2>
            <p className="mt-2 text-gray-600">Solicita una demo gratuita o plantea tu proyecto. Respuesta en 48 horas hábiles.</p>

            <div className="mt-6 max-w-2xl">
              <form action="https://formspree.io/f/xkgkpepa" method="POST" className="grid gap-3">
                <input name="name" type="text" placeholder="Nombre" className="p-3 border rounded" required />
                <input name="email" type="email" placeholder="Email" className="p-3 border rounded" required />
                <input name="phone" type="tel" placeholder="Teléfono (opcional)" className="p-3 border rounded" />
                <textarea name="message" rows="5" placeholder="Cuéntame tu proyecto" className="p-3 border rounded" required></textarea>
                <div className="flex gap-3">
                  <button type="submit" className="px-4 py-2 bg-[var(--nb-primary)] text-white rounded">Enviar</button>
                  <a href="tel:+34948576000" className="px-4 py-2 border rounded">Llamar</a>
                </div>
              </form>
              <div className="mt-4 text-sm text-gray-500">También puedes escribir a <a href="mailto:nextbusiness.test@gmail.com" className="underline">nextbusiness.test@gmail.com</a></div>
            </div>
          </section>
        </main>

        <footer className="border-t py-6">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} Next Business — Lakuntza, Sakana</div>
            <div className="text-sm text-gray-600">Diseño corporativo · Implantación IA · Mantenimiento mensual</div>
          </div>
        </footer>
      </div>
    </>
  )
}
