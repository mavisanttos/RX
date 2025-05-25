<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="assets/Inteli/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width="40%"></a>
</p>

# RX

## Inteli - Instituto de Tecnologia e Liderança 

## 👨‍🎓 Autora: 
- <a href="https://www.linkedin.com/in/maria-vit%C3%B3ria-dos-santos/">Maria Vitória dos Santos</a> 

## 👨‍🏫 Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/juliastateri/">Julia Stateri</a>
### Instrutores
- <a href="https://www.linkedin.com/in/bruna-mayer/">Bruna Mayer Costa</a>
- <a href="https://www.linkedin.com/in/cristiano-benites-ph-d-687647a8/">Cristiano da Silva Benites</a> 

## 📝 Descrição

&emsp; O RX é uma plataforma desenvolvida para otimizar o processo de reserva das salas de estudo no Inteli, conhecidas como “casinhas”. Criado para atender alunos, professores e funcionários, o sistema facilita a locação desses espaços de forma rápida e eficiente. Com uma interface simples e intuitiva, os usuários conseguem visualizar a disponibilidade das salas em tempo real e fazer reservas em blocos de uma hora. A plataforma permite editar ou cancelar agendamentos e envia notificações para lembrar os usuários de seus compromissos, reduzindo o número de faltas. <br>
&emsp; Entre os diferenciais, o RX também oferece um sistema de alertas para o caso de cancelamentos, permitindo que os usuários sejam avisados quando uma sala desejada estiver novamente disponível. Isso reduz a ociosidade e melhora o aproveitamento dos espaços. A plataforma também permite que o usuário escolha o horário desejado para a reserva, e, com base nessa seleção, as salas disponíveis para aquele horário específico são exibidas, garantindo um processo de reserva mais rápido e sem conflitos. <br>
&emsp; O RX contribui diretamente para um ambiente acadêmico mais organizado, otimizando recursos e promovendo produtividade entre os membros da comunidade Inteli. <br>

## 📝 Link de demonstração

_Coloque aqui o link para seu projeto publicado e link para vídeo de demonstração_

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

<b>config</b>: Contém as configurações do banco de dados (como a conexão com o Supabase) e outras variáveis de ambiente utilizadas no projeto.

<b>controllers</b>: Controladores da aplicação, responsáveis por processar as requisições recebidas pelas rotas, aplicar regras de negócio básicas e intermediar a comunicação com os modelos.

<b>models</b>: Modelos da aplicação, que representam a estrutura das entidades (como usuários e reservas) e fazem a interação direta com o banco de dados.

<b>routes</b>: Define todas as rotas da API RESTful, conectando URLs específicas aos métodos dos controllers.

<b>services</b>: Serviços reutilizáveis contendo regras de negócio mais complexas, validações e funções auxiliares que podem ser utilizadas por múltiplos controllers.

<b>assets</b>: Arquivos públicos como imagens, ícones, fontes e outros recursos estáticos.

<b>scripts</b>: Scripts JavaScript que podem ser utilizados no lado do cliente, como funções utilitárias para o front-end.

<b>styles</b>: Arquivos CSS usados para estilizar a interface da aplicação web.

<b>tests</b>: Contém os testes automatizados da aplicação utilizando o framework Jest.

<b>views</b>: Diretório opcional que pode conter templates HTML ou views server-side (não usado no momento atual, pois o projeto foca na API REST).

📄 Arquivos Importantes <br>

<b>.gitignore</b>: Arquivo que especifica quais arquivos/pastas devem ser ignorados pelo Git (ex: node_modules, .env, etc).

<b>.env.example</b>: Arquivo de exemplo para configuração de variáveis de ambiente, como DATABASE_URL.

<b>jest.config.js</b>: Arquivo de configuração do Jest, usado para testes unitários e de integração.

<b>package.json</b>: Define as dependências do projeto, scripts de execução e metadados do projeto Node.js.

<b>package-lock.json</b>: Registra as versões exatas das dependências instaladas, garantindo reprodutibilidade.

<b>server.js</b>: Arquivo principal que inicializa o servidor Express e carrega as configurações, rotas e middlewares.

<b>rest.http</b>: Arquivo auxiliar que permite testar os endpoints da aplicação diretamente a partir de editores como o VSCode.

<b>README.md</b>: Documento principal com instruções gerais e explicações sobre a arquitetura do sistema.

## 💻 Configuração para desenvolvimento e execução do código

Aqui encontram-se todas as instruções necessárias para a instalação de todos os programas, bibliotecas e ferramentas imprescindíveis para a configuração do ambiente de desenvolvimento.

1. Baixar e instalar o node.js: [https://nodejs.org/pt-br/](https://nodejs.org/pt-br/) (versão 16.15.1 LTS)
2. Clone o repositório em questão.
3. No modo administrador, abra o "prompt de comando" ou o "terminal" e, após, abra a pasta "src/backend" no diretório raiz do repositório clonado e digite o segundo comando:

```sh
npm install
```

Isso instalará todas as dependências definidas no arquivo <b>package.json</b> que são necessárias para rodar o projeto. Agora o projeto já está pronto para ser modificado. Caso ainda deseje iniciar a aplicação, digite o comando abaixo no terminal:

```sh
npm start
```
4. Copie o arquivo .env.example e renomeie para .env, preenchendo as variáveis necessárias, como a URL do banco de dados.
5. Com tudo configurado, inicie a aplicação com o comando:

```sh
npm start
```

6. Agora você pode acessar a aplicação através do link http://localhost:3000/
7. O servidor está online e pronto para receber requisições.
    

## 📋 Licença/License
```
Alunos inteli (remover essa observação do readme.md após leitura e execução, junto com o link para o tutorial):

1. Siga o tutorial para criação da licença: https://drive.google.com/file/d/1hXWLHUhjBkPVuGqeE2LZKozFntnJZzlx/view
```

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/Intelihub/Template_M2/">MODELO GIT INTELI</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://www.linkedin.com/in/maria-vit%C3%B3ria-dos-santos/">Inteli, Maria Vitória dos Santos</a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>
