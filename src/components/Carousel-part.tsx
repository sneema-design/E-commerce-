import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselPart() {
  return (
    <Carousel className="w-60% max-w-full mx-auto">
      <CarouselContent>
        <CarouselItem>
          <img
            src="alexander-andrews-OfvV-jkgrfQ-unsplash.jpg"
            alt="Sample 1"
            className="w-full h-80 object-cover rounded-lg"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src="photo-1719746295716-15f10148ae84.avif"
            alt="Sample 2"
            className="w-full h-80 object-cover rounded-lg"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src="https://picsum.photos/800/400?random=3"
            alt="Sample 3"
            className="w-full h-80 object-cover rounded-lg"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src="https://picsum.photos/800/400?random=4"
            alt="Sample 4"
            className="w-full h-80 object-cover rounded-lg"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src="https://picsum.photos/800/400?random=5"
            alt="Sample 5"
            className="w-full h-80 object-cover rounded-lg"
          />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
