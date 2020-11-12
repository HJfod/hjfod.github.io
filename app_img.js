class AppImg extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const repo = `https://github.com/${this.getAttribute("git")}`;
        this.innerHTML = `<text>${this.innerHTML}</text>`;

        const im = document.createElement("img");

        fetch(`${repo}/raw/master/${this.getAttribute("img")}`)
        .then(res => res.blob())
        .then(img => {
            im.setAttribute("src", URL.createObjectURL(img));
        });

        this.appendChild(im);
    }
}

customElements.define("app-img", AppImg);

[
    "apps/gdit.wid",
    "apps/gdshare.wid"
].forEach(app => {
    
});