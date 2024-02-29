window.onload = function () {
    var params = new URLSearchParams(location.search);
    if (params.get("onboard")) {
        var remove = document.getElementsByClassName("removeForOnboard");
        while (remove.length !== 0) {
            var el = remove.item(0);
            el.parentElement.removeChild(el);
        }
        var thankYou = document.createElement("span");
        thankYou.id = "thankYou";
        thankYou.classList.add("purple");
        thankYou.innerText =
            "Thanks for downloading! Enjoy some clarity in life";
        document
            .getElementById("container1")
            .insertBefore(
                thankYou,
                document.getElementsByTagName("h2")[0].nextElementSibling
            );
        document.getElementById("container1").style.height = "auto!important";
        document.getElementById(`addOnLink-${params.browser}`).innerText =
            "Give us a rating";
    }
};
