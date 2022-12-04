const port = document
    .querySelector("meta[name='port']")
    .getAttribute("content");
console.log(port);
const ws = new WebSocket(`ws://localhost:${Number(port)}`);

ws.onmessage = (event) => {
    if (event.data === "reload") {
        window.location.reload();
    }
    try {
        const obj = JSON.parse(event.data);
        const color = obj["color"];
        document.querySelector("h1").style.color = color;
    } catch (error) {
        console.error(error);
    }
};

if (document.querySelector("#btn")) {
    document.querySelector("#btn").addEventListener("click", () => {
        ws.send("changeColorOfH1");
    });
}

function scroll2Top() {
    window.scrollTo({
        behavior: "smooth",
        top: 0,
    });
}

(() => {
    setTimeout(() => {
        scroll2Top();
    }, 500);
})();

(function watchScroll() {
    if (window.scrollY > window.innerHeight) {
        if (!document.body.querySelector("#toTop")) {
            const toTop = document.createElement("div");
            toTop.id = "toTop";
            toTop.innerHTML = "^";
            toTop.addEventListener("click", scroll2Top);
            document.body.appendChild(toTop);
        }
    } else {
        if (document.body.querySelector("#toTop")) {
            document.body.removeChild(document.body.querySelector("#toTop"));
        }
    }

    window.requestAnimationFrame(watchScroll);
})();
