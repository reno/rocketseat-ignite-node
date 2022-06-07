const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());

function verifyIfAccountExists(request, response, next) {
  const { cpf } = request.headers;
  const customer = customers.find(customer => customer.cpf === cpf);
  if (!customer) { 
    return response.status(400).json({ error: 'Customer not found' });
  } 
  request.customer = customer;
  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    }
    return acc - operation.amount;
  }, 0);
  return balance;
}

const customers = [];

app.get('/account', verifyIfAccountExists, (request, response) => {
  const { costumer } = request;
  return response.json(costumer);
});

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;
  const alreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );
  if (alreadyExists) {
    return response.status(400).json({ error: 'Customer already exists' });
  }
  customers.push({
    id: uuid(),
    cpf,
    name,
    statement: []
  });
  return response.status(201).send();
});

app.put('/account', verifyIfAccountExists, (request, response) => {
  const { name } = request.body;
  const { customer } = request;
  customer.name = name;
  return response.status(201).send()
});

app.delete('/account', verifyIfAccountExists, (request, response) => {
  const { customer } = request;
  customer.splice(customers.indexOf(customer), 1);
  return response.status(204).send(); 
});

app.post('/deposit', verifyIfAccountExists, (request, response) => {
  const { description, amount } = request.body;
  const { costumer } = request;
  const operation = {
    description,
    amount,
    createdAt: new Date(),
    type: 'credit'
  }
  costumer.statement.push(operation);
  return response.status(201).send();
});

app.post('/withdraw', verifyIfAccountExists, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;
  const balance = getBalance(customer.statement);
  if (balance < amount) {
    return response.status(400).json({ error: 'Insufficient funds' });
  }
  const operation = {
    amount, 
    createdAt: new Date(),
    type: 'debit'
  }
  customer.statement.push(operation);
  return response.status(201).send();
});

app.get('/statement/', verifyIfAccountExists, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.get('/statement/date', verifyIfAccountExists, (request, response) => {
  const { customer } = request;
  const { date } = request.query;
  const dateFormat = new Date(date + ' 00:00');
  const statement = customer.statement.filter(
    (statement) => statement.createdAt.toDateString() === dateFormat.toDateString()
  );
  return response.json(customer.statement);
});

app.get('/balance', verifyIfAccountExists, (request, response) => {
  const { customer } = request;
  const balance = getBalance(customer.statement);
  return response.json(balance);
});

app.listen(3333);
