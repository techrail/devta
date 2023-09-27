# [Devta](https://devta.techrail.in/)

Devta is the Hindi term for a "divine being" who is helpful to people by nature. The name starts with _Dev_ standing for _developer_ and _ta_ is just a play on the intention of the tool - to be a helpful tool for developers. The aim is to build a single tool which most developers could use for their everyday tasks. For example (but not limited to): Color Picking, Formatters for markups and languages (such as YAML, JSON, XML, HTML, JS etc.), generating Hashes (MD5, SHA, Blowfish), Sanitising and detecting errors in CSS, Minification of source code, working with time (timezone conversions, parsing time strings, UNIX timestamp to Date-Time formats, adding and subtracting times etc.), base64 encoding and decoding and so on.

> You can join us on [Discord](https://discord.gg/aKkWFghPrV) where we discuss about ongoing and upcoming projects.

## Table of Contents

- [Don't such tools already exist?](#dont-such-tools-already-exist)
- [What makes devta different?](#what-makes-devta-different)
- [Project status](#project-status)
- [Before you begin](#before-you-begin)
- [Getting started](#getting-started)
- [Contributing guidelines](#contributing)
- [License](#license)

## Don't such tools already exist?

Such tools already exist. Some are online and some are offline. This project is supposed to be available online as a website (responsive so that it can be used on mobile as well) as well as have electron apps for popular platforms (Linux, Mac, Windows) and to be Open Source. We want to keep it open so that someone with their own need could make a module in the project for themselves that can be useful for a number of other people.

## What makes devta different?

Devta sets itself apart by performing all computing tasks on the client side. What does it mean to you? Simply put, your data never leaves your device or is sent to any external servers.

There are a lot of other online and offline tools that do the same things but in a complex way. But devta tries to keep the user interface simple and intuitive and also has a list of tools. Instead of going to different sites to do different things, devta serves as a one-stop solution. Whether you're a tech enthusiast or a casual user, you'll find our application's interface to be intuitive, clean, and, above all, easy to use.

Devta is open source, it's transparent and people can always peek under the hood of the application to know what's happening. This also means that you could tailor this application to your own personal needs and can benefit from a passionate community of developers and enthusiasts.

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

## Contributing

Please checkout the [Contributing guide](./CONTRIBUTING.md) to know more on how to contribute to this project in any way.

## License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE) file for more details.
