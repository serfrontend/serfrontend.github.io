(() => {
    const dialog = document.getElementById("promo-dialog")
    const trigger = document.getElementById("promo-trigger")
    const code = document.getElementById("promo-code")
    const status = document.getElementById("promo-status")
    const checkoutCode = document.getElementById("cupom-udemy")
    const standardCode = checkoutCode.textContent
    const [startsAt, endsAt] = Array.from(dialog.querySelectorAll("time"), time => Date.parse(time.dateTime))

    const courseUrls = []
    for (const link of document.querySelectorAll("#courses .courses__card__ctas a")) {
        for (const attribute of ["href", "data-modal-product-url"]) {
            const original = link.getAttribute(attribute)
            if (!original) continue

            const url = new URL(original)
            const parameter = url.searchParams.has("discountCode") ? "discountCode" : "couponCode"
            url.searchParams.set(parameter, code.value)
            courseUrls.push({ link, attribute, original, promotion: url.href })
        }
    }

    function updateCourseCoupons(active) {
        checkoutCode.textContent = active ? code.value : standardCode
        for (const { link, attribute, original, promotion } of courseUrls) {
            link.setAttribute(attribute, active ? promotion : original)
        }
    }

    function openPromotion() {
        status.textContent = ""
        dialog.showModal()
    }

    trigger.addEventListener("click", openPromotion)
    document.getElementById("promo-copy").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(code.value)
            status.textContent = "Cupom copiado!"
        } catch {
            code.focus()
            code.select()
            status.textContent = "Selecione e copie o código manualmente."
        }
    })

    document.getElementById("promo-courses").addEventListener("click", () => {
        dialog.close()
        document.querySelector("#courses h2").focus({ preventScroll: true })
    })

    function syncCourseCoupons() {
        const now = Date.now()
        updateCourseCoupons(now >= startsAt && now < endsAt)

        const nextChange = now < startsAt ? startsAt : endsAt
        if (now < nextChange) {
            setTimeout(syncCourseCoupons, Math.min(nextChange - now, 2_147_483_647))
        }
    }

    syncCourseCoupons()
    trigger.hidden = false
    openPromotion()
})()
