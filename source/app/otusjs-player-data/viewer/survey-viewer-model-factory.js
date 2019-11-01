(function () {
  'use strict';

  angular
    .module('otusjs.player.data.viewer')
    .factory('otusjs.player.data.viewer.SurveyViewFactory', Factory);

  Factory.$inject = [
    'otusjs.model.activity.ActivityFacadeService'
  ];

  function Factory(ActivityFacadeService) {
    var self = this;

    self.create = create;

    function create() {
      return new ActivityView(ActivityFacadeService);
    }

    function ActivityView(ActivityFacadeService) {
      var self = this;

      let activity = ActivityFacadeService.surveyActivity;
      self.acronym = activity.surveyForm.acronym;
      self.name = activity.surveyForm.name;
      self.participantData = activity.participantData;
      self.lastStatus = activity.statusHistory.getLastStatus();
      self.mode = activity.mode;


      let items = ActivityFacadeService.surveyActivity.getItems();
      let navigationTrackerItems = ActivityFacadeService.getNavigationTracker().getItems();

      self.itemContainer = items.map(item => {
        let trackingItem = navigationTrackerItems[item.templateID];
        let filling = ActivityFacadeService.getFillingByQuestionID(item.templateID);

        return SurveyItemMapper(item, trackingItem, filling);
      });

      self.itemsCount = self.itemContainer.length;

      return self;
    }

    function SurveyItemMapper(item, trackingItem, filling) {
      let objectType = item.objectType;

      switch (objectType) {

        case 'TextItem':
          return new TextItemView(item, trackingItem, filling);

        case 'ImageItem':
          return new ImageItemView(item, trackingItem, filling);

        case 'CheckboxQuestion':
          return new CheckboxQuestionView(item, trackingItem, filling);

        case 'FileUploadQuestion':
          return new FileUploadQuestionView(item, trackingItem, filling);

        case 'SingleSelectionQuestion':
          return new SingleSelectionQuestionView(item, trackingItem, filling);

        case 'CalendarQuestion':
          return new CalendarQuestionView(item, trackingItem, filling);

        case 'TimeQuestion':
          return new TimeQuestionView(item, trackingItem, filling);

        case 'GridIntegerQuestion':
          return new GridIntegerQuestionView(item, trackingItem, filling);

        case 'GridTextQuestion':
          return new GridTextQuestionView(item, trackingItem, filling);

        default:
          return new QuestionView(item, trackingItem, filling);
      }
    }

    function TextItemView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.templateName = 'textItemView';

      self.value = item.value;
      return self;
    }

    function ImageItemView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.templateName = 'imageItemView';

      self.value = item.url;
      self.footer = item.footer;
      return self;
    }

    function CalendarQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'calendarQuestionView';

      return self;
    }

    function FileUploadQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'fileUploadQuestionView';

      return self;
    }

    function TimeQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'TimeQuestionView';

      return self;
    }

    function CheckboxQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'checkboxQuestionView';

      self.answer = item.options.map(item => {
        if (filling && filling.answer.value) {
          item.value = filling.answer.value.find(value => value.option === item.customOptionID).state;
        }
        return item;
      });

      return self;
    }

    function SingleSelectionQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'singleSelectionQuestionView';
      self.trueValue = 1;

      if (filling && filling.answer.value) {
        self.answer = item.options.map(options => {
          if (options.value.toString() === filling.answer.value.toString()) {
            options.value = 1;
          } else {
            options.value = 0;
          }
          return options;
        });
      } else {
        self.answer = item.options.map(options => {
          options.value = 0;
          return options;
        });
      }


      return self;
    }

    function GridIntegerQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'gridIntegerQuestionView';

      self.answer = item.getLinesList().map((line, lineIx) => {
        if (filling && filling.answer.value) {
          filling.answer.value[lineIx].forEach((pos, posIx) => {
            line.getGridIntegerList()[posIx].value = pos.value || ' ';
          });
        }

        return {positions: line.getGridIntegerList()};
      });

      return self;
    }

    function GridTextQuestionView(item, navigationTrackingItem, filling) {
      var self = new QuestionView(item, navigationTrackingItem, filling);

      self.templateName = 'gridTextQuestionView';

      self.answer = item.getLinesList().map((line, lineIx) => {
        if (filling && filling.answer.value) {
          filling.answer.value[lineIx].forEach((pos, posIx) => {
            line.getGridTextList()[posIx].value = pos.value || ' ';
          });
        }

        return {positions: line.getGridTextList()};
      });

      return self;
    }


    function QuestionView(item, navigationTrackingItem, filling) {
      var self = new SurveyItemView(item, navigationTrackingItem, filling);

      self.dataType = item.dataType;
      self.templateName = 'questionView';

      self.forceAnswer = undefined;
      self.answer = undefined;
      self.hasAnswer = undefined;
      self.hasMetadata = undefined;
      self.metadata = undefined;
      self.comment = undefined;
      self.hasComment = undefined;

      self.isAnswered = !!filling; //answer, metadata or comment

      if (self.isAnswered) {
        self.forceAnswer = filling.forceAnswer;
        self.answer = filling.answer.value;
        self.hasAnswer = filling.answer.isFilled();
        self.hasMetadata = filling.metadata.isFilled();
        if (self.hasMetadata) {
          self.metadata = item.metadata.options.find(metadata => metadata.value.toString() === filling.metadata.value.toString());
        }

        self.comment = filling.comment;
        self.hasComment = !!self.comment;
      }
      return self;
    }

    function SurveyItemView(item, navigationTrackingItem) {
      var self = this;

      self.objectType = item.objectType;
      self.templateID = item.templateID;
      self.customID = item.customID;
      self.label = item.label;
      self.isQuestion = item.isQuestion();

      self.navigationState = navigationTrackingItem.getState();
      self.navigationStateLabel = _translateStateLabel(self.navigationState);
      self.index = navigationTrackingItem.getIndex();
      self.isIgnored = navigationTrackingItem.isIgnored();
      self.isSkipped = navigationTrackingItem.isSkipped();

      function _translateStateLabel(state) {
        switch (state) {
          case 'ANSWERED':
            return "Respondida";
          case 'SKIPPED':
            return "Pulada";
          case 'NOT_VISITED':
            return "Não respondida";
          case 'VISITED':
            return "Visitada";
          case 'IGNORED':
            return "Ignorada";
        }
      }

      return self;
    }

    return self;

  }

}());
