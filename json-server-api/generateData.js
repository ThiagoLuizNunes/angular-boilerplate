const faker = require('faker');

let database = { products: [] };

for (let i = 1; i <= 10; i++) {
  database.products.push({
    id: i,
    name: faker.random.words(),
    email: faker.random.words(),
    password: faker.random.words()
  });
}

console.log(JSON.stringify(database));
