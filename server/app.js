const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('./schema/schema');

const PORT = process.env.PORT || 5005;

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  }),
);

app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`Server successfully started on port ${PORT}`);
});
