'use strict';

module.exports = function(chartData, userHandicap) {
  const chartConfig = {
    type: 'line',
    data: chartData,
    options: {
      fontColor: '#4b4e54',
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: '#f1f1f1',
          },
          ticks: {
            fontColor: '#4b4e54',
          },
        }],
        yAxes: [{
          gridLines: {
            color: '#f1f1f1',
          },
          ticks: {
            fontColor: '#4b4e54',
          },
        }],
      },
      elements: {
        line: {
          tension: 0.1,
          fill: true,
          borderWidth: 2.5,
          borderColor: '#b2d9f9',
          pointBackgroundColor: 'rgba(254, 172, 0, 1)',
          pointBorderColor: 'rgba(254, 172, 0, 1)',
        },
        point: {
          radius: 3,
          hoverRadius: 5,
          backgroundColor: '#329af0',
          borderColor: '#329af0',
        },
      },
      tooltips: {
        xPadding: 10,
        yPadding: 10,
        cornerRadius: 2,
        caretSize: 8,
        backgroundColor: 'rgba(50, 154, 240, 0.7)',
        titleFontSize: 14,
        titleSpacing: 4,
        titleMarginBottom: 10,
        bodyFontSize: 14,
        bodySpacing: 4,
      },
      annotation: {
        drawTime: 'afterDatasetsDraw',
        annotations: [{
          drawTime: 'afterDatasetsDraw',
          id: 'h-line-1',
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: userHandicap,
          // borderColor: 'rgba(77, 187, 51, 0.3)',
          borderColor: 'rgba(0, 0, 0, 0.3)',
          borderWidth: 4,
          label: {
            // backgroundColor: 'rgba(77, 187, 51, 0.4)',
            backgroundColor: '#4b4e54',
            position: 'center',
            enabled: true,
            content: 'Handicap: ' + userHandicap,
          },
        }],
      },
    },
  };

  return chartConfig;
};
