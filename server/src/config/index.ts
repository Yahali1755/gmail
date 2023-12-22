import configExpress from "./express";
import configMongoose from "./mongoose";

export default () => {
    configExpress()
    configMongoose()
}