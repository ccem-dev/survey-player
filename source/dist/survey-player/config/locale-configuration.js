(function () {

  angular
    .module('otusjs.player.config')
    .config(['$mdDateLocaleProvider', localeConfiguration]);

  function localeConfiguration($mdDateLocaleProvider) {

    $mdDateLocaleProvider.formatDate = function (date) {
      if (Object.prototype.toString.call(date) !== '[object Date]') {
        return null;
      }
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + '/' + (monthIndex + 1) + '/' + year;
    };

    $mdDateLocaleProvider.parseDate = function (dateString) {
      var date = new Date(dateString);
      if (Object.prototype.toString.call(date) !== '[object Date]') {
        return date;
      } else {
        var newDateString = dateString.split('/');
        if (newDateString.length === 3) {
          date = new Date(newDateString[2], newDateString[1] - 1, newDateString[0]);
          return date;
        }
      }
    };
  }

}());
