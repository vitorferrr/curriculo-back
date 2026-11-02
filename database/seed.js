import sequelize from "../src/config/database.js";
import {
  Profile,
  AcademicExperience,
  ProfessionalExperience,
  Project,
  Technology,
} from "../src/models/index.js";

const technologies = [
  { name: "JavaScript", category: "Linguagem" },
  { name: "TypeScript", category: "Linguagem" },
  { name: "Node.js", category: "Back-end" },
  { name: "Express", category: "Back-end" },
  { name: "Sequelize", category: "Back-end" },
  { name: "PostgreSQL", category: "Banco de dados" },
  { name: "React", category: "Front-end" },
  { name: "Next.js", category: "Front-end" },
  { name: "CSS", category: "Front-end" },
  { name: "React Native", category: "Mobile" },
  { name: "Expo", category: "Mobile" },
  { name: "Figma", category: "Design" },
];

const profiles = [
  {
    name: "Vitor Ferreira",
    title: "Desenvolvedor Full Stack",
    email: "vitorferr1412@gmail.com",
    phone: "(81) 99907-4390",
    location: "Recife - PE",
    summary:
      "Desenvolvedor Fullstack com conhecimento em Java e Python com ênfase em IA.",
    photoUrl: "https://github.com/vitorferrr.png",
    githubUrl: "https://github.com/vitorferrr",
    linkedinUrl: "https://www.linkedin.com/in/vitorsantosferreira/",
    academicExperiences: [
      {
        institution: "Universidade Católica de Pernambuco",
        course: "Sistemas Para Internet",
        degree: "Técnologo",
        startDate: "2025-02-15",
        endDate: null,
        description:
          "Disciplinas de desenvolvimento web, mobile, banco de dados e aplicações orientadas a serviços.",
      },
    ],
    professionalExperiences: [
      {
        company: "CIA - UNICAP",
        position: "Estagiário Fullstack com ênfase em IA",
        startDate: "2024-09-21", // TROCAR
        endDate: null,
        description: "Atualmente desenvolvendo aplicações fullstack com Python e Angular, e auxiliando na implementação de IA para escalar/acelerar processos.", // TROCAR
      },
    ],
    projects: [
      {
        name: "Currículo API",
        description:
          "API REST com Express, Sequelize e PostgreSQL (NeonDB) para gerenciar currículos, publicada no Vercel.",
        repositoryUrl: "https://github.com/vitorferrr/curriculo-back",
        technologies: ["JavaScript", "Node.js", "Express", "Sequelize", "PostgreSQL"],
      },
      {
        name: "Currículo App",
        description:
          "Aplicativo em React Native + Expo que exibe o currículo consumindo a API e gera um PDF para compartilhar.",
        repositoryUrl: "https://github.com/vitorferrr/curriculo-front",
        technologies: ["TypeScript", "React Native", "Expo"],
      },
    ],
  },
  {
    name: "Ana Souza",
    title: "Desenvolvedora Front-end",
    email: "ana.souza@exemplo.com",
    phone: "(11) 98765-4321",
    location: "São Paulo - SP",
    summary:
      "Desenvolvedora front-end com 4 anos de experiência criando interfaces acessíveis e responsivas. Foco em React, design systems e performance.",
    photoUrl: "https://i.pravatar.cc/300?img=47",
    githubUrl: "https://github.com/anasouza-exemplo",
    linkedinUrl: "https://www.linkedin.com/in/anasouza-exemplo",
    academicExperiences: [
      {
        institution: "Universidade de São Paulo",
        course: "Ciência da Computação",
        degree: "Bacharelado",
        startDate: "2016-02-01",
        endDate: "2019-12-15",
        description: "TCC sobre acessibilidade em aplicações web.",
      },
      {
        institution: "Alura",
        course: "Formação React com TypeScript",
        degree: "Curso livre",
        startDate: "2020-03-01",
        endDate: "2020-08-30",
        description: "Componentização, hooks, testes e boas práticas com TypeScript.",
      },
    ],
    professionalExperiences: [
      {
        company: "TechNova Soluções",
        position: "Desenvolvedora Front-end Pleno",
        startDate: "2022-03-01",
        endDate: null,
        description:
          "Responsável pelo design system da empresa e pela migração de páginas legadas para React.",
      },
      {
        company: "Agência Pixel",
        position: "Desenvolvedora Front-end Júnior",
        startDate: "2020-01-15",
        endDate: "2022-02-28",
        description: "Criação de sites institucionais e landing pages responsivas para clientes.",
      },
    ],
    projects: [
      {
        name: "Design System Aurora",
        description:
          "Biblioteca de componentes React acessíveis usada em todos os produtos da TechNova.",
        repositoryUrl: "https://github.com/anasouza-exemplo/aurora",
        technologies: ["TypeScript", "React", "CSS", "Figma"],
      },
      {
        name: "Portfólio Pessoal",
        description: "Site de portfólio feito com Next.js, com blog e modo escuro.",
        repositoryUrl: "https://github.com/anasouza-exemplo/portfolio",
        demoUrl: "https://anasouza-exemplo.vercel.app",
        technologies: ["TypeScript", "Next.js", "React", "CSS"],
      },
    ],
  },
];

const seed = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ force: true });
    console.log("Tabelas recriadas.");

    await sequelize.transaction(async (transaction) => {
      const createdTechnologies = await Technology.bulkCreate(technologies, { transaction });
      const technologyByName = new Map(createdTechnologies.map((t) => [t.name, t]));

      for (const { projects, ...profileData } of profiles) {
        const profile = await Profile.create(profileData, {
          include: [
            { model: AcademicExperience, as: "academicExperiences" },
            { model: ProfessionalExperience, as: "professionalExperiences" },
          ],
          transaction,
        });

        for (const { technologies: techNames, ...projectData } of projects) {
          const project = await Project.create(
            { ...projectData, profileId: profile.id },
            { transaction },
          );

          const projectTechnologies = techNames.map((name) => {
            const technology = technologyByName.get(name);
            if (!technology) throw new Error(`Tecnologia "${name}" não existe no seed.`);
            return technology;
          });

          await project.setTechnologies(projectTechnologies, { transaction });
        }

        console.log(`Currículo cadastrado: ${profile.name} (id: ${profile.id})`);
      }
    });

    console.log("Seed concluído com sucesso!");
  } catch (error) {
    console.error("Erro ao executar o seed:", error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

seed();