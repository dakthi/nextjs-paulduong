import { Container } from "@/components/Container";

export const Hero = () => {
  return (
    <Container className="flex flex-wrap items-center py-10 lg:py-16">
      {/* Text */}
      <div className="w-full lg:w-1/2 px-4">
        <div className="max-w-xl">
          <h1 className="text-xl font-semibold text-black lg:text-3xl xl:text-4xl">
            Empowering Nail Salons with Smart, Ownable Tools
          </h1>
          <p className="mt-4 text-sm text-gray-700 leading-relaxed lg:text-base">
            NailPro Solutions is a salon management platform designed to help you take back control. 
            No monthly subscriptions. No generic apps. Just a clean, efficient system built to fit the way you work.
          </p>
          <p className="mt-4 text-sm text-gray-700 leading-relaxed lg:text-base">
            From streamlined booking to staff scheduling and client records — everything lives in your hands, not someone else’s server. 
            We believe great technology should feel effortless, elegant, and truly yours.
          </p>

          <div className="mt-6">
            <a
              href="/contact"
              className="inline-block px-6 py-2 text-sm font-medium text-white bg-black rounded"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Video */}
      <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0 px-4">
        <video
          src="/img/nails-video-1.mp4"
          width={616}
          height={800}
          className="rounded-[5%] border border-gray-200 object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </Container>
  );
};
