'use strict';

module.exports = function(chartData) {
  const doughnutConfig = {
    type: 'doughnut',
    data: chartData,
    options: {
      responsive: false,
      cutoutPercentage: 50,
      animation: {
        animateScale: true,
      },
    },
  };

  return doughnutConfig;
};
