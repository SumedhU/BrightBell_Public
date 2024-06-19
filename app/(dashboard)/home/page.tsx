import BarChart from "./graphs/barchart";
import DoughnutChart from "./graphs/doughnutChart";
import LineChart from "./graphs/linechart";

export default function Home() {
    return (
      <>
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Home</h1>
          </div>
        </header>
        <div>
            <p>All the insights will be present here.</p>
            <LineChart></LineChart>
            <BarChart></BarChart>
            <DoughnutChart></DoughnutChart>
        </div>
      </>
    );
  }