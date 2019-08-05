const app = require('./app');

const PORT = process.env.PORT || 9091;

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


//{ PORT = 9091 } = process.env
