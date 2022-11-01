import {infoScanResult} from "../basic/basic";
import {Node, File, StringLiteral} from "@babel/types";
import {ParseResult} from '@babel/parser';
import traverse from "@babel/traverse";
import {
    email_regex,
    id_card_regex,
    ip_addr_regex,
    ip_port_regex,
    mobile_regex,
    path_regex,
    url_regex,
    domain_regex
} from "../constant/reg";

export function collectInfo(ast: ParseResult<File>): infoScanResult {
    let info_scan_result: infoScanResult = {
        id_card_list: [],
        mobile_list: [],
        email_list: [],
        ip_addr_list: [],
        ip_port_list: [],
        path_list: [],
        domain_list: [],
        url_list: []
    }

    traverse(ast, {
        StringLiteral: path => {
            const content = path.node.extra.raw;
            info_scan_result.id_card_list = matchIDCard(content);
            info_scan_result.mobile_list = matchMobile(content);
            info_scan_result.email_list = matchEmail(content);
            info_scan_result.ip_addr_list = matchIPAddr(content);
            info_scan_result.ip_port_list = matchIPPort(content);
            info_scan_result.path_list = matchPath(content);
            info_scan_result.domain_list = matchDomains(content);
            info_scan_result.url_list = matchURL(content);
        }
    })

    return info_scan_result
}

function matchIDCard(content: string): string[] {
    return getMatchesArr(content.match(id_card_regex));
}

function matchMobile(content: string): string[] {
    return getMatchesArr(content.match(mobile_regex));
}

function matchEmail(content: string): string[] {
    return getMatchesArr(content.match(email_regex));
}

function matchIPAddr(content: string): string[] {
    return getMatchesArr(content.match(ip_addr_regex));
}

function matchIPPort(content: string): string[] {
    return getMatchesArr(content.match(ip_port_regex));
}

function matchPath(content: string): string[] {
    return getMatchesArr(content.match(path_regex));
}

function matchDomains(content: string): string[] {
    return getMatchesArr(content.match(domain_regex));
}

function matchURL(content: string): string[] {
    return getMatchesArr(content.match(url_regex));
}

function getMatchesArr(matches: RegExpMatchArray): string[] {
    if (matches === null) {
        return [];
    }
    let res_set = new Set<string>;
    for (let m of matches) {
        res_set.add(m);
    }
    return Array.from(res_set);
}
