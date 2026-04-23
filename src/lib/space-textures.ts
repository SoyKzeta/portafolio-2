"use client";

import * as THREE from "three";

function createCanvas(size = 512) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

// Fast noise implementation using a precomputed permutation table
const PERM = new Uint8Array(512);
const p = new Uint8Array(256);
for (let i = 0; i < 256; i++) {
  p[i] = Math.floor(Math.random() * 256);
}
for (let i = 0; i < 512; i++) {
  PERM[i] = p[i & 255];
}

function fade(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(t: number, a: number, b: number) {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function perlin(x: number, y: number) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  x -= Math.floor(x);
  y -= Math.floor(y);

  const u = fade(x);
  const v = fade(y);

  const A = PERM[X] + Y;
  const B = PERM[X + 1] + Y;

  return lerp(
    v,
    lerp(u, grad(PERM[A], x, y), grad(PERM[B], x - 1, y)),
    lerp(u, grad(PERM[A + 1], x, y - 1), grad(PERM[B + 1], x - 1, y - 1))
  );
}

function fbm(x: number, y: number, octaves = 4) {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value += perlin(x * frequency, y * frequency) * amplitude;
    frequency *= 2;
    amplitude *= 0.5;
  }
  return value;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function createRadialTexture(
  innerColor: string,
  outerColor: string,
  size = 512,
) {
  const canvas = createCanvas(size);
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.08,
    size / 2,
    size / 2,
    size * 0.48,
  );

  gradient.addColorStop(0, innerColor);
  gradient.addColorStop(0.38, outerColor);
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

export function createNebulaTexture(colors: string[], size = 1024) {
  const canvas = createCanvas(size);
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  context.fillStyle = "rgba(0, 0, 0, 0)";
  context.fillRect(0, 0, size, size);

  colors.forEach((color, index) => {
    const x = size * (0.18 + index * 0.22);
    const y = size * (0.28 + ((index % 2) * 0.26));
    const radius = size * (0.18 + index * 0.04);
    const gradient = context.createRadialGradient(x, y, radius * 0.08, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.6, color.replace("1)", "0.35)"));
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  });

  context.filter = "blur(22px)";
  context.globalCompositeOperation = "screen";
  context.drawImage(canvas, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

export function createPlanetTexture(id: string, baseColor: string, accentColor: string, size = 1024) {
  const canvas = createCanvas(size);
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  context.fillStyle = baseColor;
  context.fillRect(0, 0, size, size);

  const imgData = context.getImageData(0, 0, size, size);
  const data = imgData.data;

  const baseRgb = hexToRgb(baseColor);
  const accentRgb = hexToRgb(accentColor);

  if (id === "contact") {
    // Contacto: Teal/cyan/green, elegant, smooth atmospheric, subtle clouds
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (x / size) * 4;
        const ny = (y / size) * 4;
        
        // Soft swirling clouds
        const n1 = fbm(nx + fbm(nx, ny, 3), ny + fbm(nx, ny, 3), 4);
        const n2 = fbm(nx * 2, ny * 2, 3);
        
        // Normalize perlin from [-1, 1] to [0, 1]
        const cloud = Math.pow((n1 + 1) * 0.5, 1.5) * 0.8 + ((n2 + 1) * 0.5) * 0.2;
        
        const idx = (y * size + x) * 4;
        data[idx] = baseRgb.r * (1 - cloud) + accentRgb.r * cloud;
        data[idx + 1] = baseRgb.g * (1 - cloud) + accentRgb.g * cloud;
        data[idx + 2] = baseRgb.b * (1 - cloud) + accentRgb.b * cloud;
      }
    }
  } else if (id === "about") {
    // Sobre mí: Blue/cool tones, soft cloudy or oceanic surface
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (x / size) * 6;
        const ny = (y / size) * 6;
        
        const n = fbm(nx, ny, 5);
        const ocean = Math.sin((n + 1) * Math.PI) * 0.5 + 0.5;
        
        const idx = (y * size + x) * 4;
        data[idx] = baseRgb.r * (1 - ocean) + accentRgb.r * ocean * 0.8;
        data[idx + 1] = baseRgb.g * (1 - ocean) + accentRgb.g * ocean * 0.8;
        data[idx + 2] = baseRgb.b * (1 - ocean) + accentRgb.b * ocean * 0.8;
      }
    }
  } else if (id === "projects") {
    // Proyectos: Orange/red/lava-like, cracked, volcanic
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (x / size) * 8;
        const ny = (y / size) * 8;
        
        // Cracks using inverted absolute perlin (ridge noise)
        let ridge = 0;
        let amp = 0.5;
        let freq = 1;
        for (let i = 0; i < 5; i++) {
          let n = perlin(nx * freq, ny * freq);
          n = 1.0 - Math.abs(n); // Ridge
          ridge += n * amp;
          freq *= 2.0;
          amp *= 0.5;
        }
        
        const crack = Math.pow(Math.max(0, ridge - 0.3), 3.0) * 2.5;
        const baseNoise = (fbm(nx * 2, ny * 2, 4) + 1) * 0.5;
        
        const idx = (y * size + x) * 4;
        const r = baseRgb.r * baseNoise;
        const g = baseRgb.g * baseNoise;
        const b = baseRgb.b * baseNoise;
        
        data[idx] = Math.min(255, r + accentRgb.r * crack);
        data[idx + 1] = Math.min(255, g + accentRgb.g * crack);
        data[idx + 2] = Math.min(255, b + accentRgb.b * crack);
      }
    }
  } else if (id === "skills") {
    // Skills: Purple/magenta, rich bands or swirling atmosphere, Saturn-like
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (x / size) * 5;
        const ny = (y / size) * 10;
        
        const turbulence = fbm(nx, ny, 4) * 0.5;
        const band = Math.sin((ny + turbulence) * Math.PI * 4) * 0.5 + 0.5;
        const detail = (fbm(nx * 4, ny * 4, 3) + 1) * 0.15;
        
        const mix = Math.min(1, Math.max(0, band + detail));
        
        const idx = (y * size + x) * 4;
        data[idx] = baseRgb.r * (1 - mix) + accentRgb.r * mix;
        data[idx + 1] = baseRgb.g * (1 - mix) + accentRgb.g * mix;
        data[idx + 2] = baseRgb.b * (1 - mix) + accentRgb.b * mix;
      }
    }
  } else {
    // Default / Experience: Generic cratered or dusty look
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (x / size) * 10;
        const ny = (y / size) * 10;
        
        const n = (fbm(nx, ny, 5) + 1) * 0.5;
        
        const idx = (y * size + x) * 4;
        data[idx] = baseRgb.r * n + accentRgb.r * (1 - n) * 0.5;
        data[idx + 1] = baseRgb.g * n + accentRgb.g * (1 - n) * 0.5;
        data[idx + 2] = baseRgb.b * n + accentRgb.b * (1 - n) * 0.5;
      }
    }
  }

  context.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

export function createSolarTexture(
  baseColor: string,
  hotColor: string,
  highlightColor: string,
  size = 1024,
) {
  const canvas = createCanvas(size);
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const baseRgb = hexToRgb(baseColor);
  const hotRgb = hexToRgb(hotColor);
  const highlightRgb = hexToRgb(highlightColor);
  const imgData = context.createImageData(size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x / size) * 7.5;
      const ny = (y / size) * 5.5;
      const turbulence = fbm(nx, ny, 5);
      const plasmaBands = Math.sin((ny + turbulence * 1.8) * Math.PI * 2.7) * 0.5 + 0.5;
      const cells = Math.pow((fbm(nx * 1.9, ny * 1.9, 4) + 1) * 0.5, 1.65);
      const streaks = Math.pow(Math.max(0, plasmaBands * 0.72 + cells * 0.58 - 0.2), 1.1);
      const flare = Math.pow(Math.max(0, cells - 0.62), 2.6);

      const idx = (y * size + x) * 4;
      data[idx] = Math.min(
        255,
        baseRgb.r * 0.68 + hotRgb.r * streaks * 0.82 + highlightRgb.r * flare,
      );
      data[idx + 1] = Math.min(
        255,
        baseRgb.g * 0.6 + hotRgb.g * streaks * 0.8 + highlightRgb.g * flare,
      );
      data[idx + 2] = Math.min(
        255,
        baseRgb.b * 0.44 + hotRgb.b * streaks * 0.42 + highlightRgb.b * flare * 0.82,
      );
      data[idx + 3] = 255;
    }
  }

  context.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

export function createRingTexture(coreColor: string, edgeColor: string, size = 1024) {
  const canvas = createCanvas(size);
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  const center = size / 2;
  const inner = size * 0.24;
  const outer = size * 0.48;

  for (let index = 0; index < size; index += 1) {
    const distance = Math.abs(index - center);
    const normalized = distance / outer;
    
    // Use perlin noise for ring bands
    const bandNoise = (perlin(distance * 0.1, 0) + 1) * 0.5;
    
    const alpha =
      distance < inner || distance > outer
        ? 0
        : (1 - normalized) * 0.35 + bandNoise * 0.22;

    context.fillStyle = `rgba(255,255,255,${alpha})`;
    context.fillRect(0, index, size, 1);
  }

  const gradient = context.createLinearGradient(0, 0, size, 0);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.18, edgeColor);
  gradient.addColorStop(0.5, coreColor);
  gradient.addColorStop(0.82, edgeColor);
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  context.globalCompositeOperation = "source-atop";
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}
