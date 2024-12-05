export class Protocols {
    id!: number; // Adicione o ID, conforme retornado pelo JSON
    createdAt!: string; // Mapeia para "created_at" no JSON
    updatedAt!: string; // Mapeia para "updated_at" no JSON
    user!: User; // Usuário associado
    reqInfo!: RequerimentoInfo; // Informações do requerimento (req_info no JSON)
    doc!: Document | null; // Documento associado
    admin!: Admin | null; // Administrador associado
    status!: number; // Status do protocolo
  }
  
  export class User {
    id!: number;
    name!: string;
    document!: string;
    email!: string;
  }
  
  export class RequerimentoInfo {
    id!: number;
    nameVisited!: string; // Altere para "name_visited" conforme o JSON
    cpfRne!: string; // Altere para "cpf_rne" conforme o JSON
    typeVisitation!: string; // Altere para "type_visitation" conforme o JSON
    cellphone!: string;
    state!: string;
    city!: string;
    district!: string;
    street!: string;
    numberHouse!: string; // Altere para "number_house" conforme o JSON
    subject!: string | null;
  }
  
  export class Document {
    title!: string;
    fileUrl!: string;
  }
  
  export class Admin {
    name!: string;
    role!: string;
  }