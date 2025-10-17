import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="bg-white py-20 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Unlock Your Hidden Revenue?</h2>
      <Button size="lg" className="text-lg px-8 py-5 font-bold bg-purple-700 hover:bg-purple-800 rounded-xl shadow-xl transition" asChild>
        <a href="/book-a-demo">
          Book a Demo
          <ArrowRight className="inline ml-2 w-6 h-6" />
        </a>
      </Button>
    </section>
  );
}
