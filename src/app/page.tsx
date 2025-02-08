import Hero from "@/public/images/img-hero.jpg";
import { nanum } from "./ui/font";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
import Brushstroke from "@/components/brushstroke";
export default function Home() {
  return (
    <section>
      <div className="flex h-[38rem] lg:flex-row flex-col gap-24 lg:gap-4">
        <div className="flex-1 flex  items-center justify-center lg:justify-start p-6">
          <div className="flex flex-col ">
            <h1 className="text-4xl font-semibold  ">
              Hey there this is <br />{" "}
              <span
                className={`${nanum.className} relative text-6xl w-fit z-10`}
              >
                Vishwang Suthar
              </span>
              <Brushstroke />
            </h1>

            <p className="text-lg">
              Creating some patterns in this infinite chaos.
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {/* <Image
            className="h-full w-full rounded-lg"
            alt="profile_img"
            src={Hero}
          /> */}
          <TiltedCard
            imageSrc={Hero}
            altText="Cover"
            captionText="Dripy"
            containerHeight="360px"
            containerWidth="360px"
            imageHeight="360px"
            imageWidth="360px"
            rotateAmplitude={12}
            scaleOnHover={1.1}
            showMobileWarning={true}
            showTooltip={true}
            displayOverlayContent={true}
            // overlayContent={<p className="tilted-card-demo-text">Dripy</p>}
          />
        </div>
      </div>
    </section>
  );
}
