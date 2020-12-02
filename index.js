const express = require('express');
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/', (req, res) => {
	res.json('hello');
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`listening to port ${PORT}`));
