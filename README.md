# Lista de Mercado

Uma lista de compras simples em HTML, CSS e JavaScript com suporte a:

- Adicionar itens personalizados
- Pesquisa de itens existentes
- Preço e quantidade por item
- Marcações de itens concluídos
- Cálculo automático do total
- Persistência no `localStorage` para manter os dados após atualizar a página
- Botão para limpar a lista e reiniciar os valores

## Como usar

1. Abra `index.html` no navegador.
2. Adicione um novo item usando o campo "Adicionar item".
3. Informe preço e quantidade nos campos de cada item.
4. Marque o item para adicioná-lo ao total.
5. Use a busca para filtrar itens existentes.
6. Clique em "Limpar tudo" para resetar a lista e apagar os dados salvos.

## Detalhes técnicos

- `index.html` — estrutura da aplicação
- `style.css` — estilo visual e layout
- `script.js` — lógica da lista, cálculo do total e persistência em `localStorage`

## Observações

- O total não é salvo diretamente; ele é recalculado ao carregar a lista a partir dos valores salvos.
- Se não houver dados no `localStorage`, a lista padrão de itens é carregada automaticamente.
- Uso pessoal: esta lista foi criada para as compras do dia a dia, com itens e valores personalizados para uso próprio.
