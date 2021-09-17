import { JSDOM } from "jsdom";
import { Test } from "./testComponent";
import * as ReactDOM from "react-dom";

console.log("Yeee");

const dom = new JSDOM(`<!DOCTYPE html><div id="react">Hello world</div>`);
global.window = dom.window

const element = dom.window.document.getElementById("react");

ReactDOM.render(Test(), element);


const element2 = dom.window.document.getElementById("react");

console.log(element2);
