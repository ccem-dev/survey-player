(function () {

  'use strict';
  angular.module('otusjs.player.core.player')
    .constant('PLAYER_SERVICE_CORE_CONSTANTS', {

      REASONS_TO_LIVE_PLAYER: {
        IS_NOT_ME: {
          id: 'IS_NOT_ME',
          icon: {
            name: 'thumb_up',
            color: "green",
          },
          highlightedText: {
            text: 'Obrigado pela notificação.',
            color: "#66b266"
          },
        },
        GET_OUT_WITHOUT_SAVE: {
          id: 'GET_OUT_WITHOUT_SAVE',
          icon: {
            name: 'meeting_room',
            color: "orange",
          },
          highlightedText: {
            text: 'Você saiu sem salvar ou finalizar a atividade.',
            color: "orange"
          }
        },
        SAVE: {
          id: 'SAVE',
          icon: {
            name: 'save',
            color: "#00786c",
          },
          highlightedText: {
            text: 'Sua atividade foi salva, porém ainda não foi finalizada.',
            color: "#009688"
          },
          text: ["Para finalizar, preencha o questionário até o final."]
        },
        FINALIZE: {
          id: 'FINALIZE',
          icon: {
            name: 'check_circle',
            color: "blue"
          },
          highlightedText: {
            text: 'Você finalizou a atividade.',
            color: "dodgerblue"
          },
          text: ['Obrigado.']
        },
        ALREADY_FINALIZED: {
          id: 'ALREADY_FINALIZED',
          icon: {
            name: 'check_circle',
            color: "blue"
          },
          highlightedText: {
            text: 'Você já finalizou esta atividade.',
            color: "dodgerblue"
          },
          text: [
            'Se quiser preenchê-la novamente, entre em contato com seu centro.',
            'Obrigado.'
          ]
        },
        UNAUTHORIZED: {
          id: 'UNAUTHORIZED',
          icon: {
            name: 'sentiment_very_dissatisfied',
            color: "red"
          },
          highlightedText: {
            text: 'Este link expirou ou é inválido.',
            color: "lightcoral"
          },
          text: [
            'Entre em contato com seu projeto para obter novo link de acesso.',
            'Obrigado.'
          ]
        },
        OFFLINE_ERROR: {
          id: 'OFFLINE_ERROR',
          icon: {
            name: 'cloud_off',
            color: "red"
          },
          highlightedText: {
            text: 'Erro ao conectar com o servidor',
            color: "lightcoral"
          },
          text: [
            'A atividade <b>foi armazenada</b> em seu dispositivo.</br> É possível sincronizá-la quando houver acesso à internet</br> através do botão <b>Atividades Pendentes</b>',
          ]
        },
        BAD_REQUEST_ERROR: {
          id: 'BAD_REQUEST_ERROR',
          icon: {
            name: 'cloud_off',
            color: "red"
          },
          highlightedText: {
            text: 'Erro ao conectar com o servidor ou link inválido',
            color: "lightcoral"
          },
          text: [
            'Tente novamente mais tarde ou entre em contato com o seu projeto'
          ]
        },
        UNEXPECTED_ERROR: {
          id: 'UNEXPECTED_ERROR',
          icon: {
            name: 'sentiment_very_dissatisfied',
            color: "red"
          },
          highlightedText: {
            text: 'Ocorreu um erro inesperado',
            color: "lightcoral"
          },
          text: [
            'Tente novamente mais tarde ou entre em contato com o seu projeto'
          ]
        }
      }

    });
})();
