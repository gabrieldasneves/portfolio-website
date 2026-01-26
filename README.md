# Portfólio Website

Site de portfólio pessoal construído com Next.js, Tailwind CSS, Shadcn UI e componentes animados do ReactBits.

## Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn UI** - Componentes UI
- **Three.js** - Gráficos 3D para animações
- **ReactBits** - Componentes animados

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura

```
├── app/
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página inicial
│   └── globals.css     # Estilos globais
├── components/
│   ├── ghost-cursor.tsx # Componente Ghost Cursor do ReactBits
│   └── hero.tsx        # Seção Hero
└── public/             # Arquivos estáticos
```

## Componentes

### Ghost Cursor

Componente de cursor animado com efeito de trail, baseado no ReactBits. Renderiza um trail suave que segue o movimento do mouse.

### Hero

Seção hero que cobre a tela inteira com o efeito ghost cursor de fundo.
