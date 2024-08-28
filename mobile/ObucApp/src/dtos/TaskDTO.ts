export interface TaskDTO {
  id?: number;
  name: string;
  userName: string;
  description: string;
  status?: 'não iniciada' | 'em andamento' | 'concluída';
}