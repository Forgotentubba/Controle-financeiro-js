# 💰 Controle Financeiro

Aplicação web simples e eficiente para gerenciamento de finanças pessoais. Registre entradas e saídas, visualize seu saldo e acompanhe um resumo mensal em gráfico.

---

## 📋 Funcionalidades

- **Adicionar transações** — registre entradas e saídas com descrição, valor e data
- **Resumo financeiro** — visualize o total de entradas, saídas e saldo atual
- **Gráfico mensal** — acompanhe o desempenho do mês corrente em um gráfico de barras
- **Histórico de transações** — lista completa com opção de excluir registros
- **Persistência de dados** — os dados são salvos automaticamente no `localStorage` do navegador

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| HTML5 | Estrutura da aplicação |
| CSS3 | Estilização e layout responsivo |
| JavaScript (ES6+) | Lógica da aplicação |
| [Chart.js](https://www.chartjs.org/) | Renderização do gráfico mensal |
| localStorage | Persistência de dados no navegador |

---

## 📱 Responsividade

A interface é totalmente responsiva e se adapta a diferentes tamanhos de tela — desktop, tablet e mobile.

---

## ⚙️ Funcionamento Interno

- As transações são armazenadas como um array de objetos no `localStorage`
- Cada transação contém: `id`, `descricao`, `valor`, `data` e `tipo` (`entrada` ou `saida`)
- O gráfico é atualizado automaticamente, exibindo apenas os dados do **mês atual**
- O saldo é exibido em **verde** quando positivo e em **vermelho** quando negativo

---

## 📄 Licença

© 2025 Todos os direitos reservados à **Carlos Correia**.
<img width="1146" height="863" alt="Captura de tela 2026-02-20 171401" src="https://github.com/user-attachments/assets/c5ca2c48-0f2f-45d0-acbe-033d6e30b38f" />

