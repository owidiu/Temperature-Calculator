function getData(e) {
  e.preventDefault();
  const ti = +document.getElementById("ti").value;
  const Rsi = +document.getElementById("Rsi").value;
  const te = +document.getElementById("te").value;
  const Rse = +document.getElementById("Rse").value;
  const walls = document.getElementById("straturi").value;
  console.log(ti);
  //calcule
  let R_values = [];
  let R = 0;
  let walls_values = walls.split("\n").map(aux => aux.split(","))
  console.log(walls_values)

  for (i = 0; i < walls_values.length; i++) {
    R_values[i + 1] = +walls_values[i][0] / +walls_values[i][1];
    R = R + R_values[i + 1];
  }

  let RT = Rsi + R + Rse;

  let O_values = [];
  let Osi = ti - (Rsi / RT) * (ti - te);
  console.log(Osi);
  let aux = 0;
  for (i = 0; i < walls_values.length; i++) {
    aux = R_values[i + 1] + aux;
    O_values[i + 1] = ti - ((Rsi + aux) / RT) * (ti - te);
  }

  let temperatura = [];
  temperatura[0] = ti;
  temperatura[1] = Osi;
  for (i = 1; i <= walls_values.length; i++) {
    temperatura[i + 1] = O_values[i];
  }
  temperatura[walls_values.length + 2] = te;
  drawchart(temperatura)
  console.log(temperatura);
}



function drawchart(temperatura) {


  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {

    data: {
      labels: [...temperatura.keys()],
      datasets: [{
        type: 'line',
        label: 'O_values',
        data: temperatura,
        borderColor: 'red',
        borderWidth: 3

      },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    }
  });

}
