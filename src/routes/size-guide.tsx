import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/size-guide")({
  component: SizeGuidePage,
});

function SizeGuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold mb-8">Size Guide</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Shirts & Tops</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 pr-4 opacity-70">Size</th>
              <th className="text-left py-2 pr-4 opacity-70">Chest (cm)</th>
              <th className="text-left py-2 opacity-70">Length (cm)</th>
            </tr>
          </thead>
          <tbody className="opacity-80">
            <tr className="border-b border-white/10"><td className="py-2 pr-4">S</td><td className="py-2 pr-4">88–92</td><td className="py-2">68</td></tr>
            <tr className="border-b border-white/10"><td className="py-2 pr-4">M</td><td className="py-2 pr-4">96–100</td><td className="py-2">71</td></tr>
            <tr className="border-b border-white/10"><td className="py-2 pr-4">L</td><td className="py-2 pr-4">104–108</td><td className="py-2">74</td></tr>
            <tr className="border-b border-white/10"><td className="py-2 pr-4">XL</td><td className="py-2 pr-4">112–116</td><td className="py-2">77</td></tr>
            <tr><td className="py-2 pr-4">XXL</td><td className="py-2 pr-4">120–124</td><td className="py-2">80</td></tr>
          </tbody>
        </table>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Trousers & Jeans</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-2 pr-4 opacity-70">Size</th>
              <th className="text-left py-2 pr-4 opacity-70">Waist (cm)</th>
              <th className="text-left py-2 opacity-70">Inseam (cm)</th>
            </tr>
          </thead>
          <tbody className="opacity-80">
            <tr className="border-b border-white/10"><td className="py-2 pr-4">S</td><td className="py-2 pr-4">72–76</td><td className="py-2">76</td></tr>
            <tr className="border-b border-white/10"><td className="py-2 pr-4">M</td><td className="py-2 pr-4">80–84</td><td className="py-2">78</td></tr>
            <tr className="border-b border-white/10"><td className="py-2 pr-4">L</td><td className="py-2 pr-4">88–92</td><td className="py-2">80</td></tr>
            <tr className="border-b border-white/10"><td className="py-2 pr-4">XL</td><td className="py-2 pr-4">96–100</td><td className="py-2">82</td></tr>
            <tr><td className="py-2 pr-4">XXL</td><td className="py-2 pr-4">104–108</td><td className="py-2">82</td></tr>
          </tbody>
        </table>
      </section>

      <p className="text-sm opacity-60">If you are between sizes, we recommend sizing up. For further help contact us on WhatsApp.</p>
    </main>
  );
}
