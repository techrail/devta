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
blockquote {
	background:		#f9f9f9;
	border-left:	10px solid #ccc;
	margin:			1.5em 10px;
	padding:		.5em 10px;
}
blockquote p {
	display:		inline;
}

[data-bs-theme='dark'] td, [data-bs-theme='dark'] th {
  border: 1px solid #555;
}
[data-bs-theme='dark'] tr:nth-child(even){background-color: #333;}
[data-bs-theme='dark'] tr:hover {background-color: #444;}
[data-bs-theme='dark'] th {
  background-color: #444;
  color: #f2f2f2;
}
[data-bs-theme='dark'] blockquote {
	background:		#333;
	border-left:	10px solid #777;
	color:          #f2f2f2;
}
[data-bs-theme='dark'] blockquote p {
	display:		inline;
	color:          #f2f2f2;
}

</style>
`;
