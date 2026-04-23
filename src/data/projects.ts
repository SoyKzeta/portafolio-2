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
    kicker: "Plataforma SaaS Multi-tenant con IA",
    summary:
      "SaaS para tiendas físicas que automatiza la atención al cliente por WhatsApp, gestión de inventario, pedidos y facturación electrónica (DIAN).",
    detail:
      "Diseño y desarrollo completo desde cero: arquitectura multi-tenant, bot de WhatsApp con Anthropic Claude, pagos con Wompi, y procesamiento asíncrono de alta concurrencia usando BullMQ y Redis.",
    stack: ["Next.js 14", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "BullMQ", "Redis"],
    demo: "https://flowsfy.com",
    github: "https://github.com/soykzeta",
    metrics: ["IA (Claude API)", "WhatsApp Cloud", "Facturación DIAN", "Wompi"],
  },
  {
    slug: "vivestone",
    title: "ViveStone",
    kicker: "Sitio Comercial Premium",
    summary:
      "Plataforma corporativa para distribuidores de cuarzos y sinterizados premium con catálogo vivo y flujo de cotización.",
    detail:
      "Desarrollo full-stack enfocado en performance, SEO y conversión. Incluye catálogo filtrable, galería de proyectos y un sistema de captura de leads conectado a APIs propias para notificaciones.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "API Routes"],
    demo: "https://vivestone.co",
    github: "https://github.com/soykzeta",
    metrics: ["Catálogo Dinámico", "Lead Flow", "SEO Optimizado"],
  },
  {
    slug: "academic",
    title: "Proyectos Académicos",
    kicker: "Ingeniería de Software & Arquitectura",
    summary:
      "Sistemas de administración, aplicaciones móviles, bodegas de datos (ETL) y aseguramiento de calidad (QA).",
    detail:
      "Desarrollo de software de parqueaderos con Power BI, apps de inventario en Spring Boot, apps móviles en React Native con Firebase, y aplicación de pruebas (Selenium, Cypress, TestRail).",
    stack: ["Java", "Spring Boot", "React Native", "SQL Server", "Power BI", "Firebase"],
    github: "https://github.com/soykzeta",
    metrics: ["Arquitectura", "ETL & Data", "QA & Testing", "Scrum/Kanban"],
  },
];

export const featuredProject = projects[0];
