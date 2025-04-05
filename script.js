document.addEventListener("DOMContentLoaded", () => {
    const materiales = ["Hielo", "Vidrio", "Madera", "Acero", "Cuero"];

    const comboBoxes = document.querySelectorAll(".materials");

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

    document.querySelector("form").addEventListener("submit", (e) => {
        let captchaResponse = grecaptcha.getResponse();

        if (!captchaResponse) {
            e.preventDefault();

            alert("Por favor completa el reCAPTCHA.");
            return;
        }

        alert("Hola");
    });
    
});