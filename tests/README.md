# Testes com Selenium

### Para realizar os testes você deve:

- Ter o Google Chrome instalado
- Instalar a [extensão do Selenium IDE](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd)
- Abrir a extensão, e clicar em *Open an existing project*, e escolher um dos arquivos de teste `.side`
- Clicar em `Run all tests`

### Descrição dos testes:

#### `familia1pessoa_precadastro_aprovacao_acoes_atendimento_promocao.side`

 0. Variáveis
 1. Gerador de pessoas - membro principal
 2. Login no app
 3. Pré-cadastro de família de 1 membro
 4. Aprovação do Pré-cadastro
 5. Adicionando ações do assistente e do assistido
 6. Fazendo atendimento
 7. Conferindo histórico de atendimentos
 8. Promovendo família


#### `familia2pessoas_precadastro_reprovacao.side`

 0. Variáveis
 1. Gerador de pessoas - membro principal
 2. Gerador de pessoas - membro 2 (dependente)
 3. Login no app
 4. Pré-cadastro de família de 2 membros
 5. Reprovação do Pré-cadastro
 
 
 #### `familia3pessoas_precadastro_aprovacao_acoes_atendimento_suspensao.side`

 0. Variáveis
 1. Gerador de pessoas - membro principal
 2. Gerador de pessoas - membro 2 (dependente)
 3. Gerador de pessoas - membro 3 (dependente)
 4. Login no app
 5. Pré-cadastro de família de 3 membros
 6. Aprovação do Pré-cadastro
 7. Adicionando ações do assistente e do assistido
 8. Fazendo atendimento
 9. Conferindo histórico de atendimentos
 10. Suspendendo família
 
 
 **OBS:**
  
  - Variáveis: Seta algumas variáveis que serão utilizadas ao longo do teste
  - Gerador de pessoas: Copia os dados gerados no site [Gerador de documentos de pessoas (Nome, RG, CPF, CEP, Endereço, etc)](https://www.4devs.com.br/gerador_de_pessoas)
 