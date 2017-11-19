'use strict';

module.exports = function(chartData, userHandicap) {
  const chartConfig = {
    type: 'line',
    data: chartData,
    options: {
      defaultFontColor: '#4b4e54',
      responsive: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: '#f1f1f1',
          },
        }],
        yAxes: [{
          gridLines: {
            color: '#f1f1f1',
          },
        }],
      },
      elements: {
        line: {
          tension: 0.1,
          fill: false,
          borderWidth: 2,
          borderColor: 'rgba(75, 78, 84, 0.9)',
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
        backgroundColor: 'rgba(75, 78, 84, 0.6)',
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
          borderColor: 'rgba(77, 187, 51, 0.3)',
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
