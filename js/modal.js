function gerarLinkCadastro(udemyUrlComCupom) {
    const baseSignup = "https://www.udemy.com/join/signup-popup/?locale=pt_BR&response_type=html&next=";
    const destinoCodificado = encodeURIComponent(udemyUrlComCupom);
    return baseSignup + destinoCodificado;
}

function setupModal(_elements, _modal) {

    const elements = document.querySelectorAll(_elements)
    const modal = document.querySelector(_modal)
    const chk = modal.querySelector("[data-modal-checkbox]")
    const linkUdemy = modal.querySelector("#crie-conta-udemy")

    if (elements.length === 0 || !modal) {
        return
    }



    elements.forEach(el => {
        el.addEventListener("click", e => {
            const naoMostrarModal = localStorage.getItem("naoMostrarModalNovamente")
            const href = e.currentTarget.href
            linkUdemy.href = gerarLinkCadastro(e.currentTarget.getAttribute("data-modal-product-url"));

            if (naoMostrarModal === null || naoMostrarModal === "false") {
                e.preventDefault()
                modal.showModal()

                document.getElementById("continarCompra").href = href
            }
        })
    })

    if (chk) {
        chk.addEventListener("change", e => {
            localStorage.setItem("naoMostrarModalNovamente", e.currentTarget.checked)
        })
    }
}