import express, { Application } from "express";
import morgan from "morgan";

// Routes
import indexRoutes from '../routes/index.routes'
import usersRoutes from '../routes/users.routes'
import userRoutes from '../routes/user.routes'

export class App {

    private app: Application;

    constructor (
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/users', usersRoutes)
        this.app.use('/user',userRoutes);
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}