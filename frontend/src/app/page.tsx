import { Navbar } from "../components/Navbar";
import { VerProdcutsButton } from "../components/VerProdcutsButton";

export default function Home() {
  return (
    <div className="flex flex-col bg-[url('/4.webp')] h-screen bg-cover max-h-screen">
      <Navbar />
      <div className="flex-grow grid grid-rows-6">
        <div className="flex row-start-6 justify-center">
          <VerProdcutsButton />
        </div>
      </div>
    </div>
  );
}
