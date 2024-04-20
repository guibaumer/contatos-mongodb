import app from './app.js';
import { connect } from './config/database.js';

try {

    connect().then(() => {
        app.listen(5000, () => {
            console.log('App no ar: http://localhost:5000');
        });
    })

} catch (err) {
    console.log(res);
}

