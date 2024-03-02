import { BaseEntity } from '@pnrng/json-form';

export class ModalFormModel extends BaseEntity<number> {
  constructor(
    public personnelId?: number,
    public organizationId?: number,
    public startDate?: string,
    public isSeparate?: boolean,
    public separateDate?: string
  ) {
    super();
  }
}
