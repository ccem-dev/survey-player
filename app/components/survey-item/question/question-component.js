(function() {
    'use strict';

    angular
        .module('otus.preview.component')
        .component('otusQuestion', {
            templateUrl: 'app/components/survey-item/question/question-template.html',
            controller: OtusQuestionController,
            bindings: {
                itemData : '<'
            }
        });

    OtusQuestionController.$inject = [];

    function OtusQuestionController($element) {
        var self = this;
        self.isCalendarQuestion = isCalendarQuestion;

        self.$onInit = function() {
        };

        function isCalendarQuestion() {
            return self.itemData.objectType === 'CalendarQuestion' ? true : false;
        }

    }

})();
