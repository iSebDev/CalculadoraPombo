document.addEventListener("DOMContentLoaded", () => {
    const materiales = ["Hielo", "Vidrio", "Madera", "Acero", "Cuero"];

    const comboBoxes = document.querySelectorAll(".materials");

    const form = document.querySelector("form");

    const coefs = {
        "0-0": 0.1,
    }

    const coefRoz = (m1, m2) => {

        const mat = `${m1}-${m2}`;

        return coefs[mat];

    }

    comboBoxes.forEach((c) => {
        let i = 0;
        materiales.forEach((m) => {
            const opt = document.createElement("option");
            opt.innerHTML = m;
            if (i === 0) {
                opt.setAttribute("selected", "");
            }
            opt.setAttribute("value", i)
            i++;

            c.appendChild(opt);
        });
    });

    form.addEventListener("submit", (e) => {
        let captchaResponse = grecaptcha.getResponse();

        if (captchaResponse) {
            e.preventDefault();

            alert("Por favor completa el reCAPTCHA.");
            return;
        }

        e.preventDefault();

        /*
         * Realizar Calculos
         */
        var formData = new FormData(form);

        const masa = formData.get("masa") != null ? formData.get("masa") : 0;
        const ang = formData.get("angulo") != null ? formData.get("angulo") : 0;

        const m1 = formData.get("m1") != null ? formData.get("m1") : 0;
        const m2 = formData.get("m2") != null ? formData.get("m2") : 0;
    });
    
});