import { useState } from "react";

const phraseMap: Record<string, string> = {
  "lemon tart": "edgy",
  "wee": "small",
  "buttoned up": "carefully planned",
  "extraneous": "irrelevant",
};

function translate(input: string, toEnglish: boolean): string {
  const map = toEnglish ? phraseMap : Object.fromEntries(
    Object.entries(phraseMap).map(([k, v]) => [v, k])
  );

  let translated = input;
  for (const [key, value] of Object.entries(map)) {
    const regex = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'gi');
    translated = translated.replace(regex, (match) => {
      if (match[0] === match[0].toUpperCase()) {
        return value[0].toUpperCase() + value.slice(1);
      }
      return value;
    });
  }

  return translated === input ? "No known phrases found to translate." : translated;
}

export default function DangleseTranslator() {
  const [input, setInput] = useState("");
  const [toEnglish, setToEnglish] = useState(true);
  const [output, setOutput] = useState("");

  const handleTranslate = () => {
    setOutput(translate(input, toEnglish));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
        Danglese Phrase Translator
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <label>
          <input
            type="checkbox"
            checked={toEnglish}
            onChange={(e) => setToEnglish(e.target.checked)}
          />
          {' '}
          {toEnglish ? 'Danglese ➝ English' : 'English ➝ Danglese'}
        </label>
      </div>
      <input
        type="text"
        placeholder="Enter a phrase..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={handleTranslate} style={{ padding: '0.5rem 1rem' }}>
        Translate
      </button>
      {output && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f3f3', fontSize: '18px' }}>
          {output}
        </div>
      )}
    </div>
  );
}
