---
description: HTML5 semântico e acessível no Ciclo
alwaysApply: false
---

# HTML semântico - Ciclo

## 1. Objetivo
Páginas semânticas, acessíveis e iguais ao index.html.

## 2. Contexto
Site feito por HTML5 + CSS3 puros, sem frameworks. Site em public/,
estilos em public/css/style.css (mobile-first).

## 3. Regras
- Sempre coloque o lang="pt-BR";
- Coloque sempre o <link rel="shortcut icon" href="image/icone.png"> no <head> da página;
- Mantenha sempre a <div class="logo"> do mesmo modo no <nav>;
- Copie <header>, <nav> com cada <div> e <a>, e <footer> do index.html;
- Toda <img> com alt descritivo;
- Tenha apenas um <h1>, mude o <h1 id="titulo"> no <header> para que tenha o nome da página específica;
- Evitar duplicação desnecessárias de estruturas;
- Utilizar textos descritivos em links e botões;
- Preservar o conteúdo existente ao realizar ajustes estruturais.

## 4. Exemplo
<nav class="navbar">
    <div class="logo">
        <img src="image/icone.png" alt="Logo do Site">
        <span>Ciclo</span>
    </div>
    <div class="nav-links">
        <a href="index.html"><b>Home</b></a>
        <a href="sobre.html"><b>Sobre</b></a>
        <a href="projetos.html"><b>Projetos</b></a>
        <a href="impacto.html"><b>Impacto</b></a>
        <a href="acessibilidade.html"><b>Acessibilidade</b></a>
        <a href="galeria.html"><b>Galeria</b></a>
        <a href="midia.html"><b>Mídia</b></a>
        <a href="noticias.html"><b>Notícias</b></a>
        <a href="contato.html"><b>Contato</b></a>
        <a href="orcamento_hospedagem.html"><b>Hospedagem</b></a>
    </div>
</nav>

<header>
    <h1 id="titulo">Nome da Página</h1>
    <h2 id="bordao"><b>"Tranformando Escolhas em Impacto."</b></h2>
</header>

## 5. Erros
- Não coloque informações que não tenham a ver com o tema do site;
- Não coloque informações repetitivas; 
- Não use CSS inline nem frameworks.