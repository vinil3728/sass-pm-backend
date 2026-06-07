import { AuditLog } from '../models/audit-log.model';

export class AuditLogRepository {
  async create(
    data: Partial<AuditLog>
  ): Promise<AuditLog> {
    return AuditLog.create(data);
  }
}