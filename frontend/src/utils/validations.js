export const required = value =>
	value ? undefined : "Este campo é obrigatório";

export const maxLength = (e, max) => {
	return e.target.value.length > max?  false: e.target.value
}

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "E-mail inválido"
    : undefined;


export default {
	required,
	maxLength,
	email
}