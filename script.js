function consultarDatos() {
  const email = document.getElementById("email").value;
  const numero = document.getElementById("numero").value; // Capturamos el nuevo valor
  
  if (!email || !numero) {
    alert("Por favor, ingresa tanto el correo como el número.");
    return;
  }
  
  // Agregamos el nuevo parámetro 'numero' a la URL
  const apiUrl = "https://script.google.com/macros/s/AKfycbyfNNDpY2iT1weZmdK6nrR5iZ8JV1Ue1mH7jVOB4-ubBbVLTr1qcJUUDtWzOIKKQelxFw/exec?email=" + encodeURIComponent(email) + "&numero=" + encodeURIComponent(numero);

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const resultado = document.getElementById("resultado");
      if (data.length === 0) {
        resultado.innerHTML = "
No se encontraron datos para ese correo y número.

";
      } else {
        let html = "Datos encontrados:
";
        data.forEach(row => {
          for (let key in row) {
            html += `<li><strong>${key}:</strong> ${row[key]}</li>`;
          }
        });
        html += "
";
        resultado.innerHTML = html;
      }
    })
    .catch(err => {
      console.error("Error al consultar la API:", err);
      document.getElementById("resultado").innerHTML = "Error al obtener datos.

";
    });
}