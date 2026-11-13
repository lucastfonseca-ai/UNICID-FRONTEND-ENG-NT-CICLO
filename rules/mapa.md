# Arquitetura de informação do site Ciclo

Este documento organiza as dez páginas previstas no [escopo](./escopo.md), considerando seus temas, os arquivos existentes e os caminhos de navegação. A navegação principal deve permitir acesso direto a todas as páginas, sem exigir que a pessoa percorra uma sequência.

## 1. Mapa do site

```text
Ciclo — Transformando escolhas em impacto
│
├── Home — index.html
│   ├── Apresentação do propósito e slogan
│   ├── Recicle → Sobre — sobre.html
│   ├── Reutilize → Projetos — projetos.html
│   └── Transforme → Impacto — impacto.html
│
├── Sobre — sobre.html
│   └── Contexto do projeto e sustentabilidade
│
├── Projetos — projetos.html
│   └── Iniciativas e práticas sustentáveis
│
├── Impacto — impacto.html
│   └── Impactos ambientais e sociais
│
├── Acessibilidade — acessibilidade.html
│   └── Recursos e orientações de acessibilidade
│
├── Galeria — galeria.html
│   └── Conteúdo visual relacionado ao Ciclo
│
├── Mídia — midia.html
│   └── Vídeos, áudios e outros materiais
│
├── Notícias — noticias.html
│   └── Notícias e atualidades sobre sustentabilidade
│
├── Contato — contato.html
│   └── Formulário: nome, e-mail, assunto e mensagem
│
└── Hospedagem — orcamento_hospedagem.html
    └── Informações e orçamento de hospedagem
```

**Navegação global:** todas as páginas devem oferecer links para as dez páginas principais, indicar visualmente e com `aria-current="page"` a página atual e permitir retorno à Home pelo logotipo ou pelo link “Home”. O conteúdo da Home também cria atalhos para Sobre, Projetos e Impacto.

## 2. Wireframe textual — `index.html`

```text
┌────────────────────────────────────────────────────────────┐
│ LINK DE ACESSO: “Pular para o conteúdo principal”           │
│ (visível ao receber foco pelo teclado)                      │
├────────────────────────────────────────────────────────────┤
│ CONTROLES DE ACESSIBILIDADE                                │
│ Botão para abrir opções: texto, contraste e tema            │
│ Atalho de teclado e ferramenta VLibras                      │
├────────────────────────────────────────────────────────────┤
│ CABEÇALHO / NAVEGAÇÃO PRINCIPAL                             │
│ [Logo Ciclo → Home] [Home] [Sobre] [Projetos] [Impacto]     │
│ [Acessibilidade] [Galeria] [Mídia] [Notícias] [Contato]     │
│ [Hospedagem]                                                 │
├────────────────────────────────────────────────────────────┤
│ CONTEÚDO PRINCIPAL                                          │
│                                                            │
│ HERO                                                        │
│ Título: “Bem-vindos ao Ciclo”                               │
│ Slogan: “Transformando escolhas em impacto.”                │
│ Texto introdutório sobre futuro consciente e sustentável    │
│                                                            │
│ ATALHOS TEMÁTICOS (cards clicáveis)                         │
│ ┌────────────────┐ ┌────────────────┐ ┌─────────────────┐ │
│ │ Recicle        │ │ Reutilize      │ │ Transforme      │ │
│ │ Síntese sobre  │ │ Síntese sobre  │ │ Síntese sobre   │ │
│ │ descarte certo │ │ reaproveitar   │ │ impacto social  │ │
│ │ → Sobre        │ │ → Projetos     │ │ → Impacto       │ │
│ └────────────────┘ └────────────────┘ └─────────────────┘ │
├────────────────────────────────────────────────────────────┤
│ RODAPÉ                                                     │
│ Créditos e direitos autorais                                │
├────────────────────────────────────────────────────────────┤
└────────────────────────────────────────────────────────────┘
```

Em telas estreitas, os links do menu e os cards devem reorganizar-se sem exigir rolagem horizontal. Os controles de acessibilidade precisam continuar localizáveis e utilizáveis por toque e teclado.

## 3. Sugestões de navegação acessível por teclado

- Use `Tab` para avançar e `Shift+Tab` para voltar entre links, botões e campos. A ordem de foco deve acompanhar a ordem visual e de leitura da página.
- Mantenha um link “Pular para o conteúdo principal” como primeiro foco da página. Coloque-o no início da ordem do documento; ao ativá-lo, leve a navegação ao `<main>` identificado.
- Garanta foco claramente visível em todos os elementos interativos, com contraste suficiente contra o fundo. Não remova o contorno padrão sem substituí-lo por um indicador perceptível.
- Use `Enter` para ativar links e botões; use `Espaço` também nos botões. Evite elementos clicáveis implementados apenas com `<div>` ou `<span>`.
- No menu, use links HTML nativos, um rótulo de navegação (`aria-label`) e `aria-current="page"` no link da página atual. Em telas pequenas, se o menu for recolhido, seu botão deve informar o estado com `aria-expanded` e controlar o painel com `aria-controls`.
- Para o painel de acessibilidade, permita abrir e fechar pelo teclado, fechar com `Escape` e devolver o foco ao botão que o abriu. Ao abrir, leve o foco ao painel ou à primeira opção; não prenda o foco se o painel não for um diálogo modal.
- No formulário de contato, associe cada campo a um `<label>`, indique campos obrigatórios em texto, associe erros ao campo com `aria-describedby` e anuncie mensagens de validação sem depender apenas de cor.
- Preserve a operação com zoom e ampliação de texto: conteúdo deve refluir, controles não devem ficar cortados e páginas não devem exigir rolagem horizontal para leitura comum.
- Respeite `prefers-reduced-motion`, evitando animações e rolagens suaves quando a pessoa solicitar redução de movimento.
- Teste cada página apenas com teclado: percorra do início ao fim, confira todos os controles, a ordem de foco, a indicação da página atual e se menus e painéis podem ser fechados sem mouse.