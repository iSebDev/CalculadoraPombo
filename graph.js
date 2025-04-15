export function drawGraph(canvas, angulo, coef) {
    const ctx = canvas.getContext("2d");

    // Resetear canva
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Establecer tamaños
    const w = canvas.width;
    const h = canvas.height;
    const len = 125;

    // Establecer centro
    const cx = w / 2;
    const cy = h / 2;

    const planoLong = Math.sqrt(w * w + h * h);
    const boxSize = 80;

    // Dibujamos el plano inclinado y la caja
    ctx.save();
    ctx.translate(cx, cy);  // Mover el origen al centro del canvas
    ctx.rotate((-angulo * Math.PI) / 180);  // Rotar según el ángulo del plano

    // Dibujar el plano inclinado
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-planoLong / 2, 0);
    ctx.lineTo(planoLong / 2, 0);
    ctx.stroke();

    ctx.restore();

    // Dibujar las flechas de fuerzas
    drawAll(ctx, cx, cy, coef, angulo, boxSize, len);
}

function drawAll(ctx, cx, cy, coef, angulo, boxSize, length) {
    ctx.save();

    // Mover al centro del canvas y rotar según el ángulo del plano
    ctx.translate(cx, cy);
    ctx.rotate((-angulo * Math.PI) / 180);

    ctx.font = "16px Arial";

    // Dibujar la caja
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(-boxSize / 2, -boxSize, boxSize, boxSize);

    // Normal
    drawArrow(ctx, 0, -boxSize / 2, 0, -length, "blue");
    ctx.fillText("Normal", 10, -length + 10);

    // Pesos y Fuerza Fricción

    const pesoYLength = length / 2;
    const pesoXLength = Math.min(80, Math.max(10, Math.sqrt(length ** 2 - pesoYLength ** 2)));

    if (angulo < 90 && angulo > 0) {
        // Py
        drawArrow(ctx, 0, -boxSize / 2, 0, pesoYLength, "orange");
        ctx.fillText("Py", 10, pesoYLength);
        
        // Px
        drawArrow(ctx, 0, -boxSize / 2, -pesoXLength, -boxSize / 2, "orange");
        ctx.fillText("Px", -pesoXLength + 10, -boxSize / 2 - 10);

        // Fuerza Fricción
        const friccionLength = Math.min(80, Math.max(10, (Math.round(coef) + 0.5) * Math.abs(pesoYLength)));
        drawArrow(ctx, 0, -boxSize / 2, friccionLength, -boxSize / 2, "green");
        ctx.fillText("Fricción", friccionLength + 10, -boxSize / 2 - 10);
    }
    ctx.restore();
    ctx.font = "16px Arial";

    // Peso 
    const pesoTotal = Math.sqrt(pesoXLength ** 2 + pesoYLength ** 2);
 
    const angleRad = (-angulo * Math.PI) / 180;
    const localX = 0;
    const localY = -boxSize / 2;

    const startX = cx + localX * Math.cos(angleRad) - localY * Math.sin(angleRad);
    const startY = cy + localX * Math.sin(angleRad) + localY * Math.cos(angleRad);

    const endX = startX;
    const endY = startY + pesoTotal;

    drawArrow(ctx, startX, startY, endX, endY, "red");

    // Texto "P"
    ctx.fillStyle = "red";
    ctx.font = "14px sans-serif";
    ctx.fillText("P", endX + 5, endY - 5);
    ctx.restore();
}

function drawArrow(ctx, fromX, fromY, toX, toY, color) {
    const headLength = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Punta de la flecha
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.lineTo(toX, toY);
    ctx.fillStyle = color;
    ctx.fill();
}