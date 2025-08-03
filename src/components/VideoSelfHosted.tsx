"use client";

export function VideoSelfHosted() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <video
        src="/img/cyclo-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      >
        Sorry, your browser doesn&apos;t support embedded videos.
      </video>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-end xl:p-24 justify-center bg-black/40">
        <div className="max-w-6xl mx-5 text-sm text-center text-white mb-10">
          <h1 className="text-md xl:text-5xl font-bold tracking-tight uppercase leading-tight">
            A Taste of Saigon. A Place to Feel at Home.
          </h1>

          <p className="mt-4 xl:text-lg text-md hidden xl:block text-gray-200 leading-relaxed">
            At Cyclo, every bowl of pho carries the warmth of shared meals and the spirit of Vietnam.
            Whether you&apos;re dining in or picking up, our food brings comfort, flavour, and a touch of nostalgia.
          </p>

          <p className="mt-2 italic text-md text-gray-300">
            Handcrafted in Bishop&apos;s Stortford. Rooted in Saigon memories.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-center gap-4">
            <a
              href="/menu"
              className="px-8 py-3 text-sm font-semibold text-white bg-[#A0522D] rounded-full hover:bg-[#8B4513] transition"
            >
              View Menu
            </a>
            <a
              href="/about"
              className="text-sm font-medium text-gray-200 hover:text-white transition"
            >
              Our Story
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
