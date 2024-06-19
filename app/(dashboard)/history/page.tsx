
import Feed from "./feed";
import Heatmap from "@/app/ui/heatmap";
export default function History() {
    return (
      <>
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">History</h1>
          </div>
        </header>
        <div className="min-h-full">
            <Heatmap />
            <Feed />
        </div>
      </>
    );
  }