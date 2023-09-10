export const parseUrl = (urlString) => {
    try {
        const url = new URL(urlString);

        const resultMap = new Map();
        resultMap.set("Protocol",url.protocol.substring(0,url.protocol.length-1)); //removing last ":"
        resultMap.set("Host",url.hostname);
        resultMap.set("Port",url.port);
        resultMap.set("Path",url.pathname);
        resultMap.set("Query String",url.searchParams);
        resultMap.set("Fragment",new URLSearchParams(url.hash.substring(1)));
    
        return resultMap;    
    } catch (err) {
        return null;
    }
}