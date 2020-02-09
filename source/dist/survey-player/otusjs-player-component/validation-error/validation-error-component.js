(function() {
  'use strict';

  angular
    .module('otusjs.player.component')
    .component('otusValidationError', {
      template:'<ng-messages layout="column" layout-align="end start" for="$ctrl.$error" layout-padding ng-messages-multiple role="alert" flex><ng-message class="md-button md-warn" when="mandatory"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Questão de preenchimento obrigatório</span></ng-message><ng-message class="md-button md-warn" when="distinct"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Insira um valor diferente de {{ $ctrl.reference(\'distinct\') }}</span></ng-message><ng-message class="md-button md-warn" when="lowerLimit"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior ou igual a {{ $ctrl.reference(\'lowerLimit\') }}</span></ng-message><ng-message class="md-button md-warn" when="upperLimit"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser menor ou igual a {{ $ctrl.reference(\'upperLimit\') }}</span></ng-message><ng-message class="md-button md-warn" when="rangeDate"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior que {{ $ctrl.referenceAsDate(\'rangeDate\').initial }} e menor que {{ $ctrl.referenceAsDate(\'rangeDate\').end }}</span></ng-message><ng-message class="md-button md-warn" when="maxDate"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser menor que {{ $ctrl.referenceAsDate(\'maxDate\')}}</span></ng-message><ng-message class="md-button md-warn" when="minDate"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser maior que {{ $ctrl.referenceAsDate(\'minDate\')}}</span></ng-message><ng-message class="md-button md-warn" when="pastDate"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser anterior à data corrente</span></ng-message><ng-message class="md-button md-warn" when="futureDate"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">A data deve ser posterior à data corrente</span></ng-message><ng-message class="md-button md-warn" when="minLength"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve ter no mínimo {{ $ctrl.reference(\'minLength\') }} caracteres</span></ng-message><ng-message class="md-button md-warn" when="maxLength"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve ter no máximo {{ $ctrl.reference(\'maxLength\') }} caracteres</span></ng-message><ng-message class="md-button md-warn" when="in"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">O valor deve ser maior ou igual a {{ $ctrl.reference(\'in\').initial }} e menor ou igual a {{ $ctrl.reference(\'in\').end }}</span></ng-message><ng-message class="md-button md-warn" when="precision"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve conter exatamente {{ $ctrl.reference(\'precision\') }} dígitos</span></ng-message><ng-message class="md-button md-warn" when="scale"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Resposta deve conter exatamente {{ $ctrl.reference(\'scale\') }} casas decimais</span></ng-message><ng-message class="md-button md-warn" when="maxTime"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Hora máxima permitida: {{ $ctrl.referenceAsTime(\'maxTime\') }}</span></ng-message><ng-message class="md-button md-warn" when="minTime"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Hora mínima permitida: {{ $ctrl.referenceAsTime(\'minTime\') }}</span></ng-message><ng-message class="md-button md-warn" when="quantity"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade selecionada deve ser igual a {{ $ctrl.reference(\'quantity\') }}</span></ng-message><ng-message class="md-button md-warn" when="minSelected"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade mínima selecionada deve ser {{ $ctrl.reference(\'minSelected\') }}</span></ng-message><ng-message class="md-button md-warn" when="maxSelected"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Quantidade máxima selecionada deve ser {{ $ctrl.reference(\'maxSelected\')}}</span></ng-message><ng-message class="md-button md-warn" when="ImmutableDate"><md-icon hide-xs md-font-set="material-icons">error_outline</md-icon><span></span> <span class="md-body-1">Formato Inválido</span></ng-message></ng-messages>',
      controller: otusValidationErrorController,
      bindings: {
        $error: '=error'
      },
      require: {
        otusSurveyItem: '^otusSurveyItem'
      }
    });

  otusValidationErrorController.$inject = [
    'otusjs.player.data.activity.CurrentItemService',
    '$filter',
    '$element'
  ];

  function otusValidationErrorController(CurrentItemService, $filter, $element) {
    var self = this;
    var templateID = null;

    self.$onInit = onInit;
    self.referenceAsDate = referenceAsDate;
    self.referenceAsTime = referenceAsTime;
    self.reference = reference;
    self.focus = focus;

    function onInit() {
      self.otusSurveyItem.errorComponent = self;
      templateID = self.otusSurveyItem.errorComponent.otusSurveyItem.itemData.templateID;
    }

    function referenceAsDate(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference;
      var date;

      if (type === 'rangeDate') {
        date = {
          'initial': $filter('date')(new Date(reference.initial.value), 'dd/MM/yyyy'),
          'end': $filter('date')(new Date(reference.end.value), 'dd/MM/yyyy')
        };
      } else {
        date = $filter('date')(new Date(reference.value), 'dd/MM/yyyy');
      }
      return date;
    }

    function referenceAsTime(type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference.value;
      return $filter('date')(new Date(reference), 'hh:mm a');
    }

    function reference (type) {
      var reference = CurrentItemService.getFillingRules(templateID)[type].data.reference;
      return reference;
    }

    function focus() {
      $element.focus();
    }
  }
}());
