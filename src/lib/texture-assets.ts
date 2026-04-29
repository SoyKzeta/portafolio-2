/**
 * `MOON_MAP_URLS` sigue el orden de `projectMoons` en `data/planets.ts` (5 entradas).
 * La 5.ª reusa `luna1`; añade `luna5_textura.png` y otra URL si quieres 5 distintas.
 */
export const ASSET_V = "2026-01-12b";

export function textureUrl(path: string): string {
  return `${path}?v=${ASSET_V}`;
}

export const Textures = {
  sun: textureUrl("/textures/sun.png"),
  planetProjects: textureUrl("/textures/planets/proyectos_textura.png"),
  planetSkills: textureUrl("/textures/planets/habilidades_textura.png"),
  planetContact: textureUrl("/textures/planets/contacto_textura.png"),
  moon1: textureUrl("/textures/moons/luna1_textura.png"),
  moon2: textureUrl("/textures/moons/luna2_textura.png"),
  moon3: textureUrl("/textures/moons/luna3_textura.png"),
  moon4: textureUrl("/textures/moons/luna4_textura.png"),
} as const;

/** Un archivo por luna; la 5.ª reutiliza la 1.ª si no añades `luna5_textura.png` */
export const MOON_MAP_URLS: readonly string[] = [
  Textures.moon1,
  Textures.moon2,
  Textures.moon3,
  Textures.moon4,
  Textures.moon1,
];
