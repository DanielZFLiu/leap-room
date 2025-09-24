export type Space = {
  name: string;
  floor: string;
  wall: string;
  src: string;
};

const sampleImages = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1724582586413-6b69e1c94a17?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
];

// ignore the mismatch between the descriptions and the actual images lol
export const sampleSpaces: Space[] = [
  {
    name: "Bright Living Room",
    floor: "Warm oak herringbone",
    wall: "Marble white",
    src: sampleImages[0],
  },
  {
    name: "Cozy Bedroom",
    floor: "Matte maple board",
    wall: "Deep night blue",
    src: sampleImages[1],
  },
  {
    name: "Modern Kitchen",
    floor: "Polished concrete",
    wall: "Sleek white",
    src: sampleImages[2],
  },
  {
    name: "Elegant Dining Room",
    floor: "Dark cherry wood",
    wall: "Cream beige",
    src: sampleImages[3],
  },
];