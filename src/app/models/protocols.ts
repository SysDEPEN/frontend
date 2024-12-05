export class Protocols {
  id!: number; // ID do protocolo
  created_at!: string; // Data de criação do protocolo
  updated_at!: string; // Data de atualização do protocolo
  user!: User; // Usuário associado ao protocolo
  reqInfo!: RequerimentoInfo; // Informações do requerimento
  doc!: Document | null; // Documento associado (se houver)
  admin!: Admin | null; // Administrador associado (se houver)
  status!: number; // Status do protocolo
}

export class User {
  id!: number;
  name!: string; // Nome do visitante
  document!: string; // Documento do visitante (CPF, RG, etc.)
  email!: string; // E-mail do visitante
}

export class RequerimentoInfo {
  id!: number;
  nameVisited!: string; // Nome do visitado
  cpfRne!: string; // CPF ou RNE do visitado
  typeVisitation!: string; // Tipo de visitação
  cellphone!: string; // Telefone do visitante
  state!: string; // Estado
  city!: string; // Cidade
  district!: string; // Bairro
  street!: string; // Rua
  numberHouse!: string; // Número da casa
  subject!: string | null; // Assunto da visita
}

export class Document {
  title!: string; // Título do documento
  fileUrl!: string; // URL do arquivo
}

export class Admin {
  name!: string; // Nome do administrador
  role!: string; // Papel do administrador
}
