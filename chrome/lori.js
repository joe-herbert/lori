chrome.contextMenus.create({
    id: "lori",
    title: "Lori",
    contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    console.log("Clicked");
    var m = info.selectionText.toUpperCase().trim();
    m = m.split("L").join("<span style='color: #a0a'>L</span>");
    m = m.split("I").join("<span style='color: #a0a'>I</span>");
    m = m.split("1").join("<span style='color: #a0a'>1</span>");

    (async () => {
        try {
            await chrome.scripting.executeScript({
                target: {tabId: tab.id},
                function: add,
                args: [{ message: m }],
            });
        } catch (e) {
            console.warn(e.message || e);
            return;
        }
    })();
});

function add(params) {
    let m = params.message;
    if (document.getElementsByClassName("loriMessage").length !== 0) {
        [].forEach.call(document.getElementsByClassName("loriMessage"), function(el) {
            el.style.left = "-400px";
            setTimeout(function() {
                document.getElementsByTagName("body")[0].removeChild(el);
            }, 1000);
        });
    }
    var a = document.createElement("div");
    a.classList.add("loriMessage");
    a.style = "position: fixed; top: 10px; left: -400px; transition: left 1s; max-width: 350px; background-color: white; color: black; box-shadow: black 0px 0px 10px -5px; border-radius: 5px; padding: 10px; font-family: Georgia; letter-spacing: 2px; cursor: pointer;line-height: initial; font-size: 36px; height: auto; word-break: break-word; text-align: center; z-index: 99999999999; max-height: 100vh; max-height: calc(100vh - 20px); overflow: auto;";
    a.innerHTML = m;

    var mouseover = false;
    var timeout = false;

    a.addEventListener("click", () => {
        a.style.left = "-400px";
        setTimeout(function() {
            document.getElementsByTagName("body")[0].removeChild(a);
        }, 1000);
    });
    a.addEventListener("mouseenter", () => {
        mouseover = true;
    });
    a.addEventListener("mouseleave", () => {
        mouseover = false;
        if (timeout) {
            a.style.left = "-400px";
            setTimeout(function() {
                document.getElementsByTagName("body")[0].removeChild(a);
            }, 1000);
        }
    });
    document.getElementsByTagName("body")[0].appendChild(a);
    setTimeout(function() {
        a.style.left = "10px";
    }, 500);
    setTimeout(function() {
        timeout = true;
        if (!mouseover) {
            a.style.left = "-400px";
            setTimeout(function() {
                document.getElementsByTagName("body")[0].removeChild(a);
            }, 1000);
        }
    }, 6000);
    return true;
}

chrome.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
    if (temporary) return;
    var url;
    switch (reason) {
        case "install":
            await chrome.tabs.create({
                url: "https://joeherbert.dev/lori/?onboard=true&browser=chrome",
            });
            break;
        case "update":
            await chrome.tabs.create({
                url: chrome.runtime.getURL("updated.html"),
            });
            break;
    }
});

chrome.runtime.setUninstallURL("https://joeherbert.dev/lori/uninstall");
