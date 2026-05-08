import type { Area } from "./careers-data";

export type Question = {
  id: number;
  text: string;
  options: { label: string; areas: Area[] }[];
};

export const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué actividad disfrutas más en tu tiempo libre?",
    options: [
      { label: "Resolver puzzles o programar algo", areas: ["tecnologia", "ciencias"] },
      { label: "Dibujar, escribir o crear contenido", areas: ["arte", "diseno"] },
      { label: "Ayudar o escuchar a las personas", areas: ["salud", "social"] },
      { label: "Construir, reparar o experimentar", areas: ["ingenieria", "ciencias"] },
    ],
  },
  {
    id: 2,
    text: "Cuando trabajas en grupo, sueles ser quien…",
    options: [
      { label: "Organiza y delega tareas", areas: ["administracion"] },
      { label: "Aporta ideas creativas", areas: ["arte", "diseno"] },
      { label: "Resuelve los problemas técnicos", areas: ["tecnologia", "ingenieria"] },
      { label: "Cuida la dinámica del equipo", areas: ["social", "salud"] },
    ],
  },
  {
    id: 3,
    text: "¿Qué materia escolar te resulta más natural?",
    options: [
      { label: "Matemáticas y física", areas: ["ingenieria", "tecnologia", "ciencias"] },
      { label: "Biología y química", areas: ["salud", "ciencias"] },
      { label: "Arte, literatura o música", areas: ["arte", "diseno"] },
      { label: "Historia, filosofía o psicología", areas: ["social", "administracion"] },
    ],
  },
  {
    id: 4,
    text: "Imagina tu trabajo ideal. ¿Cómo se ve?",
    options: [
      { label: "Frente a una computadora creando", areas: ["tecnologia", "diseno"] },
      { label: "En un laboratorio o hospital", areas: ["salud", "ciencias"] },
      { label: "En obra, taller o campo", areas: ["ingenieria"] },
      { label: "En una oficina liderando un equipo", areas: ["administracion", "social"] },
    ],
  },
  {
    id: 5,
    text: "¿Qué te motiva más?",
    options: [
      { label: "Innovar y crear lo que no existe", areas: ["tecnologia", "arte", "diseno"] },
      { label: "Dejar un impacto en personas", areas: ["salud", "social"] },
      { label: "Resolver problemas complejos", areas: ["ingenieria", "ciencias", "tecnologia"] },
      { label: "Generar valor y crecer profesionalmente", areas: ["administracion"] },
    ],
  },
  {
    id: 6,
    text: "Una habilidad que la gente reconoce en ti:",
    options: [
      { label: "Pensamiento lógico", areas: ["tecnologia", "ingenieria", "ciencias"] },
      { label: "Creatividad", areas: ["arte", "diseno"] },
      { label: "Empatía y comunicación", areas: ["social", "salud"] },
      { label: "Liderazgo y orden", areas: ["administracion"] },
    ],
  },
  {
    id: 7,
    text: "Si pudieras estudiar gratis cualquier cosa, elegirías…",
    options: [
      { label: "Inteligencia artificial", areas: ["tecnologia", "ciencias"] },
      { label: "Cine, música o pintura", areas: ["arte"] },
      { label: "Medicina o nutrición", areas: ["salud"] },
      { label: "Negocios o emprendimiento", areas: ["administracion"] },
    ],
  },
  {
    id: 8,
    text: "Tu forma de aprender favorita es…",
    options: [
      { label: "Haciendo proyectos prácticos", areas: ["ingenieria", "tecnologia", "diseno"] },
      { label: "Leyendo e investigando", areas: ["ciencias", "social"] },
      { label: "Conversando y debatiendo", areas: ["social", "administracion"] },
      { label: "Experimentando y creando", areas: ["arte", "ciencias"] },
    ],
  },
];
