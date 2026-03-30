import ClockPreview from "./Components/Home/ClockPreview";
import StockPreview from "./Components/Home/MarketPreview";
import NewsPreview from "./Components/Home/NewsPreview";
import TrendingPreview from "./Components/Home/TrendingPreview";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] px-4 sm:px-6 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:gap-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          <div className="lg:col-span-2">
            <NewsPreview />
          </div>

          <div>
            <TrendingPreview />
          </div>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          <div className="lg:col-span-2">
            <StockPreview />
          </div>

          <div>
            <ClockPreview />
          </div>

        </div>

      </div>
    </div>
  );
}