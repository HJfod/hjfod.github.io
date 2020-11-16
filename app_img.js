class AppImg extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener("click", x => {
            document.querySelectorAll("app-img").forEach(i => {
                i.classList.remove("viewing");
                i.classList.add("hide");
            });
            this.classList.remove("hide");
            this.classList.add("viewing");
        });
    }

    init() {
        const x = document.createElement("app-prev");
        this.appendChild(x);

        const d = document.createElement("app-desc");
        d.innerHTML = `<text is-desc></text><app-butt><button is-link></button><button is-close>Close</button></app-butt>`;
        this.appendChild(d);

        this.querySelector("button[is-close]").addEventListener("click", e => {
            e.stopPropagation();
            document.querySelectorAll("app-img").forEach(i => {
                i.classList.remove("hide");
                i.classList.remove("viewing");
            });
        });
    }

    setImage(img) {
        const im = document.createElement("img");
        im.setAttribute("src", img);
        this.querySelector("app-prev").appendChild(im);
    }

    setText(txt) {
        const tx = document.createElement("text");
        tx.innerHTML = txt;
        this.querySelector("app-prev").appendChild(tx);
    }

    setDescription(desc) {
        this.querySelector("text[is-desc]").innerHTML = desc;
    }

    setLink(link) {
        this.querySelector("button[is-link]").setAttribute("onclick", `window.open("${link}");`);
        this.querySelector("button[is-link]").innerHTML = "Check it out!";
    }
}

customElements.define("app-img", AppImg);

[
    "apps/gdit.wid",
    "apps/gdshare.wid"
].forEach(appl => {
    fetch(`https://raw.githubusercontent.com/HJfod/hjfod.github.io/master/${appl}`)
    .then(res => res.text())
    .then(app => {
        app = JSON.parse(app);
        const el = document.createElement("app-img");
        el.init();
        el.setImage(`https://raw.githubusercontent.com/HJfod/hjfod.github.io/master/apps/${app["app-icon"]}`);
        el.setText(app["app-name"]);
        el.setDescription(app["app-desc"]);
        el.setLink(app["app-repo"]);
        document.querySelector(".app-container").appendChild(el);
    });
});