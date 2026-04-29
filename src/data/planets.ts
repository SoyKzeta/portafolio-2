import { featuredProject } from "@/data/projects";

/**
 * Dónde editar contenido:
 * - Sobre mí (sol) → `aboutSection` en este archivo
 * - Proyectos (planeta) → entrada `id: "projects"` en `solarBodies` + texto en `projects` en `projects.ts`
 * - Lunas: datos en `projectMoons` (órbita/velocidad) y en `data/projects.ts` (copy de cada proyecto)
 * - Habilidades → `id: "skills"` en `solarBodies` + `stackCategories` si usas el panel
 * - Contacto → `id: "contact"` en `solarBodies`
 *
 * Cámara: usa `bodyPositions[sectionId]` (mundo) emitido desde `Sun` y `Planet`/`ProjectMoons`
 */

export type SectionId =
  | "system"
  | "about"
  | "projects"
  | "flowsfy"
  | "vivestone"
  | "parking"
  | "inventory-rentals"
  | "restaurant-app"
  | "skills"
  | "contact";

export const PROJECT_MOON_IDS = [
  "flowsfy",
  "vivestone",
  "parking",
  "inventory-rentals",
  "restaurant-app",
] as const satisfies Readonly<SectionId[]>;

export type ProjectMoonId = (typeof PROJECT_MOON_IDS)[number];

export function isProjectMoonId(
  id: SectionId,
): id is ProjectMoonId & SectionId {
  return (PROJECT_MOON_IDS as readonly string[]).includes(id);
}

export function isOrbitKey(id: SectionId): id is "projects" | "skills" | "contact" {
  return id === "projects" || id === "skills" || id === "contact";
}

export type PreviewVariant =
  | "overview"
  | "dashboard"
  | "profile"
  | "skills"
  | "timeline"
  | "signal"
  | "ecosystem";

export type SolarBody = {
  id: "about" | "projects" | "skills" | "contact";
  name: string;
  subtitle: string;
  panelLabel: string;
  description: string;
  stack: string[];
  stackCategories?: { label: string; items: string[] }[];
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
  /** Si subes `public/cv.pdf`, añade `CV_PATH: "/cv.pdf"` en el cuerpo `contact` */
  CV_PATH?: string;
  demo?: string;
  hasRing?: boolean;
  featuredProjectSlug?: string;
};

export type ProjectMoonDef = {
  id: ProjectMoonId;
  name: string;
  /** Radio local alrededor del planeta Proyectos (mundo: escala 1 unidad ≈ 1) */
  moonOrbitRadius: number;
  /** Rad/s en espacio local */
  moonOrbitSpeed: number;
  initialAngle: number;
  size: number;
  glowColor: string;
  emissiveColor: string;
  verticalWobble: number;
};

/**
 * Sintonizar lunas: `moonOrbitRadius` (más grande = más separadas), `moonOrbitSpeed` (más = más rápido)
 */
export const projectMoons: ProjectMoonDef[] = [
  {
    id: "flowsfy",
    name: "FlowsFy",
    moonOrbitRadius: 3.5,
    moonOrbitSpeed: 0.42,
    initialAngle: 0.2,
    size: 0.4,
    glowColor: "#ffb06e",
    emissiveColor: "#ff6c2a",
    verticalWobble: 0.1,
  },
  {
    id: "vivestone",
    name: "ViveStone",
    moonOrbitRadius: 3.85,
    moonOrbitSpeed: 0.35,
    initialAngle: 2.1,
    size: 0.35,
    glowColor: "#79ffd9",
    emissiveColor: "#36e0be",
    verticalWobble: 0.12,
  },
  {
    id: "parking",
    name: "Parking",
    moonOrbitRadius: 3.2,
    moonOrbitSpeed: 0.5,
    initialAngle: 3.6,
    size: 0.3,
    glowColor: "#b8c6ff",
    emissiveColor: "#7a90ff",
    verticalWobble: 0.08,
  },
  {
    id: "inventory-rentals",
    name: "Inventario",
    moonOrbitRadius: 4.15,
    moonOrbitSpeed: 0.28,
    initialAngle: 4.4,
    size: 0.3,
    glowColor: "#e8b0ff",
    emissiveColor: "#c45cff",
    verticalWobble: 0.1,
  },
  {
    id: "restaurant-app",
    name: "Restaurante",
    moonOrbitRadius: 4.45,
    moonOrbitSpeed: 0.32,
    initialAngle: 5.3,
    size: 0.3,
    glowColor: "#ffd08a",
    emissiveColor: "#ff9a3a",
    verticalWobble: 0.11,
  },
];

export const systemSection = {
  id: "system" as const,
  name: "Sistema",
  subtitle: "Vista inicial",
  panelLabel: "Sistema solar",
  description:
    "Portafolio interactivo. El sol es tu identidad, Proyectos agrupa el ecosistema, Habilidades el stack y Contacto abre canales. Explora o usa la barra izquierda.",
  stack: ["Three.js", "Next.js", "R3F", "Product", "SaaS"],
  previewVariant: "overview" as const,
  featuredProjectSlug: featuredProject.slug,
};

/**
 * Sobre mí: selección del sol, panel derecho, no planeta en órbita
 */
export const aboutSection: SolarBody = {
  id: "about",
  name: "Emmanuel Villegas Urrea",
  subtitle: "Full-Stack & fundador de FlowsFy",
  panelLabel: "Sobre mí",
  description:
    "Desarrollador orientado a producto, con enfoque en backend, frontend, integraciones e IA. Construyo y lidero FlowsFy, un SaaS multi-tenant, mientras avanzo en Ingeniería de Software. Me interesan las entregas medibles, las APIs sólidas y el impacto de negocio, no el código por sí solo.",
  stack: [
    "Medellín, Colombia",
    "Ingeniería de Software (estudiante)",
    "FlowsFy (fundador)",
    "SaaS · producto",
    "Backend & frontend",
    "IA & integraciones",
  ],
  color: "#ffaa66",
  glowColor: "#ff9a3a",
  surfaceColor: "#2a1a0a",
  emissiveColor: "#ff7b2a",
  size: 3.12,
  orbitRadius: 0,
  orbitSpeed: 0,
  initialAngle: 0,
  verticalRange: 0,
  previewVariant: "profile",
  lineLength: 2.4,
  github: "https://github.com/SoyKzeta",
  href: "https://www.linkedin.com/in/emmanuelvillegasurrea/",
};

/**
 * Tres cuerpos en órbita: Proyectos, Habilidades, Contacto
 */
export const solarBodies: SolarBody[] = [
  {
    id: "projects",
    name: "Proyectos",
    subtitle: "Ecosistema de productos",
    panelLabel: "Proyectos",
    description:
      "Selecciona un satélite para abrir un caso concreto: SaaS, comercio, operaciones o apps móviles. Cada luna condensa arquitectura, stack y enlaces a demo o repositorio.",
    stack: ["SaaS", "Mobile", "B2B", "Integración", "IA"],
    color: "#ff6c37",
    glowColor: "#ffb06e",
    surfaceColor: "#532416",
    emissiveColor: "#ff7444",
    size: 2.4,
    orbitRadius: 13.5,
    orbitSpeed: 0.14,
    initialAngle: 0.5,
    verticalRange: 0.28,
    previewVariant: "ecosystem",
    lineLength: 2.4,
    demo: featuredProject.demo,
    github: "https://github.com/SoyKzeta",
    featuredProjectSlug: "flowsfy",
  },
  {
    id: "skills",
    name: "Habilidades",
    subtitle: "Stack y categorías",
    panelLabel: "Habilidades técnicas",
    description:
      "Categorías y herramientas con las que diseño, implemento y despliego: APIs, UIs, datos, colas, contenedores y aseguramiento de calidad, además de integrar modelos y servicios externos de forma fiable.",
    stack: [
      "Node / TypeScript",
      "Next.js & React",
      "PostgreSQL / Prisma / Redis",
      "REST · integraciones",
      "Docker & despliegue",
    ],
    stackCategories: [
      { label: "Backend", items: ["Node.js", "TypeScript", "Prisma", "BullMQ"] },
      { label: "Frontend", items: ["Next.js", "React", "Tailwind", "R3F"] },
      { label: "Bases de datos", items: ["PostgreSQL", "Redis", "SQL"] },
      { label: "Integración / IA", items: ["APIs REST", "Claude", "WhatsApp Cloud", "Wompi"] },
      { label: "Infra y herramientas", items: ["Docker", "Vercel", "AWS (básico)", "Git / CI"] },
    ],
    color: "#ca63ff",
    glowColor: "#f0a8ff",
    surfaceColor: "#532081",
    emissiveColor: "#ca6fff",
    ringColor: "#d78dff",
    size: 2.35,
    orbitRadius: 20.2,
    orbitSpeed: 0.09,
    initialAngle: 2.15,
    verticalRange: 0.38,
    previewVariant: "skills",
    lineLength: 2.25,
    hasRing: true,
    github: "https://github.com/SoyKzeta",
  },
  {
    id: "contact",
    name: "Contacto",
    subtitle: "Medellín, Colombia",
    panelLabel: "Canales",
    description:
      "Para roles full-stack, colaboración en producto o consultoría. Respuesta razonable según carga. Prefiero mensaje claro con contexto y objetivo.",
    stack: ["emmanuelville@hotmail.com", "LinkedIn", "GitHub", "Medellín, CO"],
    color: "#a8c6ff",
    glowColor: "#d4e4ff",
    surfaceColor: "#3f5f9c",
    emissiveColor: "#8eb4ff",
    size: 1.95,
    orbitRadius: 27.5,
    orbitSpeed: 0.055,
    initialAngle: 4.0,
    verticalRange: 0.55,
    previewVariant: "signal",
    lineLength: 2.6,
    href: "mailto:emmanuelville@hotmail.com",
    github: "https://github.com/SoyKzeta",
  },
];
