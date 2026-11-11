import type { FlowingMenuItem } from './components/reactbits/FlowingMenu';

export type Lang = 'pt' | 'en';

export const EMAIL = 'mateus.biancardi.23@gmail.com';
export const GITHUB = 'https://github.com/mateusbiancardi';
export const LINKEDIN = 'https://www.linkedin.com/in/mateus-biancardi-da-silva-227840252/';

export interface Job {
  when: string;
  role: string;
  where: string;
  what: string;
  /** conquistas com número, mostradas como lista embaixo da descrição */
  highlights?: string[];
  stack: string;
}

export interface Stat {
  value: number;
  /** texto pequeno, em laranja, depois do número (ex.: "mil+") */
  suffix: string;
  label: string;
}

export interface Fact {
  term: string;
  detail: string;
}

export interface Content {
  /** valor do atributo lang do <html> */
  htmlLang: string;
  description: string;
  /** cargo, usado no título da aba */
  role: string;
  language: string;
  sections: string;
  nav: { work: string; projects: string; contact: string };
  loader: string;
  intro: string;
  cue: string;
  place: string;
  photo: string;
  aboutLabel: string;
  about: string;
  /** números do "sobre": contam de zero até o valor quando entram na tela */
  stats: Stat[];
  /** linhas de detalhe do "sobre": stack, formação, idiomas */
  facts: Fact[];
  workLabel: string;
  jobs: Job[];
  projectsLabel: string;
  seeAll: string;
  /** "meta" é a descrição, sempre visível; "marquee" é a stack, que corre na faixa laranja no hover */
  projects: FlowingMenuItem[];
  contactLabel: string;
  /** chamada do contato, uma entrada por linha */
  shout: string[];
  backToTop: string;
}

export const CONTENT: Record<Lang, Content> = {
  pt: {
    htmlLang: 'pt-BR',
    description:
      'Mateus Biancardi da Silva, desenvolvedor full stack em Vitória, ES. React, TypeScript, Java com Spring Boot e PostgreSQL.',
    role: 'Desenvolvedor full stack',
    language: 'Idioma',
    sections: 'Seções',
    nav: { work: 'Trabalho', projects: 'Projetos', contact: 'Contato' },
    loader: 'Portfolio, 2026',
    intro: 'Desenvolvedor full stack. React, Java e PostgreSQL em produção.',
    cue: 'Role',
    place: 'Vitória, ES',
    photo: 'Sua foto aqui',
    aboutLabel: 'Sobre',
    about:
      'Faço software para educação. Na GAMA Ensino, construo a plataforma de simulados e redações do ENEM, com correção por IA, e mantenho o app das redes municipais de ensino. Antes, front-end na CT Junior, incluindo um sistema com a Petrobras.',
    stats: [
      { value: 24, suffix: 'mil+', label: 'usuários ativos nos sistemas' },
      { value: 78, suffix: '', label: 'escolas no app mobile' },
      { value: 16, suffix: '', label: 'instituições nos simulados' },
      { value: 3, suffix: '+', label: 'anos em produção' }
    ],
    facts: [
      { term: 'Front-end', detail: 'React, Next.js, TypeScript, Angular, Ionic' },
      { term: 'Back-end', detail: 'Java 17, Spring Boot, Node.js, APIs REST' },
      { term: 'Dados e infra', detail: 'PostgreSQL, ETL em Python, AWS, Docker' },
      {
        term: 'IA',
        detail:
          'LLM em produção (correção de redação, mentor do fórum) · Claude Code, Gemini CLI, OpenRouter'
      },
      { term: 'Formação', detail: 'Ciência da Computação, UFES (cursando) · Técnico em Automação Industrial, IFES' },
      { term: 'Idiomas', detail: 'Português nativo, inglês avançado' }
    ],
    workLabel: 'Trabalho',
    jobs: [
      {
        when: '2025 — hoje',
        role: 'Desenvolvedor full stack',
        where: 'GAMA Ensino',
        what: 'Simulados para 16 instituições, correção de redação com IA e app mobile com 15 mil usuários.',
        highlights: [
          'Mentor com IA no fórum dos alunos, com registro de uso, avaliação e painel de moderação.',
          '309 testes cobrindo a gravação de respostas do teste modular.'
        ],
        stack: 'React · TypeScript · Java · Spring Boot · PostgreSQL'
      },
      {
        when: '2024 — 2025',
        role: 'Estágio em growth',
        where: 'GAMA Ensino',
        what: 'Front-end e dados para o time de growth.',
        highlights: [
          'Sites institucionais e landing pages em Next.js e Tailwind para campanhas de aquisição.',
          'Dashboards de crescimento e análise de funil em SQL, usados em decisões de produto e marketing.'
        ],
        stack: 'Next.js · Tailwind · SQL'
      },
      {
        when: '2022 — 2024',
        role: 'Consultor de tecnologia',
        where: 'CT Junior',
        what: 'Empresa júnior: software para clientes externos, como voluntário.',
        highlights: [
          'Front-end em React de dois dos maiores projetos da empresa, incluindo o Redes de Cidadania, com a Petrobras.',
          'Líder técnico em três projetos: distribuição de tarefas, code review e arquitetura de front-end.'
        ],
        stack: 'React'
      }
    ],
    projectsLabel: 'Projetos',
    seeAll: 'Ver tudo no GitHub ↗',
    projects: [
      {
        text: 'Finnova',
        link: `${GITHUB}/finnova-frontend`,
        meta: 'Controle financeiro pessoal',
        marquee: 'Next.js · Fastify · Prisma'
      },
      {
        text: 'Dishd',
        link: `${GITHUB}/dishd`,
        meta: 'Diário social de restaurantes. Projeto em equipe na UFES.',
        marquee: 'Next.js · Spring Boot · PostgreSQL'
      },
      {
        text: 'Arena Medieval',
        link: `${GITHUB}/multiplayer-game`,
        meta: 'Jogo 2D em rede para dois jogadores',
        marquee: 'Python · UDP · servidor autoritativo'
      }
    ],
    contactLabel: 'Contato',
    shout: ['Vamos', 'conversar.'],
    backToTop: 'Voltar ao topo ↑'
  },

  en: {
    htmlLang: 'en',
    description:
      'Mateus Biancardi da Silva, full stack developer based in Vitória, Brazil. React, TypeScript, Java with Spring Boot and PostgreSQL.',
    role: 'Full stack developer',
    language: 'Language',
    sections: 'Sections',
    nav: { work: 'Work', projects: 'Projects', contact: 'Contact' },
    loader: 'Portfolio, 2026',
    intro: 'Full stack developer. React, Java and PostgreSQL in production.',
    cue: 'Scroll',
    place: 'Vitória, Brazil',
    photo: 'Your photo here',
    aboutLabel: 'About',
    about:
      "Building education software. At GAMA Ensino, that means the mock exam and essay platform for ENEM, Brazil's national university entrance exam, with AI grading, plus the mobile app used by municipal school networks. Before that, front-end work at CT Junior, including a system built with Petrobras.",
    stats: [
      { value: 24, suffix: 'k+', label: 'active users across our platforms' },
      { value: 78, suffix: '', label: 'schools using the mobile app' },
      { value: 16, suffix: '', label: 'institutions using the mock exam platform' },
      { value: 3, suffix: '+', label: 'years shipping to production' }
    ],
    facts: [
      { term: 'Front end', detail: 'React, Next.js, TypeScript, Angular, Ionic' },
      { term: 'Back end', detail: 'Java 17, Spring Boot, Node.js, REST APIs' },
      { term: 'Data & infra', detail: 'PostgreSQL, ETL in Python, AWS, Docker' },
      {
        term: 'AI',
        detail:
          'LLMs in production (essay grading, forum mentor) · Claude Code, Gemini CLI, OpenRouter'
      },
      { term: 'Education', detail: 'B.Sc. in Computer Science, UFES (in progress) · Technical degree in Industrial Automation, IFES' },
      { term: 'Languages', detail: 'Native Portuguese, advanced English' }
    ],
    workLabel: 'Work',
    jobs: [
      {
        when: '2025 — now',
        role: 'Full stack developer',
        where: 'GAMA Ensino',
        what: 'Mock exams for 16 institutions, AI essay grading and a mobile app with 15,000 users.',
        highlights: [
          'AI mentor in the student forum, with usage logging, student ratings and a moderation panel.',
          '309 tests covering how answers are saved in the modular exam.'
        ],
        stack: 'React · TypeScript · Java · Spring Boot · PostgreSQL'
      },
      {
        when: '2024 — 2025',
        role: 'Growth intern',
        where: 'GAMA Ensino',
        what: 'Front end and data for the growth team.',
        highlights: [
          'Marketing sites and landing pages in Next.js and Tailwind for acquisition campaigns.',
          'Growth dashboards and funnel analysis in SQL that informed product and marketing decisions.'
        ],
        stack: 'Next.js · Tailwind · SQL'
      },
      {
        when: '2022 — 2024',
        role: 'Technology consultant',
        where: 'CT Junior',
        what: 'Student-run consultancy: software for external clients, as a volunteer.',
        highlights: [
          "React front end for two of the company's largest projects, including Redes de Cidadania, built with Petrobras.",
          'Tech lead on three projects: task planning, code review and front-end architecture.'
        ],
        stack: 'React'
      }
    ],
    projectsLabel: 'Projects',
    seeAll: 'See all on GitHub ↗',
    projects: [
      {
        text: 'Finnova',
        link: `${GITHUB}/finnova-frontend`,
        meta: 'Personal finance tracker',
        marquee: 'Next.js · Fastify · Prisma'
      },
      {
        text: 'Dishd',
        link: `${GITHUB}/dishd`,
        meta: 'Social diary for restaurants. Team project at UFES.',
        marquee: 'Next.js · Spring Boot · PostgreSQL'
      },
      {
        text: 'Arena Medieval',
        link: `${GITHUB}/multiplayer-game`,
        meta: 'Online 2D game for two players',
        marquee: 'Python · UDP · authoritative server'
      }
    ],
    contactLabel: 'Contact',
    shout: ["Let's", 'talk.'],
    backToTop: 'Back to top ↑'
  }
};
