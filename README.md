# Devta

Devta is the Hindi term for a "divine being" who is helpful to people by nature. The name starts with _Dev_ standing for _developer_ and _ta_ is just a play on the intention of the tool - to be a helpful tool for developers. The aim is to build a single tool which most developers could use for their everyday tasks. For example (but not limited to): Color Picking, Formatters for markups and languages (such as YAML, JSON, XML, HTML, JS etc.), generating Hashes (MD5, SHA, Blowfish), Sanitising and detecting errors in CSS, Minification of source code, working with time (timezone conversions, parsing time strings, UNIX timestamp to Date-Time formats, adding and subtracting times etc.), base64 encoding and decoding and so on.

## Don't such tools already exist?

Such tools already exist. Some are online and some are offline. This project is supposed to be available online as a website (responsive so that it can be used on mobile as well) as well as have electron apps for popular platforms (Linux, Mac, Windows) and to be Open Source. We want to keep it open so that someone with their own need could make a module in the project for themselves that can be useful for a number of other people.

## Project Status

The project has just started. There is nothing in there but if you can help us out, it would be great! The project is being built using vite (VueJS) and Twitter Bootstrap.

PS: This project is inspired from the fantastic [DevUtils](https://devutils.com/) app which is available _only for macOS_ as a _paid tool_.

## Before You Begin

Before you can use this project, please ensure that you have the following software and tools installed on your system:

- Node.js - [Download and install Node.js](https://nodejs.org/en/download) and the node package manager (included with node.js).

- Vite - Install [Vite](https://vitejs.dev/guide/) globally using the following command

```bash
npm install -g vite
```

> If you have any issues during the installation of any of the above dependancies, please refer to the official documentation.

## Getting started

### 1. Clone the project

Open your terminal or command prompt and run the following command to clone the repository:

```bash
 git clone https://github.com/techrail/devta.git
```

### 2. Go to the project directory

Once cloned, go to the project directory using the following command:

```bash
cd devta
```

### 3. Install dependency

Install all the necessary dependencies listed in `package.json` using the following command:

```bash
npm install
```

### 4. Start the Project

```bash
npm run dev
```
