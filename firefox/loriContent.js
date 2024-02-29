browser.runtime.onMessage.addListener(request => {
    var m = request.message;
    m = m.split("L").join("<span style='color: #a0a'>L</span>");
    m = m.split("I").join("<span style='color: #a0a'>I</span>");
    m = m.split("1").join("<span style='color: #a0a'>1</span>");
    add(m);
});

function add(m) {
    if (document.getElementsByClassName("loriMessage").length !== 0) {
        [].forEach.call(document.getElementsByClassName("loriMessage"), function(el) {
            remove(el);
        });
    }
    var a = document.createElement("div");
    a.classList.add("loriMessage");
    a.style = "position: fixed; top: 10px; left: -400px; transition: left 1s; max-width: 350px; background-color: white; color: black; box-shadow: black 0px 0px 10px -5px; border-radius: 5px; padding: 10px; font-family: Georgia; letter-spacing: 2px; cursor: pointer;line-height: initial; font-size: 36px; height: auto; word-break: break-word; text-align: center; z-index: 99999999999; max-height: 100vh; max-height: calc(100vh - 20px); overflow: auto;";
    a.innerHTML = m;

    var mouseover = false;
    var timeout = false;

    a.onclick = function() {
        remove(a);
    };
    a.onmouseenter = function() {
        mouseover = true;
    };
    a.onmouseleave = function() {
        mouseover = false;
        if (timeout) {
            remove(a);
        }
    };
    document.getElementsByTagName("body")[0].appendChild(a);
    setTimeout(function() {
        a.style.left = "10px";
    }, 500);
    setTimeout(function() {
        timeout = true;
        if (!mouseover) {
            remove(a);
        }
    }, 6000);
}

function remove(el) {
    el.style.left = "-400px";
    setTimeout(function() {
        document.getElementsByTagName("body")[0].removeChild(el);
    }, 1000);
}