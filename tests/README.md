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
 2. Pré-cadastro de família de 1 membro
 3. Aprovação do Pré-cadastro
 4. Adicionando ações do assistente e do assistido
 5. Fazendo atendimento
 6. Conferindo histórico de atendimentos
 7. Promovendo família


#### `familia2pessoas_precadastro_reprovacao.side`

 0. Variáveis
 1. Gerador de pessoas - membro principal
 2. Gerador de pessoas - membro 2 (dependente)
 3. Pré-cadastro de família de 2 membros
 4. Reprovação do Pré-cadastro
 
 
 #### `familia3pessoas_precadastro_aprovacao_acoes_atendimento_suspensao.side`

 0. Variáveis
 1. Gerador de pessoas - membro principal
 2. Gerador de pessoas - membro 2 (dependente)
 3. Gerador de pessoas - membro 3 (dependente)
 4. Pré-cadastro de família de 3 membros
 5. Aprovação do Pré-cadastro
 6. Adicionando ações do assistente e do assistido
 7. Fazendo atendimento
 8. Conferindo histórico de atendimentos
 9. Suspendendo família
 
 
 **OBS:**
  
  - Variáveis: Seta algumas variáveis que serão utilizadas ao longo do teste
  - Gerador de pessoas: Copia os dados gerados no site [Gerador de documentos de pessoas (Nome, RG, CPF, CEP, Endereço, etc)](https://www.4devs.com.br/gerador_de_pessoas)
 