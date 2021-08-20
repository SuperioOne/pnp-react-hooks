import { Test, test, Fuubar, default as hehe } from "./t1/t2/test";

const tobj = new Test();

tobj.test2();

const fubar: Fuubar = {
    allow: 123
};

console.log(fubar);
console.log(fubar);
console.log(fubar);

const result = test();

console.log(result);