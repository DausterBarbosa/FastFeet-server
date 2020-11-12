import {createConnection} from "typeorm";

async function connectionDatabase(){
    await createConnection();
}

connectionDatabase();