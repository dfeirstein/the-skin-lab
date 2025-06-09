"use client";

export default function FontTest() {
  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Font Test Page</h1>
      
      {/* Mencken (replacing Playfair) */}
      <div className="border p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Mencken (font-playfair)</h2>
        <p className="font-playfair text-5xl mb-2">Where Science Meets Skin</p>
        <p className="font-playfair text-3xl mb-2">The Skin Lab</p>
        <p className="font-playfair text-xl mb-4">Luxury Medical Spa</p>
        <code className="text-sm bg-gray-100 p-2 rounded">font-family: mencken, serif</code>
      </div>

      {/* Aktiv Grotesk (replacing Inter) */}
      <div className="border p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Aktiv Grotesk (font-inter)</h2>
        <p className="font-inter text-xl mb-2">Experience the perfect fusion of advanced dermatological science and luxurious spa treatments.</p>
        <p className="font-inter text-base mb-2">Book your consultation today</p>
        <p className="font-inter text-sm mb-4">Navigation • Services • About • Contact</p>
        <code className="text-sm bg-gray-100 p-2 rounded">font-family: aktiv-grotesk, sans-serif</code>
      </div>

      {/* Sabon (replacing Crimson) */}
      <div className="border p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sabon (font-crimson)</h2>
        <p className="font-crimson text-xl mb-2">Our comprehensive approach combines Silicon Valley innovation with luxury aesthetic medicine.</p>
        <p className="font-crimson text-base mb-4">Delivering measurable results through precision technology and personalized care.</p>
        <code className="text-sm bg-gray-100 p-2 rounded">font-family: sabon, serif</code>
      </div>

      {/* Browser Check Instructions */}
      <div className="bg-copper-rose/10 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">How to Verify Fonts in Browser:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Right-click on any text above and select "Inspect"</li>
          <li>In the Styles panel, look for the "Computed" tab</li>
          <li>Find "font-family" to see which font is actually being used</li>
          <li>Or in the Console, type: <code className="bg-gray-200 px-2 py-1 rounded">getComputedStyle(document.querySelector('.font-playfair')).fontFamily</code></li>
        </ol>
        
        <div className="mt-4 p-4 bg-white rounded">
          <p className="font-semibold mb-2">Expected fonts from Adobe Fonts (Typekit):</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>mencken</strong> - Should replace Playfair Display</li>
            <li><strong>aktiv-grotesk</strong> - Should replace Inter</li>
            <li><strong>sabon</strong> - Should replace Crimson Pro</li>
          </ul>
        </div>
      </div>

      {/* Quick JavaScript Test */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Quick Font Check</h3>
        <p className="mb-4">Click the button below to check loaded fonts:</p>
        <button 
          onClick={() => {
            const playfair = getComputedStyle(document.querySelector('.font-playfair')!).fontFamily;
            const inter = getComputedStyle(document.querySelector('.font-inter')!).fontFamily;
            const crimson = getComputedStyle(document.querySelector('.font-crimson')!).fontFamily;
            
            alert(`Loaded Fonts:\n\nfont-playfair: ${playfair}\nfont-inter: ${inter}\nfont-crimson: ${crimson}`);
          }}
          className="bg-copper-rose text-white px-6 py-3 rounded-lg hover:bg-copper-rose/90"
        >
          Check Fonts
        </button>
      </div>
    </div>
  );
}