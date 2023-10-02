// Menu options for the sidebar.
// Each element takes four properties.
// name: The name of the option
// iconClass: Icon class denotes the corresponding icon. Head over to https://icons.getbootstrap.com/ and add the classname of the desired icon
// route: route denotes the route on which the module will be displayed
// tags: tags associated with each tool, you can put category to which tool belongs etc.

export const sideBarList = [
  {
    name: "Hash Generator",
    iconClass: "bi bi-hash",
    route: "/hash-generator",
    tags: "Security,Cryptography,Hashing,MD5,SHA,SHA1,SHA3,SHA224,SHA256,SHA384,SHA512",
  },
  {
    name: "Base64",
    iconClass: "bi bi-journal-text",
    route: "/base64",
    tags: "Encoding,Decoding,Encoder,Decoder,Conversion,Base64",
  },
  {
    name: "Unix to date",
    iconClass: "bi bi-postage",
    route: "/unix-date-converter",
    tags: "datetime,Conversion,Timestamp,Epoch to Date,Time",
  },
  {
    name: "Date to unix",
    iconClass: "bi bi-calendar-date",
    route: "/date-unix-converter",
    tags: "datetime,Conversion,Timestamp,Epoch Converter,Time",
  },
  {
    name: "Timezone Converter",
    iconClass: "bi bi-calendar-range",
    route: "/timezone-converter",
    tags: "datetime,Conversion,Timestamp,Global",
  },
  {
    name: "Markdown Preview",
    iconClass: "bi bi-filetype-md",
    route: "/markdown-preview",
    tags: "Markdown Viewer,Markdown Rendering,Markdown Editor,Parsing",
  },
  {
    name: "Json Formatter",
    iconClass: "bi bi-filetype-json",
    route: "/json-formatter",
    tags: "Syntax,JSON",
  },
  {
    name: "JWT Debugger",
    iconClass: "bi bi-bug",
    route: "/jwt-debugger",
    tags: "Validation,Token Inspection,Token Debugging,JSON",
  },
  {
    name: "JSON Converter",
    iconClass: "bi bi-filetype-json",
    route: "/json-converter",
    tags: "Conversion,Syntax,JSON",
  },
  {
    name: "SQL Formatter",
    iconClass: "bi bi-filetype-sql",
    route: "/sql-formatter",
    tags: "database,Syntax,db",
  },
  {
    name: "PostgreSQL URL Parser",
    iconClass: "bi bi-filetype-sql",
    route: "/postgresql-url-parser",
    tags: "database,Syntax,Parsing,SQL,db",
  },
  {
    name: "URL Parser",
    iconClass: "bi bi-link-45deg",
    route: "/url-parser",
    tags: "URL Components,URL Parsing,HTTP",
  },
  {
    name: "API Tester",
    iconClass: "bi bi-send-check-fill",
    route: "/api-tester",
    tags: "api, testing, get, post, put, patch, delete",
  },
  {
    name: "Image to Base64",
    iconClass: "bi bi-card-image",
    route: "/image-base64-converter",
    tags: "Image, base64, Converter, Encoding, Decoding, Encoding, Decoding",
  },
  {
    name: "CRON expression parser",
    iconClass: "bi bi-alarm",
    route: "/cron-parser",
    tags: "CRON, Parser, Expression, Cron Expression, Cron Parser",
  },
];
