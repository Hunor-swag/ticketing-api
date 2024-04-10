export type Project = {
  id?: number;
  name: string;
  description: string;
  user_id: number;
  created: Date;
};

export type Issue = {
  id?: number;
  project_id: number;
  user_id: number;
  type: string;
  status: string;
  name: string;
  description: string;
  created: Date;
  users: Array<{ id: number }>;
};

export type Message = {
  id?: number;
  issue_id: number;
  user_id: number;
  message: string;
  timestamp: Date;
};

export type Email = {
  id?: number;
  to_email: string;
  from_email: string;
  content: string;
  subject: string;
  timestamp: Date;
};

export type ReadReceipt = {
  id?: number;
  project_id: number;
  user_id: number;
  issue_id: number;
  message_id: number;
  timestamp: Date;
};

export type System = {
  id?: number;
  name: string;
  slug: string;
  db_name: string;
  description: string;
  created: Date;
};
