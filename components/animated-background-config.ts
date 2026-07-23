export type Section = "hero" | "projects" | "photos" | "stack";

export const STATES = {
  hero: {
    desktop: {
      scale: { x: 0.22, y: 0.22, z: 0.22 },
      position: { x: 220, y: -80, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.30, y: 0.30, z: 0.30 },
      position: { x: 0, y: -200, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: 150, z: 0 },
      rotation: {
        x: Math.PI,
        y: Math.PI / 3,
        z: Math.PI,
      },
    },
  },
  photos: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: -250, y: -40, z: 0 },
      rotation: {
        x: Math.PI / 12,
        y: -Math.PI / 4,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: Math.PI / 6,
        y: -Math.PI / 6,
        z: 0,
      },
    },
  },
  stack: {
    desktop: {
      scale: { x: 0.26, y: 0.26, z: 0.26 },
      position: { x: 0, y: -30, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: {
        x: 0,
        y: Math.PI / 6,
        z: 0,
      },
    },
  },
};

export const getKeyboardState = ({
  section,
  isMobile,
}: {
  section: Section;
  isMobile: boolean;
}) => {
  const baseTransform = STATES[section][isMobile ? "mobile" : "desktop"];
  const width = typeof window !== "undefined" ? window.innerWidth : 1280;
  const targetScale = isMobile ? width / 390 : width / 1280;
  const scaleOffset = Math.min(Math.max(targetScale, 0.5), 1.15);

  return {
    ...baseTransform,
    scale: {
      x: Math.abs(baseTransform.scale.x * scaleOffset),
      y: Math.abs(baseTransform.scale.y * scaleOffset),
      z: Math.abs(baseTransform.scale.z * scaleOffset),
    },
  };
};