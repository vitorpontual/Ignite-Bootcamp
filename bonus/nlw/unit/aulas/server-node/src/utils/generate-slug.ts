export function slugify(text: string): string {
    return text
        .normalize("NFD") // Normaliza caracteres unicode e separa os acentos
        .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
        .toLowerCase() // Converte para minúsculas
        .replace(/[^\w\s-]/g, "") // Remove caracteres não alfanuméricos, exceto espaços e hífens
        .replace(/\s+/g, "-") // Substitui espaços por hífens
        .replace(/--+/g, "-") // Remove múltiplos hífens por apenas um
        .trim(); // Remove espaços extras no início e no final
}