import fs from 'fs';
import * as parser from '@babel/parser';
import {File} from '@babel/types';
import traverse, {Node} from "@babel/traverse";
import {collectChunk} from './program/chunk';
import {Command} from 'commander';
import {collectInfo} from "./program/info";


function main() {
    const program = new Command();

    program
        .name("js-util")
        .description("CLI for js file scan")
        .version("0.0.1");

    program
        .command("info")
        .description("collect js file info")
        .argument("<string>", "js file path")
        .action((str, options) => {
            if (!fs.existsSync(str)) {
                throw `${str} js file not exist`;
            }
            let p = getASTTree(str);
            if (p == undefined) {
                throw `${str} js file is not valid`;
            }
            console.log(JSON.stringify(collectInfo(p)))
        });

    program
        .command("chunk")
        .description("collect chunk js file")
        .argument("<string>", "chunk js path")
        .action((str, options) => {
            if (!fs.existsSync(str)) {
                throw `${str} js file not exist`;
            }
            let ast = getASTTree(str);
            if (ast == undefined) {
                throw `${str} js file is not valid`;
            }
            let chunkFiles = collectChunk(ast);
            console.log(JSON.stringify(chunkFiles))
        });

    program.parse();

}

function getASTTree(jsPath: string): parser.ParseResult<File> {
    let fileBuf = fs.readFileSync(jsPath);
    return parser.parse(fileBuf.toString(), {
        sourceType: "module",
    });
}

main();
