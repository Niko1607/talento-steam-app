# 🎮 Talento Steam App

Una aplicación moderna y escalable construida con **TanStack Start**, **React** y **TypeScript** que proporciona una experiencia de usuario superior con componentes UI elegantes y gestión de estado avanzada.

## ✨ Características

- ⚡ **Framework Moderno**: TanStack Start para enrutamiento y SSR
- 🎨 **Componentes UI**: Radix UI + Tailwind CSS para una interfaz pulida
- 📦 **State Management**: React Query para gestión de datos
- 🔐 **Backend**: Supabase para autenticación y base de datos
- 📱 **Responsive Design**: Totalmente adaptable a cualquier dispositivo
- 🔍 **Búsqueda y Filtrado**: Con comandos (cmdk)
- 🎭 **Animaciones**: Framer Motion para transiciones suaves
- 📋 **Formularios**: React Hook Form con validación

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+ o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Niko1607/talento-steam-app.git

# Entrar al directorio
cd talento-steam-app

# Instalar dependencias
npm install
```

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Build

```bash
# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
talento-steam-app/
├── src/
│   ├── routes/          # Rutas de la aplicación (TanStack Router)
│   ├── components/      # Componentes reutilizables
│   ├── lib/            # Utilidades y funciones helpers
│   ├── styles/         # Estilos globales
│   └── App.tsx         # Componente principal
├── public/             # Archivos estáticos
├── package.json        # Dependencias del proyecto
└── vite.config.ts      # Configuración de Vite
```

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **TanStack Start** - Framework fullstack
- **TanStack Router** - Enrutamiento
- **React Query** - Gestión de datos
- **Tailwind CSS** - Utilidades CSS
- **Radix UI** - Componentes accesibles

### Herramientas
- **Vite** - Bundler de desarrollo
- **ESLint** - Linting
- **Prettier** - Formateador de código
- **Cloudflare Vite Plugin** - Optimizaciones

### Backend
- **Supabase** - PostgreSQL + Auth
- **React Hook Form** - Gestión de formularios

## 📚 Scripts Disponibles

| Script | Descripción |
|--------|------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run build:dev` | Construye en modo desarrollo |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea el código con Prettier |

## 🔐 Autenticación

La aplicación utiliza **Supabase** para autenticación. Asegúrate de:

1. Crear una cuenta en [Supabase](https://supabase.com)
2. Configurar las variables de entorno correctamente
3. Establecer las políticas de seguridad en Supabase

## 📊 Gestión de Estado

Se utiliza **React Query** para:
- Caché de datos
- Sincronización de estado
- Manejo de errores
- Loading states

Ejemplo de uso:
```typescript
import { useQuery } from '@tanstack/react-query'

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  })
  
  // Renderizar componente
}
```

## 🎨 Componentes UI

La aplicación incluye múltiples componentes de Radix UI:
- Dialog
- Dropdown Menu
- Select
- Tabs
- Accordion
- Popover
- Toast Notifications
- Y muchos más...

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Creado por **Niko1607**

- GitHub: [@Niko1607](https://github.com/Niko1607)

## 📞 Soporte

Si tienes preguntas o encuentras problemas:

1. Abre un [Issue](https://github.com/Niko1607/talento-steam-app/issues)
2. Incluye detalles del problema y pasos para reproducirlo
3. Proporciona información sobre tu entorno

## 🙏 Agradecimientos

Gracias a:
- [TanStack](https://tanstack.com) por los increíbles frameworks
- [Radix UI](https://radix-ui.com) por los componentes accesibles
- [Supabase](https://supabase.com) por la infraestructura backend
- [Tailwind CSS](https://tailwindcss.com) por el framework de utilidades

---

⭐ Si te gusta este proyecto, considera darle una estrella en GitHub!
