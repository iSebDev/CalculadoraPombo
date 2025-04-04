document.addEventListener("DOMContentLoaded", () => {
    const materiales = ["Hielo", "Vidrio", "Madera", "Acero", "Cuero"];

    const comboBoxes = document.querySelectorAll(".materials");

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
});