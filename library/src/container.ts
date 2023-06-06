import {Container} from "inversify";
import {BooksRepository} from "./repositories/BooksRepository";

const container = new Container();
container.bind(BooksRepository).toSelf()

export {container};