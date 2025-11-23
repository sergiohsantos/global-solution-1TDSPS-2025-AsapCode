# 🚀 AsapCode Platform – Frontend  
Guia Técnico e Informativo  
*(Documentação oficial para avaliação FIAP – GS)*

## 📘 1. Descrição Geral do Projeto
A **AsapCode Platform** é uma aplicação frontend completa desenvolvida para demonstrar como um **Internal Developer Portal (IDP)** pode centralizar operações cloud, provisionar recursos e unificar informações.

Funcionalidades:
- Provisionamento real de **EC2** (FastAPI + AWS)
- Criação de recursos mockados (**EKS, IAM, RDS, S3**)
- Dashboard central com recursos reais + mockados
- Páginas institucionais (Sobre, Integrantes, Contato, FAQ)
- Totalmente em HTML, CSS e JS puro

## 🧠 2. Objetivo e Problema Resolvido
### Objetivo
Criar uma plataforma simples e funcional para centralizar operações AWS e oferecer um catálogo integrado.

### Problema resolvido
Ferramentas cloud estão espalhadas. A AsapCode centraliza tudo, melhora fluxo operacional e demonstra um portal corporativo realista.

## 🧩 3. Tecnologias Utilizadas
- HTML5  
- CSS3  
- JavaScript ES6+  
- FastAPI (backend real para EC2)  
- AWS EC2 real  
- Simulações via LocalStorage  

## 👨‍💻 4. Integrantes do Grupo

### 👤 Integrante 1  
- **Nome:** Sérgio Henrique
- **RM:** 567254
- **Turma:** 1TDSPS
- **LinkedIn:** https://www.linkedin.com/in/sergiohenriquessantos/
- **GitHub:** https://github.com/sergiohsantos
- **Foto:** ![Foto](assets/team/sergio.jpg)

### 👤 Integrante 2  
- **Nome:** Andrews Henrique
- **RM:** 568405
- **Turma:** 1TDSPS
- **LinkedIn:** https://www.linkedin.com/in/andrew-henrique-89397a251/
- **GitHub:** https://github.com/AHKSouza
- **Foto:** ![Foto](assets/team/andrew.jpg)

### 👤 Integrante 3  
- **Nome:** Icaro Nascimento
- **RM:** 567386
- **Turma:** 1TDSPS
- **LinkedIn:** https://www.linkedin.com/in/icaronascimento-/
- **GitHub:** https://github.com/IcaroNscS
- **Foto:** ![Foto](assets/team/icaro.jpg)

*(Continue conforme necessário.)*

## 🏛️ 5. Estrutura do Projeto
```
AsapCode_Platform/
│── index.html
│── pages/
│   ├── ec2.html
│   ├── eks.html
│   ├── s3.html
│   ├── iam.html
│   ├── rds.html
│   ├── faq.html
│   ├── history.html
│   ├── contato.html
│   ├── sobre.html
│   ├── solution-01.html
│   ├── solution-02.html
│   └── integrantes.html
│
├── js/
│   ├── ec2.js
│   ├── faq.js
│   ├── integrantes.js
│   ├── mock-resources.js
│   ├── dashboard.js
│   ├── history.js
│   └── menu.js
│
├── css/
│   ├── style.css
│   ├── integrantes.css
│   └── menu-responsive.css
│
└── assets/
│   └── team/
│       ├── andrew.jpg
│       ├── icaro.jpg
│       ├── sergio.jpg
│       └── members.json
```


## 🔧 7. Como executar o projeto
### 1. Clonar:
```
git clone https://github.com/sergiohsantos/global-solution-1TDSPS-2025-AsapCode.git
```

### 2. Executar frontend:
```
npx serve .
```

### 3. Executar backend:
```
uvicorn main:app --reload --port 8000
```

## 🔌 8. Como funciona o fluxo EC2
- POST para provisionamento
- Backend grava SQLite
- GET `/api/status/<id>`
- Tela EC2 exibe atualização automática

## 📦 9. Link do GitHub  
**Repositório Oficial:** https://github.com/sergiohsantos/global-solution-1TDSPS-2025-AsapCode

## 🏁 Status do Projeto
✔ 100% funcional  
✔ Dashboard unificado  
✔ Mocks completos  
✔ EC2 real  
✔ Pronto para apresentação FIAP  
