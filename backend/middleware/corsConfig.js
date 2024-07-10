import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:3000', // Adjust this according to your frontend's URL
    optionsSuccessStatus: 200
};

export default cors(corsOptions);
