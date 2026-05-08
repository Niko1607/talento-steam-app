export type Area = "tecnologia" | "salud" | "diseno" | "administracion" | "ingenieria" | "arte" | "ciencias" | "social";

export const areas: Record<Area, { label: string; color: string; emoji: string; desc: string }> = {
  tecnologia: { label: "Tecnología", color: "var(--grape)", emoji: "💻", desc: "Software, datos, IA y sistemas." },
  salud: { label: "Salud", color: "var(--leaf)", emoji: "🩺", desc: "Cuidar y mejorar la vida humana." },
  diseno: { label: "Diseño", color: "var(--coral)", emoji: "🎨", desc: "Resolver con estética y función." },
  administracion: { label: "Administración", color: "var(--ink)", emoji: "📊", desc: "Liderar, planear y gestionar." },
  ingenieria: { label: "Ingeniería", color: "var(--grape)", emoji: "⚙️", desc: "Construir el mundo físico." },
  arte: { label: "Arte", color: "var(--coral)", emoji: "🎭", desc: "Expresión, cultura y creatividad." },
  ciencias: { label: "Ciencias", color: "var(--leaf)", emoji: "🔬", desc: "Descubrir cómo funciona el universo." },
  social: { label: "Ciencias sociales", color: "var(--sun)", emoji: "🧠", desc: "Entender a las personas y sociedades." },
};

export type Career = {
  slug: string;
  name: string;
  area: Area;
  what: string;
  field: string;
  salary: string;
  duration: string;
  universities: string[];
};

export const careers: Career[] = [
  {
    slug: "ingenieria-de-software",
    name: "Ingeniería de Software",
    area: "tecnologia",
    what: "Diseña, construye y mantiene aplicaciones, plataformas y sistemas digitales que usan millones de personas.",
    field: "Empresas tech, startups, banca, salud digital, freelance remoto.",
    salary: "USD 1.500 – 6.000+ / mes",
    duration: "5 años",
    universities: ["UNAM", "Tec de Monterrey", "UBA", "Universidad de los Andes", "PUCP"],
  },
  {
    slug: "medicina",
    name: "Medicina",
    area: "salud",
    what: "Diagnostica, trata y previene enfermedades para cuidar la salud de las personas.",
    field: "Hospitales, clínicas, investigación, salud pública, consulta privada.",
    salary: "USD 1.200 – 5.000 / mes",
    duration: "6–7 años + especialidad",
    universities: ["UNAM", "Universidad de Chile", "UBA", "Universidad Nacional de Colombia", "USP"],
  },
  {
    slug: "diseno-grafico",
    name: "Diseño Gráfico",
    area: "diseno",
    what: "Comunica ideas a través de imagen, tipografía e identidad visual para marcas y productos.",
    field: "Agencias, estudios, in-house, freelance, publicidad y editorial.",
    salary: "USD 800 – 3.000 / mes",
    duration: "4–5 años",
    universities: ["UNAM", "Universidad de Palermo", "Tec de Monterrey", "Javeriana"],
  },
  {
    slug: "administracion-de-empresas",
    name: "Administración de Empresas",
    area: "administracion",
    what: "Planea, dirige y optimiza organizaciones en finanzas, marketing, operaciones y personas.",
    field: "Corporativos, consultoría, banca, emprendimiento, ONGs.",
    salary: "USD 1.000 – 4.500 / mes",
    duration: "4–5 años",
    universities: ["Tec de Monterrey", "Universidad de los Andes", "UBA", "ESAN"],
  },
  {
    slug: "ingenieria-civil",
    name: "Ingeniería Civil",
    area: "ingenieria",
    what: "Diseña y construye infraestructura: edificios, puentes, carreteras y obras hidráulicas.",
    field: "Constructoras, gobierno, consultoría, desarrollo inmobiliario.",
    salary: "USD 1.200 – 4.000 / mes",
    duration: "5 años",
    universities: ["UNAM", "Universidad de Chile", "UBA", "Universidad Nacional de Colombia"],
  },
  {
    slug: "psicologia",
    name: "Psicología",
    area: "social",
    what: "Estudia el comportamiento y la mente para acompañar procesos clínicos, educativos u organizacionales.",
    field: "Consulta clínica, RR.HH., educación, investigación, salud mental.",
    salary: "USD 800 – 3.500 / mes",
    duration: "5 años",
    universities: ["UNAM", "UBA", "PUCP", "Universidad de los Andes"],
  },
  {
    slug: "artes-visuales",
    name: "Artes Visuales",
    area: "arte",
    what: "Crea obra artística (pintura, escultura, instalación, video) y participa del circuito cultural.",
    field: "Galerías, museos, gestión cultural, docencia, freelance.",
    salary: "Variable — proyectos y comisiones",
    duration: "4–5 años",
    universities: ["UNAM (ENAP)", "UNA (Buenos Aires)", "Universidad Nacional de Colombia"],
  },
  {
    slug: "biologia",
    name: "Biología",
    area: "ciencias",
    what: "Investiga los seres vivos y los ecosistemas; aporta a salud, conservación y biotecnología.",
    field: "Investigación, laboratorios, conservación, docencia, biotech.",
    salary: "USD 900 – 3.000 / mes",
    duration: "5 años",
    universities: ["UNAM", "Universidad de Chile", "USP", "Javeriana"],
  },
  {
    slug: "ciencia-de-datos",
    name: "Ciencia de Datos",
    area: "tecnologia",
    what: "Extrae conocimiento de datos con estadística, programación y machine learning para tomar decisiones.",
    field: "Tech, banca, retail, salud, gobierno, startups.",
    salary: "USD 2.000 – 7.000+ / mes",
    duration: "4–5 años",
    universities: ["Tec de Monterrey", "ITAM", "Universidad de los Andes", "UBA"],
  },
  {
    slug: "arquitectura",
    name: "Arquitectura",
    area: "ingenieria",
    what: "Diseña espacios habitables y urbanos integrando estética, técnica y sostenibilidad.",
    field: "Estudios, desarrollo urbano, gobierno, obra propia.",
    salary: "USD 1.000 – 4.000 / mes",
    duration: "5–6 años",
    universities: ["UNAM", "UBA", "PUC Chile", "Javeriana"],
  },
];

export const universities = [
  { name: "UNAM", country: "México", modality: "Presencial", cost: "Pública — gratuita", programs: 120 },
  { name: "Tec de Monterrey", country: "México", modality: "Presencial / Híbrida", cost: "USD 8.000–14.000 / año", programs: 90 },
  { name: "Universidad de Buenos Aires", country: "Argentina", modality: "Presencial", cost: "Pública — gratuita", programs: 100 },
  { name: "Universidad de los Andes", country: "Colombia", modality: "Presencial", cost: "USD 6.000–10.000 / semestre", programs: 70 },
  { name: "PUCP", country: "Perú", modality: "Presencial", cost: "USD 3.000–6.000 / semestre", programs: 60 },
  { name: "Universidad de Chile", country: "Chile", modality: "Presencial", cost: "Pública — arancel diferenciado", programs: 75 },
];
