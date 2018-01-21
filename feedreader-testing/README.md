# Feedreader testing project

The goal of the project was to implement a bunch of tests for a small project with Jasmine framework

## List of tests

1. Check that `allFeeds` variable is defined, every object inside it has properties `name` and `url`, they are defined, not null or empty

2. Check that menu is hidden by default, and clicking menu item changes menu visibility

3. Check that when page is loaded there is at least 1 entry inside feeds section

4. Check that entries inside feed section are updated if different feed is chosen in menu

## Launching tests

Launching tests does not require any external dependencies. Test are automatically run when `index.html` is opened in browser