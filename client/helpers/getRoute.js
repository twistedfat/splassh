UI.registerHelper("currentPage", function(localPath) {
    return Router.current(true).path === localPath;
});