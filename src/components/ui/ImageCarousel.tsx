import React from "react"

import carousel1 from "@/assets/carousel_1.avif"
import carousel2 from "@/assets/carousel_2.avif"
import carousel3 from "@/assets/carousel_3.avif"
import carousel4 from "@/assets/carousel_4.avif"
import carousel5 from "@/assets/carousel_5.avif"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const images = [
carousel1,carousel2,carousel3,carousel4,carousel5
]

export function ImageCarousel() {
  return (
    <Carousel className="relative w-full">
      <CarouselContent className="h-64 md:h-96">
        {images.map((src, index) => (
          <CarouselItem key={index} className="relative h-full shrink-0 basis-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="!left-4" aria-label="Previous slide" />
      <CarouselNext className="!right-4" aria-label="Next slide" />
    </Carousel>
  )
}
