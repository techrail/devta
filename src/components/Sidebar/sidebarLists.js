// Menu options for the sidebar.
// Each element takes three properties.
// name: The name of the option
// iconClass: Icon class denotes the corresponding icon. Head over to https://icons.getbootstrap.com/ and add the classname of the desired icon
// route: route denotes the route on which the module will be displayed

export const sideBarList = [
  {
    name: "Hash Generator",
    iconClass: "bi bi-hash",
    route: "/hash_generator",
  },
  {
    name: "Base64",
    iconClass: "bi bi-journal-text",
    route: "/base64",
  },
  {
    name: "Unix to date",
    iconClass: "bi bi-postage",
    route: "/unixToDate",
  },
  {
    name: "Date to unix",
    iconClass: "bi bi-calendar-date",
    route: "/dateToUnix",
  },
  {
    name: "Timezone Converter",
    iconClass: "bi bi-calendar-range",
    route: "/timeZoneConverter",
  },
  {
    name: "Markdown Preview",
    iconClass: "bi bi-filetype-md",
    route: "/markdownPreview",
  },
];
