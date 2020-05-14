(function () {
  angular.module('otusjs.player.component')
    .component('answerView', {
      templateUrl: 'app/otusjs-player-component/answer-view/answer-view-template.html',
      controller: "answerViewCtrl as $ctrl",
      bindings: {
        icon: '<',
        question: '@',
        itemData: '<',
        goBack: "&"
      }
    }).controller("answerViewCtrl", Controller);

  Controller.$inject = [
    'ICON',
    '$filter',
    'otusjs.player.core.player.PlayerService',
    'otusjs.player.core.renderer.TagComponentBuilderService'
  ];

  function Controller(ICON, $filter, PlayerService, TagComponentBuilderService) {
    var self = this;

    self.$onInit = onInit;
    self.goingBack = goingBack;
    self.viewQuestion = viewQuestion;
    self.isQuestion = isQuestion;
    self.isItem = isItem;

    function onInit() {
      self.hueClass = 'md-primary';
      self.iconEye = 'remove_red_eye';
      self.iconTooltip = 'Visualizar questão';
      self.view = false;
      self.itemData = angular.copy(self.itemData);
      _constructor();
    }

    function _constructor() {
      self.template = TagComponentBuilderService.createTagElement(self.itemData.objectType, true);
      self.itemData = angular.copy(self.itemData);
      self.icon = ICON[self.icon];

      switch (self.itemData.objectType) {
        case "TextItem":
          self.txtqst = "txtqst";
          self.label = self.itemData.value.ptBR.plainText;
          self.labelFormatted = self.itemData.value.ptBR.formattedText;
          break;

        case "ImageItem":
          self.label = "[IMAGEM]";
          break;

        default:
          _metadadaBuilder();
          self.answer = _containMetadada() ? 'Metadado: ' + self.METADADA[self.itemData.data.metadata.value - 1] : 'Resposta: ' + _formatAnswer();
          self.comment = self.itemData.data.comment ? 'Contém comentário(s)' : '';

          self.label = self.itemData.label.ptBR.plainText;
          self.labelFormatted = self.itemData.label.ptBR.formattedText;
      }
    }

    function _containMetadada() {
      return (self.itemData.data.metadata.value !== null);
    }

    function _metadadaBuilder() {
      self.METADADA = [];
      self.itemData.metadata.options.forEach(function (option) {
        self.METADADA.push(option.label.ptBR.plainText);
      });
    }

    function goingBack() {
      PlayerService.setGoBackTo(self.itemData.templateID);
      self.goBack();
    }

    function viewQuestion() {
      self.view = !self.view;
      if (self.view) {
        self.iconTooltip = 'Ocultar questão';
        self.hueClass = 'md-accent';
        self.iconEye = 'visibility_off';
      } else {
        self.iconTooltip = 'Visualizar questão';
        self.hueClass = 'md-primary';
        self.iconEye = 'remove_red_eye';
      }
    }

    function formatDate(value) {
      var format = 'dd/MM/yyyy';
      return value ? $filter('date')(new Date(value), format) : "";
    }

    function formatTime(value) {
      var format = 'HH:mm';
      return value ? $filter('date')(new Date(value), format) : "";
    }

    function formatSingleSelection() {
      var _answer = '';
      self.itemData.options.find(function (option) {
        if (option.value === parseInt(self.itemData.data.answer.value)) {
          _answer = self.itemData.options[option.value - 1].label.ptBR.plainText;
        }
      });
      return _answer;
    }

    function formatFileUpload() {
      var _answer = "";
      if (self.itemData.data.answer.value) {
        self.itemData.data.answer.value.forEach(function (value) {
          _answer = _answer + angular.copy(value.name) + "; ";
        });
      }
      return _answer;
    }

    function isQuestion() {
      return !isItem();
    }

    function isItem() {
      return (self.itemData.objectType === 'ImageItem') || (self.itemData.objectType === 'TextItem');
    }

    function _formatAnswer() {
      var answer = "";
      switch (self.icon) {
        case "date_range":
          answer = formatDate(self.itemData.data.answer.value);
          break;
        case "access_time":
          answer = formatTime(self.itemData.data.answer.value);
          break;
        case "radio_button_checked":
          answer = formatSingleSelection();
          break;
        case "check_box":
          answer = "Multiplas respostas, clique em visualizar questão.";
          break;
        case "filter_none":
          answer = "Multiplas respostas, clique em visualizar questão.";
          break;
        case "filter_1":
          answer = "Multiplas respostas, clique em visualizar questão.";
          break;
        case "attach_file":
          answer = formatFileUpload();
          break;
        default:
          answer = self.itemData.data.answer.value !== null ? self.itemData.data.answer.value : '';
      }

      return answer;

    }
  }
}());
