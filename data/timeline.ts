export interface TimelineStop {
  id: string;
  index: number;
  period: string;
  title: string;
  location: string;
  country: string;
  description: string;
  highlights: string[];
  coords: [number, number];
  zoom: number;
  image?: string;
  imageAlt?: string;
  links?: { label: string; url: string }[];
}

export const timelineStops: TimelineStop[] = [
  {
    id: "manaus",
    index: 1,
    period: "",
    title: "Born & raised",
    location: "Manaus",
    country: "Amazonas · Brazil",
    description:
      "Born and raised in Manaus, in the heart of the Amazon. Entered Manaus Military School (CMM) — a formative chapter of discipline and study.",
    highlights: [
      "Grew up in Manaus, Amazonas",
      "Entered Manaus Military School (CMM)",
    ],
    coords: [-3.119, -60.0217],
    zoom: 5,
    image: "/timeline/manaus-nasa.jpg",
    imageAlt:
      "NASA satellite photo of Manaus at the Rio Negro and Amazon confluence, surrounded by rainforest",
    links: [
      {
        label: "Manaus Military School",
        url: "https://cmm.eb.mil.br/",
      },
    ],
  },
  {
    id: "ufc",
    index: 2,
    period: "University & early career",
    title: "Computer Engineering",
    location: "UFC · Fortaleza",
    country: "Ceará · Brazil",
    description:
      "Graduated in Computer Engineering at Universidade Federal do Ceará. Took part in the SACODE research project (a CubeSat nanosatellite) working with the Open-OBC onboard microcontroller. Built professional experience at Ambev as intern, analyst, and coordinator. In Fortaleza I also worked in full-stack development, shipping web applications end to end.",
    highlights: [
      "Graduated in Computer Engineering (UFC)",
      "SACODE CubeSat research project using Open-OBC",
      "Ambev — intern, analyst, then coordinator",
      "Full-stack development in Fortaleza",
    ],
    coords: [-3.7459, -38.574],
    zoom: 5,
    image: "/timeline/open-obc.jpg",
    imageAlt:
      "OpenOBC onboard computer board for CubeSat — Projeto CONASAT, LESC/UFC",
    links: [
      {
        label: "SACODE — G1",
        url: "https://g1.globo.com/ce/ceara/noticia/2019/04/08/primeiro-nanossatelite-do-norte-e-nordeste-e-desenvolvido-na-ufc-e-deve-ser-lancado.ghtml",
      },
      {
        label: "Open-OBC thesis (UFC)",
        url: "https://repositorio.ufc.br/ri/handle/riufc/22986",
      },
      {
        label: "Ambev",
        url: "https://www.ambev.com.br/",
      },
    ],
  },
  {
    id: "fayoum",
    index: 3,
    period: "Volunteer",
    title: "Volunteer in Egypt",
    location: "Fayoum",
    country: "Egypt",
    description:
      "Volunteer work in Fayoum, Egypt, through AIESEC teaching English to refugee children.",
    highlights: [
      "Volunteer English teacher for refugee children",
      "Based in Fayoum, Egypt",
      "Program with AIESEC",
    ],
    coords: [29.3084, 30.8428],
    zoom: 6,
    image: "/timeline/fayoum-memphis.jpg",
    imageAlt: "Street scene in Fayoum, Egypt — photo from Memphis Tours",
    links: [
      {
        label: "AIESEC",
        url: "https://aiesec.org/",
      },
    ],
  },
  {
    id: "saint-etienne",
    index: 4,
    period: "Internship",
    title: "Laboratoire Hubert Curien",
    location: "Saint-Étienne",
    country: "France",
    description:
      "Internship at Laboratoire Hubert Curien in Saint-Étienne building software abstraction layers over hardware. First professional chapter abroad: research lab work and French in daily life",
    highlights: [
      "Internship at Laboratoire Hubert Curien",
      "Software abstraction layers for hardware",
      "Research lab experience in France",
    ],
    coords: [45.4397, 4.3872],
    zoom: 6,
    image: "/timeline/saint-etienne.jpg",
    imageAlt:
      "Place Jean Jaurès and Église Saint-Charles in Saint-Étienne, France",
    links: [
      {
        label: "Laboratoire Hubert Curien",
        url: "https://laboratoirehubertcurien.univ-st-etienne.fr/en/index.html",
      },
    ],
  },
  {
    id: "japan",
    index: 5,
    period: "2023 — Present",
    title: "Building in Japan",
    location: "Tokyo",
    country: "Japan",
    description:
      "In Japan since 2023 — first at Menu Inc. as Software Engineer, then at Brastel Co. Software Engineer shipping AI-powered products",
    highlights: [
      "Brastel — Senior Software Engineer, AI Systems (06/2025–Present)",
      "Leading AI API gateway for customer support intent automation",
      "Built AI copilot browser extension end to end",
      "OpenAI APIs, RAG pipelines, prompt engineering & evaluation",
      "Stack: TypeScript, React (Vite + Tailwind), Nest.js, Jest",
      "Menu Inc. — Software Engineer (02/2023–06/2025)",
      "Mobile & web with React Native, Redux, Next.js",
      "Mentored engineers across Japan and Malaysia",
    ],
    coords: [36.2048, 138.2529],
    zoom: 5,
    image: "/timeline/tokyo-neon.jpg",
    imageAlt: "Neon streets of Tokyo at night",
    links: [
      {
        label: "Brastel",
        url: "https://www.brastel.com/",
      },
      {
        label: "menu",
        url: "https://corp.menu.jp/",
      },
    ],
  },
];
