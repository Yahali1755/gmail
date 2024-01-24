import configExpress from "./express";
import configMongoose from "./mongoose";

export default () => {
    configMongoose()
        .then(configExpress)
}