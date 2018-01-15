import initialState from "./initialState";

export const RESET_NOTIFICATION = "RESET_NOTIFICATION"

/**
 * https://stackoverflow.com/questions/35417507/how-to-make-a-global-error-handler-in-redux-and-override-it-when-needed
 *
 * Exemplos
 * - Mensagem de erro a ser exibida no rodape (SnackBar = comportamento padrao)
 *   action = {error: new Erro("Mensagem de erro")}
 *
 */
export default function notifications(state = initialState.notifications, action) {
  if (action.type === RESET_NOTIFICATION) {
    return {
      status: ""
    }
  }
  if (!action.meta || action.ignoreNotification) {
    return state
  }
  if (action.meta){
    if(action.meta.errorMessage || action.meta.successMessage){
      return {
        status: action.meta.errorMessage || action.meta.successMessage
      }
    }
  }
  return state
}

export function resetNotification() {
  return {type: RESET_NOTIFICATION}
}
