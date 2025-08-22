function consultarDatos() {
  const email = document.getElementById("email").value;
  const numero = document.getElementById("numero").value;

  if (!email || !numero) {
    alert("Por favor, ingresa tanto el correo como el número.");
    return;
  }

  const apiUrl = "https://script.google.com/macros/s/AKfycbyfNNDpY2iT1weZmdK6nrR5iZ8JV1Ue1mH7jVOB4-ubBbVLTr1qcJUUDtWzOIKKQelxFw/exec?email=" 
    + encodeURIComponent(email) + "&numero=" + encodeURIComponent(numero);

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const resultado = document.getElementById("resultado");
      if (data.length === 0) {
        resultado.innerHTML = "<p>No se encontraron datos para ese correo y número.</p>";
      } else {
        let html = "<h2>Datos encontrados:</h2><ul>";
        data.forEach(row => {
          for (let key in row) {
            html += `<li><strong>${key}:</strong> ${row[key]}</li>`;
          }
        });
        html += "</ul>";
        resultado.innerHTML = html;
      }
    })
    .catch(err => {
      console.error("Error al consultar la API:", err);
      document.getElementById("resultado").innerHTML = "<p>Error al obtener datos.</p>";
    });
}
