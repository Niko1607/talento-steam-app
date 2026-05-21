import type { Area } from "./careers-data";

export type Question = {
  id: number;
  text: string;
  options: { label: string; areas: Area[] }[];
};

export const questions: Question[] = [
  { id: 1, text: "¿Qué actividad disfrutas más en tu tiempo libre?", options: [
    { label: "Resolver puzzles o programar algo", areas: ["tecnologia", "ciencias"] },
    { label: "Dibujar, escribir o crear contenido", areas: ["arte", "diseno"] },
    { label: "Ayudar o escuchar a las personas", areas: ["salud", "social"] },
    { label: "Construir, reparar o experimentar", areas: ["ingenieria", "ciencias"] },
  ]},
  { id: 2, text: "Cuando trabajas en grupo, sueles ser quien…", options: [
    { label: "Organiza y delega tareas", areas: ["administracion"] },
    { label: "Aporta ideas creativas", areas: ["arte", "diseno"] },
    { label: "Resuelve los problemas técnicos", areas: ["tecnologia", "ingenieria"] },
    { label: "Cuida la dinámica del equipo", areas: ["social", "salud"] },
  ]},
  { id: 3, text: "¿Qué materia escolar te resulta más natural?", options: [
    { label: "Matemáticas y física", areas: ["ingenieria", "tecnologia", "ciencias"] },
    { label: "Biología y química", areas: ["salud", "ciencias"] },
    { label: "Arte, literatura o música", areas: ["arte", "diseno"] },
    { label: "Historia, filosofía o psicología", areas: ["social", "administracion"] },
  ]},
  { id: 4, text: "Imagina tu trabajo ideal. ¿Cómo se ve?", options: [
    { label: "Frente a una computadora creando", areas: ["tecnologia", "diseno"] },
    { label: "En un laboratorio o hospital", areas: ["salud", "ciencias"] },
    { label: "En obra, taller o campo", areas: ["ingenieria"] },
    { label: "En una oficina liderando un equipo", areas: ["administracion", "social"] },
  ]},
  { id: 5, text: "¿Qué te motiva más?", options: [
    { label: "Innovar y crear lo que no existe", areas: ["tecnologia", "arte", "diseno"] },
    { label: "Dejar un impacto en personas", areas: ["salud", "social"] },
    { label: "Resolver problemas complejos", areas: ["ingenieria", "ciencias", "tecnologia"] },
    { label: "Generar valor y crecer profesionalmente", areas: ["administracion"] },
  ]},
  { id: 6, text: "Una habilidad que la gente reconoce en ti:", options: [
    { label: "Pensamiento lógico", areas: ["tecnologia", "ingenieria", "ciencias"] },
    { label: "Creatividad", areas: ["arte", "diseno"] },
    { label: "Empatía y comunicación", areas: ["social", "salud"] },
    { label: "Liderazgo y orden", areas: ["administracion"] },
  ]},
  { id: 7, text: "Si pudieras estudiar gratis cualquier cosa, elegirías…", options: [
    { label: "Inteligencia artificial", areas: ["tecnologia", "ciencias"] },
    { label: "Cine, música o pintura", areas: ["arte"] },
    { label: "Medicina o nutrición", areas: ["salud"] },
    { label: "Negocios o emprendimiento", areas: ["administracion"] },
  ]},
  { id: 8, text: "Tu forma de aprender favorita es…", options: [
    { label: "Haciendo proyectos prácticos", areas: ["ingenieria", "tecnologia", "diseno"] },
    { label: "Leyendo e investigando", areas: ["ciencias", "social"] },
    { label: "Conversando y debatiendo", areas: ["social", "administracion"] },
    { label: "Experimentando y creando", areas: ["arte", "ciencias"] },
  ]},
  { id: 9, text: "¿Cómo te describirías frente a un problema nuevo?", options: [
    { label: "Analizo paso a paso con datos", areas: ["ciencias", "tecnologia", "ingenieria"] },
    { label: "Busco una solución estética y original", areas: ["arte", "diseno"] },
    { label: "Pregunto cómo afecta a las personas", areas: ["social", "salud"] },
    { label: "Hago un plan de acción y delego", areas: ["administracion"] },
  ]},
  { id: 10, text: "¿Qué tipo de contenido consumes más?", options: [
    { label: "Tutoriales de tecnología o ciencia", areas: ["tecnologia", "ciencias"] },
    { label: "Documentales de salud o naturaleza", areas: ["salud", "ciencias"] },
    { label: "Arte, diseño, música o cine", areas: ["arte", "diseno"] },
    { label: "Negocios, finanzas o liderazgo", areas: ["administracion"] },
  ]},
  { id: 11, text: "Si tuvieras que dar una charla, sería sobre…", options: [
    { label: "Cómo funciona algo técnico", areas: ["tecnologia", "ingenieria"] },
    { label: "Una causa social que te importa", areas: ["social", "salud"] },
    { label: "Un proceso creativo tuyo", areas: ["arte", "diseno"] },
    { label: "Cómo crecer un proyecto o marca", areas: ["administracion"] },
  ]},
  { id: 12, text: "¿Qué entorno te recarga energía?", options: [
    { label: "Un estudio o taller creativo", areas: ["arte", "diseno"] },
    { label: "Un laboratorio o aula", areas: ["ciencias", "salud"] },
    { label: "Una oficina dinámica con gente", areas: ["administracion", "social"] },
    { label: "Un espacio con máquinas o herramientas", areas: ["ingenieria", "tecnologia"] },
  ]},
  { id: 13, text: "¿Qué tipo de impacto quieres dejar?", options: [
    { label: "Crear tecnología que cambie vidas", areas: ["tecnologia", "ingenieria"] },
    { label: "Sanar o mejorar la salud de otros", areas: ["salud"] },
    { label: "Mover emociones con mi obra", areas: ["arte", "diseno"] },
    { label: "Construir organizaciones e ideas", areas: ["administracion", "social"] },
  ]},
  { id: 14, text: "¿Qué herramienta dominarías con gusto?", options: [
    { label: "Lenguajes de programación", areas: ["tecnologia"] },
    { label: "Cámara, pinceles o instrumentos", areas: ["arte", "diseno"] },
    { label: "Microscopio, datos o reactivos", areas: ["ciencias", "salud"] },
    { label: "Software de gestión y finanzas", areas: ["administracion"] },
  ]},
  { id: 15, text: "¿Qué prefieres al final de un proyecto?", options: [
    { label: "Que funcione mejor que antes", areas: ["ingenieria", "tecnologia"] },
    { label: "Que emocione o inspire", areas: ["arte", "diseno"] },
    { label: "Que haya ayudado a alguien", areas: ["salud", "social"] },
    { label: "Que genere resultados medibles", areas: ["administracion", "ciencias"] },
  ]},
];
