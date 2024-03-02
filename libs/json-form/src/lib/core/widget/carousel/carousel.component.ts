import {Component, OnInit} from '@angular/core';
import {CarouselService} from "./carousel.service";
import {CarouselModel} from "./carousel.model";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  providers: [NgbCarouselConfig],
})
export class CarouselComponent implements OnInit {

  public carousel: CarouselModel[] = [];

  constructor(private carouselService: CarouselService, config: NgbCarouselConfig) {
    config.showNavigationIndicators = true;
    config. showNavigationArrows = true;
    config.interval = 5000;
    config.animation = true;
    config.keyboard = true;
    config.pauseOnFocus = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.carouselService.enableImages().subscribe((images: any) => {
      this.carousel = images;
    });
  }

}
