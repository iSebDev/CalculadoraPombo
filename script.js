document.addEventListener("DOMContentLoaded", () => {
    const materiales = ["Hielo", "Vidrio", "Madera", "Acero", "Cuero"];

    const comboBoxes = document.querySelectorAll(".materials");
    
    const results = document.querySelector("#results")

    const form = document.querySelector("form");

    const masaValue = document.getElementById("value-masa");
    const gradoValue = document.getElementById("value-grado");
    const coefValue = document.getElementById("value-material");

    const eqValue = document.getElementById("value-eq");

    const coefs = {
        "0-0": 0.1, // Hielo - Hielo
        "0-1": 0.05, // Hielo - Vidrio
        "0-2": 0.55, // Hielo - Madera
        "0-3": 0.03, // Hielo - Acero
        "0-4": 0.02, // Hielo - Cuero
        "1-0": 0.02, // Vidrio - Hielo
        "1-1": 0.9, // Vidrio - Vidrio
        "1-2": 0.25, // Vidrio - Madera
        "1-3": 0.5, // Vidrio - Acero
        "1-4": 0.3, // Vidrio - Cuero
        "2-0": 0.2, // Madera - Hielo
        "2-1": 0.3, // Madera - Vidrio
        "2-2": 0.7, // Madera - Madera
        "2-3": 0.4, // Madera - Acero
        "2-4": 0.7, // Madera - Cuero
        "3-0": 0.1, // Acero - Hielo
        "3-1": 0.4, // Acero - Vidrio
        "3-2": 0.5, // Acero - Madera
        "3-3": 0.74, // Acero - Acero
        "3-4": 0.4, // Acero - Cuero
        "4-0": 0.03, // Cuero - Hielo
        "4-1": 0.1, // Cuero - Vidrio
        "4-2": 0.5, // Cuero - Madera
        "4-3": 0.4, // Cuero - Acero
        "4-4": 0.6 // Cuero - Cuero
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

    const evaluar = (m, a, c) => {
        // m = masa (gramos)
        // a = inclinación superficie (°)
        // c = coef Roz

        let kg = m / 1000;

        const g = 9.81;

        let fn = kg * g;

        let froz = c * fn;

        let rad = fn * Math.sin(a * Math.PI / 180);

        let eq = froz >= rad;

        return {
            "kg": kg,
            "fn": fn,
            "froz": froz,
            "eq": eq
        }
    };

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
        const masa = formData.get("masa") || 0;
        const ang = formData.get("angulo") || 0;

        const m1 = formData.get("m1") || 0;
        const m2 = formData.get("m2") || 0;

        const coef = coefs[`${m1}-${m2}`];

        var resultado = evaluar(masa, ang, coef);

        masaValue.innerText = `${resultado.kg} kg`;
        gradoValue.innerText = `${ang}°`;
        coefValue.innerText = coef;

        eqValue.innerText = resultado.eq ? "Si" : "No";
        
        results.classList.add("show");

        setTimeout(() => {
            document.location.href = "#results";
        }, 350);

    });
    
});