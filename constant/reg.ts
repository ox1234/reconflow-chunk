export const id_card_regex = /['"]\d{14}[0-9a-zA-Z]{4}['"]/g;
export const mobile_regex = /['"]((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}['"]/g;
export const email_regex = /['"][a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+['"]/g;
export const ip_addr_regex = /['"]\d+\.\d+\.\d+\.\d+['"]/g;
export const ip_port_regex = /['"]\d+\.\d+\.\d+\.\d+\:\d+['"]/g;
export const domain_regex = /['"][a-zA-Z0-9\-\.]*?\.(xin|com|cn|net|com.cn|vip|top|cc|shop|club|wang|xyz|luxe|site|news|pub|fun|online|win|red|loan|ren|mom|net.cn|org|link|biz|bid|help|tech|date|mobi|so|me|tv|co|vc|pw|video|party|pics|website|store|ltd|ink|trade|live|wiki|space|gift|lol|work|band|info|click|photo|market|tel|social|press|game|kim|org.cn|games|pro|men|love|studio|rocks|asia|group|science|design|software|engineer|lawyer|fit|beer|我爱你|中国|公司|网络|在线|网址|网店|集团|中文网)['"]/g;
export const path_regex = /['"]\/[^/][^>< \)\(\{\}]*?['"]/g;
export const url_regex = /['"](([a-zA-Z0-9]+:)?\/\/)?[a-zA-Z0-9\-\.]*?\.(xin|com|cn|net|com.cn|vip|top|cc|shop|club|wang|xyz|luxe|site|news|pub|fun|online|win|red|loan|ren|mom|net.cn|org|link|biz|bid|help|tech|date|mobi|so|me|tv|co|vc|pw|video|party|pics|website|store|ltd|ink|trade|live|wiki|space|gift|lol|work|band|info|click|photo|market|tel|social|press|game|kim|org.cn|games|pro|men|love|studio|rocks|asia|group|science|design|software|engineer|lawyer|fit|beer|我爱你|中国|公司|网络|在线|网址|网店|集团|中文网)(\/.*?)?['"]/g;

