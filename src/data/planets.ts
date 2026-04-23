import { featuredProject } from "@/data/projects";

export type SectionId =
  | "system"
  | "about"
  | "flowsfy"
  | "vivestone"
  | "academic"
  | "skills"
  | "contact";

export type PreviewVariant =
  | "overview"
  | "dashboard"
  | "profile"
  | "skills"
  | "timeline"
  | "signal";

export type SolarBody = {
  id: Exclude<SectionId, "system">;
  name: string;
  subtitle: string;
  panelLabel: string;
  description: string;
  stack: string[];
  color: string;
  glowColor: string;
  surfaceColor: string;
  emissiveColor: string;
  ringColor?: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle: number;
  verticalRange: number;
  previewVariant: PreviewVariant;
  lineLength: number;
  href?: string;
  github?: string;
  demo?: string;
  hasRing?: boolean;
  secondary?: boolean;
  featuredProjectSlug?: string;
};

export const systemSection = {
  id: "system" as const,
  name: "Sistema",
  subtitle: "Vista inicial",
  panelLabel: "Portafolio orbital",
  description:
    "Desarrollador Full-Stack orientado a producto. Experiencia en arquitectura, APIs REST, integraciones con IA y sistemas asíncronos. Construyendo soluciones escalables y de impacto real.",
  stack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS/Vercel"],
  previewVariant: "overview" as const,
  featuredProjectSlug: featuredProject.slug,
};

export const solarBodies: SolarBody[] = [
  {
    id: "about",
    name: "Sobre mí",
    subtitle: "Perfil Profesional",
    panelLabel: "El Creador",
    description:
      "Desarrollador Full-Stack orientado a producto y estudiante de Ingeniería de Software (Semestre 7) en el Tecnológico de Antioquia. Fundador de FlowsFy, con enfoque en arquitectura y sistemas escalables.",
    stack: ["Full-Stack", "Product Engineer", "Medellín, Colombia"],
    color: "#76a7ff",
    glowColor: "#a8c6ff",
    surfaceColor: "#274d8b",
    emissiveColor: "#7ea8ff",
    size: 2.15,
    orbitRadius: 10.8,
    orbitSpeed: 0.18,
    initialAngle: 5.5,
    verticalRange: 0.42,
    previewVariant: "profile",
    lineLength: 2.3,
    github: "https://github.com/soykzeta",
  },
  {
    id: "flowsfy",
    name: "FlowsFy",
    subtitle: "SaaS Multi-tenant con IA",
    panelLabel: "Producto Estrella",
    description:
      "Plataforma para tiendas físicas. Bot de WhatsApp con Claude, inventario, pagos con Wompi y facturación DIAN. Arquitectura escalable con colas asíncronas (BullMQ).",
    stack: ["Next.js 14", "Node.js", "Prisma", "BullMQ", "Claude API", "WhatsApp API"],
    color: "#ff6c37",
    glowColor: "#ffb06e",
    surfaceColor: "#832418",
    emissiveColor: "#ff7444",
    size: 2.3,
    orbitRadius: 14.2,
    orbitSpeed: 0.15,
    initialAngle: 2.62,
    verticalRange: 0.3,
    previewVariant: "dashboard",
    lineLength: 2.6,
    demo: featuredProject.demo,
    github: featuredProject.github,
    featuredProjectSlug: featuredProject.slug,
  },
  {
    id: "vivestone",
    name: "ViveStone",
    subtitle: "Sitio Comercial Premium",
    panelLabel: "Proyecto en Producción",
    description:
      "Sitio corporativo para distribuidores de cuarzos y sinterizados. Catálogo vivo, galería de proyectos, APIs propias y flujo de cotización optimizado para conversión.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    color: "#46f0ce",
    glowColor: "#79ffd9",
    surfaceColor: "#0c7768",
    emissiveColor: "#4de7cb",
    size: 2.0,
    orbitRadius: 17.5,
    orbitSpeed: 0.12,
    initialAngle: 4.05,
    verticalRange: 0.35,
    previewVariant: "overview",
    lineLength: 2.4,
    demo: "https://vivestone.co",
    github: "https://github.com/soykzeta",
  },
  {
    id: "academic",
    name: "Académico",
    subtitle: "Ingeniería de Software",
    panelLabel: "Proyectos Técnicos",
    description:
      "Sistemas de parqueaderos con ETL y Power BI, gestión de inventarios, apps móviles y aplicación de pruebas de calidad (Selenium, Cypress, TestRail).",
    stack: ["Java", "Spring Boot", "React Native", "SQL Server", "Power BI", "QA"],
    color: "#f5af68",
    glowColor: "#ffe2b8",
    surfaceColor: "#8a5a1d",
    emissiveColor: "#ffbf78",
    size: 1.6,
    orbitRadius: 20.8,
    orbitSpeed: 0.09,
    initialAngle: 0.48,
    verticalRange: 0.2,
    previewVariant: "timeline",
    lineLength: 2.1,
    secondary: true,
  },
  {
    id: "skills",
    name: "Skills",
    subtitle: "Stack & Tecnologías",
    panelLabel: "Capacidades Técnicas",
    description:
      "Perfil Full-Stack con dominio en integraciones complejas, bases de datos relacionales/NoSQL, APIs REST, infraestructura, IA generativa y testing.",
    stack: ["Node.js", "React/Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    color: "#ca63ff",
    glowColor: "#f0a8ff",
    surfaceColor: "#532081",
    emissiveColor: "#ca6fff",
    ringColor: "#d78dff",
    size: 2.5,
    orbitRadius: 24.5,
    orbitSpeed: 0.07,
    initialAngle: 2.14,
    verticalRange: 0.45,
    previewVariant: "skills",
    lineLength: 2.4,
    hasRing: true,
  },
  {
    id: "contact",
    name: "Contacto",
    subtitle: "Medellín, Colombia",
    panelLabel: "Canal Abierto",
    description:
      "Disponible para roles frontend/full-stack, proyectos freelance o colaboraciones. No dudes en escribirme para conectar.",
    stack: ["emmanuelville@hotmail.com", "LinkedIn", "GitHub", "Medellín"],
    color: "#a8c6ff",
    glowColor: "#d4e4ff",
    surfaceColor: "#4f75b3",
    emissiveColor: "#a8c6ff",
    size: 1.9,
    orbitRadius: 28.5,
    orbitSpeed: 0.05,
    initialAngle: 1.2,
    verticalRange: 0.65,
    previewVariant: "signal",
    lineLength: 2.8,
    href: "mailto:emmanuelville@hotmail.com",
    github: "https://github.com/soykzeta",
  },
];
