# Cadastro de carro

**RF**

[x]Deve ser possível cadastrar um novo carro
Deve ser possível listar todas as categorias

**RN**

[x]Não pode cadastrar um carro com uma license_plate já existente.
[x]O carro deve ser cadastrado, por padrão, com disponibilidade.
[x]Não deve ser possível um usuário comum cadastrar o carro, apenas o admin pode cadastrar.

# Listagem de carros

**RF**

[x]Deve ser possível listar todos carros disponíveis
[x]Deve ser possível listar todos os carros disponíveis pelo nome da categoria
[x]Deve ser possível listar todos os carros disponíveis pela nome da marca
[x]Deve ser possível listar todos os carros disponíveis pela nome da carro


**RN**

[x]O usuário não precisa estar logado no sistema.


# Cadastro de Espicificação no carro

**RF**

Deve ser possível cadastrar uma especificação para um carro
Deve ser possível listar todas as especificações
Deve ser possível listar todos os carros

**RN**

Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Não deve ser possível um usuário comum cadastrar, apenas o admin pode cadastrar.


# Cadastro de imagens do carro

**RF** 

Deve ser possível cadastra a imagem do carro
Deve ser possível listar todos os carros

**RNF**

Utilizar o multer para upload dos arquivos

**RN**

O usuário deve poder cadastrar mais de uma imagem para o mesmo carro


# Aluguel de carro

**RF**

Deve ser possível cadastrar um aluguel 

**RN**

O aluguel deve ter duração mínima de 24h
Não deve ser possível cadastrar um novo aluguel casa já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel casa já exista um aberto para o mesmo carro.

# Devolução de carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24h, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro alugule.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel. 
O usuário deve estar logado na aplicação.

# Listagem de Alugueis para usúario

**RF**

Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
O usuário deve estar logado na aplicação

# Recuperar Senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperacao de senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas




