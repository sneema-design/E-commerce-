import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselPart() {
  return (
    <Carousel className="w-full max-w-full mx-auto">
      <CarouselContent>
        <CarouselItem>
          <img
            src="https://picsum.photos/800/400?random=1"
            alt="Sample 1"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src="https://picsum.photos/800/400?random=2"
            alt="Sample 2"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src="https://picsum.photos/800/400?random=3"
            alt="Sample 3"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src="https://picsum.photos/800/400?random=4"
            alt="Sample 4"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src="https://picsum.photos/800/400?random=5"
            alt="Sample 5"
            className="w-full h-64 object-cover rounded-lg"
          />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
