# Tasklife

Aplicativo web de produtividade que transforma o gerenciamento de tarefas diárias em uma experiência gamificada: um personagem reage à consistência do usuário ganhando ou perdendo HP, e um calendário visual traduz o histórico de desempenho em um panorama fácil de interpretar.

## Funcionalidades

- **Gerenciamento de tarefas** — criação, edição e conclusão de tarefas diárias, com acompanhamento do progresso em tempo real através de uma barra percentual.
- **Sistema de personagem (HP)** — ao final de cada dia, o desempenho do usuário é convertido em variação de HP, com estados visuais que vão de 😊 Saudável a ☠️ Derrotado, incluindo uma mecânica de recuperação.
- **Calendário de consistência** — cada dia é classificado e colorido de acordo com o percentual de tarefas concluídas, oferecendo uma visão histórica do progresso ao longo dos meses.
- **Tela inicial dinâmica** — saudação adaptada ao horário do dispositivo e um resumo visual do mês atual logo na entrada do app.

## Destaques técnicos

- **Persistência local orientada a dados** — toda a camada de estado (tarefas, histórico, personagem) é modelada e versionada em `localStorage`, com funções centralizadas de leitura/escrita em `utils.js`, reutilizadas por todas as páginas.
- **Lógica de regras de negócio isolada** — cálculo de variação de HP, classificação de dias do calendário e cálculo de sequência (streak) são funções puras, testáveis independentemente da interface.
- **Tratamento cuidadoso de datas** — formatação de datas em fuso horário local (em vez de UTC), evitando bugs de virada de dia para usuários fora do UTC.
- **Componentização de UI reaproveitada** — a construção da grade do calendário é compartilhada entre a tela inicial (mini calendário) e a página de calendário completa, a partir de uma única função.

## Estrutura do projeto

```
├── index.html / index.js           → Tela inicial
├── dashboard.html / dashboard.js   → Lista de tarefas do dia
├── finish.html / finish.js         → Tela de resultado do dia
├── calendario.html / calendario.js → Calendário de consistência completo
├── utils.js                        → Funções compartilhadas (histórico, personagem, calendário, datas)
└── style.css                       → Estilos de todas as telas

## Tecnologias

- HTML5
- CSS3
- JavaScript