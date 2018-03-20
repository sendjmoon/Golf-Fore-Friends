'use strict';

module.exports = function(chartData, userHandicap) {
  const chartConfig = {
    type: 'line',
    data: chartData,
    options: {
      fontColor: '#fff',
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: '#a1a1a1',
          },
          ticks: {
            fontColor: '#fff',
          },
        }],
        yAxes: [{
          gridLines: {
            color: '#a1a1a1',
          },
          ticks: {
            fontColor: '#fff',
          },
        }],
      },
      elements: {
        line: {
          tension: 0.1,
          fill: true,
          borderWidth: 1.7,
          borderColor: '#fff',
          pointBackgroundColor: 'rgba(254, 172, 0, 1)',
          pointBorderColor: 'rgba(254, 172, 0, 1)',
        },
        point: {
          radius: 3,
          hoverRadius: 5,
          backgroundColor: 'rgba(254, 172, 0, 0.8)',
          borderColor: 'rgba(254, 172, 0, 0.8)',
        },
      },
      tooltips: {
        xPadding: 10,
        yPadding: 10,
        cornerRadius: 2,
        caretSize: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
          borderColor: 'rgba(77, 187, 51, 0.6)',
          borderWidth: 5,
          label: {
            backgroundColor: 'rgba(77, 187, 51, 0.4)',
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
