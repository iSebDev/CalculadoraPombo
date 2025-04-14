document.addEventListener("DOMContentLoaded", () => {
    const materiales = ["Hielo", "Vidrio", "Madera", "Acero", "Cuero"];

    const comboBoxes = document.querySelectorAll(".materials");
    const checkDiv = document.querySelector(".check-div")
    const results = document.querySelector("#results");
    const form = document.querySelector("form");

    const masaValue = document.querySelector("#value-masa");
    const gradoValue = document.querySelector("#value-grado");
    const coefValue = document.querySelector("#value-mat");
    const eqValue = document.querySelector("#value-eq");
    const concValue = document.querySelector("#value-conc");

    const otroCheck = document.querySelector("#otro");
    const otroCoef = document.querySelector("#other-coef");

    // Objeto - Superficie
    const coefs = {
        "0-0": 0.1, // Hielo - Hielo
        "0-1": 0.05, // Hielo - Vidrio
        "0-2": 0.15, // Hielo - Madera
        "0-3": 0.03, // Hielo - Acero
        "0-4": 0.05, // Hielo - Cuero
        "1-0": 0.02, // Vidrio - Hielo
        "1-1": 0.3, // Vidrio - Vidrio
        "1-2": 0.25, // Vidrio - Madera
        "1-3": 0.5, // Vidrio - Acero
        "1-4": 0.3, // Vidrio - Cuero
        "2-0": 0.2, // Madera - Hielo
        "2-1": 0.3, // Madera - Vidrio
        "2-2": 0.7, // Madera - Madera
        "2-3": 0.4, // Madera - Acero
        "2-4": 0.4, // Madera - Cuero
        "3-0": 0.1, // Acero - Hielo
        "3-1": 0.4, // Acero - Vidrio
        "3-2": 0.5, // Acero - Madera
        "3-3": 0.6, // Acero - Acero 
        "3-4": 0.4, // Acero - Cuero
        "4-0": 0.1, // Cuero - Hielo
        "4-1": 0.4, // Cuero - Vidrio
        "4-2": 0.5, // Cuero - Madera
        "4-3": 0.4, // Cuero - Acero
        "4-4": 0.6  // Cuero - Cuero
    };

    const coefRoz = (m1, m2) => coefs[`${m1}-${m2}`];

    const configCombo = (combo, opciones) => {
        combo.innerHTML = opciones.map((nombre, i) => 
            `<option value="${i}" ${i === 0 ? "selected" : ""}>${nombre}</option>`
        ).join("");
    };

    comboBoxes.forEach(combo => configCombo(combo, materiales));

    otroCheck.addEventListener("change", () => {
        if (otroCheck.checked) {
            comboBoxes.forEach(combo => combo.setAttribute("disabled", ""));
            otroCoef.classList.add("show");
            otroCoef.querySelector("input").setAttribute("required", "");
            checkDiv.style = "transform: translateX(-20px); opacity: 0;";
        } else {
            comboBoxes.forEach(combo => combo.removeAttribute("disabled"));
            otroCoef.classList.remove("show");
            otroCoef.querySelector("input").removeAttribute("required");
            checkDiv.style = "transform: translateX(20px); opacity: 0;";
        } 

        setTimeout(() => {
            checkDiv.style = "opacity: 1;";
        }, 500)
    });

    const evaluar = (masaGr, anguloDeg, coef) => {
        const g = 9.8;
        const masaKg = masaGr / 1000;
        const peso = masaKg * g;

        const pesoX = peso * Math.sin(anguloDeg * Math.PI / 180);
        const pesoY = peso * Math.cos(anguloDeg * Math.PI / 180);
        const fuerzaRozMax = coef * pesoY;

        const equilibrio = fuerzaRozMax >= pesoX;

        return {
            kg: masaKg.toFixed(2),
            eq: equilibrio,
            fr: pesoX.toFixed(3),
            frm: fuerzaRozMax.toFixed(3)
        };
    };

    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") document.querySelector("#calcular").click();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const captchaResponse = grecaptcha.getResponse();
        if (captchaResponse) {
            alert("Por favor completa el reCAPTCHA.");
            return;
        }

        const formData = new FormData(form);
        const { masa = 0, angulo: ang = 0, m1 = 0, m2 = 0 } = Object.fromEntries(formData);

        const coef = coefRoz(m1, m2);
        const resultado = evaluar(masa, ang, coef);
        const sym = resultado.frm >= resultado.fr ? "≥" : "≤";

        masaValue.textContent = `${resultado.kg} kg`;
        gradoValue.textContent = `${ang}°`;
        coefValue.textContent = coef;
        concValue.textContent = `${resultado.frm}N ${sym} ${resultado.fr}N`;
        eqValue.textContent = resultado.eq ? "Sí" : "No";

        results.classList.add("show");
        
        location.hash = '';

        const lastResult = results.querySelector(".row-div").lastElementChild.id;

        setTimeout(() => location.hash = lastResult, 600);
    });
});
