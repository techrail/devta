# Devta Contribution Guide

Thank you for investing your time in contributing to the project. Whether you want to fix a bug, add a new feature, or improve documentation, your help is greatly appreciated.❤️

Before you start contributing, please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> You can join us on [Discord](https://discord.gg/aKkWFghPrV) where we discuss about ongoing and upcoming projects.

## Issues

## Create a new issue

If you encounter a bug, have a feature request, or want to discuss an improvement, please open an [issue](https://github.com/techrail/devta/issues) on the GitHub repository. Follow these guidelines when creating issues:

- Use a descriptive title and provide a detailed description of the problem or suggestion.
- Include any relevant information such as error messages, screenshots, or steps to reproduce the issue.
- Add an appropriate lable.

## Pull Request

When you are finished with the changes, create a pull request.

- Mention the changes made and please add screenshots and other things if necessary,
- Reference related issues in your pull request.
- Keep your pull requests focused on a single feature or bug fix.

## How to add functionality

Following are the steps to add new functionality:

1. Create new folder inside `src\pages`.
2. Add a route to your component in `src\router\router.js`.
3. Add an option to the settings sidebar on `src\components\sidebar\sidebarLists.js`

## Good practices

Please keep this in mind when making a contribution

- Since this project doesn't have any definitive style guide due to the nature of the components, try to use similar components as a reference or reach out to the contributors if you face any issue.
- Please make use of the reusable components at `src\components` wherever applicable.
- Please make sure to name the directory the same name of your route but in camel case.

## Attribution

This contributing guide is adapted from the [Contributing Guide of Github Docs](https://github.com/github/docs/blob/main/CONTRIBUTING.md).
