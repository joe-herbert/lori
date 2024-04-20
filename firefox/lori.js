browser.contextMenus.create({
    id: "lori",
    title: "Lori",
    contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    browser.tabs.sendMessage(tab.id, {
        message: info.selectionText.toUpperCase().trim(),
    });
});

browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
    if (temporary) return;
    var url;
    switch (reason) {
        case "install":
            await browser.tabs.create({
                url: "https://lori.joeherbert.dev/?onboard=true&browser=firefox",
            });
            break;
        case "update":
            await browser.tabs.create({
                url: browser.runtime.getURL("updated.html"),
            });
            break;
    }
});

browser.runtime.setUninstallURL("https://lori.joeherbert.dev/uninstall");
