# Portfolio Website

A modern and responsive portfolio website built with React, Vite, and TypeScript.

## 🚀 Technologies

- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - JavaScript superset with static typing
- **Vite** - Fast and modern build tool
- **React Icons** - Popular icon library

## 📦 Installation

1. Install dependencies:

```bash
npm install
```

## 🛠️ Development

To start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 🏗️ Build

To create a production build:

```bash
npm run build
```

The files will be in the `dist` folder.

## 📁 Project Structure

```
portifoio-website/
├── src/
│   ├── components/          # React Components
│   │   ├── Header.tsx       # Header with navigation
│   │   ├── Hero.tsx         # Main section
│   │   ├── About.tsx        # About me
│   │   ├── Projects.tsx     # Projects
│   │   ├── Contact.tsx      # Contact form
│   │   └── Footer.tsx       # Footer
│   ├── App.tsx              # Main component
│   ├── main.tsx             # Entry point
│   ├── App.css              # App global styles
│   └── index.css            # Global styles
├── index.html               # Main HTML
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🎨 Customization

### Colors

The main colors can be changed in the `src/index.css` file through CSS variables:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #ec4899;
  /* ... */
}
```

### Content

- **Hero**: Edit `src/components/Hero.tsx` to change name, title, and description
- **About**: Edit `src/components/About.tsx` to update information about you and skills
- **Projects**: Edit `src/components/Projects.tsx` to add your projects
- **Contact**: Edit `src/components/Contact.tsx` to update contact information

### Social Links

Update the links in Hero and Footer sections:
- GitHub
- LinkedIn
- Email

## 📝 Next Steps

- [ ] Add your personal information
- [ ] Add your real projects
- [ ] Set up email integration in the contact form
- [ ] Add project images
- [ ] Customize colors and themes
- [ ] Deploy (Vercel, Netlify, etc.)

## 📄 License

This project is open source and available for personal use.
