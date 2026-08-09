(() => {
  const baseUrl = "https://mateustavaresarquitetura-boop.github.io/vertice-arquitetura";
  const fileName = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
  const pageKey = fileName === "vertice-arquitetura" ? "index.html" : fileName;

  const pages = {
    "index.html": {
      title: "Vértice Arquitetura e Avaliações | Projetos em Ipatinga",
      description: "Projetos arquitetônicos para saúde, clínicas, consultórios, espaços comerciais e residenciais, avaliações e perícias em Ipatinga e no Vale do Aço.",
      canonical: `${baseUrl}/`,
      image: `${baseUrl}/assets/gf-clinica-fachada.webp`,
      type: "website"
    },
    "projetos-arquitetonicos.html": {
      title: "Projetos Arquitetônicos em Ipatinga | Vértice Arquitetura",
      description: "Projetos para clínicas, consultórios, farmácias, comércios, residências e interiores, com funcionalidade, conformidade e acompanhamento técnico.",
      canonical: `${baseUrl}/projetos-arquitetonicos.html`,
      image: `${baseUrl}/assets/gf-clinica-fachada.webp`,
      type: "website"
    },
    "avaliacoes-pericias.html": {
      title: "Avaliações de Imóveis e Perícias em Ipatinga | Vértice",
      description: "Avaliações imobiliárias, perícias, vistorias, inspeções, laudos e pareceres técnicos em Ipatinga e região, com método e responsabilidade profissional.",
      canonical: `${baseUrl}/avaliacoes-pericias.html`,
      image: `${baseUrl}/assets/logo-vertice-colorida-transparente.png`,
      type: "website"
    },
    "sobre.html": {
      title: "Mateus Tavares | Arquiteto e Urbanista em Ipatinga",
      description: "Conheça Mateus Tavares, arquiteto e urbanista, CAU A302785-6, com atuação em arquitetura para saúde, projetos, avaliações e perícias.",
      canonical: `${baseUrl}/sobre.html`,
      image: `${baseUrl}/assets/logo-vertice-colorida-transparente.png`,
      type: "profile"
    },
    "contato.html": {
      title: "Contato | Vértice Arquitetura e Avaliações",
      description: "Fale com a Vértice Arquitetura e Avaliações para solicitar atendimento, apresentar seu projeto ou pedir uma proposta em Ipatinga e região.",
      canonical: `${baseUrl}/contato.html`,
      image: `${baseUrl}/assets/logo-vertice-colorida-transparente.png`,
      type: "website"
    },
    "vertice-saude.html": {
      title: "Vértice Saúde | Plataforma para Projetos de Saúde",
      description: "Plataforma para gestão de projetos de saúde, Checklist EAS, consultor técnico, biblioteca normativa, conferências e uso offline. Versões Gratuita e Pro.",
      canonical: `${baseUrl}/vertice-saude.html`,
      image: `${baseUrl}/assets/logo-vertice-colorida-transparente.png`,
      type: "website"
    },
    "biblioteca-normativa.html": {
      title: "Biblioteca Normativa | Vértice Arquitetura e Avaliações",
      description: "Referências oficiais e institucionais para projetos de saúde, acessibilidade, incêndio, resíduos, urbanismo, avaliações, perícias e exercício profissional.",
      canonical: `${baseUrl}/biblioteca-normativa.html`,
      image: `${baseUrl}/assets/logo-vertice-colorida-transparente.png`,
      type: "website"
    }
  };

  const page = pages[pageKey] || pages["index.html"];

  const mountLibraryNav = () => {
    document.querySelectorAll(".header nav").forEach(nav => {
      if(nav.querySelector('a[href="biblioteca-normativa.html"]')) return;

      const link = document.createElement("a");
      link.href = "biblioteca-normativa.html";
      link.textContent = nav.closest(".menu") ? "Biblioteca Normativa" : "Biblioteca";
      if(pageKey === "biblioteca-normativa.html") link.setAttribute("aria-current", "page");

      const reference = nav.querySelector('a[href="sobre.html"]') || nav.querySelector('a[href="contato.html"]');
      reference ? nav.insertBefore(link, reference) : nav.append(link);
    });
  };

  mountLibraryNav();

  document.querySelectorAll("details.menu, details.pv-menu").forEach(menu => {
    menu.querySelectorAll("a[href]").forEach(link => {
      link.addEventListener("click", () => menu.removeAttribute("open"));
    });
  });

  const setMeta = (selector, attributes) => {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      document.head.append(element);
    }
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  };

  const setLink = (rel, href) => {
    let element = document.head.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement("link");
      element.rel = rel;
      document.head.append(element);
    }
    element.href = href;
  };

  document.title = page.title;
  document.documentElement.lang = "pt-BR";

  setMeta('meta[name="description"]', { name: "description", content: page.description });
  setMeta('meta[name="robots"]', { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" });
  setMeta('meta[name="author"]', { name: "author", content: "Mateus José de Andrade Tavares" });
  setMeta('meta[name="geo.region"]', { name: "geo.region", content: "BR-MG" });
  setMeta('meta[name="geo.placename"]', { name: "geo.placename", content: "Ipatinga" });
  setMeta('meta[http-equiv="content-language"]', { "http-equiv": "content-language", content: "pt-BR" });

  setMeta('meta[property="og:locale"]', { property: "og:locale", content: "pt_BR" });
  setMeta('meta[property="og:type"]', { property: "og:type", content: page.type });
  setMeta('meta[property="og:site_name"]', { property: "og:site_name", content: "Vértice Arquitetura e Avaliações" });
  setMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
  setMeta('meta[property="og:description"]', { property: "og:description", content: page.description });
  setMeta('meta[property="og:url"]', { property: "og:url", content: page.canonical });
  setMeta('meta[property="og:image"]', { property: "og:image", content: page.image });
  setMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: "Vértice Arquitetura e Avaliações" });

  setMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
  setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description });
  setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: page.image });

  setLink("canonical", page.canonical);

  const business = {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${baseUrl}/#empresa`,
    name: "Vértice Arquitetura e Avaliações",
    alternateName: "Vértice Arquitetura",
    legalName: "Vértice Arquitetura e Avaliações",
    url: `${baseUrl}/`,
    logo: `${baseUrl}/assets/logo-vertice-colorida-transparente.png`,
    image: `${baseUrl}/assets/gf-clinica-fachada.webp`,
    description: "Escritório de arquitetura com atuação em projetos para saúde, estabelecimentos de interesse à saúde, projetos comerciais e residenciais, avaliações imobiliárias e perícias.",
    telephone: "+55 31 97534-4356",
    email: "vertice.arquitetura.contato@gmail.com",
    priceRange: "Sob consulta",
    founder: {
      "@type": "Person",
      "@id": `${baseUrl}/sobre.html#mateus-tavares`,
      name: "Mateus José de Andrade Tavares",
      alternateName: "Arquiteto Mateus Tavares",
      jobTitle: "Arquiteto e Urbanista",
      description: "Arquiteto e Urbanista, CAU A302785-6, com especialização em projetos hospitalares e estabelecimentos de saúde, avaliações e perícias.",
      url: `${baseUrl}/sobre.html`
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55 31 97534-4356",
      contactType: "Atendimento e orçamento",
      areaServed: "BR",
      availableLanguage: "Portuguese"
    },
    areaServed: [
      { "@type": "City", name: "Ipatinga" },
      { "@type": "City", name: "Coronel Fabriciano" },
      { "@type": "City", name: "Timóteo" },
      { "@type": "City", name: "Santana do Paraíso" },
      { "@type": "AdministrativeArea", name: "Vale do Aço" },
      { "@type": "State", name: "Minas Gerais" }
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "19:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00"
      }
    ],
    sameAs: [
      "https://www.instagram.com/arquiteto.mateustavares/",
      "https://www.instagram.com/vertice_arquiteturaeavaliacoes/"
    ],
    knowsAbout: [
      "Arquitetura para saúde",
      "Vigilância Sanitária",
      "Projetos de clínicas e consultórios",
      "Projetos comerciais",
      "Projetos residenciais",
      "Avaliações imobiliárias",
      "Perícias e vistorias",
      "Biblioteca normativa"
    ],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projetos para estabelecimentos de saúde e de interesse à saúde" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Projetos arquitetônicos comerciais e residenciais" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Avaliações imobiliárias, perícias, vistorias e laudos" } }
    ]
  };

  const website = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: "Vértice Arquitetura e Avaliações",
    inLanguage: "pt-BR",
    publisher: { "@id": `${baseUrl}/#empresa` }
  };

  const pageType = pageKey === "sobre.html"
    ? "AboutPage"
    : pageKey === "contato.html"
      ? "ContactPage"
      : pageKey === "biblioteca-normativa.html"
        ? "CollectionPage"
        : "WebPage";

  const webPage = {
    "@type": pageType,
    "@id": `${page.canonical}#webpage`,
    url: page.canonical,
    name: page.title,
    description: page.description,
    inLanguage: "pt-BR",
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#empresa` },
    primaryImageOfPage: { "@type": "ImageObject", url: page.image }
  };

  const graph = [business, website, webPage];

  if (pageKey === "vertice-saude.html") {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${baseUrl}/vertice-saude.html#aplicativo`,
      name: "Vértice Saúde",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Windows, Android, iOS",
      url: `${baseUrl}/vertice-saude.html`,
      description: "Plataforma em desenvolvimento para gestão de projetos de saúde, Checklist EAS, consultor técnico, biblioteca normativa, conferências, documentos e uso offline.",
      author: { "@id": `${baseUrl}/#empresa` },
      offers: [
        { "@type": "Offer", name: "Versão Gratuita", price: "0", priceCurrency: "BRL", availability: "https://schema.org/PreOrder" },
        { "@type": "Offer", name: "Versão Pro", description: "Modalidade profissional ampliada, com valores e condições a serem divulgados no lançamento.", availability: "https://schema.org/PreOrder" }
      ]
    });
  }

  if (pageKey === "biblioteca-normativa.html") {
    graph.push({
      "@type": "ItemList",
      "@id": `${baseUrl}/biblioteca-normativa.html#referencias`,
      name: "Biblioteca Normativa da Vértice",
      description: page.description,
      numberOfItems: 9,
      itemListElement: [
        "Saúde e Vigilância Sanitária",
        "Minas Gerais e Fisioterapia",
        "Acessibilidade",
        "Incêndio e Pânico",
        "Resíduos de Serviços de Saúde",
        "Normas Regulamentadoras",
        "Urbanismo e Obras",
        "Avaliações e Perícias",
        "Normas Técnicas Complementares"
      ].map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name
      }))
    });
  }

  let structuredData = document.getElementById("vertice-structured-data");
  if (!structuredData) {
    structuredData = document.createElement("script");
    structuredData.type = "application/ld+json";
    structuredData.id = "vertice-structured-data";
    document.head.append(structuredData);
  }
  structuredData.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
})();
