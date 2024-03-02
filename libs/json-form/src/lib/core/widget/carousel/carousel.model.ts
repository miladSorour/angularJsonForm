import {BaseEntity} from "../../model/baseEntity.model";

export class CarouselModel extends BaseEntity<number> {
  constructor(
    public title?: string,
    public fileCode?: string,
    public enable?: boolean,
  ) {
    super();
  }
}
