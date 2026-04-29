/**
 * Cada luna (project moon) tiene un `slug` que coincide con `ProjectMoonId` y `SectionId` en el escenario 3D.
 * Edita títulos, copy y enlaces aquí.
 */
export type ProjectRecord = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  detail: string;
  stack: string[];
  demo?: string;
  github?: string;
  metrics: string[];
};

export const projects: ProjectRecord[] = [
  {
    slug: "flowsfy",
    title: "FlowsFy",
    kicker: "SaaS multi-tenant con IA y WhatsApp",
    summary:
      "Plataforma operativa para tiendas físicas: bot de atención con modelos de lenguaje, inventario, medios de pago y trazabilidad con colas y workers.",
    detail:
      "Arquitectura multi-tenant, integración con WhatsApp Cloud, Anthropic Claude, pagos (Wompi) y orquestación asíncrona con BullMQ, Redis y APIs propias. Desde producto a despliegue, con visibilidad y fiabilidad para concurrencia real.",
    stack: ["Next.js 14", "Node.js", "TypeScript", "Prisma", "BullMQ", "Redis", "Claude API"],
    demo: "https://flowsfy.com",
    github: "https://github.com/SoyKzeta",
    metrics: ["IA (Claude)", "WhatsApp", "Pagos Wompi", "Multi-tenant"],
  },
  {
    slug: "vivestone",
    title: "ViveStone",
    kicker: "Web comercial y catálogo B2B",
    summary:
      "Sitio corporativo para un vertical de materiales premium, con catálogo, narrativa y capado de generación de leads; orientado a conversión y búsqueda orgánica.",
    detail:
      "Diseño de recorrido, SEO técnico, galería de proyectos y conectores a formularios y notificaciones. Código y contenido afinado para carga, accesibilidad básica y trazas de origen de contacto.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Vercel"],
    demo: "https://vivestone.co",
    github: "https://github.com/SoyKzeta",
    metrics: ["SEO", "Conversión", "Catálogo", "Leads"],
  },
  {
    slug: "parking",
    title: "Sistema de parqueaderos",
    kicker: "Gestión, ingresos y operación de parkings",
    summary:
      "Software de administración de plazas, arqueo y trazos operativos; integra reportes (Power BI) y lógica de reservas o asignación, según requisito académico y de negocio.",
    detail:
      "Diseño de módulos de acceso, tarifas y caja; exportación a BI; foco en claridad operativa y soportes a decisión. Stack acorde al contexto de estudio o cliente (JVM, SQL, ETL en pipeline de datos).",
    stack: ["Java / Spring (según módulo)", "SQL", "ETL", "Power BI"],
    metrics: ["Operación", "BI", "Backoffice", "Caja"],
  },
  {
    slug: "inventory-rentals",
    title: "Inventario y alquileres",
    kicker: "Stock, turnos y control de arrendamientos",
    summary:
      "Aplicación para inventario crítico, historiales de alquiler y mínimos/alertas; adecuada a escenarios con activos móviles o equipos compartidos.",
    detail:
      "Modelo de entidades, movimientos, roles y trazas; con foco en consistencia, integración con repositorio de productos e informes. Presentación móvil o web según alcance de cada fase del proyecto.",
    stack: ["Spring / REST", "React / React Native", "SQL", "Autenticación básica"],
    metrics: ["Inventario", "Alquileres", "Alertas", "Móvil"],
  },
  {
    slug: "restaurant-app",
    title: "App móvil restaurante",
    kicker: "Pedido, mesa y backoffice",
    summary:
      "Aplicación para carta, pedido y comuniación con cocina; incluye módulo de caja o sync según alcance académico, con atención a usabilidad en campo.",
    detail:
      "Sincronización, estados de pedido y mínima offline tolerancia. Integración con backend REST y, cuando aplica, push o colas; prioridad en flujo claro para staff y comensal.",
    stack: ["React Native", "Firebase o REST", "Node", "Diseño UI móvil"],
    metrics: ["Móvil", "Pedidos", "Restauración", "UX en campo"],
  },
];

export const featuredProject = projects[0];

const slugSet = (projects as ProjectRecord[]).map((p) => p.slug);

export function projectBySlug(slug: string): ProjectRecord | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Mapea una luna 3D (mismo `slug` que en `ProjectMoonId`) a su ficha
 */
export function getProjectByMoonId(id: string): ProjectRecord | undefined {
  return slugSet.includes(id) ? projectBySlug(id) : undefined;
}

export function isProjectSlug(id: string): boolean {
  return slugSet.includes(id);
}
