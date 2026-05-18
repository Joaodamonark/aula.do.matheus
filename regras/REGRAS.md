# Regras do App de Venda de Carros

## ⚙️ Stack Técnico
- **Frontend**: React (Mobile First)
- **Banco de Dados**: Firebase Firestore
- **Autenticação**: Firebase Authentication
- **Storage**: Firebase Storage (imagens dos carros)

## 1. Regras de Cadastro
- Todo usuário deve estar autenticado para listar e vender carros
- Email é obrigatório e deve ser único
- Senha deve ter no mínimo 8 caracteres
- CPF/CNPJ deve ser validado

## 2. Regras de Produto (Carro)
- Placa do carro é obrigatória e única
- Marca e modelo são obrigatórios
- Ano de fabricação deve ser válido (não pode ser futuro)
- Preço deve ser maior que zero
- Quilometragem deve ser não-negativa
- Apenas proprietário pode editar/deletar seu carro

## 3. Regras de Venda
- Vendedor e comprador devem ser usuários diferentes
- Carro deve estar disponível para venda
- Preço de venda não pode ser inferior a 50% do preço original
- Após venda, o carro muda de proprietário
- Histórico de vendas deve ser mantido

## 4. Regras de Avaliação
- Apenas compradores podem avaliar vendedores
- Avaliação deve ser entre 1 e 5 estrelas
- Comentário é opcional
- Avaliação não pode ser alterada após criada

## 5. Regras de Segurança
- Senhas devem ser criptografadas
- Dados sensíveis não devem ser armazenados em plain text
- Apenas o proprietário pode visualizar dados completos do carro
- Transações devem ser registradas com timestamp

## 6. Regras de Relatórios
- Vendedor pode visualizar suas vendas e ganhos
- Comprador pode visualizar seu histórico de compras
- Admin pode visualizar relatórios gerais da plataforma

## 7. Regras de Suspensão/Bloqueio
- Usuários com múltiplas avaliações negativas podem ser suspensos
- Anúncios fraudulentos resultam em bloqueio permanente
- Atividade suspeita pode resultar em revisão manual

## 8. Regras do Firebase/Banco de Dados
- Todas as credenciais do Firebase devem estar em variáveis de ambiente (.env)
- Senhas são salvas com hash automático pelo Firebase Authentication
- Imagens dos carros são armazenadas no Firebase Storage com limite de 5MB por imagem
- Máximo 10 imagens por carro
- Dados sensíveis (CPF) são criptografados antes de salvar no Firestore
- Sincronização em tempo real deve ser usada apenas para dados não-sensíveis
- Backups automáticos do Firestore devem ser configurados
- Índices do Firestore devem ser criados para consultas complexas

## 9. Regras de Acesso ao Firestore
- Usuários podem ler apenas seus próprios dados pessoais
- Carros podem ser lidos publicamente (sem autenticação)
- Histórico de vendas é privado entre vendedor e comprador
- Avaliações são públicas, mas identificam compradores
- Apenas proprietário pode editar/deletar seu próprio carro
- Admin (se houver) pode acessar qualquer dado para moderação

