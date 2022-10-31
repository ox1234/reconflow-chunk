import {Node, File, StringLiteral} from "@babel/types";
import traverse from "@babel/traverse";
import {ParseResult} from "@babel/parser";
import * as t from "@babel/types";
import generate from "@babel/generator";


export function collectChunk(ast: ParseResult<File>): string[] {
    // chunk js文件的路径
    let chunkFilePath = []
    traverse(ast, {
        BinaryExpression: (path) => {
            let node = path.node;
            // 1. 如果一个BinaryExpression的右值是以一个StringLiteral结尾，而且StringLiteral的结尾为.js，代表这段代码是组成js文件的代码
            if (t.isStringLiteral(node.right) && node.right.value.endsWith(".js")) {
                // 2. 寻找MemberExpression来构建合法的js代码
                let forVar = undefined;
                let chunkNameArr = new Set<string>();
                traverse(node, {
                    noScope: true,
                    MemberExpression: path => {
                        let node = path.node;
                        // 如果这个MemberExpression的object和property都是Identifier，将其替换为空字符串
                        if (t.isIdentifier(node.object) && t.isIdentifier(node.property)) {
                            const emptyStrNode = t.stringLiteral("")
                            path.replaceWith(emptyStrNode);
                        } else if (t.isObjectExpression(node.object)) {
                            if (t.isIdentifier(node.property)) {
                                forVar = node.property.name;
                            } else if (t.isAssignmentExpression(node.property)) { // 为了case9的例子做的特殊处理
                                forVar = node.property.left.name;
                                path.get("property").replaceWith(t.identifier(forVar))
                            }

                            if (forVar !== undefined) {
                                for (let perProp of node.object.properties) {
                                    if (t.isIdentifier(perProp.key)) {
                                        chunkNameArr.add(perProp.key.name);
                                    } else if (t.isStringLiteral(perProp.key)) {
                                        chunkNameArr.add(perProp.key.value);
                                    } else if (t.isNumericLiteral(perProp.key)) {
                                        chunkNameArr.add(perProp.key.value);
                                    }
                                }
                            }

                        }
                        path.skip();
                    }
                })

                if (chunkNameArr.size == 0) {
                    return
                }

                // 创建chunkArr的AST结构：
                let chunkArrElements = [];
                chunkNameArr.forEach((ele) => {
                    chunkArrElements.push(t.stringLiteral(ele.toString()));
                })

                // 创建for循环体内的js文件路径变量
                let jsVariable = t.variableDeclaration("let", [t.variableDeclarator(t.identifier("res"), path.node)]);

                let call = t.callExpression(t.memberExpression(t.identifier("chunkFilePath"), t.identifier("push")), [t.identifier("res")]);
                let arrPushCall = t.expressionStatement(call)

                // 创建for循环体
                let forBody = t.blockStatement([jsVariable, arrPushCall]);

                // 创建for循环的循环变量
                let forLeftVariable = t.variableDeclaration("let", [t.variableDeclarator(t.identifier(forVar))]);

                // 创建整个for循环
                let forOfStmt = t.forOfStatement(forLeftVariable, t.arrayExpression(chunkArrElements), forBody)

                // 创建program节点
                let programBody = t.program([forOfStmt])

                // 生成js代码
                const {code} = generate(programBody, {sourceMaps: false});

                eval(code);
            }
        }
    })
    return chunkFilePath
}



