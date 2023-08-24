export const SampleMarkdown = `# Markdown Previewer

## Introduction

Welcome to the Markdown previewer! This tool allows you to write Markdown content and see the live preview.

`;

// css overrides for markdown tables
export const cssOverrides = `
<style>
table {
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #ddd;
  padding: 8px;
}
tr:nth-child(even){background-color: #f2f2f2;}
tr:hover {background-color: #ddd;}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #212529;
  color: white;
}
</style>
`;
