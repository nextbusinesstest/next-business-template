import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Business — Automations for SMEs</title>
        <meta name="description" content="Next Business - IA & automatización para pymes en Sakana. Plantilla reutilizable." />
        <meta property="og:title" content="Next Business" />
        <meta property="og:description" content="IA-powered marketing & e-commerce for small businesses" />
        <meta property="og:image" content="/og_image.png" />
      </Head>
      <div className="min-h-screen bg-white text-gray-800 antialiased">
        <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Next Business logo" className="w-16 h-16 object-contain" />
            <div>
              <div className="text-xl font-bold">Next Business</div>
              <div className="text-xs text-gray-500">IA & automatización para pymes</div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#services" className="hover:underline">Servicios</a>
            <a href="#pricing" className="hover:underline">Precios</a>
            <a href="#contact" className="px-4 py-2 bg-teal-400 text-white rounded-md shadow hover:opacity-90">Contacto</a>
          </nav>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-12">
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Marketing digital + IA para empresas de Sakana</h1>
              <p className="mt-4 text-gray-600">Automatiza tu comunicación, vende más y ahorra tiempo. Soluciones replicables y fáciles de desplegar.</p>
              <div className="mt-6 flex gap-3">
                <a href="#contact" className="px-5 py-3 bg-teal-400 text-white rounded-md shadow">Comenzar</a>
                <a href="#services" className="px-5 py-3 border border-gray-200 rounded-md">Servicios</a>
              </div>
              <div className="mt-6 text-sm text-gray-500">Plan piloto disponible: prueba de 30 días.</div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-teal-50 to-white p-8">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=60" alt="business" className="w-full h-64 object-cover rounded-md" />
            </div>
          </section>

          <section id="services" className="mt-16">
            <h2 className="text-2xl font-bold">Servicios</h2>
            <p className="mt-2 text-gray-600">Packs que combinan implantación, automatización y mantenimiento.</p>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Implantación IA</h3>
                <p className="text-sm text-gray-600 mt-2">Configuración de flujos de contenido y calendario editorial.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">Contenido y redes</h3>
                <p className="text-sm text-gray-600 mt-2">Generación automática de copy, imágenes y vídeos cortos con IA.</p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="font-semibold">E‑commerce</h3>
                <p className="text-sm text-gray-600 mt-2">Tienda online rápida y pasarela de pago.</p>
              </div>
            </div>
          </section>

          <section id="pricing" className="mt-16">
            <h2 className="text-2xl font-bold">Planes</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <div className="text-sm text-gray-500">Pack inicial</div>
                <div className="mt-2 text-2xl font-bold">€ 399</div>
                <div className="mt-4 text-sm text-gray-600">Implantación básica + web + 30d pruebas</div>
              </div>
              <div className="p-6 border rounded-lg bg-teal-50">
                <div className="text-sm text-gray-500">Mantenimiento</div>
                <div className="mt-2 text-2xl font-bold">€ 89 / mes</div>
                <div className="mt-4 text-sm text-gray-600">Publicaciones automáticas y soporte</div>
              </div>
              <div className="p-6 border rounded-lg">
                <div className="text-sm text-gray-500">E‑commerce</div>
                <div className="mt-2 text-2xl font-bold">€ 799</div>
                <div className="mt-4 text-sm text-gray-600">Tienda + integraciones</div>
              </div>
            </div>
          </section>

          <section id="contact" className="mt-16 mb-24">
            <h2 className="text-2xl font-bold">Contacto</h2>
            <p className="mt-2 text-gray-600">Escríbeme y coordinamos una demo gratuita.</p>
            <div className="mt-6 max-w-2xl">
              <form action="mailto:nextbusiness.test@gmail.com" method="post" encType="text/plain" className="grid gap-3">
                <input name="name" type="text" placeholder="Tu nombre" className="p-3 border rounded" required />
                <input name="email" type="email" placeholder="Tu email" className="p-3 border rounded" required />
                <textarea name="message" rows="5" placeholder="Cuéntame tu proyecto" className="p-3 border rounded" required></textarea>
                <div className="flex gap-3">
                  <button type="submit" className="px-4 py-2 bg-teal-400 text-white rounded">Enviar</button>
                  <a href="tel:+34948576000" className="px-4 py-2 border rounded">Llamar</a>
                </div>
              </form>
              <div className="mt-4 text-sm text-gray-500">También puedes escribir a <a href="mailto:nextbusiness.test@gmail.com" className="underline">nextbusiness.test@gmail.com</a></div>
            </div>
          </section>
        </main>

        <footer className="border-t py-6">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} Next Business — Lakuntza, Sakana</div>
            <div className="text-sm text-gray-600">Hecho para replicar: plantilla reutilizable.</div>
          </div>
        </footer>
      </div>
    </>
  )
}
