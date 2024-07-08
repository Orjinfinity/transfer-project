import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./SliderDot";
import { NextButton, PrevButton, usePrevNextButtons } from "./SliderNav";

const SliderItem = ({ children }) => {
  return <div className="embla__slide">{children}</div>;
};

const Slider = ({ children, ...otherProps }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    inViewThreshold: 1,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>

      <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>


        {/* <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div> */}
    </div>
  );
};

Slider.Item = SliderItem;
Slider.DotButton = DotButton;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;

export default Slider;
