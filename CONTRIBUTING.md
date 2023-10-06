# Devta Contribution Guide

Thank you for investing your time in contributing to the project. Whether you want to fix a bug, add a new feature, or improve documentation, your help is greatly appreciated.❤️

Before you start contributing, please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> You can join us on [Discord](https://discord.gg/aKkWFghPrV) where we discuss about ongoing and upcoming projects.

## Table of Contents

- [Issues](#issues)
- [Types of issues](#types-of-issues)
- [Creating a new issue](#creating-a-new-issue)
- [Pull request](#pull-request)
- [How to add a new component](#how-to-add-a-new-component)
- [How to work on an existing component](#how-to-work-on-an-existing-component)
- [Good practices](#good-practices)
- [Attribution](#attribution)

## Issues

If you encounter a bug, have a feature request, or want to discuss an improvement, please open an [issue](https://github.com/techrail/devta/issues) on the GitHub repository.

> Before you create a new issue, please check if a similar issue already exists. If you find a related issue, feel free to add your input or subscribe to it for updates.

## Types of issues

Please choose the appropriate issue type when creating a new issue:

- **Bug Report**: If you encounter a problem or unexpected behavior with the project.
- **Feature Request**: If you have an idea for a new feature or improvement.
- **UI Fix**: If the user interface needs to be changed or fixed.
- **Question / Support Request**: If you have a question or need assistance with using the project.
- **Documentation Issue**: If you find issues with project documentation (e.g., typos, unclear instructions).

## Creating a new issue

Follow these guidelines when creating issues:

- Use a descriptive title and provide a detailed description of the problem or suggestion.
- Include any relevant information such as error messages, screenshots, or steps to reproduce the issue.
- Add an appropriate label.

## Pull Request

When you are finished with the changes, create a pull request.

- Mention the changes made and please add screenshots and other things if necessary.
- Keep your pull requests focused on a single feature or bug fix.
- Ensure that you [link the pull request to the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).

## How to add a new component

Following are the steps to add a new component:

1. Create new folder inside `src/pages`.
2. Add a route to your component in `src/router/router.js`.
3. Add an option to the settings sidebar on `src/components/sidebar/sidebarLists.js`

## How to work on an existing component

Following are the steps to work on an existing component.

1. Go to `src/{component_name}/index`
2. You can find the name of the component in `src/router/routes.js` or you can find it on the site itself.
3. Reusable components are present in `src/components` and the utility functions are present in `src/components/utils`.

## Good practices

Please keep this in mind when making a contribution

- Since this project doesn't have any definitive style guide due to the nature of the components, try to use similar components as a reference or reach out to the contributors if you face any issue.
- Please make use of the reusable components at `src/components` wherever applicable.
- Please make sure to name the directory the same name of your route but in camel case.
- Please make sure that the user interface is fully responsive.

## Attribution

This contributing guide is adapted from the [Contributing Guide of Github Docs](https://github.com/github/docs/blob/main/CONTRIBUTING.md).
